import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { accommodationSchema } from '../utils/schemas';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useAxios from '../utils/useAxios';
import { ESTABLISHMENTS_PATH } from '../utils/constants';

const EditForm = ({ establishment }) => {
  const http = useAxios();
  let { id } = useParams();
  const [editedEstablishment, setEditedEstablishment] = useState(establishment);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  console.log(editedEstablishment);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: establishment,
    resolver: yupResolver(accommodationSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError(null);
    console.log(data);

    try {
      const res = await http.put(`${ESTABLISHMENTS_PATH}/${id}`, data);
      console.log(res);
      setEditedEstablishment(res.data);
      setSuccess(true);
    } catch (error) {
      console.log('error;', error);
      setError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        {error && <p>{error}</p>}
        <fieldset className='form__fieldset' disabled={submitting}>
          <div className='form__inputcontainer'>
            <label className='form__inputlabel'>
              <span className='form__inputlabelname'>Name</span>
              <input
                className='form__input'
                type='text'
                // defaultValue={establishment.name}
                name='name'
                placeholder='Enter your name...'
                {...register('name')}
              />
            </label>
          </div>
          {errors.name && <p className='error'>{errors.name.message}</p>}
          <div className='form__inputcontainer'>
            <label className='form__inputlabel'>
              <span className='form__inputlabelname'>Image URL</span>
              <input
                className='form__input'
                // defaultValue={establishment.image_url}
                name='image_url'
                placeholder='Enter your image link...'
                type='text'
                {...register('image_url')}
              />
            </label>
          </div>
          {errors.image_url && (
            <p className='error'>{errors.image_url.message}</p>
          )}
          <div className='form__inputcontainer'>
            <label className='form__inputlabel'>
              <span className='form__inputlabelname'>Featured</span>
              <input
                className='form__input form__input--checkbox'
                // defaultChecked={establishment.featured}
                // defaultValue={establishment.featured}
                name='featured'
                placeholder='Enter your name...'
                type='checkbox'
                {...register('featured')}
              />
            </label>
          </div>
          {errors.featured && (
            <p className='error'>{errors.featured.message}</p>
          )}
          <div className='form__inputcontainer'>
            <label className='form__inputlabel'>
              <span className='form__inputlabelname'>Description</span>
              <textarea
                className='form__input'
                // defaultValue={establishment.description}
                name='description'
                placeholder='Enter a description...'
                type='text'
                {...register('description')}
              />
            </label>
          </div>
          {errors.description && (
            <p className='error'>{errors.description.message}</p>
          )}
          <div className='form__inputcontainer'>
            <label className='form__inputlabel'>
              <span className='form__inputlabelname'>Price</span>
              <input
                className='form__input'
                // defaultValue={establishment.price}
                name='price'
                placeholder='Enter a price per night...'
                type='number'
                {...register('price')}
              />
            </label>
          </div>
          {errors.price && <p className='error'>{errors.price.message}</p>}
          <div className='form__inputcontainer'>
            <label className='form__inputlabel'>
              <span className='form__inputlabelname'>Host</span>
              <input
                className='form__input'
                // defaultValue={establishment.host}
                name='name'
                placeholder='Enter host name name...'
                type='text'
                {...register('host')}
              />
            </label>
          </div>
          {errors.host && <p className='error'>{errors.host.message}</p>}
        </fieldset>
        <button
          className='button button--form'
          type='submit'
          // onClick={() => reset({ defaultValues })}
        >
          {submitting ? 'Editing Accommodation...' : 'Edit Accommodation'}
        </button>
      </form>
      {success ? <p>Listing of {establishment.name} was updated</p> : null}
    </>
  );
};

export default EditForm;
