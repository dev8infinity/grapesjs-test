import { Editor, Trait    } from 'grapesjs';

export default function CardComponent(editor: Editor) {

    // editor.DomComponents.addType('cia-card', {
    //     model: {
    //         defaults: {
    //             tagName: 'div',
    //             classes: ['custom-card'],
    //             draggable: true,
    //             droppable: false,
    //             components: [
    //                 {
    //                     tagName: 'img',
    //                     attributes: { src: 'https://via.placeholder.com/300x180' },
    //                     style: { width: '100%', height: 'auto', 'border-radius': '8px' },
    //                 },
    //                 {
    //                     tagName: 'h3',
    //                     content: 'Card Title',
    //                     style: { 'margin-top': '10px', 'font-size': '18px', 'font-weight': 'bold' },
    //                 },
    //                 {
    //                     tagName: 'p',
    //                     content: 'This is the card description.',
    //                     style: { 'font-size': '14px', color: '#666' },
    //                 },
    //                 {
    //                     tagName: 'button',
    //                     content: 'Learn More',
    //                     style: {
    //                         padding: '8px 16px',
    //                         'background-color': '#007bff',
    //                         color: '#fff',
    //                         border: 'none',
    //                         'border-radius': '4px',
    //                         cursor: 'pointer',
    //                         margin: '10px 0 0',
    //                     },
    //                 },
    //             ],
    //             styles: [
    //                 {
    //                     selectors: ['.custom-card'],
    //                     style: {
    //                         'max-width': '300px',
    //                         padding: '16px',
    //                         'border-radius': '10px',
    //                         border: '1px solid #ddd',
    //                         'box-shadow': '0 2px 5px rgba(0,0,0,0.1)',
    //                         'text-align': 'left',
    //                     },
    //                 }
    //             ]
    //         },
    //     }
    // });

    editor.TraitManager.addType('select-with-add', {
      createInput({ trait }) {
        const el = document.createElement('div');
    
        const select = document.createElement('select');
        select.style.marginRight = '8px';
    
        const fixedInput = document.createElement('input');
        fixedInput.type = 'text';
        fixedInput.placeholder = 'Enter fixed value';
        fixedInput.style.marginTop = '8px';
        fixedInput.style.display = 'none';
    
        const container = document.createElement('div');
        container.appendChild(select);
        container.appendChild(fixedInput);
    
        const options = trait.get('options') || [];
        options.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.name || opt.value;
          select.appendChild(option);
        });
    
        const updateTraitValue = () => {
          const selected = select.value;
          const fixedValue = fixedInput.value;
          const value = selected === 'fixed' ? fixedValue : selected;
    
          const attrName = trait.get('name');
          if (trait.get('changeProp')) {
            this.target.set(attrName, value);
          } else {
            const attrs = { ...this.target.getAttributes() };
            attrs[attrName] = value;
            this.target.setAttributes(attrs);
          }
        };
    
        select.addEventListener('change', () => {
          const selected = select.value;
          fixedInput.style.display = selected === 'fixed' ? 'block' : 'none';
          updateTraitValue();
        });
    
        fixedInput.addEventListener('input', updateTraitValue);
    
        this.selectEl = select;
        this.fixedEl = fixedInput;
        return container;
      },
    
      onEvent({ component, trait }) {
        // No-op: handled manually by input listeners
      },
      onUpdate({ component, trait }) {
        const selected = this.selectEl?.value;
  
        if (this.fixedEl) {
          this.fixedEl.style.display = selected === 'fixed' ? 'block' : 'none';
          if (selected === 'fixed' && !this.fixedEl.value) {
            this.fixedEl.value = component.attributes.content;
          }
        }
      },      
      getValue() {
        const selected = this.selectEl.value;
        return selected === 'fixed'
          ? { type: 'fixed', value: this.fixedEl.value }
          : selected;
      },
    
      setValue(value) {
        this.selectEl.value = value;
        const isFixed = value === 'fixed';
        this.fixedEl.style.display = isFixed ? 'block' : 'none';
        this.fixedEl.value = isFixed ? this.fixedEl.value : '';
      }
    });
    
    editor.DomComponents.addType('cia-title', {
      model: {
        defaults: {
          tagName: 'h3',
          content: 'Card Title',
          extend: 'text',
          style: {
            'font-size': '24px',
            'font-weight': 'bold',
            margin: '0 0 8px 0'
          },
          traits: [
            {
              name: 'content',
              label: 'Conteúdo',
              changeProp: true,
            },
            {
              type: 'color',  
              name: 'color', 
              label: 'Cor do texto',  
              changeProp: true,  
            }
          ]
        },
        init(){
          this.on('change:color', this.handleColorChange);
        },
        handleColorChange() {
          const color = this.get('color') || "#666";
          this.addStyle({ 'color': color });
        },
      }
    });

    editor.DomComponents.addType('cia-description', {
      model: {
        defaults: {
          tagName: 'p',
          content: 'This is the description of the card.',
          style: {
            'font-size': '18px',
            color: '#666',
            margin: '0'
          },
          traits: [
            {
              name: 'content',
              label: 'Conteúdo',
              changeProp: true,
            },
            {
              type: 'color',  
              name: 'color', 
              label: 'Cor do texto',  
              changeProp: true,  
            }
          ]
        },
        init(){
          this.on('change:color', this.handleColorChange);
        },
        handleColorChange() {
          const color = this.get('color') || "#666";
          this.addStyle({ 'color': color });
        },
      }
    });
    
    
    

    
    editor.DomComponents.addType('cia-card', {
      model: {
        defaults: {
          tagName: 'a',
          classes: ['custom-card'],
          draggable: true,
          droppable: true,
          traits: [
            {
              type: 'text',
              name: 'href',
              label: 'Link',
              placeholder: 'https://...',
            },
            {
              type: 'color',  // Adding the color picker trait for background color
              name: 'background-color',  // The name of the trait
              label: 'Cor de fundo',  // Label displayed next to the trait
              changeProp: true,  // Ensures that the trait updates the component property
            }
          ],
          href: '#',
          attributes: { href: '#', },
          components: [
            {
              type: 'cia-title',
              content: 'Titulo do card',
            },
            {
              type: 'cia-description',
              content: 'Esta é a descrição 1 do card',
            },
            {
              type: 'cia-description',
              content: 'Esta é a descrição 2 do card',
            }
          ],
          styles: [
            {
              selectors: ['.custom-card'],
              style: {
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'center',
                padding: '16px',
                border: '1px solid #ddd',
                'border-radius': '10px',
                'box-shadow': '0 2px 5px rgba(0,0,0,0.1)',
                'background-color': '#fff',
                'max-width': '100%',
                'text-decoration': 'none',
                color: 'inherit'
              },
            }
          ]
        },
        init(){
          this.listenTo(this.components(), 'add', this.onNewChildAdded);
          this.on('change:attributes:background-color', this.handleBackGroundColorChange);
        },
        handleBackGroundColorChange() {
          const attributes = this.get('attributes') || {};
          this.addStyle({ 'background-color': attributes["background-color"] });
        },
    
        onNewChildAdded(child){
          const options = this.getPlaceholdersOptions();
          if(options.length > 1) {
            this.updateTextTraits(child, options);
          }
        },
        /**
        * Função chamada pelo componente pai
        */
        onPlaceholdersReplaced(newPlaceholders: string[] = []) {
          this.updatePlaceholders(newPlaceholders, true);
          this.updateAllChildTraits();
        },
        updatePlaceholders(placeholders: string[] = [], replace = false) {
          let itens = this.get('placeholders') || [];
          
          if(replace) {
            itens = placeholders;
          }else {
            itens.concat(placeholders);
          }

          this.set('attributes', {
            ...this.get('attributes'),
            placeholders: JSON.stringify(itens)
          });
          this.set('placeholders', itens)
        },
        getPlaceholdersOptions() {
          const placeholders = this.get('placeholders') || [];
          const options = placeholders.map(v => {
            return { value: `{{${v}}}`, name: v };
          });
          options.unshift({ value: 'fixed', name: 'Fixo' });
          return options;
        },
        updateAllChildTraits() {
          const options = this.getPlaceholdersOptions();
          this.forEachChild((child) => this.updateTextTraits(child, options));
          this.updateTextTraits(this, options)
        },
        updateTextTraits(element, options) {
          const traits = element.get('traits') || { models: [] };
          const updatedTraits = traits.models.map(trait => {
            if (trait.get('type') === 'text') {
              return {
                ...trait.attributes,
                type: 'select-with-add',
                options,
              };
            }
            return trait;
          });
        
          element.set('traits', updatedTraits);
        },
      }
    });
    
    const categorySource = { id: 'source', label: 'Configurações da fonte' };
    const categoryExtra = { id: 'extra', label: 'Configuração adicional', open: false };
    editor.DomComponents.addType('cia-card-list', {
        model: {
            defaults: {
            tagName: 'div',
            classes: ['cia-card-list'],
            droppable: (el) => el?.get('type') === 'cia-card',
            draggable: true,
            traits: [
              {
                type: 'select',
                name: 'dataSourceType',
                label: 'Tipo da fonte',
                options: [
                  { value: 'REST', name: 'API REST', id: 'REST' },
                  { value: 'json', name: 'JSON fixo', id: 'json' },
                  { value: 'BALM', name: 'Integração BALM', id: 'BALM' },
                  { value: 'SOAP', name: 'SOAP', id: 'SOAP' },
                ],
                default: 'REST',
                category: categorySource
              },
              {
                type: 'text',
                name: 'dataSourceUrl',
                label: 'URL da Fonte de dados',
                placeholder: 'https://...',
                category: categorySource
              },
              {
                type: 'text',
                name: 'dataSourceJSON',
                label: 'JSON Fonte',
                placeholder: '[{"title": "x"}]',
                category: categorySource
              },
              {
                type: 'select',
                name: 'JSONPath',
                label: 'Gerar itens a partir do campo',
                options: [],
                category: categoryExtra
              },
              {
                type: 'select',
                name: 'restMethod',
                label: 'Método REST',
                options: [
                  { value: 'GET', name: 'GET', id: 'GET' },
                  { value: 'POST', name: 'POST', id: 'POST' },
                ],
                default: 'GET',
                category: categorySource
              }
            ],
            components: [
              {type: "cia-card"}
            ],
            styles: [
                {
                selectors: ['.cia-card-list'],
                style: {
                    display: 'flex',
                    'flex-direction': 'column', 
                    gap: '20px',
                    padding: '20px',
                },
                }
              ],
              // 'script-props': ['dataSourceUrl', 'JSONPath'],
              script: function() {

                const dataSourceUrl = this.attributes.dataSourceUrl?.value;
                const card = this.querySelector('.custom-card');
                if(!card.attributes.placeholders?.value) {
                  return;
                }
                const placeholders = JSON.parse(card.attributes.placeholders?.value);
                if(!placeholders || !Array.isArray(placeholders) || !card || !dataSourceUrl) {
                  return;
                }

                fetch(dataSourceUrl)
                  .then(response => response.json())
                  .then(data => {
                    this.removeChild(card);
                    if(data.length === 0) {
                      return;
                    }
                 
                    data.forEach(item => {
                      const clonedCard = card.cloneNode(true);
                      placeholders.forEach(k => replaceTemplate(clonedCard, k, item[k]));
                      this.appendChild(clonedCard);
                    });
                    
                  })
                  .catch(error => console.error('Error fetching data:', error));

       
                
                function replaceTemplate(element, placeholder, replacement = '') {
                  if (element.nodeType === Node.TEXT_NODE) {
                    element.textContent = element.textContent.replaceAll(`{{${placeholder}}}`, replacement);
                  }
                
                  if (element.nodeType === Node.ELEMENT_NODE) {
                    Array.from(element.attributes).forEach((attr: any) => {
                      if (attr.value.includes(`{{${placeholder}}}`)) {
                        attr.value = attr.value.replaceAll(`{{${placeholder}}}`, replacement);
                      }
                    });
                  }
                
                  if (element.hasChildNodes()) {
                    element.childNodes.forEach(child => replaceTemplate(child, placeholder, replacement));
                  }
                }
                
              }
            },
            toJSON(...args){
              const { model: defaultModel } = editor.DomComponents.getType('default');
              const baseJSON = defaultModel.prototype.toJSON.apply(this, args);
              const { attributes } = this.attributes;
              if(attributes?.dataSourceType) {
                baseJSON.dataSource = {
                  type: attributes.dataSourceType,
                  data: attributes.dataSourceType == "json" ? 
                    JSON.parse(attributes?.dataSourceJSON || '[]') : 
                    attributes?.dataSourceUrl,
                  JSONPath: attributes?.JSONPath || '',
                  restMethod: attributes?.restMethod || '',
                };
              }
              return baseJSON;
            },
            init() {
              this.on( 
                'change:attributes:dataSourceUrl change:attributes:dataSourceType change:attributes:JSONPath change:attributes:restMethod change:attributes:dataSourceJSON', 
                this.fetchData
              );
              this.on('change:attributes:dataSourceType', this.toggleTraitsByDataSourceType);
              
              this.fetchData();
              this.toggleTraitsByDataSourceType();
            },
            toggleTraitsByDataSourceType() {
              const type = this.get('attributes')?.dataSourceType;
              const traits = this.get('traits') || { models: [] };
            
              // Remove traits dinâmicas
              const baseTraits = traits.models.filter(t =>
                !['restMethod', 'dataSourceJSON', 'dataSourceUrl', 'JSONPath'].includes(t.get('name') || '')
              );
            
              // Traits fixas no grupo "source"
              if (type !== 'json') {
                baseTraits.push({
                  type: 'text',
                  name: 'dataSourceUrl',
                  label: 'URL da Fonte de dados',
                  placeholder: 'https://...',
                  category: categorySource
                });
              }
            
              if (type === 'REST') {
                baseTraits.push({
                  type: 'select',
                  name: 'restMethod',
                  label: 'Método REST',
                  options: [
                    { value: 'GET', name: 'GET' },
                    { value: 'POST', name: 'POST' }
                  ],
                  default: 'GET',
                  category: categorySource
                });
              }
            
              if (type === 'json') {
                baseTraits.push({
                  type: 'text',
                  name: 'dataSourceJSON',
                  label: 'JSON Fonte',
                  placeholder: '[{"title": "x"}]',
                  category: categorySource
                });
              }
            
              // Sempre adiciona JSONPath no grupo extra
              baseTraits.push({
                type: 'select',
                name: 'JSONPath',
                label: 'Gerar itens a partir do campo',
                options: [],
                
                category: categoryExtra
              });
            
              this.set('traits', baseTraits);
            },
            updateTraitJSONPath(obj = {}) {
              const traits = this.get('traits') || { models: [] };
              const updatedTraits = traits.models.filter(trait => 
                trait.get('name') != 'JSONPath'
              );

              updatedTraits.push( {
                type: 'select',
                name: 'JSONPath',
                label: 'Gerar cards a partir do campo',
                options: obj.map(k => {
                  return  { value: `{{$.${k}}}`, name: k, id: k, category: categoryExtra };
                }),
              });
            
              this.set('traits', updatedTraits);
            },
        
            fetchData() {
              const type = this.get('attributes')?.dataSourceType;
              const dataSourceUrl = this.get('attributes')?.dataSourceUrl;
              const dataSourceJSON = this.get('attributes')?.dataSourceJSON;

              let runned = false;
              if (dataSourceUrl && type == "REST") {
                runned = true;
        
                fetch(dataSourceUrl)
                  .then(response => response.json())
                  .then(data => { 
                    this.updatePlaceHolders(data);
                  })
                  .catch(error => console.error('Error fetching data:', error));
              } 
              if(dataSourceJSON && type === "json") {
                console.log("json")
                runned = true;
                let json = null;
                try{
                  json = JSON.parse(dataSourceJSON);
                }catch(e) {
                  console.warn("Error while attempting to parse dataSourceJSON", e);
                  return;
                }
                console.log("parsed json")

                if(json) {
                  this.updatePlaceHolders(json);
                }
              }

              if(runned) {
                this.set('droppable', false);
              } else {
                this.set('droppable', (el) => el?.get('type') === 'cia-card');
              }
            },
            updatePlaceHolders(data) {
              console.log("updating placeholders...", data)

              if (data.length === 0) return;
              const components = this.components();
              const cards = components.filter(c => c.get('type') === 'cia-card');

              if (cards.length > 1) {
                for (let i = 1; i < cards.length; i++) {
                  components.remove(cards[i]);
                }
              }else if(cards.length === 0) {
                components.add({type: 'cia-card'});
              }     
              const cardComponent = this.components().find(v => v.get('type') === 'cia-card');
              
              if (cardComponent?.onPlaceholdersReplaced) {
                //the KEYS are the referenced object properties
                const keys = Object.keys(
                  Array.isArray(data) ? data[0] :
                  (data || [])
                );
 
                cardComponent.onPlaceholdersReplaced(keys);
                this.updateTraitJSONPath(keys);
              } else {
                console.warn('Card component not found or missing onPlaceholdersReplaced method');
              }
            },
        }
    });
    

    editor.BlockManager.add('cia-card', {
        label: 'cia-card',
        category: 'BALM',
        attributes: { class: 'fa fa-object-group' },
        content: { type: 'cia-card' },
    });

    editor.BlockManager.add('cia-card-list', {
        label: 'Card List',
        category: 'BALM',
        attributes: { class: 'fa fa-object-group' },
        content: { type: 'cia-card-list' },
    });

}