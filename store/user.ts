import { UserProfile } from '@auth0/nextjs-auth0';
import { Store, StoreConfig } from 'hooks/useStore';

export interface UserStoreValues extends UserProfile {
}

export const initialValues: UserStoreValues = {
};

const config: StoreConfig<UserStoreValues> = {
  storeName: 'user',
  initialValues,
};

export class UserStore extends Store<UserStoreValues> {
  
}

export default config;
