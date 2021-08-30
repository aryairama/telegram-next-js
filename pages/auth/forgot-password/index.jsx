import style from '../../../styles/auth.module.css';
import { InputAuth, Button } from '../../../components/base';
import { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { forgotPassword as resetPassword } from '../../../redux/action/userAction';
import { checkAuth } from '../../../components/hoc/AuthRoute';

const ForgotPassword = (props) => {
  const router = useRouter();
  const validator = useRef(new SimpleReactValidator({ className: 'text-sm text-red-500' }));
  const [formData, setFormData] = useState({
    email: '',
  });
  const formDataHandler = (e) => {
    setFormData((oldValue) => ({ ...oldValue, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Head>
        <title>Auth | Forgot Password</title>
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
              <p className={`${style['text-header']} absolute left-0 right-0 -top-2`}>Forgot Password</p>
            </div>
            <div className={`${style['layout-form-login']} !mt-14`}>
              <p className="font-Rubik">You’ll get messages soon on your e-mail</p>
              <InputAuth
                name="email"
                value={formData.email}
                onChange={formDataHandler}
                onFocus={() => validator.current.showMessageFor('email')}
                type="text"
                styleContainer="mt-4"
                label="Email"
              >
                {validator.current.message('email', formData.email, 'required|email')}
              </InputAuth>
              <Button
                onClick={() => resetPassword(formData)}
                disabled={validator.current.allValid() ? false : true}
                className="btn-primary border mt-6 rounded-full"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
export const getServerSideProps = checkAuth(async (context) => ({ props: {} }));
