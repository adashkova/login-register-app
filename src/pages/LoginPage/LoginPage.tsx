import React, { FC } from 'react';
import { Layout, Row } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import LoginForm from '../../components/LoginForm';

const { Content } = Layout;

const StyledContainer = styled(Row)`
  height: 93vh;
`;

const LoginPage: FC = () => {
  return (
    <Content>
      <StyledContainer justify="center">
        <Row align="middle" justify="center">
          <LoginForm />
        </Row>
      </StyledContainer>
    </Content>
  );
};

export default LoginPage;
