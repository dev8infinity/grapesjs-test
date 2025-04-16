import { Editor } from 'grapesjs';
import Component from './Component';

export function Form(editor: Editor) {

    editor.Components.addType('submit-button', {
        model: {
            defaults: {
                tagName: 'button',
                draggable: 'form, custom-form',
                droppable: false,
                attributes: {
                    type: 'submit',
                },
                content: 'Enviar',
                traits: [
                    {
                        type: 'text',
                        name: 'content',
                        label: 'Texto do Botão',
                        changeProp: true
                    },
                    {
                        type: 'select',
                        name: 'type',
                        label: 'Tipo',
                        options: [
                            { value: 'submit', name: 'Submit', id: 'submit' },
                            { value: 'button', name: 'Button', id: 'button' },
                            { value: 'reset', name: 'Reset', id: 'reset' }
                        ],
                    },
                ],
                'script-props': ['func'],
            },

            init() {
                this.on('change:content', () => {
                    this.components(this.get('content'));
                });
            },
        },
    });

    // COMPONENTE INPUT
    editor.Components.addType('custom-input', {
        model: {
            defaults: {
                tagName: 'input',
                draggable: 'form, custom-form',
                droppable: false,
                attributes: {
                    type: 'text',
                    name: 'campo',
                    placeholder: 'Digite aqui'
                },
                traits: [
                    {
                        type: 'text',
                        name: 'name',
                        label: 'Nome do campo'
                    },
                    {
                        type: 'text',
                        name: 'placeholder',
                        label: 'Placeholder'
                    },
                    {
                        type: 'select',
                        name: 'type',
                        label: 'Tipo',
                        options: [
                            { value: 'text', name: 'Texto', id: 'text' },
                            { value: 'email', name: 'Email', id: 'email' },
                            { value: 'password', name: 'Senha', id: 'password' },
                        ]
                    }
                ]
            },
        },
    });
   
    Component({
        editor, name: 'custom-form', component: {
            model: {
                defaults: {
                    'script-props': ['attributes', 'draggable', 'droppable'],
                    tagName: 'form',
                    draggable: true,
                    droppable: true,
                    attributes: { action: '', method: 'post', enctype: 'application/json' },
                    components:
                        [
                            {
                                "type": "custom-input",
                                "attributes": {
                                    "type": "text",
                                    "name": "campo",
                                    "placeholder": "Digite aqui"
                                },
                            },
                            {
                                "type": "submit-button",
                            }
                        ],
                    traits: [
                        {
                            type: 'text',
                            name: 'action',
                            label: 'Action URL'
                        },
                        {
                            type: 'select',
                            name: 'method',
                            label: 'Method',
                            options: [
                                { value: 'post', name: 'POST', id: 'post' },
                                { value: 'get', name: 'GET', id: 'get' },
                            ]
                        },
                        {
                            type: 'select',
                            name: 'enctype',
                            label: 'Tipo do conteudo',
                            options: [
                                { value: 'application/json', name: 'JSON', id: 'json' },
                                { value: 'application/x-www-form-urlencoded', name: 'Form URL Encoded', id: 'urlencoded' },
                                { value: 'multipart/form-data', name: 'Multipart (File Upload)', id: 'form-data' },
                                { value: 'text/plain', name: 'Texto', id:  'text'}
                            ]
                        }
                    ]
                },
            }
        },
        onSubmit: function (event) {
            const attrs = props.attributes;
        
            if (attrs.enctype !== 'application/json') {
                return;
            }
            
            event.preventDefault(); // Evita o envio padrão do formulário
            
            const formData = new FormData(element);
            const action = attrs.action;
            
            // Converte FormData para JSON
            const jsonData = {};
            
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            
            // Envia como JSON
            fetch(action, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
        } 
    });


    editor.BlockManager.add('form-block', {
        label: 'Formulário',
        category: 'Formulários',
        content: { type: 'custom-form' }
    });

    editor.BlockManager.add('input-block', {
        label: 'Campo de Input',
        category: 'Formulários',
        content: { type: 'custom-input' }
    });


}