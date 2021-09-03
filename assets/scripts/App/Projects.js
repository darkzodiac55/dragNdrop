import { ProjectMoverHelper } from "../Utils/ProjectMoverHelper.js";

export class Projects {
    reRerenderProjs(renderHook) {
        for (const proj of this.projArr) {
            renderHook.append(proj.render())
        }
    }
    deleteProj(index) {
        this.projArr.splice(index, 1)

    }
    removeAllTT() {
        for (const child of this.id.children) {
            /* for (const innerchild of child.children) {
                if (innerchild.className == 'card') {
                    innerchild.remove()
                }
            } */
            if (child.childElementCount == '5') {
                ProjectMoverHelper.toolTipRemover(child)
            }

        }
    }
    removeTTlistener() {
        this.id.addEventListener('scroll', () => this.removeAllTT())
    }
    dropHandler() {
        this.id.addEventListener('dragover', (e) => {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
        })
        this.id.addEventListener('drop', (e) => {
            e.preventDefault()
            let draggedObj = ProjectMoverHelper.storedEle
            let transferBtn = draggedObj.querySelector('button:last-of-type')
            if (this.id.id !== e.dataTransfer.getData("text")) {
                e.dataTransfer.getData("text") == 'active-ul' ? transferBtn.innerText = 'Activate' : transferBtn.innerText = 'Finish'
                this.id.append(draggedObj)
                draggedObj.scrollIntoView({ behavior: "smooth" }) ////////////////////////check for bugs, with buttons mostly
            }

        })
    }
}