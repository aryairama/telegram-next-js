import { default as axios } from '../../configs/axiosConfig';
import { toast } from 'react-toastify';

export const readMessages = async (receiver_id) => {
  try {
    const data = await (await axios.get(`messages/${receiver_id}`)).data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getStatusReceiver = async (user_id) => {
  try {
    const data = await (await axios.get(`/users/status/${user_id}`)).data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async (idMessage) => {
  try {
    await axios.delete(`/messages/${idMessage}`);
    toast.success('successfully delete message');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const readStatusMessages = async (senderId, receiverId) => {
  try {
    await axios.post('/messages/read', { sender_id: senderId, receiver_id: receiverId });
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
