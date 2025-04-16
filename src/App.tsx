import grapesjs, { Editor } from 'grapesjs';
import GjsEditor, { WithEditor } from '@grapesjs/react';
import { IconGridComponent, FormComponent, HeaderComponent, TestComponent} from './components';
import { Form } from './implementation/Form';


export default function DefaultEditor() {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <GjsEditor
      grapesjs={grapesjs}
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      onEditor={onEditor}
      options={{
        height: '100vh',
        width: '100%',
        storageManager: true,
        // selectorManager: {
        //  componentFirst: false
        // },
        plugins: [
          // IconGridComponent, 
          // HeaderComponent, 
          FormComponent, 
          TestComponent,
          // Form,
        ]
      }}
    >
      {/* Render ImageComponent only after the editor is loaded */}
      
      {/* <WithEditor> */}
        {/* <IconGridComponent /> */}
      {/* </WithEditor> */}

    </GjsEditor>
  );
}
