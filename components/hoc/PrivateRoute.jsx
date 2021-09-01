/* eslint-disable react-hooks/exhaustive-deps */
import { Sidebar, Profile } from '../module';
import style from './PrivateRoute.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getProfile } from '../../redux/action/userAction';
import Head from 'next/head';

const PrivateRoute = (Component) => {
  const Private = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { auth, user } = useSelector((state) => state.user);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const formatUrl = ([first, ...last]) => {
      return first.toUpperCase() + last.join('');
    };
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
      <>
        <Head>
          {router.route.split('/')[1] === '' && <title>{process.env.NEXT_PUBLIC_NAME_APLICATION} | Home</title>}
          {router.route.split('/')[1] !== '' && (
            <title>
              {process.env.NEXT_PUBLIC_NAME_APLICATION} | {formatUrl(router.route.split('/')[1])}
            </title>
          )}
        </Head>
        <div className={style['private-wrapper']}>
          <div className={`${style['sidebar']} ${showSidebar ? style['sidebar-active'] : ''}`}>
            {showProfile && <Profile setShowSidebar={setShowSidebar} setShowProfile={setShowProfile} user={user} />}
            {!showProfile && <Sidebar setShowSidebar={setShowSidebar} setShowProfile={setShowProfile} />}
          </div>
          <div className={`${style['main-content']} ${showSidebar ? style['main-content-slide'] : ''}`}>
            <Component
              {...props}
              user={user}
              auth={auth}
              setShowSidebar={setShowSidebar}
              setShowRightSidebar={setShowRightSidebar}
              setShowProfile={setShowProfile}
            />
          </div>
          <div className={`${style['right-sidebar']} ${showRightSidebar ? style['right-sidebar-active'] : ''}`}></div>
        </div>
      </>
    );
  };
  return Private;
};

export default PrivateRoute;
