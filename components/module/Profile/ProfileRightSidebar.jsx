import style from './Profile.module.css';
import { useSelector } from 'react-redux';

const ProfileRightSidebar = (props) => {
  const { receiver } = useSelector((state) => state.chat);
  return (
    <div className="container">
      <div className={style['proflie-header']}>
        <div className={style['profile-username-wrapper']}>
          <img
            onClick={() => props.setShowRightSidebar(false)}
            className="w-3 h-5 cursor-pointer absolute left-0 top-0 z-10"
            src="/assets/icon/arrow-back.png"
            alt="icon-back"
          />
          <p className={`${style['text-profile-username']}`}>{receiver?.username ? receiver?.username : 'Not set'}</p>
        </div>
        <img
          className={style['profile-img']}
          src={
            receiver?.profile_img
              ? `${process.env.NEXT_PUBLIC_API_URL}/${receiver?.profile_img}`
              : '/assets/img/profile/defaultprofile.png'
          }
          alt="img-profile"
        />
        <p className="font-semibold mt-5">{receiver?.name ? receiver?.name : 'Not set'}</p>
        <p className="text-gray-400">Online</p>
        <p className="font-semibold mt-5">Phone number</p>
        <p className="text-gray-400">{receiver?.phone_number ? receiver?.phone_number : 'Not set'}</p>
      </div>
    </div>
  );
};

export default ProfileRightSidebar;
