import style from '../../styles/auth.module.css';
import { InputAuth, Button } from '../../components/base';
import { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Register = (props) => {
  const router = useRouter();
  const validator = useRef(new SimpleReactValidator({ className: 'text-sm text-red-500' }));
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const formDataHandler = (e) => {
    setFormData((oldValue) => ({ ...oldValue, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Head>
        <title>Auth | Register</title>
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
              <p className={`${style['text-header']} absolute left-0 right-0 -top-2`}>Register</p>
            </div>
            <div className={`${style['layout-form-login']} !mt-14`}>
              <p className="font-Rubik">Let’s create your account!</p>
              <InputAuth
                name="name"
                value={formData.name}
                onChange={formDataHandler}
                onFocus={() => validator.current.showMessageFor('name')}
                type="text"
                styleContainer="mt-4"
                label="Name"
              >
                {validator.current.message('name', formData.name, 'required|min:3|max:255')}
              </InputAuth>
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
              <Button className="btn-primary border mt-6 rounded-full">Register</Button>
              <div className="py-6 flex items-center flex-nowrap">
                <hr className="border border-gray-300 w-4/12" />
                <p className="font-Rubik text-center text-gray-500 w-4/12">Register With</p>
                <hr className="border border-gray-300 w-4/12" />
              </div>
              <Button
                className={`btn-white-primary-outline rounded-full flex items-center justify-center ${style['btn-img-oauth']}`}
              >
                <img className="mr-3" src="/assets/icon/google.png" alt="icon-google" />
                <p>Google</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
