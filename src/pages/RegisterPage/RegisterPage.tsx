import React, { useState } from 'react';
import { IValuesRegister } from '../../interfaces';
import { Layout } from 'antd';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { LIST_OF_COUNTRIES, PHONE_NUMBER_MASK } from '../../constants';
import { Select } from 'antd';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Option } = Select;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    aline-items: center;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60vw;
    padding: 5px 10px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  aline-items: center;
  background-color: #efefef;
  height: 100vh;
  button {
    cursor: pointer;
  }
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
  const [country, setcountry] = useState('');
  const [isValid, setIsValid] = useState(true);

  function handleChange(value: string) {
    setcountry(value);
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
      .max(50, 'Phone number must containes 10 digits!!')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        'Need one lower case letter and one Capital '
      ),
  });

  return (
    <Content>
      <StyledContainer>
        <Wrapper>
          <h1>Signup</h1>

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
                setRegValues(user);

                setSubmitting(false);
              }, 500);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {errors.firstName ||
                errors.lastName ||
                errors.password ||
                errors.phoneNumber ||
                errors.email ||
                !country
                  ? setIsValid(false)
                  : setIsValid(true)}
                <label htmlFor="firstName">First Name</label>
                <Field id="firstName" name="firstName" placeholder="John" />
                {errors.firstName && touched.firstName ? (
                  <StyledError>{errors.firstName}</StyledError>
                ) : null}

                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" placeholder="Doe" />
                {errors.lastName && touched.lastName ? (
                  <StyledError>{errors.lastName}</StyledError>
                ) : null}

                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="john@acme.com"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <StyledError>{errors.email}</StyledError>
                ) : null}

                <label htmlFor="phoneNumber">Phone number</label>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone number"
                  mask={PHONE_NUMBER_MASK}
                />

                {errors.phoneNumber && touched.phoneNumber ? (
                  <StyledError>{errors.phoneNumber}</StyledError>
                ) : null}

                <label htmlFor="password">Password </label>
                <Field id="password" name="password" placeholder="Password" />
                {errors.password && touched.password ? (
                  <StyledError>{errors.password}</StyledError>
                ) : null}

                <label htmlFor="country">Country</label>
                <Select
                  showSearch
                  style={{ width: 200 }}
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
                  <button type="submit">Submit</button>
                ) : (
                  <button type="submit" disabled>
                    Submit
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
