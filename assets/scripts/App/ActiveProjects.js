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
        new ProjectElement('Finish the Course', 'Finish the course within the next two weeks.', 'Got lifetime access, but would be nice to finish it soon!'),
        new ProjectElement('Buy Groceries', "Don't forget to pick up groceries today.", 'Not really a business topic but still important.')
    ]
    addProj(title, text, extraInfo, hook) {
        let nProj = new ProjectElement(title, text, extraInfo)
        this.projArr.push(nProj)
        hook.append(nProj.render())
    }

}