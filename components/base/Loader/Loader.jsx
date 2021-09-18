import { useSelector } from 'react-redux';

const Loader = (props) => {
  const { show } = useSelector((state) => state.loader);
  return (
    <div
      className={`${
        props.show ? (props.show === true ? 'flex' : 'hidden') : show ? 'flex' : 'hidden'
      } absolute w-full h-full right-0 left-0 top-0 bottom-0 bg-white z-50 flex justify-center items-center`}
    >
      <img src="/assets/icon/loader.gif" alt="icon-loader" className="h-64 w-64" />
    </div>
  );
};

export default Loader;
