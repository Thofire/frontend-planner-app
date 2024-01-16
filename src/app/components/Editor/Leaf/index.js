const Leaf = props => (
    <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
        {props.children}
    </span>
)
export default Leaf