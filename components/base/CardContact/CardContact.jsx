const CardContact = (props) => {
  return (
    <div
      className={`flex flex-row justify-between items-center w-full my-3 shadow rounded-l-2xl hover:shadow-lg font-Rubik ${props.styleContainer}`}
    >
      <div onClick={props.onClick} className="flex items-center cursor-pointer">
        <img className="w-16 h-16 rounded-2xl object-contain" src={props.profile_img} alt="icon-profile" />
        <div className="flex flex-col pl-5">
          <p className="font-bold text-base lg:text-lg break-all">{props.name}</p>
          <p className="text-gray-500 break-all">{props.phone_number ? props.phone_number : 'Not set'}</p>
        </div>
      </div>
      <div className="flex flex-row">
        {props.type === 'add' && (
          <img
            onClick={props.clickImg}
            className="w-5 h-5 mr-5"
            src="/assets/icon/plus-square-fill.svg"
            alt="plus-icon"
          />
        )}
        {props.type === 'delete' && (
          <img onClick={props.clickImg} className="w-5 h-5 mr-5" src="/assets/icon/trash-fill.svg" alt="plus-icon" />
        )}
      </div>
    </div>
  );
};

export default CardContact;
