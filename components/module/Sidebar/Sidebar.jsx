import style from './Sidebar.module.css';
import { InputGroup, TabContainer, TabList, Dropdown, DropdownItem } from '../../base';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/action/userAction';

const Sidebar = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <div className="container">
        <div className={style['sidebar-header']}>
          <p className={style['sidebar-header-brand']}>{process.env.NEXT_PUBLIC_NAME_APLICATION}</p>
          <div className={style['sidebar-header-toggle']}>
            <Dropdown id="menu-profile" styleDropdown="font-Rubik" type="img" src="/assets/icon/sidebarmenu.png">
              <DropdownItem onClick={() => props.setShowProfile(true)}>
                <img className="mr-2 h-5 icon-color-primary-white" src="/assets/icon/person.svg" alt="icon-person" />
                <p>Profile</p>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  props.setShowSidebar(true);
                  router.push('/contacts');
                }}
              >
                <img className="mr-2 h-5 icon-color-primary-white" src="/assets/icon/contact.svg" alt="icon-person" />
                <p>Contacts</p>
              </DropdownItem>
              <DropdownItem onClick={() => dispatch(logout(router))}>
                <img className="mr-2 h-5 icon-color-primary-white" src="/assets/icon/logout.svg" alt="icon-person" />
                <p>Logout</p>
              </DropdownItem>
            </Dropdown>
          </div>
          <InputGroup styleContainer="mt-7" placeholder="Type your message..." />
          <TabContainer className="mt-5">
            <TabList type="radio" name="status_message" id="all" label="All" defaultChecked={true} />
            <TabList type="radio" name="status_message" id="unread" label="Unread" />
          </TabContainer>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
