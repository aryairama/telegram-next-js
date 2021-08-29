import { Sidebar } from '../module';
import style from './PrivateRoute.module.css';
import { useState } from 'react';

const PrivateRoute = (Component) => {
  const Private = (props) => {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
      <div className={style['private-wrapper']}>
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className={`${style['sidebar']} ${showSidebar ? style['sidebar-active'] : ''}`}
        >
          <Sidebar />
        </div>
        <div className={`${style['main-content']} ${showSidebar ? style['main-content-slide'] : ''}`}>
          <Component {...props} setShowSidebar={setShowSidebar} />
        </div>
      </div>
    );
  };
  return Private;
};

export default PrivateRoute;
