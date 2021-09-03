export class DadjokeTooltip {
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