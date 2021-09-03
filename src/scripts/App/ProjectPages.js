import { ActiveProjects } from "./ActiveProjects.js";
import { FinishedProjects } from "./FinishedProjects.js";
import { DadjokeTooltip } from "../Utils/DadJokeTooltip.js";

export default class ProjectPages {
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