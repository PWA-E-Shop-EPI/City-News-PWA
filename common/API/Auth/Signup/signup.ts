import axios from 'axios';
import {
  PathProps,
  getPathValue,
  API_PATH,
} from 'common/API/global';

interface SignupPost {
  body: {
    login: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
}

class Signup {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, signupPathProps: null) {
    this.pathsProps = [...pathsProps, signupPathProps];
  }

  public POST = async (props: SignupPost) => {
    const url = `${API_PATH}/v1/${getPathValue(
      this.pathsProps[0],
      'auth',
    )}/${getPathValue(this.pathsProps[1], 'signup')}`;

    const res = await axios.post(url, props.body);
    return res;
  };
}

export default Signup;
