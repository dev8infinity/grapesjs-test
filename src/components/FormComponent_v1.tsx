import { Component, Editor } from 'grapesjs';

export function FormComponent(editor: Editor) {
    editor.Components.addType('radio-button', {
        model: {
            defaults: {
                tagName: 'div',
                droppable: false, // Shouldn't be droppable for radio buttons
                style: {
                    display: 'flex',
                    alignItems: 'column',
                    gap: '8px',
                    padding: '4px 0',
                },
                components: [
                    { 
                        tagName: 'label', 
                        components: [
                            { 
                                tagName: 'input', 
                                attributes: { 
                                    type: 'radio', 
                                    name: 'radio-group',
                                    value: 'option-1' 
                                },
                                traits: [
                                    {
                                        type: 'text',
                                        name: 'value',
                                        label: 'Form Value',
                                        changeProp: true
                                    }
                                ]
                            }, 
                            {
                                type: 'text',
                                content: 'Option 1',
                                editable: true, // Makes label text directly editable
                            }
                        ],
                        traits: [
                  
                        ] 
                    }
                ],
                traits: [
                    {
                        type: 'text',
                        name: 'value',
                        label: 'Form Value',
                        changeProp: true
                    }
                ]
            },
            init() {
                this.listenTo(this.parent(), 'change:name', this.updateName);
                
                this.on('change:value', this.updateInputValue);
                
                this.on('change:label', this.updateLabelText);
            },
            
            updateName() {
                const name = this.parent().get('name') || 'radio-group';
                const input = this.find('input')[0];
                if (input) {
                    input.addAttributes({ name });
                }
            },
            
            updateInputValue() {
                const value = this.get('value') || `opcao-${this.index() + 1}`;
                const input = this.find('input')[0];
                if (input) {
                    input.addAttributes({ value });
                    input.set('value', value);
                }
            },
            
            updateLabelText() {
                const labelText = this.get('label') || `Opção ${this.index() + 1}`;
                const labelComponent = this.find('label')[0]?.get('components')?.at(1);
                if (labelComponent) {
                    labelComponent.set('content', labelText);
                }
            }
        },
        
        view: {
            onRender() {
                this.model.updateInputValue();
                this.model.updateLabelText();
            }
        }
    });
    
    editor.Components.addType('radio-group', {
        model: {
            defaults: {
                tagName: 'div',
                droppable: true,
                name: 'radio-group', // Default group name
                style: {
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    paddingBottom: '10px',
                },
                components: [
                    { type: 'radio-button' },
                    { type: 'radio-button' },
                ],
                childCount: '2',
                traits: [
                    {
                        type: 'text',
                        name: 'name',
                        label: 'Group Name',
                        changeProp: true
                    },
                    {
                        type: 'number',
                        name: 'childCount',
                        label: 'Number of Items',
                        changeProp: true,
                        min: 1
                    },
                ],
            },
            init() {
                this.on('change:childCount', this.updateChildCount);
                this.on('change:name', this.updateChildNames);
            },
            updateChildCount() {
                const childCount = Number(this.get('childCount') || 1);
                const components = this.components();
                
                if (childCount < components.length) {
                    while (components.length > childCount) {
                        components.pop();
                    }
                } else if (childCount > components.length) {
                    const diff = childCount - components.length;
                    for (let i = 0; i < diff; i++) {
                        components.add({
                            type: 'radio-button',
                        });
                    }
                }
                this.updateChildValues(); // Update values when count changes
            },
            updateChildNames() {
                const name = this.get('name') || 'radio-group';
                this.components().each((component: Component) => {
                    const input = component.find('input')[0];
                    if (input) {
                        input.addAttributes({ name });
                    }
                });
            }
        }
    });

    // BOTÃO SUBMIT
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
                style: {
                    padding: '10px 20px',
                    'background-color': '#198754',
                    color: 'white',
                    border: 'none',
                    'border-radius': '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                },
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

    // INPUT
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
                style: {
                    padding: '12px',
                    border: '1px solid #ccc',
                    'border-radius': '6px',
                    width: '100%',
                    'font-size': '15px',
                    'background-color': '#e5e5e5',
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

    // LABEL
    editor.Components.addType('custom-label', {
        model: {
            defaults: {
                tagName: 'label',
                draggable: true,
                droppable: false,
                attributes: {
                    for: '',
                },
                content: 'Texto do rótulo',
                style: {
                    display: 'block',
                    'margin-bottom': '6px',
                    color: '#333',
                    'font-weight': 'bold',
                    'font-size': '16px',
                },
                traits: [
                    {
                        type: 'text',
                        name: 'content',
                        label: 'Texto do Rótulo',
                        changeProp: true
                    },
                    {
                        type: 'text',
                        name: 'for',
                        label: 'For (ID do campo)',
                    }
                ]
            },
        },
        view: {
            init() {
                this.listenTo(this.model, 'change:content', this.updateContent);
            },
            updateContent() {
                this.el.innerText = this.model.get('content');
            }
        }
    });


    // FORMULÁRIO
    editor.Components.addType('custom-form', {
        model: {
            defaults: {
                tagName: 'form',
                draggable: true,
                droppable: true,
                attributes: { action: '', method: 'post', enctype: 'application/json' },
                style: {
                    display: 'flex',
                    'flex-direction': 'column',
                    gap: '20px',
                    padding: '20px',
                    border: '1px solid #eee',
                    'border-radius': '8px',
                    'backgroun-color': '#fff',
                    'max-width': '1000px',
                    margin: '0 auto',
                    'font-family': 'Arial, sans-serif',
                    'font-size': '14px',
                },
                components: [],
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
                        label: 'Tipo do conteúdo',
                        options: [
                            { value: 'application/json', name: 'JSON', id: 'json' },
                            { value: 'application/x-www-form-urlencoded', name: 'Form URL Encoded', id: 'urlencoded' },
                            { value: 'multipart/form-data', name: 'Multipart (File Upload)', id: 'form-data' },
                            { value: 'text/plain', name: 'Texto', id: 'text' }
                        ]
                    }
                ]
            },
            toJSON(...args) {
                const { model: defaultModel } = editor.DomComponents.getType('default');
                const baseJSON = defaultModel.prototype.toJSON.apply(this, args);
                return {
                    ...baseJSON,
                    "tagName": "form",
                };
            }
        },
        view: {
            events: {
                submit: 'handleSubmit',
            },
            handleSubmit(event) {
                const attrs = this.model.getAttributes();
                if (attrs.enctype !== 'application/json') return;

                event.preventDefault();

                const formData = new FormData(this.model.view.el);
                const action = attrs.action;
                const jsonData = {};
                formData.forEach((value, key) => {
                    jsonData[key] = value;
                });

                fetch(action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });
            }
        }
    });

    // BLOCO DE FORMULÁRIO COM LINHAS
    editor.BlockManager.add('form-row-block', {
        label: 'Formulário com linhas',
        category: 'Formulários',
        content: {
            type: 'custom-form', components: [
                {
                    "type": "balm-Row",
                    "components": [
                        {
                            type: 'balm-Cell', components: [
                                {
                                    type: 'custom-label',
                                    content: 'Nome',
                                },
                                {
                                    type: 'custom-input',
                                    attributes: {
                                        type: 'text',
                                        name: 'nome',
                                        placeholder: 'Digite seu nome'
                                    },
                                },
                            ]
                        },
                        {
                            type: 'balm-Cell', components: [
                                {
                                    type: 'custom-label',
                                    content: 'Sobrenome',
                                },
                                {
                                    type: 'custom-input',
                                    attributes: {
                                        type: 'text',
                                        name: 'sobrenome',
                                        placeholder: 'Digite seu sobrenome'
                                    },
                                },
                            ]
                        },
                        {
                            type: 'balm-Cell', components: [
                                {
                                    type: 'custom-label',
                                    content: 'CPF',
                                },
                                {
                                    type: 'custom-input',
                                    attributes: {
                                        type: 'text',
                                        name: 'cpf',
                                        placeholder: 'Digite seu cpf'
                                    },
                                },
                            ]
                        },
                        {
                            type: 'balm-Cell', components: [
                                {
                                    type: 'custom-label',
                                    content: 'CEP',
                                },
                                {
                                    type: 'custom-input',
                                    attributes: {
                                        type: 'text',
                                        name: 'cep',
                                        placeholder: 'Digite seu CEP'
                                    },
                                },
                            ]
                        },
                        {
                            type: 'balm-Cell',
                            components: [
                                {
                                    tagName: 'div',
                                    style: {
                                        display: 'flex',
                                        'justify-content': 'center',
                                        'margin-top': '10px',
                                    },
                                    components: [
                                        {
                                            type: 'submit-button',
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                }
            ]
        }
    });
    // BLOCO DE FORMULÁRIO
    editor.BlockManager.add('form-block', {
        label: 'Formulário',
        category: 'Formulários',
        content: {
            type: 'custom-form', components:
                [
                    {
                        tagName: 'div',
                        components: [
                            {
                                type: 'custom-label',
                                content: 'Nome',
                            },
                            {
                                type: 'custom-input',
                                attributes: {
                                    type: 'text',
                                    name: 'nome',
                                    placeholder: 'Digite seu nome'
                                },
                            },

                        ]
                    },

                    {
                        tagName: 'div',
                        components: [
                            {
                                type: 'custom-label',
                                content: 'Sobrenome',
                            },
                            {
                                type: 'custom-input',
                                attributes: {
                                    type: 'text',
                                    name: 'sobrenome',
                                    placeholder: 'Digite seu sobrenome'
                                },
                            },

                        ]
                    },


                    {
                        tagName: 'div',
                        style: {
                            display: 'flex',
                            'justify-content': 'center',
                            'margin-top': '10px',
                        },
                        components: [
                            {
                                type: 'submit-button',
                            }
                        ]
                    }
                ]
        }
    });

    // BLOCO DE INPUT
    editor.BlockManager.add('input-block', {
        label: 'Campo de Input',
        category: 'Formulários',
        content: { type: 'custom-input' }
    });

    // BLOCO DE LABEL
    editor.BlockManager.add('label-block', {
        label: 'Legenda',
        category: 'Formulários',
        content: { type: 'custom-label' }
    });

    // BLOCO DE INPUT + LABEL
    editor.BlockManager.add('input-label-block', {
        label: 'Campo + Legenda',
        category: 'Formulários',
        content: {
            tagName: 'div',
            components: [
                {
                    type: 'custom-label',
                    content: 'Nome',
                },
                {
                    type: 'custom-input',
                    attributes: {
                        type: 'text',
                        name: 'nome',
                        placeholder: 'Digite seu nome'
                    },
                },

            ]
        }
    });

    // BLOCO DE INPUT
    editor.BlockManager.add('radio-group', {
        label: 'Input radio',
        category: 'Formulários',
        content: { type: 'radio-group' }
    });

}
