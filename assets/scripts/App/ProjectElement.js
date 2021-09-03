import { ProjectMoverHelper } from "../Utils/ProjectMoverHelper.js";

export class ProjectElement {
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