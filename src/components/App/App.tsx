import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import NavBar from '../Layout/NavBar';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
