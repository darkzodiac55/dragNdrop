import { ActiveProjects } from "./ActiveProjects.js";
import { FinishedProjects } from "./FinishedProjects.js";
import NewProjectCreator from "../Utils/NewProject.js";

export default class ProjectPages {
    static activeArr

    constructor() {
        this.initActive()
        this.initFinished()
        this.initCreator()
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
    initCreator() {
        this.creator = new NewProjectCreator()
    }

}