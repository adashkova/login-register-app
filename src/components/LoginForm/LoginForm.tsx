import React, { FC } from 'react';
import { IValuesLogin } from '../../interfaces';
import { Col, Row, Button, Alert, Input, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import { loginSchema } from '../../validation/validationSchemas';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const StyledField = styled(Input)`
  margin: 5px 0;
  height: 40px;
`;

const StyledPasswordField = styled(Input.Password)`
  margin: 5px 0;
  height: 40px;
`;

const LoginForm: FC = () => {
  const initialValues: IValuesLogin = {
    email: '',
    password: '',
  };
  
  const openNotification = () => {
    notification.open({
      message: 'Logged',
      description: '',
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      validateOnChange
      onSubmit={() => {
        openNotification();
      }}
    >
      {({ errors, touched, isValid, setFieldValue, handleBlur }) => (

        <Form>
            
          <Row align={'middle'} justify={'center'}>
            <h1>Please, Login</h1>
          </Row>

          <Col span={24}>
            <StyledField
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={e => setFieldValue('email', e.target.value)}
              onBlur={e => handleBlur(e)}
            />
          </Col>

          {errors.email && touched.email && (
            <Alert message={errors.email} type="error" />
          )}

          <Col span={24}>
            <StyledPasswordField
              id="password"
              name="password"
              placeholder="Password"
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={e => setFieldValue('password', e.target.value)}
              onBlur={e => handleBlur(e)}
            />
            {errors.password && touched.password && (
              <Col span={24}>
                <Alert message={errors.password} type="error" />
              </Col>
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
  );
};

export default LoginForm;
