import style from './Navbar.module.css';
const Navbar = (props) => {
  return (
    <>
      <div className={style['navbar']}>
        <div className={style['navbar-container']}>
          <img
            onClick={() => props.setShowSidebar((oldValue) => !oldValue)}
            className="w-3 h-4 mr-3 sm:hidden"
            src="/assets/icon/arrow-back.png"
            alt="icon-back"
          />
          <p className="font-Rubik font-medium text-lg">{props.pageName}</p>
        </div>
      </div>
      <div className={style['main-content']}>{props.children}</div>
    </>
  );
};

export default Navbar;
