import { Editor } from 'grapesjs';

export function UtilityComponents(editor: Editor) {

    editor.Components.addType('balm-Row', {
        model: {
            defaults: {
                tagName: 'div',
                components: [
                    {
                        droppable: true,
                        draggable: true,
                        type: 'div',
                        "style": {
                            "display": "flex",
                            "justify-content": "flex-start",
                            "align-items": "stretch",
                            "flex-wrap": "nowrap",
                            "padding": "10px",
                            "flex-direction": "column",
                        }
                    }
                ],
            },
        },
    });


    editor.DomComponents.addType('balm-Cell', {
        model: {
            defaults: {
                name: 'Cell',
                tagName: 'div',
                draggable: true,
                droppable: true,
                "unstylable": [
                    "width"
                ],
                "stylable-require": [
                    "flex-basis"
                ],
                "style": {
                    "min-height": "75px",
                    "flex-grow": "1",
                    "flex-basis": "100%"
                },
            },
        },
    });



    editor.DomComponents.addType('balm-cell', {
        model: {
            defaults: {
                tagName: 'div',
                draggable: true,
                droppable: true,
                attributes: { class: 'icon-text' },
                components: [
                    {
                        type: 'image',
                        style: {
                            'max-width': '40px',
                            'max-height': '40px',
                            'margin-bottom': '5px',
                        },

                    },
                    {
                        type: 'text',
                        content: 'Texto',
                        style: { 'font-size': '14px' },
                        traits: [
                            {
                                type: 'text',
                                name: 'content',
                                label: 'Texto',
                                placeholder: 'Texto padrão',
                                changeProp: true,
                            },
                        ]
                    },
                ],
                styles: [
                    {
                        selectors: ['.icon-text'],
                        style: {
                            display: 'flex',
                            'flex-direction': 'column',
                            'align-items': 'center',
                            padding: '10px',
                            flex: '1 0 33%',
                            cursor: 'pointer',
                            'text-decoration': 'none',
                        },
                    },
                    {
                        selectors: ['.test'],
                        style: {
                            color: 'red',
                        },
                    },
                ],
                traits: [
                    {
                        type: 'text',
                        name: 'link',
                        label: 'Link redirecionamento',
                        placeholder: 'https://...'
                    }
                ]
            },
            toJSON(...args) {
                const { model: defaultModel } = editor.DomComponents.getType('default');
                const baseJSON = defaultModel.prototype.toJSON.apply(this, args);
                return {
                    ...baseJSON,
                    event: {
                        type: 'click',
                        action: 'redirect',
                        value: this.getAttributes().link || '',
                    }
                };
            }

        },
        view: {
            events: {
                click: 'handleClick'
            },

            handleClick() {
                const link = this.model.getAttributes().link;
                if (link) {
                    window.open(link, '_blank');
                }
            }
        }
    });

    // Registrar o tipo "spacer"
    editor.DomComponents.addType('spacer', {
        model: {
            defaults: {
                highlightable: true,
                selectable: true,
                name: 'Spacer',
                tagName: 'div',
                draggable: true,
                droppable: false,
                stylable: ['height', 'width', 'background-color'],
                attributes: { class: 'spacer' },
                styles: `height: 10px; width: 100%;`
            },
        },
        view: {},
    });

    editor.BlockManager.add('balm-Row', {
        label: 'balm-Row',
        category: 'Layout',
        content: [
            {
                "type": "balm-Row",
                "components": [
                    { type: 'balm-Cell' },
                    { type: 'balm-Cell' },
                    { type: 'balm-Cell' },
                    { type: 'balm-Cell' },
                ]
            }
        ],
    });


    editor.BlockManager.add('spacer-block', {
        label: 'Spacer',
        category: 'Layout',
        attributes: { class: 'gjs-fonts gjs-f-spacer' },
        content: {
            type: 'spacer',
        },
    });

}
