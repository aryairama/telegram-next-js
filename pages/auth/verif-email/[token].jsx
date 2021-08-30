import style from '../../../styles/auth.module.css';
import { Button } from '../../../components/base';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AuthRoute } from '../../../components/hoc/AuthRoute';
import { default as axios } from '../../../configs/axiosConfig';

const VerifEmail = (props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Auth | Verif Email</title>
      </Head>
      <div className={style['container-auth']}>
        <div className={style['grid-auth']}>
          <div className={style['layout-auth']}>
            <div className="relative">
              <img
                onClick={() => router.back()}
                className="w-3 h-5 cursor-pointer absolute left-0 top-0 z-10"
                src="/assets/icon/arrow-back.png"
                alt="icon-back"
              />
              <p className={`${style['text-header']} absolute left-0 right-0 -top-2`}>Verif Email</p>
            </div>
            <div className={`${style['layout-form-login']} !mt-14`}>
              <p className="font-Rubik text-center font-bold capitalize mb-5">
                {props.verifEmail ? 'email verification successful' : 'email verification failed'}
              </p>
              {props.verifEmail && (
                <>
                  <img
                    className="w-20 h-20 block ml-auto mr-auto"
                    src="/assets/icon/emailsuccess.png"
                    alt="icon-verif-email"
                  />
                  <Button onClick={() => router.push('/auth/login')} className="btn-primary border mt-6 rounded-full">
                    Login
                  </Button>
                </>
              )}
              {!props.verifEmail && (
                <>
                  <img
                    className="w-20 h-20 block ml-auto mr-auto"
                    src="/assets/icon/emailerror.png"
                    alt="icon-verif-email"
                  />
                  <Button
                    onClick={() => router.push('/auth/register')}
                    className="btn-primary border mt-6 rounded-full"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRoute(VerifEmail);

export const getServerSideProps = async (context) => {
  let verifEmail = false;
  const headers = {
    headers: {
      Cookie: `tokenEmail=${context.params.token};`,
    },
  };
  try {
    const checkToken = await axios.post('/users/checktoken', { token: 'email' }, headers);
    if (checkToken.data.statusCode === 200) {
      await axios.post('/users/verifemail', {}, headers);
      verifEmail = true;
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/register',
        permanent: false,
      },
    };
  }
  return {
    props: { verifEmail },
  };
};
