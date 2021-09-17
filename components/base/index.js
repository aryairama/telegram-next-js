export { default as InputAuth } from './Input/InputAuth';
export { default as Button } from './Button/Button';
export { default as InputChat } from './Input/InputChat';
export { default as InputGroup } from './Input/InputGroup';
export { default as TabList } from './TabList/TabList';
export { default as TabContainer } from './TabList/TabContainer';
export { default as Dropdown } from './Dropdown/Dropdown';
export { default as DropdownItem } from './Dropdown/DropdownItem';
export { default as CardContact } from './CardContact/CardContact';
export { default as InputSearch } from './Input/InputSearch';
export { default as ListCardContact } from './CardContact/ListCardContact';
export { default as ListChat } from './ListChat/ListChat';

export const buttonItemRender = (current, type, element) => {
  if (type === 'prev') {
    return <button type="button" className="border px-3" title="prev"></button>;
  }
  if (type === 'next') {
    return <button type="button" className="border px-3" title="next"></button>;
  }
  return element;
};

export const localePagination = {
  // Options.jsx
  items_per_page: '/ page',
  jump_to: 'Go to',
  jump_to_confirm: 'confirm',
  page: '',
  // Pagination.jsx
  prev_page: 'Previous Page',
  next_page: 'Next Page',
  prev_5: 'Previous 5 Pages',
  next_5: 'Next 5 Pages',
  prev_3: 'Previous 3 Pages',
  next_3: 'Next 3 Pages',
};
