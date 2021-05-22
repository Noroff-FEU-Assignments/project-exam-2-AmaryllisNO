import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { contactSchema } from '../utils/schemas';

import { BASE_URL, MESSAGES_PATH } from '../utils/constants';

import Heading from '../components/Heading';
import Glass from '../components/Glass';

import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [contactError, setContactError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setContactError(null);

    try {
      const res = await axios.post(`${BASE_URL}${MESSAGES_PATH}`, data);
      setMessage(res.data);
      setSuccess(true);
      console.log(message);
    } catch (error) {
      setContactError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title={window.location.pathname.replace('/', '')}></Heading>
          <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <fieldset disabled={submitting} className='form__fieldset'>
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Name</span>
                  <input
                    name='name'
                    placeholder='Name'
                    {...register('name')}
                    type='text'
                    className='form__input'
                  />
                </label>
              </div>
              {errors.name && <p className='error'>{errors.name.message}</p>}
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>E-mail</span>
                  <input
                    name='email'
                    placeholder='Email'
                    {...register('email')}
                    type='text'
                    className='form__input'
                  />
                </label>
              </div>
              {errors.email && <p className='error'>{errors.email.message}</p>}
              <div className='form__inputcontainer'>
                <label className='form__inputlabel'>
                  <span className='form__inputlabelname'>Subject</span>
                  <input
                    name='subject'
                    placeholder='Subject'
                    {...register('subject')}
                    type='text'
                    className='form__input'
                  />
                </label>
              </div>
              {errors.subject && (
                <p className='error'>{errors.subject.message}</p>
              )}
              <div className='form__inputcontainer'>
                <textarea
                  name='message'
                  placeholder='message'
                  {...register('message')}
                  type='text'
                  className='form__input form__input--textleft'
                />
              </div>
              {errors.message && (
                <p className='error'>{errors.message.message}</p>
              )}
            </fieldset>
            <button className='button button--form' type='submit'>
              Send Message
            </button>
          </form>
          {success && <p>Message was sent!</p>}
          {contactError && <p className='error'>{contactError}</p>}
        </div>
      </div>
    </>
  );
};

export default Contact;
