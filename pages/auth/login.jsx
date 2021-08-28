import style from '../../styles/auth.module.css';
import { InputAuth, Button } from '../../components/base';
import { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Head from 'next/head';

const Login = (props) => {
  const validator = useRef(new SimpleReactValidator({ className: 'text-sm text-red-500' }));
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const formDataHandler = (e) => {
    setFormData((oldValue) => ({ ...oldValue, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Head>
        <title>Auth | Login</title>
      </Head>
      <div className={style['container-auth']}>
        <div className={style['grid-auth']}>
          <div className={style['layout-auth']}>
            <p className={style['text-header']}>Login</p>
            <div className={style['layout-form-login']}>
              <p className="font-Rubik">Hi, Welcome back!</p>
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
              <InputAuth
                name="password"
                value={formData.password}
                onChange={formDataHandler}
                onFocus={() => validator.current.showMessageFor('password')}
                type="password"
                styleContainer="mt-4"
                label="Password"
              >
                {validator.current.message('password', formData.password, 'required|min:8|max:255')}
              </InputAuth>
              <p className="font-Rubik text-right text-primary my-5">Forgot password?</p>
              <Button className="bg-primary text-white rounded-full">Login</Button>
              <div className="py-6 flex items-center flex-nowrap">
                <hr className="border border-gray-300 w-4/12" />
                <p className="font-Rubik text-center text-gray-500 w-4/12">Login With</p>
                <hr className="border border-gray-300 w-4/12" />
              </div>
              <Button className="border-primary border text-primary rounded-full flex items-center justify-center">
                <img className="mr-3" src="/assets/icon/google.png" alt="icon-google" />
                <p>Google</p>
              </Button>
              <div className="font-Rubik mt-5 flex justify-center">
                Don’t have an account? <p className="text-primary pl-2">Sign Up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
