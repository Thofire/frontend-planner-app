import * as React from 'react';
import { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import{ createEditor} from 'slate'

import { Slate, Editable, withReact, DefaultElement} from 'slate-react'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const CodeElement = props => (
    <pre {...props.attributes} style={{ backgroundColor: 'black', color: 'white'}}>
        <code>{props.children}</code>
    </pre>
)

const NewPostPage = () => {
    const [editor] = useState(() => withReact(createEditor()))

    const renderElement = useCallback ((props) => {
        switch (props.element.type){
            case 'code':
                return <CodeElement {...props}/>
            default:
                return<DefaultElement {...props}/>
            }
        },[])
        
    return (
        <div>
            New Post
        </div>
    )
}

export default NewPostPage