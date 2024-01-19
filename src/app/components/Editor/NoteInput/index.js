import { useCallback } from "react"
import ImageEmbed from "../Elements/ImageEmbed";
import YouTubeVid from "../Elements/youtubeEmbed";
import DefaultElement from "../Elements/DefaultElement";
import Leaf from "../Leaf";
import CustomEditor from "@/app/utils/noteEditor/customEditor";
import { Editable } from "slate-react";

const NoteInput = (props) =>{
    const {editor } = props

    const CodeElement = props => (
        <pre {...props.attributes} style={{ backgroundColor: 'black', color: 'white' }}>
            <code>{props.children}</code>
        </pre>
    )

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
    )
}
export default NoteInput