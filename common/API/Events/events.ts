import axios from 'axios';
import { PathProps, getPathValue, API_PATH } from 'common/API/global';

import EventId from './EventId/eventId';

export interface EventsGetResData {
  id: number;
  type: string;
  title: string;
  description: string;
  date: string;
  lat: number;
  lng: number;
  expires: number;
}

export interface EventsGetRes {
  code: number;
  response: Array<EventsGetResData>;
}

export interface EventsPost {
  body: {
    user: string,
    type: string,
    title: string,
    desc: string,
    lat: number,
    lng: number,
    expires: number;
  }
}

class Events {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, pathProps: null) {
    this.pathsProps = [...pathsProps, pathProps];
  }

  public eventId = (pathsProps: PathProps): EventId => {
    return new EventId([...this.pathsProps], pathsProps);
  }

  public POST = async (props: EventsPost) => {
    const res = await axios.post(
      `${API_PATH}/${getPathValue(this.pathsProps[0], 'events')}`, props.body
    );
    return res;
  }

  public GET = async () => {
    const res = await axios.get(
      `${API_PATH}/${getPathValue(this.pathsProps[0], 'events')}`,
    );
    return res;
  };
}

export default Events;
