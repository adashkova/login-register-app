import React, { useState, useEffect } from 'react';
import { IValuesRegister } from '../../interfaces';
import { Layout } from 'antd';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { LIST_OF_COUNTRIES } from '../../constants';
import { Select } from 'antd';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Option } = Select;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;

  input {
    margin-bottom: 10px;
  }

  button {
    color: white;
    margin-top: 20px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  aline-items: center;
  background-color: #efefef;
  height: 100vh;
`;

const StyledError = styled.div`
  color: red;
`;

const RegisterPage: React.FC<{}> = () => {
  const initialValues: IValuesRegister = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: '',
  };

  const [regValues, setRegValues] = useState<IValuesRegister>(initialValues);
  const [country, setCountry] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  function handleChange(value: string) {
    setCountry(value);
  }

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
      .min(10, 'Phone number must containes 10 digits!')
      .max(10, 'Phone number must containes 10 digits!!')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        'Password must have at least one capital letter and one digit, without spaces and dashes'
      ),
  });

  useEffect(() => {
    setIsValid(false);
  }, []);

  return (
    <Content>
      <StyledContainer>
        <Wrapper>
          <h1>Please, Sign Up</h1>

          <Formik
            initialValues={regValues}
            validationSchema={SignupSchema}
            validateOnChange
            onSubmit={(
              values: IValuesRegister,
              { setSubmitting }: FormikHelpers<IValuesRegister>
            ) => {
              setTimeout(() => {
                const user: IValuesRegister = values;
                let val = user.phoneNumber;
                user.phoneNumber = `+7(${val.substring(0, 3)})${val.substring(
                  3,
                  6
                )}-${val.substring(6, 8)}-${val.substring(8, val.length)}`;

                setRegValues(user);
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {!errors.firstName &&
                !errors.lastName &&
                !errors.password &&
                !errors.phoneNumber &&
                !errors.email &&
                country
                  ? setIsValid(true)
                  : setIsValid(false)}

                <label htmlFor="firstName">First Name</label>
                <Field id="firstName" name="firstName" />
                {errors.firstName && touched.firstName ? (
                  <StyledError>{errors.firstName}</StyledError>
                ) : null}

                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" />
                {errors.lastName && touched.lastName ? (
                  <StyledError>{errors.lastName}</StyledError>
                ) : null}

                <label htmlFor="email">Email</label>
                <Field id="email" name="email" type="email" />
                {errors.email && touched.email ? (
                  <StyledError>{errors.email}</StyledError>
                ) : null}

                <label htmlFor="phoneNumber">Phone number</label>
                <Field id="phoneNumber" name="phoneNumber" />

                {errors.phoneNumber && touched.phoneNumber ? (
                  <StyledError>{errors.phoneNumber}</StyledError>
                ) : null}

                <label htmlFor="password">Password </label>
                <Field id="password" name="password" />
                {errors.password && touched.password ? (
                  <StyledError>{errors.password}</StyledError>
                ) : null}

                <label htmlFor="country">Country</label>
                <Select
                  showSearch
                  style={{ maxWidth: 600 }}
                  placeholder="Russia"
                  defaultValue="Select a country"
                  onChange={handleChange}
                >
                  {LIST_OF_COUNTRIES.map((country, index) => {
                    return (
                      <Option key={index} value={country}>
                        {country}
                      </Option>
                    );
                  })}
                </Select>
                {!country ? (
                  <StyledError>{'Country is required'}</StyledError>
                ) : null}

                {isValid ? (
                  <button type="submit">Sign Up</button>
                ) : (
                  <button type="submit" disabled>
                    Sign Up
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </Wrapper>
      </StyledContainer>
    </Content>
  );
};

export default RegisterPage;
