import style from './TabList.module.css';

const TabContainer = (props) => {
  return <ul className={`${props.className} ${style['tab-list-container']}`}>{props.children}</ul>;
};

export default TabContainer;
