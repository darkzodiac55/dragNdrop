class ProjectMoverHelper {
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
    static createNewProj() {
        this.renderedProjs.actives.addProj('GitHub', 'Commit this to GH', 'nothin', this.renderedProjs.activeRenderHook)
    }
    static toolTipHelper(ele) {
        new Tooltip(ele)
    }
    static toolTipRemover(ele) {
        let tt = ele.querySelector('.card')
        tt.remove()
    }
    static draggedEleStorer(ele) {
        this.storedEle = ele
    }
}

ProjectMoverHelper.initAll()
ProjectMoverHelper.createNewProj()

