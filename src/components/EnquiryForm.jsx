import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BASE_URL, ENQUIRIES_PATH } from '../utils/constants';

import axios from 'axios';
import { enquirySchema } from '../utils/schemas';

const EnquiryForm = ({ props }) => {
  let { name, price } = props;

  if (props) {
    console.log(name);
    console.log(price);
  }

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [enquiry, setEnquiry] = useState(null);
  const [valueDays, setValueDays] = useState(0);
  const [sum, setSum] = useState(price);

  // enquiry submission
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(enquirySchema),
  });

  const onSubmit = async (data) => {
    console.log('submit enquiry', data);
    setSubmitting(true);

    try {
      const res = await axios.post(`${BASE_URL}${ENQUIRIES_PATH}`, data);
      console.log(res);
      setEnquiry(res.data);
      setSuccess(true);
    } catch (error) {
      console.log('error;', error);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAddedSum = () => {
    if (valueDays === 0) {
      setSum(price);
      setValueDays(1);
    } else {
      setSum(price * (valueDays + 1));
    }

    if (!sum) {
      setValueDays(0);
      console.log('reset days to 0');
    }

    console.log('sum calculated');
    console.log('days:', valueDays);
  };

  const calculateSubtractedSum = () => {
    if (valueDays === 0) {
      setSum(price);
      setValueDays(1);
    } else {
      setSum(price * (valueDays - 1));
    }

    if (!sum) {
      setValueDays(0);
      console.log('reset days to 0');
    }

    console.log('sum calculated');
    console.log('days:', valueDays);
  };

  const add = () => {
    setValueDays(valueDays + 1);

    calculateAddedSum();
  };

  const subtract = () => {
    if (valueDays >= 2) {
      setValueDays(valueDays - 1);
    }
    calculateSubtractedSum();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <h3>Enquiry Form</h3>
      <fieldset className='form__fieldset' disabled={submitting}>
        {name ? (
          <input
            // disabled={true}
            className='form__input form__input--heading'
            name='establishment'
            placeholder='Establishment'
            value={name}
            type='text'
            {...register('establishment')}
          />
        ) : (
          <></>
        )}

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
        {errors.name && <p>{errors.name?.message}</p>}

        <div className='form__inputcontainer'>
          <label className='form__inputlabel'>
            <span className='form__inputlabelname'>E-mail</span>
            <input
              className='form__input'
              name='email'
              placeholder='Enter your e-mail...'
              type='email'
              {...register('email')}
            />
          </label>
        </div>
        {errors.email && <p>{errors.email?.message}</p>}

        <div className='form__inputcontainer'>
          <label className='form__inputlabel'>
            <span className='form__inputlabelname'>Arrival Date</span>
            <input
              className='form__input'
              name='doa'
              placeholder='doa'
              type='date'
              {...register('doa', {
                required: 'Please enter your date of arrival',
              })}
            />
          </label>
        </div>
        {errors.doa && <p>{errors.doa?.message}</p>}

        <div className='form__inputcontainer form__inputcontainer--number'>
          <label className='form__inputlabel'>
            <span className='form__inputlabelname'>Days Staying</span>
            <input
              className='form__input form__input--number'
              name='days'
              placeholder='Days'
              type='number'
              value={valueDays}
              min='1'
              {...register('days')}
            />
            <div className='form__numcontrolcontainer'>
              <span onClick={add} className='form__inputnumcontrol'>
                +
              </span>
              <span onClick={subtract} className='form__inputnumcontrol'>
                -
              </span>
            </div>
          </label>
        </div>
        {errors.days && <p>{errors.days?.message}</p>}
      </fieldset>

      <fieldset className='form__fieldset'>
        {sum ? (
          <div className='form__inputcontainer'>
            <label className='form__inputlabel'>
              <span className='form__inputlabelname'>Sum</span>
              <input
                className='form__input'
                value={sum}
                name='sum'
                {...register('sum')}
              ></input>
            </label>
          </div>
        ) : (
          <></>
        )}
      </fieldset>
      {success ? (
        <p>
          Enquiry for {enquiry.establishment} was submitted. Thank you,
          {enquiry.name}
        </p>
      ) : (
        <></>
      )}
      <button className='button button--form' type='submit'>
        Send Booking Request
      </button>
    </form>
  );
};

export default EnquiryForm;
