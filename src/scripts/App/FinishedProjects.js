import { Projects } from "./Projects.js";
import { ProjectElement } from "./ProjectElement.js";

export class FinishedProjects extends Projects {
    constructor() {
        super()
        this.removeTTlistener()
        this.dropHandler()
    }
    id = document.querySelector('#finished-projects ul')
    projArr = [
        new ProjectElement('Clean up', "Vacuum the apartment", "Lot of dust!",
            'Activate'),

    ]
}