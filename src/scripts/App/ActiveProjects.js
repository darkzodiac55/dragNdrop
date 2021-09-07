import { Projects } from "./Projects.js";
import { ProjectElement } from "./ProjectElement.js";

export class ActiveProjects extends Projects {
    constructor() {
        super()
        this.removeTTlistener()
        this.dropHandler()
    }
    id = document.querySelector('#active-projects ul')
    projArr = [
        
        new ProjectElement('Exercise', '30 minute jog for today', 'or 20'),
        new ProjectElement('Buy Groceries', "Don't forget to pick up groceries today.", 'Not really a business topic but still important.'),
        new ProjectElement('GitHub', 'Commit this to GH', 'nothin'),
    ]
    addProj(title, text, extraInfo, hook) {
        let nProj = new ProjectElement(title, text, extraInfo)
        this.projArr.push(nProj)
        hook.prepend(nProj.render())
    }

}