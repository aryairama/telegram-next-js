import { default as axios } from '../../configs/axiosConfig';
import { toast } from 'react-toastify';

export const privateContacts = async (limit, order, page = 1, search = '', fieldOrder = '') => {
  try {
    const data = await (
      await axios.get(
        `/contacts/private?order=${order}&limit=${limit}&page=${page}&search=${search}&fieldOrder=${fieldOrder}`
      )
    ).data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const publicContacts = async (limit, order, page = 1, search = '', fieldOrder = '') => {
  try {
    const data = await (
      await axios.get(`/contacts?order=${order}&limit=${limit}&page=${page}&search=${search}&fieldOrder=${fieldOrder}`)
    ).data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const listContact = async (limit, order, page = 1, search = '', fieldOrder = '') => {
  try {
    const data = await (
      await axios.get(
        `/contacts/list-contact?order=${order}&limit=${limit}&page=${page}&search=${search}&fieldOrder=${fieldOrder}`
      )
    ).data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addContact = async (idUser) => {
  try {
    await axios.post('/contacts', { user_id: idUser });
    toast.success('Successfully add contact');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const deleteContact = async (contact_id) => {
  try {
    await axios.delete(`/contacts/${contact_id}`);
    toast.success('Successfully delete contact');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
