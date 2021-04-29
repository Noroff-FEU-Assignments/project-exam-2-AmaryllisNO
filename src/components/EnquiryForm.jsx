import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BASE_URL, ENQUIRIES_PATH } from '../utils/constants';

import axios from 'axios';
import { enquirySchema } from '../utils/schemas';

const EnquiryForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [enquiry, setEnquiry] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(enquirySchema),
  });

  const onSubmit = async (data) => {
    console.log('submit enquiry', data);
    setSubmitting(true);
    console.log(submitting);

    try {
      const res = await axios.post(`${BASE_URL}${ENQUIRIES_PATH}`, data);
      console.log(res);
      setEnquiry(res.data);
    } catch (error) {
      console.log('error;', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (enquiry) {
    console.log(enquiry);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <fieldset className='form__fieldset'>
        <input
          className='form__input'
          name='name'
          placeholder='Name'
          type='text'
          {...register('name')}
        />
        <input
          className='form__input'
          name='email'
          placeholder='E-mail'
          type='email'
          {...register('email')}
        />
        <input
          className='form__input'
          name='doa'
          placeholder='doa'
          type='date'
          {...register('doa')}
        />
        <input
          className='form__input'
          name='days'
          placeholder='Days'
          type='number'
          value='1'
          min='1'
          {...register('days')}
        />
      </fieldset>
      <button className='button button--form' type='submit'>
        Send Booking Request
      </button>
    </form>
  );
};

export default EnquiryForm;
