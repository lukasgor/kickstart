import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;
