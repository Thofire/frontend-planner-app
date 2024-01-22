import { Button } from "@mui/material";
import { useSlate } from "slate-react";
import CustomEditor from "@/app/utils/noteEditor/customEditor";



const BlockButton = (props) => {
    const { format, children } = props
    const  editor = useSlate()


    return (
        <Button variant='outlined' startIcon={children}
            onMouseDown={(event) => {
                event.preventDefault()
                CustomEditor.toggleBlock(editor, format)
            }}
        />
    )
}
export default BlockButton