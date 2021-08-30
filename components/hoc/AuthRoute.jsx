/* eslint-disable react/display-name */
import { default as axios } from '../../configs/axiosConfig';

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
      req: {
        headers: { cookie },
      },
      res,
    } = context;
    const headers = {
      headers: {
        Cookie: cookie,
      },
    };
    try {
      if (context.req.cookies?.authTelegram) {
        const auth = await (await axios.get('/users/profile', headers)).data;
        if (auth.statusCode === 200) {
          return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
    return await gssp(context);
  };
}

export { AuthRoute, checkAuth };
