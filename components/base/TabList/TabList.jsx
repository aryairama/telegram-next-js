import style from './TabList.module.css';

const TabList = (props) => {
  return (
    <li className={`${style['tab-list']} ${props.className}`}>
      <input
        className={`hidden ${style['tab-list-checkbox']}`}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        defaultChecked={props.defaultChecked}
      />
      <label className={style['tab-list-label']} htmlFor={props.id}>
        {props.label}
      </label>
    </li>
  );
};

export default TabList;
