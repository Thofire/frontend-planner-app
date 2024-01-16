import asyncSome from "../asyncSome"
import { Editor, Transforms, Element} from 'slate'

const embedRegexes = [
    {
        regex: /https:\/\/www\.youtube\.com\/watch\?v=(\w+)/,
        type: 'youtube',
    },
]


const CustomEditor = {
    handleEmbed: async (editor, event, client) => {
        const text = event.clipboardData.getData('text/plain')

        const matchItem = await asyncSome(embedRegexes, async ({ regex, type }) => {
            const match = text.match(regex)
            if (!match) return false

            if (match) {
                event.preventDefault()

                if (type === 'youtube'){
                Transforms.insertNodes(editor,
                    [
                        {
                            children: [{text: ''}],
                            type,
                            youtubeId: match[1],
                        },
                        {
                            children:[{text: ''}],
                            type:'paragraph',
                        }
                    ])
                return true
            }
        }
        })
    },
    handlePaste(editor, event) {

        CustomEditor.handleEmbed(editor,event)
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
        return marks ? marks.italic === true : false
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
export default CustomEditor