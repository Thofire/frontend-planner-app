'use client';
import { Slate, withReact } from "slate-react"
import { createEditor } from "slate"
import withEmbeds from "./Elements/withEmbeds"
import NoteInput from "./NoteInput"
import ToolBarEditor from "./ToolBarEditor"
import React, { useState, useMemo, useEffect } from "react"
//import api for backend, call User.CurrentStorage from mongodb and thne pass it through, update isAstChange 



const Editor = (props) => {
    const { children} = props
    const [editor] = useState(() => withEmbeds(withReact(createEditor())))
    const initialValue = [{
                type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }],  //Call Mongodb and store
            },
            ]
    // const initialValue = useMemo(() =>
    //     useEffect(() =>{
    //         if (JSON.parse(window.localStorage.getItem('content'))!=null){
    //     JSON.parse(window.localStorage.getItem('content'))
    //         }
    //     else [{
    //         type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }],  //Call Mongodb and store
    //     },
    //     ],
    //     []},[]))
    // useEffect(() => {
    //     const
    // }

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
                    useEffect(() => {
                    const content = JSON.stringify(value)
                    window.localStorage.setItem('content', content)    //change to mongodb
                    },[]);
                }
            }}
        >
            {React.Children.map(children, child => React.cloneElement(child, { editor }))}
        </Slate>
    )
}

Editor.NoteInput = NoteInput
Editor.ToolBarEditor = ToolBarEditor
export default Editor