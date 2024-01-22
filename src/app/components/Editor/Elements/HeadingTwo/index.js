const HeadingTwo = (props) => {

    const { attributes, children, element } = props
    return (
        <h1 className='text-2xl' textAlign ={element.align} {...attributes}>
            {children}
        </h1>
    )
}

export default HeadingTwo