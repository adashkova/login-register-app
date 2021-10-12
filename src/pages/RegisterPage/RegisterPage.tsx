import React, { useState, FC } from 'react';
import { IValuesRegister } from '../../interfaces';
import { Field, Formik, Form } from 'formik';
import { LIST_OF_COUNTRIES } from '../../constants';
import { Select, Button, Alert, Row, Col, Layout } from 'antd';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Option } = Select;

const StyledContainer = styled(Row)`
  height: 93vh;
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

const RegisterPage: FC = () => {
  const initialValues: IValuesRegister = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: '',
  };

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');

  const handleChange = (value: string): void => {
    setCountry(value);
  };

  const handleSubmit = (values: IValuesRegister): void => {
    let val = values.phoneNumber;
    values.phoneNumber = `+7(${val.substring(0, 3)})${val.substring(
      3,
      6
    )}-${val.substring(6, 8)}-${val.substring(8, val.length)}`;

    setIsSubmit(true);
    setTimeout(() => {
      setIsSubmit(false);
    }, 2000);
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
        'Password must have at least one capital letter and one digit, without spaces and dashes'
      ),
  });

  return (
    <Content>
      <StyledContainer justify={'center'}>
        <Row align={'middle'} justify={'center'}>

          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            validateOnChange
            onSubmit={(values: IValuesRegister) => {
              setTimeout(() => {
                handleSubmit(values);
              }, 500);
            }}
          >
            {({ errors, touched, isValid }) => (
              <Form>
                {isSubmit && (
                  <Col span={24}>
                    <Alert message="Success!" type="success" />
                  </Col>
                )}

                <Row align={'middle'} justify={'center'}>
                  <h1>Please, Sign Up</h1>
                </Row>

                <Col span={24}>
                  <StyledField
                    id="firstName"
                    name="firstName"
                    placeholder="FirstName"
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
                  />

                  {errors.phoneNumber && touched.phoneNumber && (
                    <Col span={24}>
                      <Alert message={errors.phoneNumber} type="error" />
                    </Col>
                  )}
                </Col>

                <Col span={24}>
                  <StyledField
                    id="password"
                    name="password"
                    placeholder="Password"
                  />

                  {errors.password && touched.password && (
                    <Col span={24}>
                      <Alert message={errors.password} type="error" />
                    </Col>
                  )}
                </Col>

                <Col span={24}>
                  <Select
                    showSearch
                    style={{
                      margin: '10px 0',
                      width: '300px',
                    }}
                    placeholder="Country"
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

                  {!country && (
                    <Col span={24}>
                      <Alert message={'Country is required'} type="error" />
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

        </Row>
      </StyledContainer>
    </Content>
  );
};

export default RegisterPage;
