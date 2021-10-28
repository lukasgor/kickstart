import React from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const { pathname } = useRouter();
  return (
    <Menu pointing secondary>
      <Link href='/'>
        <Menu.Item active={pathname === '/'}>Campaigns</Menu.Item>
      </Link>
      <Menu.Menu position='right'>
        <Link href='/campaigns/new'>
          <Menu.Item active={pathname === '/campaigns/new'}>+</Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
