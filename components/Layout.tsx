import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout: React.FC = (props) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;
