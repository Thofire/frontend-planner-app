import { useCallback } from "react"
import ImageEmbed from "../Elements/ImageEmbed";
import YouTubeVid from "../Elements/youtubeEmbed";
import DefaultElement from "../Elements/DefaultElement";
import Leaf from "../Leaf";
import CustomEditor from "@/app/utils/noteEditor/customEditor";
import { Editable } from "slate-react";
import HeadingOne from "../Elements/HeadingOne";
import HeadingTwo from "../Elements/HeadingTwo";
import NumberedList from "../Elements/NumberedList";
import Bullets from "../Elements/Bullets";
import Link from "../Elements/Link";
const NoteInput = (props) =>{
    const {editor } = props

    const CodeElement = props => (
        <pre {...props.attributes} style={{ backgroundColor: 'black', color: 'white' }}>
            <code>{props.children}</code>
        </pre>
    )

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'bullets':
                return <Bullets {...props} />
            case 'code':
                return <CodeElement {...props} />
            case 'link':
                return <Link {...props} />
            case 'image':
                return <ImageEmbed {...props} />
            case 'youtube':
                return <YouTubeVid {...props} />
            case 'heading-one':
                return <HeadingOne {...props} />
            case 'heading-two':
                return <HeadingTwo {...props} />
            case 'numbered-list':
                return <NumberedList {...props} />
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
                    CustomEditor.toggleBlock(editor,'code')
                    break
                }

                case 'b': {
                    event.preventDefault()
                    CustomEditor.toggleMark(editor,'bold')
                    break
                }
                case 'i': {
                    event.preventDefault()
                    CustomEditor.toggleMark(editor,'italic')
                    break
                }
                case '-': {
                    event.preventDefault()
                    CustomEditor.toggleStrickthrough(editor)
                    break
                }
                case 'u': {
                    event.preventDefault()
                    CustomEditor.toggleBlock(editor,'underline')
                    break
                }
                case 'h':{
                    event.preventDefault()
                    CustomEditor.toggleBlock(editor,'heading-one')
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