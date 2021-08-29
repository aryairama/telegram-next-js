/* eslint-disable react/display-name */
import { initializeStore } from '../../redux/store';
const AuthRoute = (Component) => {
  return (props) => <Component {...props} />;
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

function checkAuth(gssp) {
  return async (context) => {
    const {
      req: { cookies },
      res,
    } = context;
    const redux = initializeStore(parseCookieRedux(cookies.telegram));
    if (redux.getState().user.auth === true) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return await gssp(context, redux);
  };
}

export { AuthRoute, checkAuth };
