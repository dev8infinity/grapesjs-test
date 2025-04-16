import { Editor, AddComponentTypeOptions } from 'grapesjs';

export type EventType = 'click' | 'dblclick' | 'mouseover' | 'mouseout' | 'keydown' | 'keyup' | 'keypress' | 'change' | 'input' | 'submit';

export interface Event {
    type: EventType;
    handler: (e: any) => void;
    action: 'redirect' | 'submit';
    value: string;
    extraArgs?: [k: string, v: string][];
}
export interface ComponentProps {
    editor: Editor; 
    name: string;
    component: AddComponentTypeOptions;
    events: Event[];
}
