import { FC } from 'react';
import { Row, Layout } from 'antd';
import styled from 'styled-components';
import RegisterForm from '../../components/RegisterForm';

const { Content } = Layout;

const StyledContainer = styled(Row)`
  height: 93vh;
`;

const RegisterPage: FC = () => {
  return (
    <Content>
      <StyledContainer justify="center">
        <Row align="middle" justify="center">
          <RegisterForm />
        </Row>
      </StyledContainer>
    </Content>
  );
};

export default RegisterPage;
