import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/schemas';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import { BASE_URL, AUTH_PATH } from '../utils/constants';

import Glass from '../components/Glass';
import Heading from '../components/Heading';

const Login = () => {
  const history = useHistory();
  console.log(useContext(AuthContext));
  const [, setAuth] = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const res = await axios.post(`${BASE_URL}${AUTH_PATH}`, data);
      setAuth(res.data);

      if (res.status === 200) {
        history.push('/admin');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Glass />

      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title={window.location.pathname.replace('/', '')} />
          <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <fieldset disabled={submitting} className='form__fieldset'>
              <input
                className='form__input'
                placeholder='Username'
                type='text'
                {...register('identifier')}
              />
              <input
                className='form__input'
                placeholder='Password'
                type='password'
                {...register('password')}
              />
            </fieldset>
            <button className='button button--form' type='submit'>
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
