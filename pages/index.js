/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import PrivateRoute from '../components/hoc/PrivateRoute';
import { NavbarChat } from '../components/module';
import { InputChat } from '../components/base';
import { useEffect } from 'react';

const Home = ({ socket, setupSocket, ...props }) => {
  const { receiver } = useSelector((state) => state.chat);
  useEffect(() => {
    if (Object.keys(receiver).length > 0) {
      props.setShowSidebar(true);
    }
    setupSocket();
  }, []);
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
            <p className="text-red-400">ini text</p>
          </NavbarChat>
          <div className="flex w-full bg-white box-border" style={{ height: '10vh' }}>
            <InputChat placeholder="Type your message..." />
          </div>
        </>
      )}
    </>
  );
};

export default PrivateRoute(Home);
