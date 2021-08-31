/* eslint-disable react-hooks/exhaustive-deps */
import style from '../../styles/profileUpdate.module.css';
import PrivateRoute from '../../components/hoc/PrivateRoute';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from '../../components/module';
import { InputAuth, Button } from '../../components/base';
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch } from 'react-redux';
import { updateProfile, changePassword } from '../../redux/action/userAction';

const ProfileUpdate = (props) => {
  const dispatch = useDispatch();
  const validator = useRef(
    new SimpleReactValidator({
      className: 'text-sm text-red-500',
      validators: {
        imageMaxSize: {
          message: ':attribute cannot be more than :values megabytes.',
          rule: (val, params, validator) => {
            if (parseInt(val.size, 10) > 1024 * 1024 * parseInt(params[0])) {
              return false;
            }
            return true;
          },
          messageReplace: (message, params) => message.replace(':values', params[0]), // optional
        },
      },
    })
  );
  const validatorPassword = useRef(new SimpleReactValidator({ className: 'text-sm text-red-500' }));
  useEffect(async () => {
    props.setShowProfile(true);
    props.setShowRightSidebar(false);
  }, []);
  const initialState = {
    name: '',
    email: '',
    username: '',
    phone_number: '',
    bio: '',
    profile_img: '',
  };
  const initialStatePassword = {
    currentpassword: '',
    newpassword: '',
    confirmpassword: '',
  };
  const [formPassword, setFormpassword] = useState(initialStatePassword);
  const formPasswordHandler = (e) => {
    setFormpassword((oldValue) => ({ ...oldValue, [e.target.name]: e.target.value }));
  };
  const [formData, setFormData] = useState(
    props.user ? { ...props.user, email: '', profile_img: '', username: '' } : initialState
  );
  const checkSamePassword = () => formPassword.newpassword === formPassword.confirmpassword;
  const formDataHandler = (e) => setFormData((oldValue) => ({ ...oldValue, [e.target.name]: e.target.value }));
  return (
    <Navbar setShowSidebar={props.setShowSidebar} pageName="Update Profile">
      <div className={style['container-form-profile']}>
        <div className={style['left-form']}>
          <div className="flex flex-col items-center">
            <label htmlFor="profile_img">
              {props.user.profile_img && props.user.profile_img.length > 10 && !formData.profile_img && (
                <img
                  className={style['profile-img']}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${props.user.profile_img}`}
                  alt="img-profile"
                />
              )}
              {formData.profile_img && !props.user.profile_img && (
                <img
                  className={style['profile-img']}
                  src={URL.createObjectURL(formData.profile_img)}
                  alt="img-profile"
                />
              )}
              {!formData.profile_img && !props.user.profile_img && (
                <img className={style['profile-img']} src="/assets/img/profile/defaultprofile.png" alt="img-profile" />
              )}
              {formData.profile_img && props.user.profile_img && (
                <img
                  className={style['profile-img']}
                  src={URL.createObjectURL(formData.profile_img)}
                  alt="img-profile"
                />
              )}
            </label>
            <div className="mt-2">
              {validator.current.message('profile_img', formData.profile_img, 'imageMaxSize:2')}
            </div>
            <label htmlFor="profile_img" className=" bg-primary text-white inline-block mt-3 py-2 px-4 rounded-3xl">
              Choose image
            </label>
            <input
              className="hidden"
              type="file"
              name="profile_img"
              id="profile_img"
              accept="image/jpeg, image/png"
              onChange={(e) => {
                setFormData((oldValue) => ({ ...oldValue, profile_img: e.target.files[0] }));
                validator.current.showMessageFor('profile_img');
              }}
            />
          </div>
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
            placeholder={props.user?.email}
          >
            {validator.current.message('email', formData.email, 'email')}
          </InputAuth>
          <InputAuth
            name="username"
            value={formData.username ? formData.username : ''}
            onChange={formDataHandler}
            onFocus={() => validator.current.showMessageFor('username')}
            type="text"
            styleContainer="mt-4"
            label="username"
            placeholder={props.user?.username}
          >
            {validator.current.message('username', formData.username, 'min:3|max:255')}
          </InputAuth>
          <InputAuth
            name="phone_number"
            value={formData.phone_number ? formData.phone_number : ''}
            onChange={formDataHandler}
            onFocus={() => validator.current.showMessageFor('phone_number')}
            type="text"
            styleContainer="mt-4"
            label="Phone number"
          >
            {validator.current.message('phone_number', formData.phone_number, 'numeric|required|min:10|max:15')}
          </InputAuth>
          <InputAuth
            name="bio"
            value={formData.bio ? formData.bio : ''}
            onChange={formDataHandler}
            onFocus={() => validator.current.showMessageFor('bio')}
            type="text"
            styleContainer="mt-4"
            label="Bio"
          >
            {validator.current.message('bio', formData.bio, 'required|min:10')}
          </InputAuth>
          <Button
            onClick={() => {
              dispatch(updateProfile(formData));
              setFormData(initialState);
            }}
            disabled={validator.current.allValid() ? false : true}
            className="btn-primary rounded-xl mt-5"
          >
            Update
          </Button>
        </div>
        <div className={style['right-form']}>
          <InputAuth
            name="currentpassword"
            value={formPassword.currentpassword}
            onChange={formPasswordHandler}
            onFocus={() => validatorPassword.current.showMessageFor('current password')}
            type="password"
            styleContainer="mt-4"
            label="Current password"
          >
            {validatorPassword.current.message(
              'current password',
              formPassword.currentpassword,
              'required|min:8|max:255'
            )}
          </InputAuth>
          <InputAuth
            name="newpassword"
            value={formPassword.newpassword}
            onChange={formPasswordHandler}
            onFocus={() => validatorPassword.current.showMessageFor('new password')}
            type="password"
            styleContainer="mt-4"
            label="New password"
          >
            {validatorPassword.current.message('new password', formPassword.newpassword, 'required|min:8|max:255')}
          </InputAuth>
          <InputAuth
            name="confirmpassword"
            value={formPassword.confirmpassword}
            onChange={formPasswordHandler}
            onFocus={() => validatorPassword.current.showMessageFor('confirm password')}
            type="password"
            styleContainer="mt-4"
            label="Confirm password"
          >
            {validatorPassword.current.message(
              'confirm password',
              formPassword.confirmpassword,
              'required|min:8|max:255'
            )}
          </InputAuth>
          <Button
            onClick={() => {
              changePassword(formPassword);
              Object.keys(validatorPassword.current.fields).forEach((e) => validatorPassword.current.hideMessageFor(e));
              setFormpassword(initialStatePassword);
            }}
            disabled={validatorPassword.current.allValid() && checkSamePassword() ? false : true}
            className="btn-primary rounded-xl mt-5"
          >
            Change password
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default PrivateRoute(ProfileUpdate);
