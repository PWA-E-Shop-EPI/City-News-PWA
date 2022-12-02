import Events from './Events/events';

class API {
  public static events = (): Events => new Events([], null);
}

export default API;
