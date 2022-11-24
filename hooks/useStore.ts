import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import {cloneDeep} from 'lodash';

export interface StoreConfig<S> {
  storeName: string;
  initialValues: S;
}

export class Store<S> {
  protected storeName = '';

  protected values: S;

  protected initialValues: S;

  constructor(config: StoreConfig<S>) {
    this.storeName = config.storeName;
    this.values = cloneDeep(config.initialValues);
    this.initialValues = cloneDeep({ ...config.initialValues });
  }

  public getStoreName = () => this.storeName;

  public getValues = () => cloneDeep(this.values);

  public getInitialValues = () => cloneDeep(this.initialValues);
}

export type Subjects = {
  [key: string]: BehaviorSubject<unknown>;
};

const subjects$: BehaviorSubject<Subjects> = new BehaviorSubject<Subjects>({});

export interface GlobalStore<S> {
  store: S;
  callback?: (currentStore: S) => void;
}

const getNewSubject = <S>(storeInitialValues: S) => new BehaviorSubject<GlobalStore<S>>({
  store: storeInitialValues,
  callback: undefined,
});

export const resetStore = () => {
  subjects$.next({});
};

export const useStore = <CS>(
  receivedStore: Store<unknown>,
): [
    CS,
    (newStore: Store<unknown>, callback?: (currentStore: Store<unknown>) => void) => void,
  ] => {
  const t = subjects$.value[receivedStore.getStoreName()];
  const unknownSavedStoreSubject: BehaviorSubject<unknown> | undefined = t;
  const [, triggerNewUpdate] = useState<boolean>(false);

  if (!unknownSavedStoreSubject) {
    (subjects$.value[receivedStore.getStoreName()] as BehaviorSubject<
    GlobalStore<Store<unknown>>
    >) = getNewSubject<Store<unknown>>(receivedStore);
    subjects$.next(subjects$.value);
  }

  const savedStoreSubject: BehaviorSubject<GlobalStore<Store<unknown>>> = subjects$
    .value[receivedStore.getStoreName()] as BehaviorSubject<
  GlobalStore<Store<unknown>>
  >;

  useEffect(() => {
    const subscription = savedStoreSubject.subscribe(
      () => {
        triggerNewUpdate((prevState) => !prevState);
      },
    );

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [savedStoreSubject]);

  const dispatch = (
    newStore: Store<unknown>,
    callback?: (currentStore: Store<unknown>) => void,
  ) => {
    if (savedStoreSubject) {
      savedStoreSubject.next({
        ...savedStoreSubject.value,
        store: newStore,
        callback,
      });
    }
  };

  return [
    (
      subjects$.value[receivedStore.getStoreName()] as BehaviorSubject<
      GlobalStore<Store<unknown>>
      >
    ).value.store as CS,
    dispatch,
  ];
};

export default useStore;
