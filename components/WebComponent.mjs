// @ts-check

export class WebComponent extends HTMLElement {

    get template () {
        return ''
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(property, prev, value) {
        if (prev !== value) {
            this[property] = value
            this.render()
        }
    }

    render() {
        this.innerHTML = this.template
    }
}