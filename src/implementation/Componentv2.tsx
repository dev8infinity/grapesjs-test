import { ComponentProps } from './types';

  
export default function Componentv2(
    props: ComponentProps
) {
    props.editor.Components.addType(props.name, {
        model: {
            ...props.component.model,
            defaults: {
                ...props.component.model.defaults,  
                script: `
                function (props) {
                    const element = this;

                    ${
                        props.events.map((event, index) => {
                            return `
                            this.fun${index} = ${event.handler.toString()};
                            element.addEventListener('${event.type}', this.fun${index});

                            `
                        }).join('')
                    }
                } 
                `,
            },
            toJSON(...args) {
                const { model: defaultModel } = props.editor.DomComponents.getType('default');
                const baseJSON = defaultModel.prototype.toJSON.apply(this, args);
                return {
                    ...baseJSON,
                    events: props.events.map((event) => {
                        return {
                            type: event.type,
                            action: event.action,
                            value: event.value,
                            extraArgs: event.extraArgs || [],
                        };
                    })
                };
            }
        },
        view: { 
            removed() {
                props.events.forEach((event, i) => {
                    const fun = this.el[`fun${i}`];
                    if(fun || typeof fun == 'function'){
                        this.el.removeEventListener(event.type, fun);
                        console.log(`${event.type} removed`, fun);
                    }
                });
            }
        }
    });  
}