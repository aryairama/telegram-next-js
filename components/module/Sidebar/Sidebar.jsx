/* eslint-disable react-hooks/exhaustive-deps */
import style from './Sidebar.module.css';
import { InputGroup, TabContainer, TabList, Dropdown, DropdownItem, ListCardContact } from '../../base';
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
          <InputGroup
            value={props.seacrh}
            onChange={(e) => props.setSeacrh(e.target.value)}
            styleContainer="mt-7"
            placeholder="Type your message..."
          />
          <TabContainer className="mt-5">
            <TabList type="radio" name="status_message" id="all" label="All" defaultChecked={true} />
            <TabList type="radio" name="status_message" id="unread" label="Unread" />
          </TabContainer>
        </div>
        <div className={style['sidebar-list-contacts']}>
          {props.contacts?.data?.map((contact) => (
            <ListCardContact
              key={contact.user_id}
              profile_img={
                contact.profile_img
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${contact.profile_img}`
                  : '/assets/img/profile/defaultprofile.png'
              }
              onClick={() => {
                dispatch({ type: 'ADD_RECEIVER', payload: contact });
                props.setShowSidebar(true);
                router.push('/');
              }}
              name={contact.name}
              current_create_message={contact.current_create_message}
              current_message={contact.current_message}
              unread={contact.unread}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
