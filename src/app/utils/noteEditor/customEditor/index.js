import { Editor, Transforms, Element } from 'slate'
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

                if (type === 'youtube') {
                    Transforms.insertNodes(editor,
                        [
                            {
                                children: [{ text: '' }],
                                type,
                                youtubeId: match[1],
                            },
                            {
                                children: [{ text: '' }],
                                type: 'paragraph',
                            }
                        ])
                    return true
                }
            }
            return false
        })
    },
    getMarks() {

    },
    handlePaste(editor, event) {

        CustomEditor.handleEmbed(editor, event)
        console.log('onPaste', event.clipboardData.getData('text/plain'))
    },

    isMarkActive(editor, format) {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        })
        return !!match
    },
    isStrikeThroughActive(editor) {
        const marks = Editor.marks(editor)
        return marks ? marks.strightThrough === true : false
    },
    toggleBoldMark(editor) {
        const isActive = CustomEditor.isMarkActive(editor, 'bold')
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
        const isActive = CustomEditor.isMarkActive(editor, 'italic')
        if (isActive) {
            Editor.removeMark(editor, 'italic')
        }
        else {
            Editor.addMark(editor, 'italic', true)
        }
    },
    toggleMark(editor, type) {
        const isActive = CustomEditor.isMarkActive(editor, type)
        if (isActive) {
          Editor.removeMark(editor, type)
        } else {
          Editor.addMark(editor, type, true)
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