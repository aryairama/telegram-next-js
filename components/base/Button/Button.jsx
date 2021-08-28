const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
      className={`w-full py-4 appearance-none font-Rubik ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
