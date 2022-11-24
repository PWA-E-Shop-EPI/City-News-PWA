import Auth from './Auth/auth';
import User from './User/user';

class API {
  public static auth = (): Auth => new Auth([], null);

  public static user = (): User => new User([], null);
}

export default API;
