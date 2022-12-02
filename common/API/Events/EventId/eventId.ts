import axios from 'axios';
import { PathProps, getPathValue, API_PATH } from 'common/API/global';

class EventId {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, pathProps: PathProps) {
    this.pathsProps = [...pathsProps, pathProps];
  }

  public DELETE = async () => {
    const res = await axios.delete(
      `${API_PATH}/${getPathValue(this.pathsProps[0], 'events')}/${getPathValue(this.pathsProps[1], ':eventId')}`
    );
    return res;
  }
}

export default EventId;