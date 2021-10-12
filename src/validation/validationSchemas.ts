import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name is required required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
      .min(10, 'Phone number must containes 10 digits!')
      .max(10, 'Phone number must containes 10 digits!!')
      .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        'Must have one capital letter and one digit'
      ),
    country: Yup.string().required('Country is required'),
  });

  export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .required('Password is required'),
  });
