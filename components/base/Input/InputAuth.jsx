import style from '../Input/InputAuth.module.css';
import { useState } from 'react';

const InputAuth = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`${props.styleContainer}`}>
      <div className={`relative font-Rubik`}>
        <label className={style['input-label']} htmlFor={props.id}>
          {props.label}
        </label>
        <input
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          id={props.id}
          type={props.type === 'password' ? (showPassword === false ? 'password' : 'text') : props.type}
          name={props.name}
          value={props.value}
          className={`${style['input-auth']} ${props.className}`}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
        />
        <span
          className={`${style['label-effect']} ${props.children ? '!border-red-500' : ''} ${props.labelEffect}`}
        ></span>
        {props.type === 'password' && (
          <img
            onClick={() => setShowPassword(!showPassword)}
            className={`${style['input-icon-password']}`}
            src="/assets/icon/eye.png"
            alt="icon-password"
          />
        )}
      </div>
      {props.children}
    </div>
  );
};

export default InputAuth;
