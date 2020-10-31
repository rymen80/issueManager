import { useEffect } from 'react';
import { getUsers, getUser } from './UserReducer';
import { useUtils } from '../common';
import { reset } from 'redux-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useFetchUsers = () => {
  const {
    dispatch,
  } = useUtils();

  const { users } = useSelector(state => state.user);
  useEffect(() => {
    axios.get('/api/users', { headers: { authorization: localStorage.getItem('token') }})
      .then(res => {
        dispatch(getUsers(res.data));
      })
      .catch(e => console.log(e));

  }, [dispatch]);

  return {
    users,
  };
};


export const useUserView = () => {
  const {
    dispatch,
  } = useUtils();

  const params = useParams();
  console.log(params);
  const { selectedUser } = useSelector(state => state.user);
  useEffect(() => {
    axios.get(`/api/users/${params.userId}`, { headers: { authorization: localStorage.getItem('token') }})
      .then(res => {
        dispatch(getUser(res.data));
      })
      .catch(e => console.log(e));

  }, [dispatch, params.userId]);

  return {
    selectedUser,
  };
};


export const useCreateUser = () => {

  const handleSaveUser = (formValues, dispatch) => {
    console.log(formValues);
    axios.post('/api/users', formValues)
      .then(res => {
        console.log(res);
        dispatch(reset('userCreateForm'));
      });
  };

  return {
    handleSaveUser,
  };
};
