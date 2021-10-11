import React, { useState, useEffect } from 'react';
import { IValuesLogin } from '../../interfaces';
import { Layout } from 'antd';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Content } = Layout;

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

const LoginPage: React.FC<{}> = () => {
  const initialValues: IValuesLogin = {
    email: '',
    password: '',
  };

  const [logValues, setLogValues] = useState<IValuesLogin>(initialValues);
  const [isValid, setIsValid] = useState<boolean>(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
  });

  useEffect(() => {
    setIsValid(false);
  }, []);

  return (
    <Content>
      <StyledContainer>
        <Wrapper>
          <h1>Please, Login</h1>

          <Formik
            initialValues={logValues}
            validationSchema={LoginSchema}
            validateOnChange
            onSubmit={(
              values: IValuesLogin,
              { setSubmitting }: FormikHelpers<IValuesLogin>
            ) => {
              setTimeout(() => {
                const user: IValuesLogin = values;
                setLogValues(user);

                setSubmitting(false);
              }, 500);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {errors.password || errors.email
                  ? setIsValid(false)
                  : setIsValid(true)}

                <label htmlFor="email">Email</label>
                <Field id="email" name="email" type="email" />
                {errors.email && touched.email ? (
                  <StyledError>{errors.email}</StyledError>
                ) : null}

                <label htmlFor="password">Password </label>
                <Field id="password" name="password" />
                {errors.password && touched.password ? (
                  <StyledError>{errors.password}</StyledError>
                ) : null}

                {isValid ? (
                  <button type="submit">Log In</button>
                ) : (
                  <button type="submit" disabled>
                    Log In
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

export default LoginPage;
