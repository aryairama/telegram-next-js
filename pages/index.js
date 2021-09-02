/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import PrivateRoute from '../components/hoc/PrivateRoute';
import { NavbarChat } from '../components/module';
import { InputChat } from '../components/base';
import { useEffect, useState } from 'react';
import { readMessages } from '../redux/action/messagesAction';
import style from '../styles/messages.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

const Home = ({ socket, setupSocket, user, ...props }) => {
  const dispatch = useDispatch();
  const { receiver } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (Object.keys(receiver).length > 0) {
      props.setShowSidebar(true);
      if (receiver.user_id === user.user_id) {
        dispatch({ type: 'ADD_RECEIVER', payload: {} });
      }
    }
    setupSocket();
  }, []);
  useEffect(() => {
    if (Object.keys(receiver).length > 0) {
      document.querySelector('#main-chat').scrollTo(0, document.querySelector('#main-chat').scrollHeight);
    }
  }, [messages]);
  useEffect(async () => {
    if (Object.keys(receiver).length > 0) {
      try {
        const { data } = await readMessages(receiver.user_id);
        setMessages(data);
      } catch (error) {}
    }
  }, [receiver]);
  useEffect(() => {
    if (socket.current && Object.keys(receiver).length > 0) {
      socket.current.off('replySendMessageBE');
      socket.current.on('replySendMessageBE', (data) => {
        if (data.sender_id === receiver.user_id) {
          setMessages((oldValue) => [...oldValue, data]);
        } else {
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
  return (
    <>
      {Object.keys(receiver).length > 0 && (
        <>
          <NavbarChat
            profile_img={receiver.profile_img}
            name={receiver.name}
            status="Online"
            setShowSidebar={props.setShowSidebar}
            setShowRightSidebar={props.setShowRightSidebar}
          >
            {messages?.map((message, index) => (
              <div key={index} className="flex items-center w-full">
                {message.receiver_id !== receiver.user_id && (
                  <img
                    src={
                      receiver.profile_img
                        ? `${process.env.NEXT_PUBLIC_API_URL}/${receiver.profile_img}`
                        : '/assets/img/profile/defaultprofile.png'
                    }
                    alt="icon-profile"
                    className="w-12 h-12 rounded-lg mr-3"
                  />
                )}
                <div
                  className={message.receiver_id === receiver.user_id ? style['right-message'] : style['left-message']}
                >
                  {message.message}
                </div>
                {message.receiver_id === receiver.user_id && (
                  <img
                    src={
                      user.profile_img
                        ? `${process.env.NEXT_PUBLIC_API_URL}/${user.profile_img}`
                        : '/assets/img/profile/defaultprofile.png'
                    }
                    alt="icon-profile"
                    className="w-12 h-12 rounded-lg ml-3"
                  />
                )}
              </div>
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
