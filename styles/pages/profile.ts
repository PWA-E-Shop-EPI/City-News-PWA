import { Button } from "antd";
import NextImage from "components/global/NextImage/NextImage";
import styled from "styled-components";

export const Profile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

export const ProfilePicture = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 180px;
  object-fit: contain;
  margin-top: 30px;
`;

export const ProfileDescription = styled.div`
  font-size: 16px;
  color: black;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    text-align: center;
  }

  & > button {
    margin-top: 30px;
  }
`;

export const LogoutButton = styled(Button)`

`;