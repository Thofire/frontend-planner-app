const ButtonCalc = ({ className, value, onClick }) => {
    return (
      <button className={className} onClick={onClick}>
        {value}
      </button>
    );
  };
  
  export default ButtonCalc;