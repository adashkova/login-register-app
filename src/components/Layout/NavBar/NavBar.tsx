import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  aline-items: center;
  a {
    color: #fff;
    margin: 0;
    font-size: 1.1rem;
  }
  i {
    font-size: 2.2rem;
    padding: 10px 10px;
  }
`;

const StyledLinkContainer = styled.div`
  a {
    margin-right: 30px;
    text-decoration: none;
  }
`;

const NavBar: React.FC = () => {
  return (
    <Header style={{ backgroundColor: '#334756' }}>
      <StyledNavBar>
        <Link to="/">
          <i className="fab fa-affiliatetheme"></i>
        </Link>
        <StyledLinkContainer>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </StyledLinkContainer>
      </StyledNavBar>
    </Header>
  );
};

export default NavBar;
