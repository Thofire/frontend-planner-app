"use client"
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Button, Flexbox } from '@mui/material';
import { Editor, createEditor, Transforms, Element } from 'slate'
import { Slate, Editable, withReact, useSlateStatic } from 'slate-react'
import withEmbeds from '../utils/noteEditor/withEmbeds';
import YouTubeVid from '../utils/noteEditor/youtubeEmbed';
import DefaultElement from './Editor/DefaultElement';
import Leaf from './Editor/Leaf';
import ImageEmbed from '../utils/noteEditor/ImageEmbed';
import CustomEditor from '../utils/noteEditor/customEditor';
import ToolBarEditor from './Editor/ToolBarEditor';
const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

const CodeElement = props => (
    <pre {...props.attributes} style={{ backgroundColor: 'black', color: 'white' }}>
        <code>{props.children}</code>
    </pre>
)

const NewPostPage = () => {
    const [editor] = useState(() => withEmbeds(withReact(createEditor())))

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            case 'image':
                return <ImageEmbed {...props} />
            case 'youtube':
                return <YouTubeVid {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    return (
        <div>
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
                <ToolBarEditor>
                </ToolBarEditor>
                <Editable
                    onChange={(value) => {
                        console.log('onChange', value)
                    }}
                    onKeyDown={(event) => {
                        if (!event.ctrlKey) {
                            return
                        }

                        switch (event.key) {
                            case '`': {
                                event.preventDefault()
                                CustomEditor.toggleCodeBlock(editor)
                                break
                            }

                            case 'b': {
                                event.preventDefault()
                                CustomEditor.toggleBoldMark(editor)
                                break
                            }
                            case 'i': {
                                event.preventDefault()
                                CustomEditor.toggleItalicMark(editor)
                                break
                            }
                            case '-': {
                                event.preventDefault()
                                CustomEditor.toggleStrickthrough(editor)
                                break
                            }
                        }
                    }
                    }
                    onPaste={(event) => {
                        CustomEditor.handlePaste(editor, event)
                    }}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            </Slate>
        </div>
    )
}
export default NewPostPage