import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

//config
import paths from 'config/paths';

//components
import Layout from 'components/global/Layout/Layout';

//styles
import * as Styled from 'styles/pages/events';

//store
import { Event } from 'store/events';

interface Props {
  events: Array<Event>;
}

const fake: Array<Event> = [
  {
    id: 1,
    type: 'Catastrophe Naturelle',
    title: 'Tremblement de terre dans le centre ville',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean est lectus, pharetra id gravida quis, tempus pulvinar diam. Curabitur congue, libero non porttitor vulputate, ipsum risus vulputate lacus, eget dapibus dolor diam ac elit. Praesent et tellus vulputate, consequat dolor ut, tincidunt lectus. Etiam vestibulum sodales dui nec ornare. Vivamus sodales fringilla gravida. Fusce sit amet sagittis magna, mattis fermentum neque. Donec nisi purus, varius ac volutpat at, consectetur et metus. Vestibulum est nibh, gravida ut sapien at, finibus viverra tortor. Integer non sapien metus. Phasellus ac lacinia elit. Vestibulum faucibus turpis massa, et placerat metus consectetur nec.Nulla rhoncus sapien vitae aliquet iaculis. Sed rutrum turpis quis risus pretium sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo justo, ultricies non mi vitae, lobortis facilisis dui. Vestibulum auctor vulputate leo. Aliquam gravida nunc at dolor faucibus, at laoreet lectus dictum. Nam pretium porttitor justo ut vehicula. Praesent sem erat, faucibus ut erat in, vestibulum venenatis massa. Donec enim mauris, bibendum et tincidunt eu, bibendum vel felis. Etiam lobortis diam dui, non interdum magna vulputate id. Sed ornare interdum diam, nec interdum justo congue condimentum. Nullam elementum arcu non porta scelerisque. Aliquam magna justo, volutpat ultrices viverra ut, tristique eu quam.Proin id fringilla dui. Quisque pulvinar aliquam ante a dapibus. Duis molestie porta ipsum quis venenatis. Vivamus congue augue eget elit facilisis suscipit sit amet in nisl. Aenean non libero urna. Donec fringilla at felis ac sollicitudin. Fusce sit amet nisl ultricies, rhoncus tellus at, mattis tortor.',
    date: '2022-11-20T15:13:32+00:00',
    lat: 49.1984,
    lng: 2.4732,
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
    lat: 49.1984,
    lng: 2.4732,
    expires: 1
  }];

export const getServerSideProps = withPageAuthRequired({
  returnTo: paths.home.events.index,
  async getServerSideProps() {
    return { props: {events: fake} };
  }
});

export const Events = (props: Props): JSX.Element => {
  const getColumns = (): ColumnsType<any> => {
    const columns: ColumnsType<Event> = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: date => <a>{moment(date).locale('en').format('LLL')}</a>
      },
      {
        title: 'Coordinates',
        key: 'coords',
        render: (_, record) => (
          <div>
            {record.lat}, {record.lng}
          </div>
        )
      }
    ];
    return columns;
  };

  const getData = (): Array<any> => {
    const data: Array<any> = [];
    props.events.forEach(event => {
      data.push({
        key: event.id,
        title: event.title,
        type: event.type,
        date: event.date,
        lat: event.lat,
        lng: event.lng,
        text: event.text
      });
    });
    return data;
  };

  return (
    <>
      <Head>
        <title>City News | Events</title>
      </Head>
      <Layout keySelected={-1}>
        <Styled.Events>
          <Styled.EventsTable
            columns={getColumns()}
            dataSource={getData()}
            rowKey={'key'}
            expandable={{ expandedRowRender: (record: any) => <div>{record.text}</div> }}
          />
        </Styled.Events>
      </Layout>
    </>
  );
};

export default Events;
