import style from './Dropdown.module.css';
const Dropdown = (props) => {
  return (
    <>
      {props.type === 'text' && (
        <div className={style['dropdown-container']}>
          <input className={`${style['dropdwon-checkbox']} hidden`} type="checkbox" id={props.id} />
          <label htmlFor={props.id} type="button" className={props.styleButton}>
            {props.text}
          </label>
          <ul className={`${style.dropdwon} ${props.styleDropdown}`}>{props.children}</ul>
        </div>
      )}
      {props.type === 'img' && (
        <div className={style['dropdown-container']}>
          <input className={`${style['dropdwon-checkbox']} hidden`} type="checkbox" id={props.id} />
          <label htmlFor={props.id}>
            <img src={props.src} className={props.styleImg} alt="img-icon-dropdwon">
              {props.text}
            </img>
          </label>
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
