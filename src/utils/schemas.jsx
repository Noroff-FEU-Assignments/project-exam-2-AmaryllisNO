import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email().required('Please enter your email'),
  subject: yup.string().required('Please provide a subject'),
  message: yup
    .string()
    .min(10, 'Your message must be atleast 10 characters long'),
});

export const enquirySchema = yup.object().shape({
  establishment: yup.string(),
  name: yup.string().required('Please enter your name'),
  email: yup.string().email().required('Please enter your email'),
  doa: yup.date().required('Please enter your date of arrival'),
  days: yup.number().required('Please enter how long you will be staying'),
});

export const loginSchema = yup.object().shape({
  identifier: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password'),
});
