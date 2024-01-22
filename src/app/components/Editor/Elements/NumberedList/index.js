const NumberedList = (props) => {

    const { attributes, children, element } = props
    return (
        <li className='list-decimal' textAlign ={element.align} {...attributes}>
            {children}
        </li>
    )
}

export default NumberedList