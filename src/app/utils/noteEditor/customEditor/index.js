import { Editor, Transforms, Element as SlateElement } from 'slate'

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

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

    handlePaste(editor, event) {

        CustomEditor.handleEmbed(editor, event)
        console.log('onPaste', event.clipboardData.getData('text/plain'))
    },

    isBlockActive(editor, format, blockType = 'type') {
        const { selection } = editor
        if (!selection) return false

        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n[blockType] === format,
            })
        )
        return !!match
    },

    toggleBlock(editor, format) {
        const isActive = CustomEditor.isBlockActive(
            editor,
            format,
            TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
        )
        const isList = LIST_TYPES.includes(format)

        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                LIST_TYPES.includes(n.type) &&
                !TEXT_ALIGN_TYPES.includes(format),
            split: true,
        })
        let newProperties
        if (TEXT_ALIGN_TYPES.includes(format)) {
            newProperties = {
                align: isActive ? undefined : format,
            }
        } else {
            newProperties = {
                type: isActive ? 'paragraph' : isList ? 'list-item' : format,
            }
        }
        Transforms.setNodes(editor, newProperties)

        if (!isActive && isList) {
            const block = { type: format, children: [] }
            Transforms.wrapNodes(editor, block)
        }
    },
    
    isMarkActive(editor, format) {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    },

    toggleMark(editor, type) {
        const isActive = CustomEditor.isMarkActive(editor, type)
        if (isActive) {
            Editor.removeMark(editor, type)
        } else {
            Editor.addMark(editor, type, true)
        }
    },
}
export default CustomEditor