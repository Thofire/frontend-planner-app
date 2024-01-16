import { Box, Button, flex } from "@mui/material";
import CustomEditor from "@/app/utils/noteEditor/customEditor";
import { Editor } from "slate";

const ToolBarEditor = (editor) => {
    return (
        <Box sx={{ display: flex }}>
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
            >StrikeThrough
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
                    CustomEditor.toggleH1Mark(editor)
                }}
            >H1
            </Button>

            <Button variant='outlined'
                onMouseDown={(event) => {
                    event.preventDefault()
                    CustomEditor.toggleH2Mark(editor)
                }}
            >H2
            </Button>

            <Button variant='outlined'
                onMouseDown={(event) => {
                    event.preventDefault()
                    CustomEditor.toggleImageMark(editor)
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
        </Box>

    )
}
export default ToolBarEditor