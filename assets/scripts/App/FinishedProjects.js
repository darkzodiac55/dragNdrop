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