import { HTMLElementBuilder, HTMLEventAttr, HTMLStyleAttr } from './HTMLElementBuilder';

const element = HTMLElementBuilder.CreateEl;
const style = HTMLStyleAttr;
const event = HTMLEventAttr;

export class Calendar {
    constructor() { 
        let el: HTMLElement = element({
            type: 'div',
            styles: [
                new style('width', '20px')
            ],
            events: [
                new event('click', alert(1))
            ]
        });
    }
}