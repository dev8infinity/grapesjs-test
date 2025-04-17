import { Editor } from 'grapesjs';

export function IconGridComponent(editor: Editor) {

    editor.DomComponents.addType('image', {
        model: {
            defaults: {
                tagName: 'img',
                attributes: { src: '', alt: '' },
                traits: [
                    {
                        type: 'custom-img-upload',
                        name: 'upload',
                        label: 'Upload de Imagem'
                    },
                    {
                        type: 'text',
                        name: 'src',
                        label: 'URL da Imagem',
                        placeholder: 'https://...'
                    },
                    // {
                    //   type: 'text',
                    //   name: 'link',
                    //   label: 'Link de Redirecionamento',
                    //   placeholder: 'https://...'
                    // }
                ],
                styles: [
                    {
                        selectors: ['img'],
                        style: {
                            width: '100%',
                            height: 'auto',
                            display: 'block'
                        }
                    }
                ]
            },


        },

    });
    editor.TraitManager.addType('custom-img-upload', {
        createInput({ trait }) {
            const el = document.createElement('input');
            el.type = 'file';
            el.accept = 'image/*';
            return el;
        },

        onEvent({ elInput, component }) {
            const file = elInput.files ? elInput.files[0] : null;
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    component.addAttributes({ src: reader.result });
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // ----------------------------------------------------------------------------
    // 1) COMPONENTE icon-item
    // ----------------------------------------------------------------------------
    editor.DomComponents.addType('icon-text', {
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
    // console.log(editor.DomComponents.getTypes())



    // ----------------------------------------------------------------------------
    // 3) COMPONENTE icon-grid
    // ----------------------------------------------------------------------------
    editor.DomComponents.addType('icon-grid', {
        model: {
            defaults: {
                tagName: 'div',
                attributes: { class: 'icon-grid' },
                droppable: '.icon-text',
                components: [],
                styles: [
                    {
                        selectors: ['.icon-grid'],
                        style: {
                            width: '75%',
                            display: 'grid', // or 'flex' or 'block'
                            'grid-template-columns': 'repeat(3, 1fr)', // or based on trait
                            'background-color': '#e5e5e5',
                            padding: '20px',
                            'box-sizing': 'border-box',
                            margin: '20px auto',
                            'border-radius': '8px',
                            'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
                            'align-items': 'start',  // ensures columns stretch only as needed
                            height: 'auto', // this is key
                            overflow: 'visible' // allow content to overflow naturally
                        }
                    }
                ],
                traits: [
                    {
                        type: 'number',
                        name: 'childCount',
                        label: 'Número de itens',
                        changeProp: true
                    },
                    {
                        type: 'number',
                        name: 'columns',
                        label: 'Número de itens por linha',
                        changeProp: true
                    },
                ],
                columns: '3',
                childCount: '6',
            },
            init() {
                this.on('change:columns', this.updateColumns);
                this.on('change:childCount', this.updateChildCount);
            },

            updateColumns() {
                const cols = this.get('columns');
                this.setStyle({
                    'grid-template-columns': `repeat(${Number(cols) > 0 ? cols : '1'}, 1fr)`,
                });
            },

            updateChildCount() {
                const childCount = Number(this.get('childCount') || 1);
                const components = this.get('components');
                if (!components) {
                    return;
                }
                if (childCount < components.length) {
                    while (components.length > childCount) {
                        components.pop();
                    }
                } else if (childCount > components.length) {
                    const diff = childCount - components.length;
                    for (let i = 0; i < diff; i++) {
                        this.append({
                            type: 'icon-text',
                            content: 'Texto',
                            attributes: { class: 'icon-text' },
                        });
                    }

                }
            }


        },
    });

  

    editor.BlockManager.add('icon-text', {
        label: 'Ícone + Texto',
        category: 'Meus Componentes',
        attributes: { class: 'fa fa-square' },
        content: {
            type: 'icon-text',
            title: 'Painel',
            icon: '/default-icon.svg',
            link: ''
        }
    });


    editor.BlockManager.add('icon-grid', {
        label: 'Icon Grid',
        category: 'Meus Componentes',
        attributes: { class: 'fa fa-th' },
        content: {
            type: 'icon-grid',
            components: [
                { type: 'icon-text', link: '', content: 'Painel' },
                { type: 'icon-text', link: '', title: 'Premiados' },
                { type: 'icon-text', link: '', title: 'Histórico' },
                { type: 'icon-text', link: '', title: 'Clubes' },
                { type: 'icon-text', link: '', title: 'Top 5' },
                { type: 'icon-text', link: '', title: 'Top 5' },

            ],
        },
    });



}