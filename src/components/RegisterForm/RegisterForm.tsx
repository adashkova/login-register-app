import { FC } from 'react';
import { IValuesRegister } from '../../interfaces';
import { Formik, Form } from 'formik';
import { LIST_OF_COUNTRIES } from '../../constants';
import { Select, Button, Alert, Row, Col, notification, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Option } = Select;

const StyledField = styled(Input)`
  margin: 5px 0;
  height: 40px;
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

  const openNotification = () => {
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

  const signUpSchema = Yup.object().shape({
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

  // const fields = ['firstName', 'lastName', 'email', 'phoneNumber', 'password'];

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
          <Row align={'middle'} justify={'center'}>
            <h1>Please, Sign Up</h1>
          </Row>
          {/* {fields.map(field => {
            
            return (
                
              <Col span={24} key={field}>
                <StyledField
                  id={field}
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                />

                {errors.firstName && touched.firstName && (
                  <Col span={24}>
                    
                    <Alert message={errors.firstName} type="error" />
                  </Col>
                )}
              </Col>
            );
          })} */}

          <Col span={24}>
            <StyledField
              id="firstName"
              name="firstName"
              placeholder="FirstName"
              onChange={e => setFieldValue('firstName', e.target.value)}
              onBlur={e => handleBlur(e)}
            />

            {errors.firstName && touched.firstName && (
              <Col span={24}>
                {' '}
                <Alert message={errors.firstName} type="error" />
              </Col>
            )}
          </Col>

          <Col span={24}>
            <StyledField
              id="lastName"
              name="lastName"
              onChange={e => setFieldValue('lastName', e.target.value)}
              onBlur={e => handleBlur(e)}
              placeholder="LastName"
            />

            {errors.lastName && touched.lastName && (
              <Col span={24}>
                <Alert message={errors.lastName} type="error" />
              </Col>
            )}
          </Col>

          <Col span={24}>
            <StyledField
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={e => setFieldValue('email', e.target.value)}
              onBlur={e => handleBlur(e)}
            />

            {errors.email && touched.email && (
              <Col span={24}>
                <Alert message={errors.email} type="error" />
              </Col>
            )}
          </Col>

          <Col span={24}>
            <StyledField
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone number"
              onChange={e => setFieldValue('phoneNumber', e.target.value)}
              onBlur={e => handleBlur(e)}
            />

            {errors.phoneNumber && touched.phoneNumber && (
              <Col span={24}>
                <Alert message={errors.phoneNumber} type="error" />
              </Col>
            )}
          </Col>

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

          <Col span={24}>
            <Select
              style={{
                margin: '10px 0',
                width: '300px',
              }}
              placeholder="Select a country"
              onChange={value => setFieldValue('country', value)}
              onBlur={e => handleBlur(e)}
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
              <Col span={24}>
                {' '}
                <Alert message={errors.country} type="error" />
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
              Register
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
