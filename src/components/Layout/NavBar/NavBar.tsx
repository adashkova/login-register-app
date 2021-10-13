import React, { FC } from 'react';
import { Layout, Row, Col } from 'antd';
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
      <Row align="middle" justify="space-between">

        <Col xs={1} sm={2} md={4} lg={6} xl={8} xxl={8}>
          <Link to="/">
            <DingdingOutlined style={{ fontSize: '1.5rem' }} />
          </Link>
        </Col>

        <Row align="middle" justify="end">
          <Col xs={12} sm={14} md={10} lg={10} xl={10} xxl={10}>
            <StyledLink to="/login">Login</StyledLink>
          </Col>

          <Col xs={5} sm={10} md={14} lg={14} xl={14} xxl={14}>
            <StyledLink to="/register">Register</StyledLink>
          </Col>

        </Row>
      </Row>
    </Header>
  );
};

export default NavBar;
