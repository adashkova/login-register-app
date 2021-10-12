import React, { FC, useState } from 'react';
import { IValuesLogin } from '../../interfaces';
import { Col, Layout, Row, Button, Alert } from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Content } = Layout;

const StyledContainer = styled(Row)`
  height: 100vh;
`;

const StyledField = styled(Field)`
  min-width: 300px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  height: 40px;
  margin: 10px 0;
  font-size: 1rem;
  outline: none;
`;

const LoginPage: FC = () => {
  const initialValues: IValuesLogin = {
    email: '',
    password: '',
  };

  const [isSubmit, setIsSubmit] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .required('Password is required'),
  });

  const handleSubmit = (values: IValuesLogin) => {
    setIsSubmit(true);
    setTimeout(() => {
      setIsSubmit(false);
    }, 2000);
  };

  return (
    <Content>
      <StyledContainer justify={'center'}>
        <Row align={'middle'} justify={'center'}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            validateOnChange
            onSubmit={values => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, isValid }) => (
              <Form>
                {isSubmit && <Alert message="Success!" type="success" />}

                <Row align={'middle'} justify={'center'}>
                  <h1>Please, Login</h1>
                </Row>

                <Col span={24}>
                  <StyledField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />

                  {errors.email && touched.email && (
                    <Alert message={errors.email} type="error" />
                  )}
                </Col>

                <Col span={24}>
                  <StyledField
                    id="password"
                    name="password"
                    placeholder="Password"
                  />

                  {errors.password && touched.password && (
                    <Alert message={errors.password} type="error" />
                  )}
                </Col>

                <Row align={'middle'} justify={'center'}>
                  <Button
                    type="primary"
                    disabled={!isValid}
                    htmlType="submit"
                    style={{ marginTop: '10px' }}
                  >
                    Log In
                  </Button>
                </Row>
                
              </Form>
            )}
          </Formik>
        </Row>
      </StyledContainer>
    </Content>
  );
};

export default LoginPage;
