import style from './Profile.module.css';
import { useRouter } from 'next/router';

const Profile = (props) => {
  const router = useRouter();
  return (
    <div className="container">
      <div className={style['proflie-header']}>
        <div className={style['profile-username-wrapper']}>
          <img
            onClick={() => props.setShowProfile(false)}
            className="w-3 h-5 cursor-pointer absolute left-0 top-0 z-10"
            src="/assets/icon/arrow-back.png"
            alt="icon-back"
          />
          <p className={`${style['text-profile-username']}`}>
            {props.user?.username ? props.user?.username : 'Not set'}
          </p>
        </div>
        <img
          className={style['profile-img']}
          src={
            props.user?.profile_img
              ? `${process.env.NEXT_PUBLIC_API_URL}/${props.user?.profile_img}`
              : '/assets/img/profile/defaultprofile.png'
          }
          alt="img-profile"
        />
        <div className={style['text-profile-name']}>{props.user?.name}</div>
        <p className={`${style['text-profile-username-small']}`}>{props.user?.email ? props.user?.email : 'Not set'}</p>
        <p className=" font-semibold mt-5 mb-2 text-lg">Account</p>
        <p className="font-semibold">{props.user?.phone_number ? props.user?.phone_number : 'Not set'}</p>
        <p className="text-gray-400 border-b pb-4">Phone number</p>
        <p className="font-semibold mt-4">{props.user?.username ? props.user?.username : 'Not set'}</p>
        <p className="text-gray-400 border-b pb-4">Username</p>
        <p className="font-semibold mt-4">{props.user?.bio ? props.user?.bio : 'Not set'}</p>
        <p className="text-gray-400 border-b pb-4">Bio</p>
        <p
          onClick={() => {
            props.setShowSidebar(true);
            router.push('/profile-update');
          }}
          className="text-primary cursor-pointer font-Rubik mt-4"
        >
          Update Profile
        </p>
      </div>
    </div>
  );
};

export default Profile;
