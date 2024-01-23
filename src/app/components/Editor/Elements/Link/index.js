import Link  from '@mui/material/Link';
  
  const muiLink = (props) => {
    const {
      attributes, children, element,
    } = props
  
    return (
      <Link
        fontWeight="bold"
        href={element.href}  //Needs further testing
        textAlign={element.align}
        {...attributes}
      >
        {children}
      </Link>
    )
  }
  
  export default muiLink