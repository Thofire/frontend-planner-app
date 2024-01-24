"use client"
import * as React from 'react';
import { useState } from 'react';
import {  createEditor} from 'slate'
import { Slate,  withReact,  } from 'slate-react'
import withEmbeds from './Editor/Elements/withEmbeds'
import Editor from './Editor';
const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]
const NewPostPage = () => {
    const [editor] = useState(() => withEmbeds(withReact(createEditor())))
    return (
        <div>
            <Editor initialValue ={initialValue}>
                <Editor.ToolBarEditor/>
                <Editor.NoteInput/>
            </Editor>
        </div>
    )
}
export default NewPostPage