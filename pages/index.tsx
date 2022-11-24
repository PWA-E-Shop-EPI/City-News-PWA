import React, { useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

//styles
import * as Styled from 'styles/pages/home';

//components
import Map from 'components/pages/Components/Map/map';

export const Home = (): JSX.Element => {
  const { user, isLoading } = useUser();

  return (
    <Styled.HomeLayout keySelected={0}>
      <Map/>
    </Styled.HomeLayout>
  )
}

export default withPageAuthRequired(Home, {
  onRedirecting: () => <div/>,
  onError: error => <div>{error.message}</div>
});
