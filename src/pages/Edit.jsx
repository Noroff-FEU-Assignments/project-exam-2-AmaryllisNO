import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthContext from '../context/AuthContext';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';
import useAxios from '../utils/useAxios';

import { addSchema } from '../utils/schemas';

import Glass from '../components/Glass';
import Heading from '../components/Heading';

const establishmentsUrl = `${BASE_URL}${ESTABLISHMENTS_PATH}`;

const Edit = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [establishment, setEstablishment] = useState([]);
  const [editedEstablishment, setEditedEstablishment] = useState([]);

  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const http = useAxios();

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        setLoading(true);

        if (loading) {
          console.log('loading');
        }

        const res = await http.get(establishmentsUrl);

        if (res.status === 200) {
          console.log('call successful');
          setEstablishment(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEstablishments();
  }, [establishmentsUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSchema),
  });
  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title='Edit ""' />
          <form>
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
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Featured</span>
                  <input
                    className='form__input'
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
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Host</span>
                  <input
                    className='form__input'
                    name='name'
                    placeholder='Enter host name name...'
                    type='text'
                    {...register('host')}
                  />
                </label>
              </div>
            </fieldset>
            <button className='button button--form' type='submit'>
              {submitting ? 'Adding Accommodation...' : 'Add Accommodation'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
