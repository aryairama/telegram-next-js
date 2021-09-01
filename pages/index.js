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

const Home = ({ socket, setupSocket, user, ...props }) => {
  const { receiver } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (Object.keys(receiver).length > 0) {
      props.setShowSidebar(true);
    }
    setupSocket();
  }, []);
  useEffect(async () => {
    if (Object.keys(receiver).length > 0) {
      try {
        const { data } = await readMessages(receiver.user_id);
        setMessages(data);
      } catch (error) {}
    }
  }, [receiver]);
  useEffect(() => {
    if (socket.current && receiver) {
      socket.current.off('replySendMessageBE');
      socket.current.on('replySendMessageBE', (data) => {
        if (data.sender_id === receiver.user_id) {
          setMessages((oldValue) => [...oldValue, data]);
        } else {
          toast.success(`New messages from ${data.sender_name}`);
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
            <div className="flex flex-col">
              {messages?.map((message, index) => (
                <div
                  className={message.receiver_id === receiver.user_id ? style['right-message'] : style['left-message']}
                  key={index}
                >
                  {message.message}
                </div>
              ))}
            </div>
          </NavbarChat>
          <div className="flex w-full bg-white box-border" style={{ height: '10vh' }}>
            <InputChat
              value={message}
              onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : '')}
              onChange={messageHandler}
              placeholder="Type your message..."
            />
          </div>
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
      )}
    </>
  );
};

export default PrivateRoute(Home);
