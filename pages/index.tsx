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
import eventsStoreConfig, { EventsStore } from 'store/events';

//config
import paths from 'config/paths';

//common
import { EventsGetResData } from 'common/API/Events/events';
import Head from 'next/head';
import API from 'common/API/API';

interface Props {
  user: UserProfile;
  events: Array<EventsGetResData>;
}

export async function getServerSideProps(context: any) {
  let events: never[] = []
  try {
    const response = await API.events().GET();
    events = response?.data.response
  } catch (error) {

  }
  return {
    props: {
      user: null,
      events: events,
    }, // will be passed to the page component as props
  }
}


export const Home = (props: Props): JSX.Element => {
  useStore<UserStore>(new UserStore({ ...userStoreConfig, initialValues: props.user }));
  useStore<EventsStore>(new EventsStore({ ...eventsStoreConfig, initialValues: { events: props.events } }));

  return (
    <>
      <Head>
        <title>City News | Home</title>
      </Head>
      <Styled.HomeLayout keySelected={0}>
        <Map />
      </Styled.HomeLayout>
    </>
  );
};

export default Home;
