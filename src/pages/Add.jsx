import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

import useAxios from '../utils/useAxios';

import { accommodationSchema } from '../utils/schemas';

import Glass from '../components/Glass';
import Heading from '../components/Heading';

const Add = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [establishment, setEstablishment] = useState([]);

  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const http = useAxios();

  if (!auth) {
    history.push('/login');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accommodationSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await http.post(`${BASE_URL}${ESTABLISHMENTS_PATH}`, data);

      setEstablishment(res.data);
      setSuccess(true);
    } catch (error) {
      setError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title='Add Accommodation' />
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='form__fieldset' disabled={submitting}>
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Name</span>
                  <input
                    className='form__input'
                    name='name'
                    placeholder='Enter your name...'
                    type='text'
                    {...register('name')}
                  />
                </label>
              </div>
              {errors.name && <p className='error'>{errors.name?.message}</p>}
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Image URL</span>
                  <input
                    className='form__input'
                    name='image_url'
                    placeholder='Enter your image link...'
                    type='text'
                    {...register('image_url')}
                  />
                </label>
              </div>
              {errors.image_url && (
                <p className='error'>{errors.image_url?.message}</p>
              )}
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Featured</span>
                  <input
                    className='form__input form__input--checkbox'
                    name='featured'
                    placeholder='Enter your name...'
                    type='checkbox'
                    {...register('featured')}
                  />
                </label>
              </div>
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Description</span>
                  <textarea
                    className='form__input'
                    name='description'
                    placeholder='Enter a description...'
                    type='text'
                    {...register('description')}
                  />
                </label>
              </div>
              {errors.description && (
                <p className='error'>{errors.description?.message}</p>
              )}
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Price</span>
                  <input
                    className='form__input'
                    name='price'
                    placeholder='Enter a price per night...'
                    type='number'
                    {...register('price')}
                  />
                </label>
              </div>
              {errors.price && <p className='error'>{errors.price?.message}</p>}
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Host</span>
                  <input
                    className='form__input'
                    name='name'
                    placeholder='Enter host name...'
                    type='text'
                    {...register('host')}
                  />
                </label>
              </div>
              {errors.host && <p className='error'>{errors.host?.message}</p>}
            </fieldset>
            <button className='button button--form' type='submit'>
              {submitting ? 'Adding Accommodation...' : 'Add Accommodation'}
            </button>
          </form>
          {success && <p>{establishment.name} has been added!</p>}
          {error && <p className='error'>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Add;
