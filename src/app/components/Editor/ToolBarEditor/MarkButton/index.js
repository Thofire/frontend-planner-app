import { Box, Button, flex } from "@mui/material";
import { useSlate } from "slate-react";

import CustomEditor from "@/app/utils/noteEditor/customEditor";



const MarkButton = (props) => {
    const { format, children } = props
    const  editor = useSlate()


    return (
        <Button variant='outlined'
            onMouseDown={(event) => {
                event.preventDefault()
                CustomEditor.toggleMark(editor,format )
            }}
        >
        {children}
        </Button>
    )
}

export default MarkButton