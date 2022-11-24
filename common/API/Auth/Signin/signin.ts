import axios from 'axios';
import {
  PathProps,
  getPathValue,
  API_PATH,
} from 'common/API/global';

interface SigninPost {
  body: {
    email: string;
    password: string;
  };
}

class Signin {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, signinPathProps: null) {
    this.pathsProps = [...pathsProps, signinPathProps];
  }

  public POST = async (props: SigninPost) => {
    const res = await axios.post(
      `${API_PATH}/v1/${getPathValue(
        this.pathsProps[0],
        'auth',
      )}/${getPathValue(this.pathsProps[1], 'signin')}`,
      props.body,
    );
    return res;
  };
}

export default Signin;
