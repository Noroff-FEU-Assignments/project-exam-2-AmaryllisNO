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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    console.log('SUBMITTED');
    setSubmitting(true);
    setContactError(null);
    console.log(data);

    try {
      const res = await axios.post(`${BASE_URL}${MESSAGES_PATH}`, data);
      console.log(res);
      setMessage(res.data);
      setSuccess(true);
    } catch (error) {
      console.log('error', error);
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
              <div>
                <input
                  name='name'
                  placeholder='Name'
                  {...register('name')}
                  type='text'
                  className='form__input'
                />
              </div>
              <div>
                <input
                  name='email'
                  placeholder='Email'
                  {...register('email')}
                  type='text'
                  className='form__input'
                />
              </div>
              <div>
                <input
                  name='subject'
                  placeholder='Subject'
                  {...register('subject')}
                  type='text'
                  className='form__input'
                />
              </div>
              <div>
                <textarea
                  name='message'
                  placeholder='message'
                  {...register('message')}
                  type='text'
                  className='form__input'
                />
              </div>
            </fieldset>
            <button className='button' type='submit'>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
