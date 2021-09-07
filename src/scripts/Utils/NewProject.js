import { ProjectMoverHelper } from "./ProjectMoverHelper";

export default class NewProjectCreator {
    constructor() {
        this.addLis()
    }
    addLis() {
        this.createBtn.addEventListener('click', (e) => {
            this.form.classList.toggle('hidden')
            this.form.classList.toggle('animate')
            this.transpDiv.classList.toggle('hidden')

        })
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()

            if (this.form.title.value) {
                ProjectMoverHelper.createNewProj(this.form.title.value, this.form.text.value, this.form.info.value)
                this.form.title.value = ''
                this.form.text.value = ''
                this.form.info.value = ''
            }


        })
        this.transpDiv.addEventListener('click', (e) => {
            this.form.classList.toggle('hidden')
            this.transpDiv.classList.toggle('hidden')
            this.form.classList.toggle('animate')
        })

    }
    createBtn = document.querySelector("#dadJokeCont button")
    form = document.querySelector('form')
    transpDiv = document.querySelector('#hider')
}