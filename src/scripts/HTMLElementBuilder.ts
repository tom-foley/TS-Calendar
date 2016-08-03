export function isDefined(obj) {
    return typeof (obj) !== 'undefined' && obj !== null;
}


function addHTMLEvent(el: HTMLElement, attr: HTMLEventAttr) {
    if (el.addEventListener) {
        el.addEventListener(attr.eventName, attr.eventFn, false);
    } else if ((<any>el).attachEvent) {
        (<any>el).attachEvent(attr.eventName, attr.eventFn);
    }
}


export class HTMLStyleAttr {
    styleName: string;
    styleValue: string;
    constructor(name: string, value: string) {
        this.styleName = name;
        this.styleValue = value;
    }
}


export class HTMLEventAttr {
    eventName: string;
    eventFn: any;
    constructor(name: string, fn: any) {
        this.eventName = name;
        this.eventFn = fn;
    }
}


export class HTMLElementBuilder {
    public static CreateEl(props: Object): HTMLElement {
        let currAttr: string;
        let el: HTMLElement = null;

        currAttr = 'type';
        if (isDefined(props[currAttr]) && (<string>props[currAttr]).length > 0) {
            el = document.createElement(<string>props[currAttr]);
        } else {
            return el;
        }

        currAttr = 'styles';
        if (isDefined(props[currAttr]) && (<Array<HTMLStyleAttr>>props[currAttr]).length > 0) {
            let styleName: string;
            let styleValue: string;
            let styles: Array<HTMLStyleAttr> = (<Array<HTMLStyleAttr>>props[currAttr]);
            for (let i: number = 0; i < styles.length; ++i) {
                styleName = styles[i].styleName;
                styleValue = styles[i].styleValue;
                if (isDefined(el.style[styleName])) {
                    el.style[styleName] = styleValue;
                }
            }
        }

        currAttr = 'events';
        if (isDefined(props[currAttr]) && (<Array<HTMLEventAttr>>props[currAttr]).length > 0) {
            let events = (<Array<HTMLEventAttr>>props[currAttr]);
            for (let i: number = 0; i < events.length; ++i) {
                addHTMLEvent(el, events[i]);
            }
        }

        currAttr = 'children';
        if (isDefined(props[currAttr]) && (<Array<Object>>props[currAttr]).length > 0) {
            let child: HTMLElement;
            let children = (<Array<Object>>props[currAttr]);
            for (let i: number = 0; i < children.length; ++i) {
                child = HTMLElementBuilder.CreateEl(children[i]);
                if (isDefined(child)) {
                    el.appendChild(child);
                }
            }
        }

        return el;
    }
}
