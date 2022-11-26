import React from 'react';
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';

//styles
import * as Styled from 'styles/pages/home';

//components
import Map from 'components/pages/Components/Map/map';

//hooks
import useStore from 'hooks/useStore';

//store
import userStoreConfig, { UserStore } from 'store/user';

//config
import paths from 'config/paths';

interface Props {
  user: UserProfile;
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: paths.home.index,
});

export const Home = (props: Props): JSX.Element => {
  useStore<UserStore>(
    new UserStore({ ...userStoreConfig, initialValues: props.user })
  );

  return (
    <Styled.HomeLayout keySelected={0}>
      <Map />
    </Styled.HomeLayout>
  );
};

export default withPageAuthRequired(Home, {
  onRedirecting: () => <div />,
  onError: error => <div>{error.message}</div>
});
