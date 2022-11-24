import { CookieName } from 'common/enum';

export const API_PATH = process.env.NEXT_PUBLIC_API_PATH ? process.env.NEXT_PUBLIC_API_PATH : '';
export const TOKEN_NAME = CookieName.AUTH_TOKEN;

export interface PathProps {
  value: string;
}

export const getPathValue = (pathProps: PathProps | null, pathName: string) => {
  if (pathProps) {
    return pathProps.value;
  }
  return pathName;
};
