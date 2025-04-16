import { Editor } from 'grapesjs';

export function HeaderComponent(editor: Editor) {
   
    editor.DomComponents.addType('header', {
        model: {
            defaults: {
                tagName: 'header',
                attributes: { class: 'custom-header' },
                components: [
                    {
                        type: 'link',
                        components: [
                            {
                                type: 'img',
                                attributes: {
                                    class: 'header-img',
                                    src: 'https://via.placeholder.com/50',
                                    alt: 'Logo esquerda'
                                }
                            },
                        ]
                    },
                    {
                        tagName: 'h1',
                        type: 'text',
                        content: 'Título',
                        attributes: { class: 'header-title' }
                    },
                    {
                        type: 'img',
                        attributes: {
                            class: 'header-img',
                            src: 'https://via.placeholder.com/50',
                            alt: 'Logo direita'
                        }
                    }
                ],
                styles: [
                    {
                        selectors: ['.custom-header'],
                        style: {
                            display: 'flex',
                            'justify-content': 'space-between',
                            'align-items': 'center',
                            padding: '20px 40px',
                            'background-color': '#003366',
                            'box-sizing': 'border-box',
                            'flex-wrap': 'wrap',
                            gap: '10px',
                            'box-shadow': '0 2px 0 black' // sombra só na parte inferior

                        }
                    },
                    {
                        selectors: ['.header-title'],
                        style: {
                            'font-size': '28px',
                            margin: '0',
                            color: '#ffffff',
                            'text-align': 'center',
                            'font-family': 'Arial, sans-serif',
                            'letter-spacing': '1px'
                        }
                    },
                    {
                        selectors: ['.header-img'],
                        style: {
                            width: '60px',
                            height: '60px',
                            'object-fit': 'contain',
                            'border-radius': '8px'
                        }
                    },
                    {
                        selectors: ['.header-center'],
                        style: {
                            'text-align': 'center',
                            flex: '1 1 100%',
                            display: 'flex',
                            'justify-content': 'center'
                        }
                    },
                    {
                        selectors: ['.header-column'],
                        style: {
                            display: 'flex',
                            'align-items': 'center'
                        }
                    }
                ]
            }
        }
    });

    editor.BlockManager.add('header', {
        label: 'Cabeçalho',
        category: 'Meus Componentes',
        attributes: { class: 'fa fa-window-maximize' },
        content: {
            type: 'header',
            components: [
                {
                    type: 'image',
                    attributes: {
                        class: 'header-img header-img-left',
                        src: 'https://www.zooplus.pt/magazine/wp-content/uploads/2021/03/kitten-sitzt-boden-768x512-1.jpeg',
                        alt: 'Logo esquerda'
                    }
                },
                {
                    type: 'text',
                    content: 'Título',
                    attributes: { class: 'header-title' }
                },
                {
                    type: 'image',
                    attributes: {
                        class: 'header-img header-img-right',
                        src: 'https://www.zooplus.pt/magazine/wp-content/uploads/2021/03/kitten-sitzt-boden-768x512-1.jpeg',
                        alt: 'Logo direita'
                    }
                }
            ]
        }
    });



}