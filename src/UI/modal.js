export class Modal {
    constructor(contentId, fallbackText) {
        this.fallbackText = fallbackText;
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEl = document.getElementById("modal-template")
    }
    show() {
        if ('content' in document.createElement("template")) {
            const modalElements = document.importNode(this.modalTemplateEl.content, true);
            this.modalElement = modalElements.querySelector(".modal");
            this.backdropElement = modalElements.querySelector(".backdrop");

            const contentElement = document.importNode(this.contentTemplateEl.content, true);
            this.modalElement.append(contentElement);

            document.body.insertAdjacentElement("afterbegin", this.modalElement);
            document.body.insertAdjacentElement("afterbegin", this.backdropElement);
        } else {
            alert(this.fallbackText);
        }
    }
    hide() {
        if(this.modalElement){
           this.modalElement.remove();
           this.backdropElement.remove();
            // document.body.remove(this.backdropElement);
            this.modalElement = null;
            this.backdropElement = null;
        }
    }
}