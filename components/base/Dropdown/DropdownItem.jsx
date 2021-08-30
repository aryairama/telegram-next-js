import style from './Dropdown.module.css';
const DropdownItem = (props) => {
  return <li onClick={props.onClick} className={style['dropdwon-item']}>{props.children}</li>;
};

export default DropdownItem;
