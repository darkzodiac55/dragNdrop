class ProjectElement {
    constructor(title, text, extraInfo, btnText = 'Finish') {
        this.title = title
        this.text = text
        this.extraInfo = extraInfo
        this.btnText = btnText
        this.render()
    }
    render() {
        let proj = document.createElement('li')
        proj.className = 'card'
        proj.dataset.extraInfo = `${this.extraInfo}`

        let pTitle = document.createElement('h2')
        pTitle.innerText = this.title
        proj.append(pTitle)

        let pText = document.createElement('p')
        pText.innerText = this.text
        proj.append(pText)

        let b1 = document.createElement('button')
        b1.className = 'alt'
        b1.innerText = 'More Info'
        b1.addEventListener('click', (e) => this.displayInfo(e))
        proj.append(b1)

        let b2 = document.createElement('button')
        b2.innerText = `${this.btnText}`
        b2.addEventListener('click', this.mover)

        proj.draggable = true
        proj.addEventListener('dragstart', (e) => {
            e.target.dataset.from = `${e.target.parentElement.id}`
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setData("text/plain", `${e.target.parentElement.id}`)
            ProjectMoverHelper.draggedEleStorer(e.target)
        })

        proj.append(b2)
        return proj
    }
    draggedEle = {}
    ttRenderStatus = false
    displayInfo(e) {
        const target = e.target.parentElement
        console.log(this.draggedEle);
        if (this.ttRenderStatus == false || target.childElementCount == '4') {
            ProjectMoverHelper.toolTipHelper(target)
            this.ttRenderStatus = true
        } else {
            ProjectMoverHelper.toolTipRemover(target)
            this.ttRenderStatus = false
        }
    }
    mover(e) {
        let card = e.target.parentElement

        if (e.target.innerText === 'Finish') {
            ProjectMoverHelper.moveToFinished(card)
        } else {
            ProjectMoverHelper.moveToActive(card)
        }


    }
}

class Tooltip {
    constructor(element) {
        this.parentElement = element
        this.render()
    }
    render() {
        const tt = document.createElement('div')
        tt.className = 'card'
        tt.innerText = `${this.parentElement.dataset.extraInfo}`
        let pos = this.parentElement.getBoundingClientRect()
        let { x, y, height } = pos

        tt.style.position = 'absolute'
        tt.style.top = (y + height + 2) + 'px'
        tt.style.left = (x + 20) + 'px'
        this.parentElement.insertAdjacentElement('beforeend', tt)
    }
}

class DadjokeTooltip {
    constructor() {
        this.addLis()
    }
    id = document.querySelector('#dadJokeCont button')
    addLis() {
        this.id.addEventListener('click', async (e) => {
            let curPos
            try {
                curPos = await this.geolocate()
                this.render(curPos.coords.latitude)
            } catch (e) {
                console.log(e);
                this.render('could not get geo data')
            }

        })
    }
    render(dtext) {
        const tt = document.createElement('div')
        tt.className = 'cardsm'
        tt.innerText = `${dtext}`
        let pos = this.id.getBoundingClientRect()
        let { x, y, height } = pos
        tt.style.position = 'absolute'
        tt.style.bottom = height + 20 + 'px'
        tt.style.left = (x - 100) + 'px'
        this.id.insertAdjacentElement('beforeBegin', tt)
    }
    geolocate() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position)
            }, (e) => {
                console.log('smthwentwrong');
                reject(e)
            })
        })
    }

}

