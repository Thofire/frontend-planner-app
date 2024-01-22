const HeadingOne = (props) => {

    const { attributes, children, element } = props
    return (
        <h1 className='text-4xl' textAlign ={element.align} {...attributes}>
            {children}
        </h1>
    )
}

export default HeadingOne