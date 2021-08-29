import style from './InputGroup.module.css';
const InputGroup = (props) => {
  return (
    <div className={`${style['input-group']} ${props.styleContainer}`}>
      <div className={style['left-input-group']}>
        <img src="/assets/icon/search.png" alt="icon-search" />
      </div>
      <input
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        className={`${style['input']} ${props.className} w-full`}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
      />
      <div onClick={props.onClick} className={style['right-input-group']}>
        <img src="/assets/icon/plus.png" alt="icon=plus" />
      </div>
    </div>
  );
};

export default InputGroup;
