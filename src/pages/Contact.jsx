import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { contactSchema } from '../utils/schemas';

import Heading from '../components/Heading';
import Glass from '../components/Glass';

import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(contactSchema),
  });

  return (
    <>
      <Glass></Glass>
      <div className='wrapper'>
        <div className='desktop-container'>
          <Heading title='Contact'></Heading>
          <form>
            <fieldset>
              <div>
                <input name='name' placeholder='Name' ref={register} />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
