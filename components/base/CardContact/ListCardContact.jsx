const ListCardContact = (props) => {
  const truncateText = (text, length) => {
    const cutTruncate = [...text];
    let resultTruncateText = '';
    if (cutTruncate.length > length) {
      for (let i = 0; i < length; i++) {
        resultTruncateText += cutTruncate[i];
      }
      resultTruncateText += '...';
      return resultTruncateText;
    } else if (cutTruncate.length <= length) {
      return text;
    }
  };
  return (
    <div
      className={`flex flex-row justify-between items-center w-full my-3 rounded-l-2xl hover:shadow-lg font-Rubik ${props.styleContainer}`}
    >
      <div onClick={props.onClick} className="flex w-full items-center cursor-pointer">
        <img className="w-16 w h-16 rounded-2xl object-contain" src={props.profile_img} alt="icon-profile" />
        <div className="flex flex-col pl-3 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="font-light text-base break-all">{props.name}</p>
            <p className="text-xs text-gray-500">{`${new Date(props.current_create_message).getHours()} : ${new Date(
              props.current_create_message
            ).getMinutes()}`}</p>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-gray-500 break-all text-sm">{truncateText(props.current_message, 15)}</p>
            {props.unread !== 0 && <p className="rounded-full text-xs p-1 bg-primary">{props.unread}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCardContact;
