import { PathProps } from 'common/API/global';

import Me from './Me/me';

class User {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, authPathProps: null) {
    this.pathsProps = [...pathsProps, authPathProps];
  }

  public me = () => new Me([...this.pathsProps], null);
}

export default User;
