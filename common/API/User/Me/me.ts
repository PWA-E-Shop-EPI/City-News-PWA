import axios from "axios";
import { PathProps, getPathValue, API_PATH } from "common/API/global";

export interface MeGet {
  headers: {
    token: string;
  };
}

export interface MeGetResData {
  id: number;
  login: string;
  email: string;
  accountType: string;
}

export interface MeGetRes {
  code: number;
  response: MeGetResData;
}

class Me {
  private pathsProps: Array<PathProps | null>;

  constructor(pathsProps: Array<PathProps | null>, signinPathProps: null) {
    this.pathsProps = [...pathsProps, signinPathProps];
  }

  public GET = async (props: MeGet) => {
    const res = await axios.get(
      `${API_PATH}/v1/${getPathValue(
        this.pathsProps[0],
        "user"
      )}/${getPathValue(this.pathsProps[1], "me")}`,
      {
        headers: {
          Authorization: `Bearer ${props.headers.token}`,
        },
      }
    );
    return res;
  };
}

export default Me;
