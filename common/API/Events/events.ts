import axios from 'axios';
import { PathProps, getPathValue, API_PATH } from 'common/API/global';

export interface EventsGetResData {
  id: number;
  type: string;
  title: string;
  text: string;
  date: string;
  lat: number;
  lng: number;
  expires: number;
}

export interface EventsGetRes {
  code: number;
  response: Array<EventsGetResData>;
}

class Events {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, pathProps: null) {
    this.pathsProps = [...pathsProps, pathProps];
  }

  public GET = async () => {
    const res = await axios.get(
      `${API_PATH}/${getPathValue(this.pathsProps[0], 'events')}`,
    );
    return res;
  };
}

export default Events;
