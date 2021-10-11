import React, { useState, FC } from 'react';
import { IValuesRegister } from '../../interfaces';
import { Field, Formik, Form } from 'formik';
import { LIST_OF_COUNTRIES } from '../../constants';
import { Select, Button, Alert, Row, Col, Space, Input, Layout } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Option } = Select;

const StyledContainer = styled(Row)`
  height: 93vh;
`;

const StyledField = styled(Field)`
  min-width: 400px;
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
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
      .min(10, 'Phone number must containes 10 digits!')
      .max(10, 'Phone number must containes 10 digits!!')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        'Password must have at least one capital letter and one digit, without spaces and dashes'
      ),
  });

  return (
    <Content>
      <StyledContainer justify={'center'}>
        <Row align={'middle'} justify={'center'}>
          <Col span={24}>

            <Col span={24}>
              <h1>Please, Sign Up</h1>
            </Col>

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
                  <Space direction="vertical">

                    {isSubmit && <Alert message="Success!" type="success" />}

                    <label htmlFor="firstName">First Name</label>
                    <StyledField id="firstName" name="firstName" />

                    {errors.firstName && touched.firstName && (
                      <Alert message={errors.firstName} type="error" />
                    )}

                    <label htmlFor="lastName">Last Name</label>
                    <StyledField id="lastName" name="lastName" />

                    {errors.lastName && touched.lastName && (
                      <Alert message={errors.lastName} type="error" />
                    )}

                    <label htmlFor="email">Email</label>
                    <StyledField id="email" name="email" type="email" />

                    {errors.email && touched.email && (
                      <Alert message={errors.email} type="error" />
                    )}

                    <label htmlFor="phoneNumber">Phone number</label>
                    <StyledField id="phoneNumber" name="phoneNumber" />

                    {errors.phoneNumber && touched.phoneNumber && (
                      <Alert message={errors.phoneNumber} type="error" />
                    )}

                    <label htmlFor="password">Password </label>
                    <StyledField id="password" name="password" />

                    {errors.password && touched.password && (
                      <Alert message={errors.password} type="error" />
                    )}

                    <label htmlFor="country">Country</label>
                    <Select
                      showSearch
                      style={{ minWidth: '400px', marginBottom: '10px' }}
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

                    {!country && (
                      <Alert message={'Country is required'} type="error" />
                    )}

                    <Button
                      type="primary"
                      disabled={!isValid}
                      htmlType="submit"
                      style={{ marginTop: '10px' }}
                    >
                      Sign Up
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

export default RegisterPage;
