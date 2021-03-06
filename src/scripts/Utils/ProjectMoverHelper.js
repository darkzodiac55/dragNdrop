import ProjectPages from "../App/ProjectPages.js"; //import def export
/* import Tooltip from "./Tooltip.js"; */

export class ProjectMoverHelper {
    static initAll() {
        this.renderedProjs = new ProjectPages()
    }
    static showArr() {
        console.log(this.renderedActives.activeArr);
    }
    static moveToFinished(ele) {
        this.renderedProjs.finishedRenderHook.append(ele)
        ele.children[3].innerText = 'Activate'
        ele.scrollIntoView({ behavior: "smooth" })
    }
    static moveToActive(ele) {
        this.renderedProjs.activeRenderHook.append(ele)
        ele.children[3].innerText = 'Finish'
        ele.scrollIntoView({ behavior: "smooth" })
    }
    static createNewProj(title,info,extra) {
        this.renderedProjs.actives.addProj(title, info, extra, this.renderedProjs.activeRenderHook)
    }
    static async toolTipHelper(ele) {
        let module = await import('./Tooltip.js');  ///dynamic import, is a promise
        new module.Tooltip(ele)
    }
    static toolTipRemover(ele) {
        let tt = ele.querySelector('.card')
        tt.remove()
    }
    static draggedEleStorer(ele) {
        this.storedEle = ele
    }
}



