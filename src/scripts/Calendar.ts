import { HTMLElementBuilder, HTMLEventAttr, HTMLStyleAttr, isDefined } from './HTMLElementBuilder';

const element = HTMLElementBuilder.CreateEl;
const style = HTMLStyleAttr;
//const event = HTMLEventAttr;

export class Calendar {
    startDate: Date;
    container: HTMLElement;

    constructor(container: HTMLElement, options?: Object) {
        this.container = container;

        if (isDefined(options)) {
            let attr: string;
            attr = 'startDate';
            if (isDefined(options[attr])) {
                const date = options[attr];
                if (typeof (date) === 'object') {
                    this.startDate = date;
                } else if (typeof (date) === 'string') {
                    this.startDate = new Date(date);
                }
            } else {
                this.startDate = new Date();
            }
        }

        this.render();
    }


    private render() {
        let el: HTMLElement = element({
            type: 'table',
            styles: [
                new style('width', '100%')
            ],
            children: [
                element({
                    type: 'tr',
                    children: [
                        element({
                            type: 'td'
                        })
                    ]
                }),
            ]
        });

        this.container.appendChild(el);
    }
}
