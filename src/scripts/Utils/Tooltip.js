export class Tooltip {
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