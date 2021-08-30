/* eslint-disable react-hooks/exhaustive-deps */
import { Sidebar } from '../module';
import style from './PrivateRoute.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getProfile } from '../../redux/action/userAction';

const PrivateRoute = (Component) => {
  const Private = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.user);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    useEffect(async () => {
      try {
        await dispatch(getProfile());
        if (!auth) {
          router.push('/auth/login');
        }
      } catch (error) {
        console.log(error);
      }
    }, []);
    return (
      <div className={style['private-wrapper']}>
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className={`${style['sidebar']} ${showSidebar ? style['sidebar-active'] : ''}`}
        >
          {!showProfile && <Sidebar />}
        </div>
        <div className={`${style['main-content']} ${showSidebar ? style['main-content-slide'] : ''}`}>
          <Component {...props} setShowSidebar={setShowSidebar} setShowRightSidebar={setShowRightSidebar} />
        </div>
        <div className={`${style['right-sidebar']} ${showRightSidebar ? style['right-sidebar-active'] : ''}`}></div>
      </div>
    );
  };
  return Private;
};

export default PrivateRoute;
