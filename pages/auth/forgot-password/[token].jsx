import style from '../../../styles/auth.module.css';
import { InputAuth, Button } from '../../../components/base';
import { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ResetPassword = (props) => {
  const router = useRouter();
  const validator = useRef(new SimpleReactValidator({ className: 'text-sm text-red-500' }));
  const [formData, setFormData] = useState({
    newpassword: '',
    confirmpassword: '',
  });
  const formDataHandler = (e) => {
    setFormData((oldValue) => ({ ...oldValue, [e.target.name]: e.target.value }));
  };
  const checkSamePassword = () => formData.newpassword === formData.confirmpassword;
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
              <p className={`${style['text-header']} absolute left-0 right-0 -top-2`}>Reset Password</p>
            </div>
            <div className={`${style['layout-form-login']} !mt-14`}>
              <p className="font-Rubik">Reset your password and start the conversation again</p>
              <InputAuth
                name="newpassword"
                value={formData.newpassword}
                onChange={formDataHandler}
                onFocus={() => validator.current.showMessageFor('newpassword')}
                type="password"
                styleContainer="mt-4"
                label="New password"
              >
                {validator.current.message('email', formData.newpassword, 'required|min"3|max:255')}
              </InputAuth>
              <InputAuth
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={formDataHandler}
                onFocus={() => validator.current.showMessageFor('confirmpassword')}
                type="password"
                styleContainer="mt-4"
                label="Confirm password"
              >
                {validator.current.message('email', formData.confirmpassword, 'required|min"3|max:255')}
              </InputAuth>
              <Button
                disabled={validator.current.allValid() && checkSamePassword() ? false : true}
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

export default ResetPassword;