class Projects {
    reRerenderProjs(renderHook) {
        for (const proj of this.projArr) {
            renderHook.append(proj.render())
        }
    }
    deleteProj(index) {
        this.projArr.splice(index, 1)

    }
    removeAllTT() {
        for (const child of this.id.children) {
            /* for (const innerchild of child.children) {
                if (innerchild.className == 'card') {
                    innerchild.remove()
                }
            } */
            if (child.childElementCount == '5') {
                ProjectMoverHelper.toolTipRemover(child)
            }

        }
    }
    removeTTlistener() {
        this.id.addEventListener('scroll', () => this.removeAllTT())
    }
    dropHandler() {
        this.id.addEventListener('dragover', (e) => {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
        })
        this.id.addEventListener('drop', (e) => {
            e.preventDefault()
            let draggedObj = ProjectMoverHelper.storedEle
            let transferBtn = draggedObj.querySelector('button:last-of-type')
            if (this.id.id !== e.dataTransfer.getData("text")) {
                e.dataTransfer.getData("text") == 'active-ul' ? transferBtn.innerText = 'Activate' : transferBtn.innerText = 'Finish'
                this.id.append(draggedObj)
                draggedObj.scrollIntoView({ behavior: "smooth" }) ////////////////////////check for bugs, with buttons mostly
            }

        })
    }
}

class ActiveProjects extends Projects {
    constructor() {
        super()
        this.removeTTlistener()
        this.dropHandler()
    }
    id = document.querySelector('#active-projects ul')
    projArr = [
        new ProjectElement('Finish the Course', 'Finish the course within the next two weeks.', 'Got lifetime access, but would be nice to finish it soon!'),
        new ProjectElement('Buy Groceries', "Don't forget to pick up groceries today.", 'Not really a business topic but still important.')
    ]
    addProj(title, text, extraInfo, hook) {
        let nProj = new ProjectElement(title, text, extraInfo)
        this.projArr.push(nProj)
        hook.append(nProj.render())
    }

}

class FinishedProjects extends Projects {
    constructor() {
        super()
        this.removeTTlistener()
        this.dropHandler()
    }
    id = document.querySelector('#finished-projects ul')
    projArr = [
        new ProjectElement('Book Hotel', "Academind conference takes place in December, don't forget to book a hotel.", "Super important conference! Fictional but still!",
            'Activate'),

    ]
}

class ProjectPages {
    static activeArr

    constructor() {
        this.initActive()
        this.initFinished()
        this.initDadJoke()
    }
    initActive() {
        this.actives = new ActiveProjects()
        this.activeRenderHook = this.actives.id
        this.actives.reRerenderProjs(this.activeRenderHook)
        this.activeArr = this.actives.projArr

    }
    initFinished() {
        this.finished = new FinishedProjects()
        this.finishedRenderHook = this.finished.id
        this.finished.reRerenderProjs(this.finishedRenderHook)
        this.finishedArr = this.finished.projArr


    }
    initDadJoke() {
        this.joke = new DadjokeTooltip()
    }

}



class ProjectMoverHelper {
    static initAll() {
        this.renderedProjs = new ProjectPages()
    }
    static showArr() {
        console.log(this.renderedActives.activeArr);
    }
    static moveToFinished(ele) {
        this.renderedProjs.finishedRenderHook.append(ele)
        ele.children[3].innerText = 'Activate'
        ele.scrollIntoView({ behavior: "smooth" })
    }
    static moveToActive(ele) {
        this.renderedProjs.activeRenderHook.append(ele)
        ele.children[3].innerText = 'Finish'
        ele.scrollIntoView({ behavior: "smooth" })
    }
    static createNewProj() {
        this.renderedProjs.actives.addProj('macecha', 'asdfadsfaf', 'rofl', this.renderedProjs.activeRenderHook)
    }
    static toolTipHelper(ele) {
        new Tooltip(ele)
    }
    static toolTipRemover(ele) {
        let tt = ele.querySelector('.card')
        tt.remove()
    }
    static draggedEleStorer(ele) {
        this.storedEle = ele
    }
}


ProjectMoverHelper.initAll()
ProjectMoverHelper.createNewProj()


const freq = new XMLHttpRequest()

freq.onload = (e) => {
    console.log('requesting');
    console.log(freq);
    let nfreq = JSON.parse(freq.responseText)

    console.log(nfreq.ticker.price + nfreq.ticker.target);
}

freq.onerror = (e) => {
    console.log(e);
    console.log(this);
}

freq.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd')

freq.send()


