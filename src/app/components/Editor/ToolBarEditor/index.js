import { Box, Button, flex } from "@mui/material";
import CustomEditor from "@/app/utils/noteEditor/customEditor";
import MarkButton from "./MarkButton";
import BlockButton from "./BlockButton";

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import CodeIcon from '@mui/icons-material/Code';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CircleIcon from '@mui/icons-material/Circle';
const ToolBarEditor = (props) => {
    const { editor } = props
    return (

        <Box sx={{ display: flex }}>
            <MarkButton format='bold'><FormatBoldIcon /></MarkButton>
            <MarkButton format='italic'><FormatItalicIcon /></MarkButton>
            <BlockButton format='heading-one'>H1</BlockButton>
            <BlockButton format='heading-two'>H2</BlockButton>
            <MarkButton format='underline'><FormatUnderlinedIcon/></MarkButton>
            <Button variant='outlined'
                onMouseDown={(event) => {
                    event.preventDefault()
                    CustomEditor.toggleLinkMark(editor)         //fix
                }}
            >Link
            </Button>
            <BlockButton format='link'><AddLinkIcon/></BlockButton>
            <BlockButton format='numbered-list'>123</BlockButton>
            <BlockButton format='bullets'><CircleIcon/></BlockButton>
            <BlockButton format='code'><CodeIcon /></BlockButton>
            <Button variant='outlined'
                onMouseDown={(event) => {
                    event.preventDefault()
                    CustomEditor.log(editor.children)         //fix
                }}
            >Save
            </Button>
        </Box>

    )
}
export default ToolBarEditor