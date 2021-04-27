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
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <input
          name='name'
          placeholder='name'
          type='text'
          {...register('name')}
        />
        <input
          name='email'
          placeholder='email'
          type='email'
          {...register('email')}
        />
        <input name='doa' placeholder='doa' type='date' {...register('doa')} />
        <input
          name='days'
          placeholder='days'
          type='number'
          {...register('days')}
        />
      </fieldset>
      <button className='button' type='submit'>
        Send Message
      </button>
    </form>
  );
};

export default EnquiryForm;
