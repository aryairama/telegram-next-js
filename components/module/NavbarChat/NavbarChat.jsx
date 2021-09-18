import style from './NavbarChat.module.css';
import { DropdownItem, Dropdown } from '../../base';

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
              src={
                props.profile_img
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${props.profile_img}`
                  : '/assets/img/profile/defaultprofile.png'
              }
              alt="icon-chat-profile"
            />
            <div className="flex flex-col font-Rubik pl-3">
              <p className="font-bold">{props.name}</p>
              <p className="text-primary">{props.status}</p>
            </div>
          </div>
          <div className={style['navbar-chat-right']}>
            <Dropdown
              id="action-chat"
              styleDropdown="font-Rubik"
              type="img"
              src="/assets/icon/menu.png"
              alt="icon-menu"
            >
              <DropdownItem onClick={props.clearHistory}>
                <img className="mr-2 h-5 icon-color-primary-white" src="/assets/icon/trash.svg" alt="icon-clear-chat" />
                <p>Delete chat history</p>
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={style['main-chat']} id="main-chat">
        {props.children}
      </div>
    </>
  );
};

export default NavbarChat;
