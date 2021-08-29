import { default as axios } from '../../configs/axiosConfig';
import swal from 'sweetalert';

export const register = async (formData, history) => {
  try {
    await axios.post('/users/register', formData);
    swal('Registration is successful', 'Please check your email for email verification!', 'success');
    history.push('/auth/login');
  } catch (error) {
    if (error.response?.data?.statusCode === 422) {
      swal('Failed', error?.response?.data?.error[0].msg, 'error');
    } else {
      swal('Error', 'Registration failed', 'error');
      console.log(error);
    }
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await (await axios.post('/users/login', formData)).data;
    dispatch({ type: 'LOGIN', payload: data });
    swal('Success', 'Login successful', 'success');
    history.back();
  } catch (error) {
    swal('Failed', error?.response?.data?.message, 'error');
    console.log(error);
  }
};

export const logout = (history) => async (dispatch, getState) => {
  try {
    await axios.delete('/users/logout');
    dispatch({ type: 'LOGOUT', payload: {} });
    history.push('/auth/login');
  } catch (error) {
    swal('Error', 'Logout failed', 'error');
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const { data } = await (await axios.get('/users/profile')).data;
    dispatch({ type: 'PROFILE', payload: data });
  } catch (error) {
    dispatch({ type: 'LOGOUT', payload: {} });
    dispatch({ type: 'ADD_RESERVATION', payload: {} });
  }
};
