
const Button = ({title, onPress})=>{
return (

    <button onClick={onPress}>
        {title}
    </button>

)
}

export default Button;