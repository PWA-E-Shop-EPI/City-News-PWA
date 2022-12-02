import Events from './Events/events';
import Userevents from './Userevents/userevents';

class API {
  public static events = (): Events => new Events([], null);

  public static userevents = (): Userevents => new Userevents([], null);
}

export default API;
