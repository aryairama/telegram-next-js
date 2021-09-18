/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import PrivateRoute from '../components/hoc/PrivateRoute';
import { NavbarChat } from '../components/module';
import { InputChat, ListChat } from '../components/base';
import { useEffect, useState, useRef } from 'react';
import {
  readMessages,
  getStatusReceiver,
  deleteMessage,
  readStatusMessages,
  clearHistoryMessages,
} from '../redux/action/messagesAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const Home = ({ socket, setupSocket, user, ...props }) => {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const [reloadReadMessage, setReloadReadMessage] = useState(false);
  const { receiver } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(false);
  useEffect(() => {
    if (Object.keys(receiver).length > 0) {
      props.setShowSidebar(true);
      if (receiver.user_id === user.user_id) {
        dispatch({ type: 'ADD_RECEIVER', payload: {} });
      }
    }
    setupSocket();
    return () => {
      dispatch({ type: 'DELETE_RECEIVER', payload: {} });
      setOnline(false);
    };
  }, []);
  useEffect(async () => {
    try {
      if (Object.keys(receiver).length > 0) {
        await readStatusMessages(receiver.user_id, user.user_id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [reloadReadMessage, receiver]);
  useEffect(() => {
    if (Object.keys(receiver).length > 0) {
      document.querySelector('#main-chat').scrollTo(0, document.querySelector('#main-chat').scrollHeight);
    }
  }, [messages]);
  useEffect(async () => {
    if (Object.keys(receiver).length > 0) {
      try {
        setOnline(false);
        const { data } = await readMessages(receiver.user_id);
        const { data: dataStatus } = await getStatusReceiver(receiver.user_id);
        if (dataStatus.online === 1) {
          setOnline(true);
        } else {
          setOnline(false);
        }
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [receiver, reload]);
  useEffect(() => {
    if (socket.current && Object.keys(receiver).length > 0) {
      socket.current.off('replySendMessageBE');
      socket.current.on('replySendMessageBE', (data) => {
        if (data.sender_id === receiver.user_id) {
          setMessages((oldValue) => [...oldValue, data]);
          setReloadReadMessage((old) => !old);
        } else if (data.sender_id !== receiver.user_id) {
          toast.success(`New messages from ${data.sender_name}`);
        }
      });
    }
    if (socket.current && Object.keys(receiver).length === 0) {
      socket.current.off('replySendMessageBE');
      socket.current.on('replySendMessageBE', (data) => {
        toast.success(`New messages from ${data.sender_name}`);
      });
    }
  }, [socket.current, receiver]);
  useEffect(() => {
    if (socket.current && Object.keys(receiver).length > 0) {
      socket.current.off('replyDeleteChat');
      socket.current.on('replyDeleteChat', (data) => {
        if (data.receiver_id === user.user_id && data.sender_id === receiver.user_id) {
          setReload((oldVal) => !oldVal);
        }
      });
      socket.current.off('replyClearHistoryChat');
      socket.current.on('replyClearHistoryChat', (data) => {
        if (data.sender_id === receiver.user_id) {
          setReload((oldVal) => !oldVal);
        }
      });
      socket.current.off('replyDeleteAccount');
      socket.current.on('replyDeleteAccount', (data) => {
        if (data.user_id === receiver.user_id) {
          dispatch({ type: 'DELETE_RECEIVER', payload: {} });
          toast.warn('the account has been deleted');
        }
      });
    }
  }, [socket.current, receiver]);
  const messageHandler = (e) => setMessage(e.target.value);
  const sendMessage = () => {
    if (message.length > 0 && socket.current) {
      socket.current.emit(
        'sendMessageFR',
        { sender_id: user.user_id, receiver_id: receiver.user_id, message },
        (data) => {
          setMessages((oldValue) => [...oldValue, data]);
        }
      );
      setMessage('');
    }
  };
  useEffect(() => {
    if (socket.current && Object.keys(receiver).length > 0) {
      socket.current.on('status_offline', (data) => {
        if (data.user_id === receiver.user_id) {
          setOnline(false);
        }
      });
      socket.current.on('status_online', (data) => {
        if (data.user_id === receiver.user_id) {
          setOnline(true);
        }
      });
    }
  }, [socket.current, receiver]);
  return (
    <>
      {Object.keys(receiver).length > 0 && (
        <>
          <NavbarChat
            clearHistory={async () => {
              await clearHistoryMessages(user.user_id, receiver.user_id);
              setReload((old) => !old);
            }}
            profile_img={receiver.profile_img}
            name={receiver.name}
            status={online ? 'Online' : 'Offline'}
            setShowSidebar={props.setShowSidebar}
            setShowRightSidebar={props.setShowRightSidebar}
          >
            {messages?.map((message, index) => (
              <div key={index}>
                {index === 0 && <p className="text-center">{moment(message.created_at).format('L')}</p>}
                {index > 0 &&
                  moment(messages[index - 1].created_at).format('L') !== moment(message.created_at).format('L') && (
                    <p className="text-center">{moment(message.created_at).format('L')}</p>
                  )}
                <ListChat
                  key={index}
                  onClickRemove={async () => {
                    await deleteMessage(message.message_id);
                    setReload((oldVal) => !oldVal);
                  }}
                  styleContainer={message.receiver_id === receiver.user_id ? 'justify-end' : ''}
                  stylePostion={message.receiver_id === receiver.user_id ? '!ml-0' : ''}
                  optionDelete={message.receiver_id === receiver.user_id ? true : false}
                  positon={message.receiver_id === receiver.user_id ? 'right' : 'left'}
                  message={message.message}
                  created_at={message.created_at}
                  profile={
                    message.receiver_id === receiver.user_id
                      ? user.profile_img
                        ? `${process.env.NEXT_PUBLIC_API_URL}/${user.profile_img}`
                        : '/assets/img/profile/defaultprofile.png'
                      : receiver.profile_img
                      ? `${process.env.NEXT_PUBLIC_API_URL}/${receiver.profile_img}`
                      : '/assets/img/profile/defaultprofile.png'
                  }
                />
              </div>
              // <div key={index}>
              //   {message.receiver_id === receiver.user_id && (
              //     <div className="flex items-center w-full justify-end">
              //       <img src="/assets/icon/trash.svg" alt="icon-delete" className="w-6" />
              //       <div className={`!ml-0 ${style['right-message']}`}>{message.message}</div>
              //       <img
              //         src={
              //           user.profile_img
              //             ? `${process.env.NEXT_PUBLIC_API_URL}/${user.profile_img}`
              //             : '/assets/img/profile/defaultprofile.png'
              //         }
              //         alt="icon-profile"
              //         className="w-12 h-12 rounded-lg ml-3"
              //       />
              //     </div>
              //   )}
              //   {message.receiver_id !== receiver.user_id && (
              //     <div className="flex items-center w-full">
              //       <img
              //         src={
              //           receiver.profile_img
              //             ? `${process.env.NEXT_PUBLIC_API_URL}/${receiver.profile_img}`
              //             : '/assets/img/profile/defaultprofile.png'
              //         }
              //         alt="icon-profile"
              //         className="w-12 h-12 rounded-lg mr-3"
              //       />
              //       <div className={style['left-message']}>{message.message}</div>
              //     </div>
              //   )}
              // </div>
            ))}
          </NavbarChat>
          <div className="flex w-full bg-white box-border" style={{ height: '10vh' }}>
            <InputChat
              value={message}
              onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : '')}
              onChange={messageHandler}
              placeholder="Type your message..."
            />
          </div>
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default PrivateRoute(Home);
