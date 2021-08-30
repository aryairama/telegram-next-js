import style from './Dropdown.module.css';
const Dropdown = (props) => {
  return (
    <>
      {props.type === 'text' && (
        <div className={style['dropdown-container']}>
          <button type="button" className={props.styleButton}>
            {props.text}
          </button>
          <ul className={`${style.dropdwon} ${props.styleDropdown}`}>{props.children}</ul>
        </div>
      )}
      {props.type === 'img' && (
        <div className={style['dropdown-container']}>
          <img src={props.src} className={props.styleImg} alt="img-icon-dropdwon">
            {props.text}
          </img>
          <ul className={`${style.dropdwon} ${props.styleDropdown}`}>{props.children}</ul>
        </div>
      )}
    </>
  );
};
Dropdown.defaultProps = {
  type: 'text',
};
export default Dropdown;
