/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { default as axios } from '../../configs/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getProfile } from '../../redux/action/userAction';

const AuthRoute = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const { auth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(async () => {
      try {
        await dispatch(getProfile());
        if (auth) {
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    }, []);
    return <Component {...props} />;
  };
  return Auth;
};

export const parseCookieRedux = (cookie) => {
  if (cookie) {
    let cookieParse = JSON.parse(cookie);
    Object.keys(cookieParse).forEach((key) => {
      cookieParse[key] = JSON.parse(cookieParse[key]);
    });
    return cookieParse;
  } else {
    return {};
  }
};

export { AuthRoute };
