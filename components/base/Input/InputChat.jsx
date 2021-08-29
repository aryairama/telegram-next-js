import style from './InputChat.module.css';

const InputChat = (props) => {
  return (
    <div className={`${style['container-input-chat']} ${props.styleContainer}`}>
      <input
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        className={`${style['input-chat']} ${props.className}`}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
      />
      <img onClick={props.onClick} className="absolute right-12 top-5" src="/assets/icon/plus.png" alt="icon-plus" />
    </div>
  );
};

export default InputChat;
