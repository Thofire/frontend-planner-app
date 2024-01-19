import { Slate, withReact } from "slate-react"
import { createEditor } from "slate"
import withEmbeds from "./Elements/withEmbeds"
import NoteInput from "./NoteInput"
import ToolBarEditor from "./ToolBarEditor"
import React,{ useState } from "react"


const Editor = (props) => {
    const {children,initialValue} = props
    const [editor] = useState(() => withEmbeds(withReact(createEditor())))
    return (
        <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={value => {
                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )

                if (isAstChange) {
                    // Save the value to Local Storage.
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }
            }}
        >
            {React.Children.map(children,child=> React.cloneElement(child,{ editor }))}
        </Slate>
    )
}

Editor.NoteInput = NoteInput
Editor.ToolBarEditor = ToolBarEditor
export default Editor