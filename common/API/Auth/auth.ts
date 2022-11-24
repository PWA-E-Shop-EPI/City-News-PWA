import { PathProps } from 'common/API/global';
import Signin from './Signin/signin';
import Signup from './Signup/signup';

class Auth {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, authPathProps: null) {
    this.pathsProps = [...pathsProps, authPathProps];
  }

  public signin = () => new Signin([...this.pathsProps], null);

  public signup = () => new Signup([...this.pathsProps], null);
}

export default Auth;
