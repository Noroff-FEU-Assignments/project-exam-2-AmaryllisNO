import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email().required('Please enter your email'),
  subject: yup.string().required('Please provide a subject'),
  message: yup
    .string()
    .min(10, 'Your message must be atleast 10 characters long'),
});
