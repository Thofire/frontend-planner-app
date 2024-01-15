"use client"
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Button, Flexbox } from '@mui/material';
import { Editor, createEditor, Transforms, Element } from 'slate'
import withEmbeds from '../utils/withEmbeds';
import { Slate, Editable, withReact, useSlateStatic } from 'slate-react'
import YouTubeVid from '../utils/youtubeEmbed';
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
const DefaultElement = props => <p{...props.attributes}>{props.children}</p>




const Leaf = props => (
    <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
        {props.children}
    </span>
)

const embedRegexes = [
    {
        regex: /https:\/\/www\.youtube\.com\/watch\?v=(\w+)/,
        type: 'youtube',
    },
]


const CustomEditor = {
    handleEmbed(editor, event) {
        const text = event.clipboardData.getData('text/plain')

        embedRegexes.some(({ regex, type }) => {
            const match = text.match(regex)
            if (match) {
                event.preventDefault()

                const url = text
                const embed = { type, youtubeId: match[1], children: [{ text: url }] }
                Transforms.insertNodes(editor, embed)

                return true
            }
            return false
        })
    },
    handlePaste(editor, event) {

        console.log('onPaste', event.clipboardData.getData('text/plain'))
    },

    isBoldMarkActive(editor) {
        const marks = Editor.marks(editor)
        return marks ? marks.bold === true : false
    },
    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        })
        return !!match
    },
    isItalicsActive(editor) {
        const marks = Editor.marks(editor)
        return marks ? marks.italics === true : false
    },
    isStrikeThroughActive(editor) {
        const marks = Editor.marks(editor)
        return marks ? marks.strightThrough === true : false
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        if (isActive) {
            Editor.removeMark(editor, 'bold')
        }
        else {
            Editor.addMark(editor, 'bold', true)
        }
    },
    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'code' },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) },
        )
    },

    toggleItalicMark(editor) {
        const isActive = CustomEditor.isItalicsActive(editor)
        if (isActive) {
            Editor.removeMark(editor, 'italic')
        }
        else {
            Editor.addMark(editor, 'italic', true)
        }
    },

    toggleStrickthrough(editor) {
        const isActive = CustomEditor.isStrikeThroughActive(editor)
        if (isActive) {
            Editor.removeMark(editor, 'strikeThrough')
        }
        else {
            Editor.addMark(editor, 'strikeThrough', true)
        }
    },
}

const CustomImage = props => (
    <img {...props.attributes} src={props.element.url} alt="img" />
)


const NewPostPage = () => {
    const [editor] = useState(() => withEmbeds(withReact(createEditor())))

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            case 'image':
                return <CustomImage {...props} />
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
                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleBoldMark(editor)
                    }}
                >Bold
                </Button>
                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleCodeBlock(editor)
                    }}
                >Code
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleItalicMark(editor)
                    }}
                >Italic
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleUnderlineMark(editor)
                    }}
                >Underline
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleLinkMark(editor)
                    }}
                >Link
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleStrickthrough(editor)
                    }}
                >Strike Through
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleNListMark(editor)
                    }}
                >Numbered List
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleBulletsMark(editor)
                    }}
                >Bullets
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleItalicMark(editor)
                    }}
                >H1
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleItalicMark(editor)
                    }}
                >H2
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleItalicMark(editor)
                    }}
                >Image
                </Button>

                <Button variant='outlined'
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.log(editor.children)
                    }}
                >Save
                </Button>

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