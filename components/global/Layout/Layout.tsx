import Link from 'next/link';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

//styles
import * as Styled from './styles';

//config
import paths from 'config/paths';

interface Props {
  children?: React.ReactNode;
  className?: string;
  keySelected: number;
}

export const Layout = (props: Props): JSX.Element => {
  const { user } = useUser();

  const getProfileMenu = () => {
    return (
      <Styled.Menu
        items={[
          {
            key: '1',
            label: (
              <Link href={paths.home.profile.index}>
                <Styled.MenuChildrenLink>Profile</Styled.MenuChildrenLink>
              </Link>
            )
          }
        ]}
      />
    );
  };

  return (
    <Styled.Layout className={props.className}>
      <Styled.Navbar id={'navbar'}>
        <Styled.NavbarTitle/>
        <Styled.NavbarLinks>
          <Link href={paths.home.index} passHref>
            <Styled.NavbarLink isSelected={props.keySelected === 0}>Home</Styled.NavbarLink>
          </Link>
          <Link href={paths.home.newEvent.index} passHref>
            <Styled.NavbarLink isSelected={props.keySelected === 1}>New event</Styled.NavbarLink>
          </Link>
        </Styled.NavbarLinks>
        <Styled.NavbarOptions>
          <Styled.MenuDropdown trigger={['click']} overlay={getProfileMenu()} placement={'bottom'}>
            <Styled.Avatar src={user ? user.picture ?? '' : ''}/>
          </Styled.MenuDropdown>
        </Styled.NavbarOptions>
      </Styled.Navbar>
      <Styled.Content id={'content'}>{props.children}</Styled.Content>
    </Styled.Layout>
  );
};

export default Layout;
