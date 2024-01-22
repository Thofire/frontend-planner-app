const Leaf = props => (
    <span
        {...props.attributes}
        style={{ 
            fontWeight: props.leaf.bold ? 'bold' : 'normal',
            fontStyle: props.leaf.italic ? 'italic' : 'normal',
            textDecorationLine: props.leaf.underline ? 'underline' : 'normal',
        }}
    >
        {props.children}
    </span>
)
export default Leaf