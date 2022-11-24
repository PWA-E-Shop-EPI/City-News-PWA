import { Store, StoreConfig } from 'hooks/useStore';

export enum AuthenticationStatus {
  SUCCESS,
  FAILED,
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserStoreValues {
  id: number;
  login: string
  email: string
  authenticationStatus: AuthenticationStatus
  token: string
  role: Role
}

export const initialValues: UserStoreValues = {
  id: 0,
  login: '',
  email: '',
  authenticationStatus: AuthenticationStatus.FAILED,
  token: '',
  role: Role.USER,
};

const config: StoreConfig<UserStoreValues> = {
  storeName: 'user',
  initialValues,
};

export class UserStore extends Store<UserStoreValues> {

}

export default config;
