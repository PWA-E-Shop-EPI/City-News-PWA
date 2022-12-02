import React, { useState } from 'react';
import { getSession, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
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
import API from 'common/API/API';
import { Button } from 'antd';
import { useRouter } from 'next/router';

interface Props {
  events: Array<Event>;
}

interface State {
  events: Array<Event>;
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: paths.home.events.index,
  async getServerSideProps(ctx) {
    const redirect = {
      redirect: {
        permanent: false,
        destination: paths.home.index,
      },
    };
    let events: never[] = [];
    try {
      const session = getSession(ctx.req, ctx.res);
      if (!session) {
        return redirect;
      }
      const email = session.user.email;
      const response = await API.userevents().GET({query: `?user=${email}`});
      events = response?.data.response
    } catch (error) {
      console.log(error);
    }
    return {
      props: {
        events
      } // will be passed to the page component as props
    };
  }
});

/*export async function getServerSideProps(context: any) {
  let events: never[] = []
  try {
    const response = await API.userevents().GET({query: });
    events = response?.data.response
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      events,
    }, // will be passed to the page component as props
  }
}*/

export const Events = (props: Props): JSX.Element => {
  const [state, setState] = useState<State>({
    events: props.events
  });
  const router = useRouter();

  async function deleteEvent(key: number): Promise<void> {
    if (window.confirm('Are you sure you want to delete this event?')) {
      console.log("key => ", key);
      try {
        await API.events().eventId({value: `${key}`}).DELETE();
        router.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

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
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Button style={{ color: 'red' }} onClick={() => deleteEvent(record.id)}>
            Delete
          </Button>
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
        id: event.id,
        title: event.title,
        type: event.type,
        date: event.date,
        lat: event.lat,
        lng: event.lng,
        text: event.description,
        expires: event.expires
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
          <h2 style={{ marginTop: 16 }}>My Events</h2>
          <Styled.EventsTable
            columns={getColumns()}
            dataSource={getData().filter(line => line.expires > 0)}
            rowKey={'key'}
            expandable={{ expandedRowRender: (record: any) => <div>{record.text}</div> }}
          />
        </Styled.Events>
        <Styled.Events>
          <h2>My passed Events</h2>
          <Styled.EventsTable
            columns={getColumns()}
            dataSource={getData().filter(line => line.expires <= 0)}
            rowKey={'key'}
            expandable={{ expandedRowRender: (record: any) => <div>{record.text}</div> }}
          />
        </Styled.Events>
      </Layout>
    </>
  );
};

export default Events;
