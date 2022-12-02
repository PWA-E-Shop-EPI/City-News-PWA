import axios from 'axios';
import { PathProps, getPathValue, API_PATH } from 'common/API/global';

interface UsereventsGet {
  query: string;
}

class Userevents {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, pathProps: null) {
    this.pathsProps = [...pathsProps, pathProps];
  }

  public GET = async (props: UsereventsGet) => {
    const res = await axios.get(
      `${API_PATH}/${getPathValue(this.pathsProps[0], 'userevents')}${props.query}`,
    );
    return res;
  };
}

export default Userevents;