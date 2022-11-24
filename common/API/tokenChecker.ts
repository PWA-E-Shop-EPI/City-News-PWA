// common
import API from 'common/API/API';
import {
  initialValues, UserStoreValues, AuthenticationStatus, Role,
} from 'store/user';
import { MeGetRes, MeGetResData } from './User/Me/me';

const getUserRes = (data: MeGetResData, token: string) => {
  const newUser: UserStoreValues = {
    id: data.id,
    login: data.login,
    email: data.email,
    authenticationStatus: AuthenticationStatus.SUCCESS,
    token,
    role: data.accountType === 'ADMIN' ? Role.ADMIN : Role.USER,
  };
  return newUser;
};

const isUserLogged = async (token?: string): Promise<UserStoreValues> => {
  if (token === undefined) return { ...initialValues };
  try {
    const i = await API.user().me().GET({ headers: { token } });
    const data = i.data as MeGetRes;
    if (data.code !== 200) return { ...initialValues };
    return getUserRes(data.response, token);
  } catch (error) {
    return { ...initialValues };
  }
};

export default isUserLogged;