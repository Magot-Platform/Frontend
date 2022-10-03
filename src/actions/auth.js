import api from '../utils/api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  MEMBERSHIP_UPDATED,
  LOGOUT
} from './types';
import msg from './msg.json';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/authUser');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

    return msg.register_success;
  } catch (err) {
    const error = err.response.data.error;

    dispatch({
      type: REGISTER_FAIL
    });

    return error;
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  console.log(email)

  try {
    const res = await api.post('/authUser', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    return msg.login_success;
  } catch (err) {
    const error = err.response.data.error;

    dispatch({
      type: LOGIN_FAIL
    });

    console.log(error)
    return error;
  }
};

// Update Membership
export const updateMembership = (membership) => async (dispatch) => {
  const body = { membership };

  try {
    const res = await api.post('/users/updateMembershipByUser', body);
    dispatch({
      type: MEMBERSHIP_UPDATED,
      payload: res.data
    });

    dispatch(loadUser());

    return true;
  } catch (err) {
    const error = err.response.data.error;

    return error;
  }
};

// Update User Avatar
export const updateUserAvatar = (formData) => async (dispatch) => {
  try {
    await api.post('/users/updateUserAvatar', formData);

    dispatch(loadUser());

    return true;
  } catch (error) {
    return false;
  }
}

// Update User Info
export const updateUser = (name, header, bio) => async (dispatch) => {
  const body = { name, header, bio };

  console.log(body)
  try {
    await api.post('/users/update', body);

    dispatch(loadUser());

    return true;
  } catch (error) {
    return false;
  }
}

// Logout
export const logout = () => ({ type: LOGOUT });
