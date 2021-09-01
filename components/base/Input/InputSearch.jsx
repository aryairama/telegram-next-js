import style from './InputSearch.module.css';
const InputSearch = (props) => {
  return (
    <div className={`${style['input-search']} ${props.styleContainer}`}>
      <div className={style['left-input-search']}>
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
        className={`${style['input']} ${props.className}`}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
      />
    </div>
  );
};

export default InputSearch;
