import React, { FC } from 'react';
import { Layout, Row } from 'antd';
import { DingdingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  margin-right: 30px;
`;

const NavBar: FC = () => {
  return (
    <Header style={{ backgroundColor: '#334756' }}>
      <Row align={'middle'} justify={'space-between'}>
        <StyledLink to="/">
          <DingdingOutlined style={{ fontSize: '1.5rem' }} />
        </StyledLink>
        <Row justify={'space-around'}>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
        </Row>
      </Row>
    </Header>
  );
};

export default NavBar;
