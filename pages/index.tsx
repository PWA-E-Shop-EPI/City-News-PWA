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

interface Props {
  user: UserProfile;
  events: Array<EventsGetResData>;
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: paths.home.index,
  async getServerSideProps() {
    return {
      props: {
        events: [
          {
            id: 1,
            type: 'Catastrophe Naturelle',
            title: 'Tremblement de terre dans le centre ville',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean est lectus, pharetra id gravida quis, tempus pulvinar diam. Curabitur congue, libero non porttitor vulputate, ipsum risus vulputate lacus, eget dapibus dolor diam ac elit. Praesent et tellus vulputate, consequat dolor ut, tincidunt lectus. Etiam vestibulum sodales dui nec ornare. Vivamus sodales fringilla gravida. Fusce sit amet sagittis magna, mattis fermentum neque. Donec nisi purus, varius ac volutpat at, consectetur et metus. Vestibulum est nibh, gravida ut sapien at, finibus viverra tortor. Integer non sapien metus. Phasellus ac lacinia elit. Vestibulum faucibus turpis massa, et placerat metus consectetur nec.Nulla rhoncus sapien vitae aliquet iaculis. Sed rutrum turpis quis risus pretium sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo justo, ultricies non mi vitae, lobortis facilisis dui. Vestibulum auctor vulputate leo. Aliquam gravida nunc at dolor faucibus, at laoreet lectus dictum. Nam pretium porttitor justo ut vehicula. Praesent sem erat, faucibus ut erat in, vestibulum venenatis massa. Donec enim mauris, bibendum et tincidunt eu, bibendum vel felis. Etiam lobortis diam dui, non interdum magna vulputate id. Sed ornare interdum diam, nec interdum justo congue condimentum. Nullam elementum arcu non porta scelerisque. Aliquam magna justo, volutpat ultrices viverra ut, tristique eu quam.Proin id fringilla dui. Quisque pulvinar aliquam ante a dapibus. Duis molestie porta ipsum quis venenatis. Vivamus congue augue eget elit facilisis suscipit sit amet in nisl. Aenean non libero urna. Donec fringilla at felis ac sollicitudin. Fusce sit amet nisl ultricies, rhoncus tellus at, mattis tortor.',
            date: '2022-11-20T15:13:32+00:00',
            lat: 50.62925,
            lng: 3.057256,
            expires: 2
          },
          {
            id: 2,
            type: 'Fait divers',
            title: 'Ouverture du marché de Noel',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean est lectus, pharetra id gravida quis, tempus pulvinar diam. Curabitur congue, libero non porttitor vulputate, ipsum risus vulputate lacus, eget dapibus dolor diam ac elit. Praesent et tellus vulputate, consequat dolor ut, tincidunt lectus. Etiam vestibulum sodales dui nec ornare. Vivamus sodales fringilla gravida. Fusce sit amet sagittis magna, mattis fermentum neque. Donec nisi purus, varius ac volutpat at, consectetur et metus. Vestibulum est nibh, gravida ut sapien at, finibus viverra tortor. Integer non sapien metus. Phasellus ac lacinia elit. Vestibulum faucibus turpis massa, et placerat metus consectetur nec.Nulla rhoncus sapien vitae aliquet iaculis. Sed rutrum turpis quis risus pretium sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo justo, ultricies non mi vitae, lobortis facilisis dui. Vestibulum auctor vulputate leo. Aliquam gravida nunc at dolor faucibus, at laoreet lectus dictum. Nam pretium porttitor justo ut vehicula. Praesent sem erat, faucibus ut erat in, vestibulum venenatis massa. Donec enim mauris, bibendum et tincidunt eu, bibendum vel felis. Etiam lobortis diam dui, non interdum magna vulputate id. Sed ornare interdum diam, nec interdum justo congue condimentum. Nullam elementum arcu non porta scelerisque. Aliquam magna justo, volutpat ultrices viverra ut, tristique eu quam.Proin id fringilla dui. Quisque pulvinar aliquam ante a dapibus. Duis molestie porta ipsum quis venenatis. Vivamus congue augue eget elit facilisis suscipit sit amet in nisl. Aenean non libero urna. Donec fringilla at felis ac sollicitudin. Fusce sit amet nisl ultricies, rhoncus tellus at, mattis tortor.',
            date: '2022-10-20T15:13:32+00:00',
            lat: 49.1984,
            lng: 2.4732,
            expires: -1
          },
          {
            id: 3,
            type: 'Fait divers',
            title: 'Ouverture du marché de Noel',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean est lectus, pharetra id gravida quis, tempus pulvinar diam. Curabitur congue, libero non porttitor vulputate, ipsum risus vulputate lacus, eget dapibus dolor diam ac elit. Praesent et tellus vulputate, consequat dolor ut, tincidunt lectus. Etiam vestibulum sodales dui nec ornare. Vivamus sodales fringilla gravida. Fusce sit amet sagittis magna, mattis fermentum neque. Donec nisi purus, varius ac volutpat at, consectetur et metus. Vestibulum est nibh, gravida ut sapien at, finibus viverra tortor. Integer non sapien metus. Phasellus ac lacinia elit. Vestibulum faucibus turpis massa, et placerat metus consectetur nec.Nulla rhoncus sapien vitae aliquet iaculis. Sed rutrum turpis quis risus pretium sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo justo, ultricies non mi vitae, lobortis facilisis dui. Vestibulum auctor vulputate leo. Aliquam gravida nunc at dolor faucibus, at laoreet lectus dictum. Nam pretium porttitor justo ut vehicula. Praesent sem erat, faucibus ut erat in, vestibulum venenatis massa. Donec enim mauris, bibendum et tincidunt eu, bibendum vel felis. Etiam lobortis diam dui, non interdum magna vulputate id. Sed ornare interdum diam, nec interdum justo congue condimentum. Nullam elementum arcu non porta scelerisque. Aliquam magna justo, volutpat ultrices viverra ut, tristique eu quam.Proin id fringilla dui. Quisque pulvinar aliquam ante a dapibus. Duis molestie porta ipsum quis venenatis. Vivamus congue augue eget elit facilisis suscipit sit amet in nisl. Aenean non libero urna. Donec fringilla at felis ac sollicitudin. Fusce sit amet nisl ultricies, rhoncus tellus at, mattis tortor.',
            date: '2022-10-20T15:13:32+00:00',
            lat: 48.573406,
            lng: 7.752111,
            expires: 1
          }
        ]
      }
    };
  }
});

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
