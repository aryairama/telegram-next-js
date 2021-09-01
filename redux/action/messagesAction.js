import { default as axios } from '../../configs/axiosConfig';

export const readMessages = async (receiver_id) => {
  try {
    const data = await (await axios.get(`messages/${receiver_id}`)).data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
