import { Editor, AddComponentTypeOptions } from 'grapesjs';


interface ComponentProps {
    editor: Editor; 
    name: string;
    component: AddComponentTypeOptions;
    onSubmit?: (value: any) => void;
}

  
export default function Component(
    props: ComponentProps
) {
    // if(props.onSubmit) {
    //     props.component.model = props.component.model || {};
    //     props.component.model.defaults = props.component.model.defaults || {};
    //     props.component.model.defaults.script = function () {
    //         this.el.submitFun = props.onSubmit; 
    //         this.addEventListener('submit', this.el.submitFun);    
    //     }

    //     props.component.view = props.component.view || {};
    //     props.component.view.removed = function () {
    //         if(this.el.submitFun || typeof this.el.submitFun == 'function'){
    //             this.el.removeEventListener('submit', this.el.submitFun);
    //             console.log('submitFun removido');
    //         }; 
    //     }
    // }
    props.editor.Components.addType(props.name, {
        model: {
            ...props.component.model,
            defaults: {
                ...props.component.model.defaults,  
                script: `
                function (props) {
                    const element = this;
                    this.submitFun = ${props.onSubmit?.toString()};
                    this.addEventListener('click', this.submitFun);
                } 
                `,
      
            },
        }
    });  
}