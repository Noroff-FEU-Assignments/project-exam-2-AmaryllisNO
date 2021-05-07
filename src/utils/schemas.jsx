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
  establishment: yup.string().required(),
  name: yup.string().required('Please enter your name'),
  email: yup.string().email().required('Please enter your email'),
  doa: yup
    .date('Please enter your date of arrival')
    .required('Please enter your date of arrival')
    .typeError('Please enter your date of arrival'),

  days: yup
    .number()
    .required('Please enter how long you will be staying')
    .typeError('Please enter how long you will be staying'),
  sum: yup.number(),
});

export const addSchema = yup.object().shape({
  name: yup.string().required('Please enter the name of the establishment'),
  image_url: yup.string().required(),
  featured: yup.boolean().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  host: yup.string().required(),
});

export const loginSchema = yup.object().shape({
  identifier: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password'),
});
