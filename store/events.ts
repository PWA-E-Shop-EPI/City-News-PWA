import { EventsGetResData } from 'common/API/Events/events';
import { Store, StoreConfig } from 'hooks/useStore';

export interface Event extends EventsGetResData {
  markerOnMap?: any;
}

export interface EventsStoreValues {
  events: Array<Event>;
}

export const initialValues: EventsStoreValues = {
  events: [],
};

export const config: StoreConfig<EventsStoreValues> = {
  storeName: 'events',
  initialValues,
};

export class EventsStore extends Store<EventsStoreValues> {
  public setValues(values: EventsStoreValues) {
    this.values = values;
  }
}

export default config;