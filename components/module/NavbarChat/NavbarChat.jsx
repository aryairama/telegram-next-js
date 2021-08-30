import style from './NavbarChat.module.css';

const NavbarChat = (props) => {
  return (
    <>
      <div className={style['navbar-chat']}>
        <div className={style['navbar-chat-container']}>
          <div className={style['navbar-chat-left']}>
            <img
              onClick={() => props.setShowSidebar((oldValue) => !oldValue)}
              className="w-3 h-4 mr-5 sm:hidden"
              src="/assets/icon/arrow-back.png"
              alt="icon-back"
            />
            <img
              onClick={() => props.setShowRightSidebar((oldValue) => !oldValue)}
              className="w-12 h-12 rounded-lg"
              src="/assets/img/profile/1.png"
              alt="icon-chat-profile"
            />
            <div className="flex flex-col font-Rubik pl-3">
              <p className="font-bold">Mother</p>
              <p className="text-primary">Online</p>
            </div>
          </div>
          <div onClick={props.onClickMenu} className={style['navbar-chat-right']}>
            <img className="h-5 w-5" src="/assets/icon/menu.png" alt="icon-menu" />
          </div>
        </div>
      </div>
      <div className={style['main-chat']}>{props.children}</div>
    </>
  );
};

export default NavbarChat;
