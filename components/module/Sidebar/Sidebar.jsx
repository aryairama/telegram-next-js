import style from './Sidebar.module.css';
import { InputGroup, TabContainer, TabList } from '../../base';

const Sidebar = (props) => {
  return (
    <>
      <div className="container">
        <div className={style['sidebar-header']}>
          <p className={style['sidebar-header-brand']}>{process.env.NEXT_PUBLIC_NAME_APLICATION}</p>
          <div className={style['sidebar-header-toggle']}>
            <img className="h-5 w-5" src="/assets/icon/sidebarmenu.png" alt="" />
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
