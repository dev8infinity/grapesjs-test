import { ComponentProps } from "./types";
  
export default function Componentv1(
    props: ComponentProps
) {
    const transformed: {events: any, [k: string]: any} = { events: {} };

    props.events.forEach(({ type, handler }, index) => {
        const handlerName = 'handler' + type.charAt(0).toUpperCase() + type.slice(1) + index;
        transformed.events[type] = handlerName;
        transformed[handlerName] = handler;
    });
    props.editor.Components.addType(props.name, {
        model: {
            ...props.component.model,
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
            ...props.component.view,
            ...transformed
        } 
    });  
}