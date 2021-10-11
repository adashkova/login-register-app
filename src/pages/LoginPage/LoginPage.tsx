import React, { FC, useState } from 'react';
import { IValuesLogin } from '../../interfaces';
import { Col, Layout, Row, Button, Alert, Space } from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Content } = Layout;

const StyledContainer = styled(Row)`
  height: 93vh;
`;

const StyledField = styled(Field)`
  min-width: 400px;
`;

const LoginPage: FC = () => {
  const initialValues: IValuesLogin = {
    email: '',
    password: '',
  };

  const [isSubmit, setIsSubmit] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
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
          <Col span={24}>

            <Col span={24}>
              <h1>Please, Login</h1>
            </Col>

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
                  <Space direction="vertical">

                    {isSubmit && <Alert message="Success!" type="success" />}

                    <label htmlFor="email">Email</label>
                    <StyledField id="email" name="email" type="email" />

                    {errors.email && touched.email && (
                      <Alert message={errors.email} type="error" />
                    )}

                    <label htmlFor="password">Password</label>
                    <StyledField id="password" name="password" />

                    {errors.password && touched.password && (
                      <Alert message={errors.password} type="error" />
                    )}

                    <Button
                      type="primary"
                      disabled={!isValid}
                      htmlType="submit"
                      style={{ marginTop: '10px' }}
                    >
                      Log In
                    </Button>

                  </Space>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </StyledContainer>
    </Content>
  );
};

export default LoginPage;
