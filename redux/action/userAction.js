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
    history.push('/');
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
  }
};

export const forgotPassword = async (formData) => {
  try {
    await axios.post('/users/forgot-password', formData);
    swal('Reset password', 'Please check your email for confitm reset password!', 'success');
  } catch (error) {
    swal('Failed', error?.response?.data?.message, 'error');
    console.log(error);
  }
};

export const resetPassword = async (formData, history, token) => {
  console.log(token);
  try {
    await axios.post('/users/reset-password', { password: formData.newpassword, tokenPassword: token });
    swal('Success', 'Successfully reset password!', 'success');
    history.push('/auth/login');
  } catch (error) {
    swal('Failed', error?.response?.data?.message, 'error');
    console.log(error);
  }
};

export const updateProfile = (formData) => async (dispatch, getState) => {
  try {
    const dataUpdate = new FormData();
    dataUpdate.append('email', formData.email);
    if (formData.profile_img) {
      dataUpdate.append('profile_img', formData.profile_img);
    }
    dataUpdate.append('name', formData.name);
    dataUpdate.append('phone_number', formData.phone_number);
    dataUpdate.append('bio', formData.bio);
    dataUpdate.append('username', formData.username);
    const { data } = await (await axios.post(`/users/${getState().user.user.user_id}`, dataUpdate)).data;
    dispatch({ type: 'PROFILE', payload: { ...getState().user.user, ...data } });
    swal('Success', 'Successfully changed profile', 'success');
  } catch (error) {
    if (error.response?.data?.statusCode === 422) {
      swal('Failed', error?.response?.data?.error[0].msg, 'error');
    } else {
      swal('Error', 'Update profile failed', 'error');
      console.log(error);
    }
  }
};

export const changePassword = async (formDataPassword) => {
  try {
    const data = {
      old_password: formDataPassword.currentpassword,
      new_password: formDataPassword.newpassword,
    };
    await axios.patch('/users/update-password', data);
    swal('Success', 'Successfully changed password', 'success');
  } catch (error) {
    swal('Failed', error?.response?.data?.message, 'error');
  }
};
