import React, { FC } from 'react';
import { IValuesLogin } from '../../interfaces';
import { Col, Row, Button, Alert, Input, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Formik, Form, Field } from 'formik';
import { loginSchema } from '../../validation/validationSchemas';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const StyledField = styled(Field)`
  margin: 5px 0;
  padding: 4px 11px;
  height: 40px;
  width: 100%;
  transition: all 0.3s;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  outline: 0;
  :hover {
    border-color: #1890ff;
  }
  :focus {
  border-color: #1890ff;
  }
  ::placeholder { 
    color: #b9b8b8;
  }
}
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

  const openNotification = (): void => {
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
      {({ errors, touched, isValid, handleBlur, setFieldValue }) => (
        <Form>
          <Row align="middle" justify="center">
            <h1>Please, Login</h1>
          </Row>

          <Row align="middle" justify="center">
            <Col xs={14} sm={16} lg={20} xl={24}>
              <StyledField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <Col xs={14} sm={16} lg={20} xl={24}>
                  <Alert message={errors.email} type="error" />
                </Col>
              )}
            </Col>

            <Col xs={14} sm={16} lg={20} xl={24}>
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
                <Col xs={14} sm={16} lg={20} xl={24}>
                  <Alert message={errors.password} type="error" />
                </Col>
              )}
            </Col>
          </Row>

          <Row align="middle" justify="center">
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
