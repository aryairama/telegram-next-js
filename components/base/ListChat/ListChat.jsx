import style from '../../../styles/messages.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import moment from 'moment';

const ListChat = (props) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <>
      <div className={`flex items-center w-full ${props.styleContainer}`}>
        {props.optionDelete === true && (
          <img
            onClick={() => {
              props.onClickRemove();
              setShowDelete(false);
            }}
            src="/assets/icon/trash.svg"
            alt="icon-delete"
            className={`w-6 relative z-20 cursor-pointer ${showDelete ? 'block' : 'hidden'}`}
          />
        )}
        {props.positon === 'left' && (
          <>
            <img src={props.profile} alt="icon-profile" className="w-12 h-12 rounded-lg mr-3" />
            <div className={`${props.stylePostion} ${style['left-message']}`}>{props.message}</div>
          </>
        )}
        {props.positon === 'right' && (
          <>
            <div
              className={`${props.stylePostion} ${style['right-message']}`}
              onClick={() => setShowDelete(!showDelete)}
            >
              {props.message}
            </div>
            <img src={props.profile} alt="icon-profile" className="w-12 h-12 rounded-lg ml-3" />
          </>
        )}
      </div>
      {props.positon === 'left' && (
        <p className="text-left text-xs text-gray-400 ml-14">{moment(props.created_at).format('HH:mm')}</p>
      )}
      {props.positon === 'right' && (
        <p className="text-right text-xs text-gray-400 mr-14">{moment(props.created_at).format('HH:mm')}</p>
      )}
    </>
  );
};

ListChat.propTypes = {
  onClickRemove: PropTypes.func,
};

ListChat.defaultProps = {
  optionDelete: false,
};

export default ListChat;
