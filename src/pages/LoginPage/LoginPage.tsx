import React, { useState } from 'react';
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
  const [isValid, setIsValid] = useState(true);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required'),
  });

  return (
    <Content>
      <StyledContainer>
        <Wrapper>
          <h1>Login</h1>

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
                <Field
                  id="email"
                  name="email"
                  placeholder="john@acme.com"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <StyledError>{errors.email}</StyledError>
                ) : null}

                <label htmlFor="password">Password </label>
                <Field id="password" name="password" placeholder="Password" />
                {errors.password && touched.password ? (
                  <StyledError>{errors.password}</StyledError>
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

export default LoginPage;
