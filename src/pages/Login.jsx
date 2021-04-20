import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

  return <></>;
};

export default Login;
