import { FC } from 'react';
import { IValuesRegister } from '../../interfaces';
import { Formik, Form, Field } from 'formik';
import { LIST_OF_COUNTRIES } from '../../constants';
import { Select, Button, Alert, Row, Col, notification, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { signUpSchema } from '../../validation/validationSchemas';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Option } = Select;

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

const RegisterForm: FC = () => {
  const initialValues: IValuesRegister = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: '',
  };

  const openNotification = (): void => {
    notification.open({
      message: 'Registration Complete',
      description: '',
    });
  };

  const makePhoneMask = (values: IValuesRegister): void => {
    let val = values.phoneNumber;
    values.phoneNumber = `+7(${val.substring(0, 3)}) ${val.substring(
      3,
      6
    )}-${val.substring(6, 8)}-${val.substring(8, val.length)}`;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      validateOnChange
      onSubmit={(values: IValuesRegister) => {
        setTimeout(() => {
          makePhoneMask(values);
          openNotification();
        }, 500);
      }}
    >
      {({ errors, touched, isValid, handleBlur, setFieldValue }) => (
        <Form>
          <Row align="middle" justify="center">
            <h1>Please, Sign Up</h1>
          </Row>

          <Row align="middle" justify="center">
            <Col span={16}>
              <StyledField
                id="firstName"
                name="firstName"
                placeholder="FirstName"
              />
              {errors.firstName && touched.firstName && (
                <Col span={16}>
                  <Alert message={errors.firstName} type="error" />
                </Col>
              )}
            </Col>

            <Col span={16}>
              <StyledField
                id="lastName"
                name="lastName"
                placeholder="LastName"
              />
              {errors.lastName && touched.lastName && (
                <Col span={16}>
                  <Alert message={errors.lastName} type="error" />
                </Col>
              )}
            </Col>

            <Col span={16}>
              <StyledField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <Col span={16}>
                  <Alert message={errors.email} type="error" />
                </Col>
              )}
            </Col>

            <Col span={16}>
              <StyledField
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <Col xs={12} sm={14} md={14} lg={16} xl={18}>
                  <Alert message={errors.phoneNumber} type="error" />
                </Col>
              )}
            </Col>

            <Col span={16}>
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
                <Col span={16}>
                  <Alert message={errors.password} type="error" />
                </Col>
              )}
            </Col>

            <Col xs={16}>
              <Row align="middle" justify="center">
                <Select
                  style={{
                    margin: '10px 0',
                  }}
                  placeholder="Select a country"
                  onChange={value => setFieldValue('country', value)}
                  onBlur={handleBlur}
                >
                  {LIST_OF_COUNTRIES.map((country, index) => {
                    return (
                      <Option key={index} value={country}>
                        {country}
                      </Option>
                    );
                  })}
                </Select>
                {errors.country && touched.country && (
                  <Col span={16}>
                    <Alert message={errors.country} type="error" />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>

          <Row align="middle" justify="center">
            <Button
              type="primary"
              disabled={!isValid}
              htmlType="submit"
              style={{ marginTop: '10px' }}
            >
              Register
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
