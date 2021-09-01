/* eslint-disable react-hooks/exhaustive-deps */
import PrivateRoute from '../../components/hoc/PrivateRoute';
import { Navbar } from '../../components/module';
import { useEffect, useState } from 'react';
import style from '../../styles/contacts.module.css';
import { privateContacts, publicContacts, addContact, deleteContact } from '../../redux/action/contactsAction';
import { CardContact, localePagination, buttonItemRender, InputSearch } from '../../components/base';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacts = (props) => {
  const [myContacts, setMyContacts] = useState({});
  const [allContacts, setAllContacts] = useState({});
  const [pageMyContacts, setPageMyContacts] = useState(1);
  const [pageAllContacts, setPageAllContacts] = useState(1);
  const [triggerReload, setTriggerReload] = useState(false);
  const [search, setSearch] = useState({
    allContacts: '',
    myContacts: '',
  });
  const setSearchHandler = (e) => setSearch((oldValue) => ({ ...oldValue, [e.target.name]: e.target.value }));
  useEffect(() => {
    props.setShowProfile(false);
    props.setShowRightSidebar(false);
  }, []);
  useEffect(async () => {
    try {
      const { data, pagination } = await privateContacts(10, 'DESC', pageMyContacts, search.myContacts);
      setMyContacts({ data, pagination });
    } catch (error) {
      console.log(error);
    }
  }, [pageMyContacts, search.myContacts, triggerReload]);
  useEffect(async () => {
    try {
      const { data, pagination } = await publicContacts(10, 'DESC', pageAllContacts, search.allContacts);
      setAllContacts({ data, pagination });
    } catch (error) {
      console.log(error);
    }
  }, [pageAllContacts, search.allContacts, triggerReload]);
  const addDataContact = async (idUser) => {
    try {
      await addContact(idUser);
      setTriggerReload(!triggerReload);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDataContact = async (contact_id) => {
    try {
      await deleteContact(contact_id);
      setTriggerReload(!triggerReload);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar setShowSidebar={props.setShowSidebar} pageName="Contacts">
      <div className={style['container-contacts']}>
        <div className={style['left-form']}>
          <p className="text-center font-Rubik font-semibold text-primary">My Contacts</p>
          <InputSearch styleContainer="mt-5" name="myContacts" value={search.myContacts} onChange={setSearchHandler} />
          {myContacts?.data?.map((contact, index) => (
            <CardContact
              clickImg={() => deleteDataContact(contact.contact_id)}
              key={index}
              name={contact.name}
              phone_number={contact.phone_number}
              type="delete"
              profile_img={
                contact.profile_img
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${contact.profile_img}`
                  : '/assets/img/profile/defaultprofile.png'
              }
            />
          ))}
          {myContacts?.data?.length === 0 && (
            <p className="text-center mt-10 font-Rubik text-2xl shadow-md py-5 capitalize border">no contact</p>
          )}
          <div className="flex w-full">
            {myContacts?.pagination && (
              <Pagination
                current={pageMyContacts}
                total={myContacts.pagination.countData}
                pageSize={myContacts.pagination.limit ? myContacts.pagination.limit : 1}
                itemRender={buttonItemRender}
                onChange={(current, pageSize) => setPageMyContacts(current)}
                locale={localePagination}
              />
            )}
          </div>
        </div>
        <div className={style['right-form']}>
          <p className="text-center font-Rubik font-semibold text-primary">List Contacts</p>
          <InputSearch
            styleContainer="mt-5"
            name="allContacts"
            value={search.allContacts}
            onChange={setSearchHandler}
          />
          {allContacts?.data?.map((contact, index) => (
            <CardContact
              clickImg={() => addDataContact(contact.user_id)}
              key={index}
              name={contact.name}
              phone_number={contact.phone_number}
              type="add"
              profile_img={
                contact.profile_img
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${contact.profile_img}`
                  : '/assets/img/profile/defaultprofile.png'
              }
            />
          ))}
          {allContacts?.data?.length === 0 && (
            <p className="text-center mt-10 font-Rubik text-2xl shadow-md py-5 capitalize border">no contact</p>
          )}
          <div className="flex w-full">
            {allContacts?.pagination && (
              <Pagination
                current={pageAllContacts}
                total={allContacts.pagination.countData}
                pageSize={allContacts.pagination.limit ? allContacts.pagination.limit : 1}
                itemRender={buttonItemRender}
                onChange={(current, pageSize) => setPageAllContacts(current)}
                locale={localePagination}
              />
            )}
          </div>
        </div>
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
    </Navbar>
  );
};

export default PrivateRoute(Contacts);
