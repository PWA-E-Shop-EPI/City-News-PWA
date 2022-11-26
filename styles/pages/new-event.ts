import { Button, Form, Input, Select } from 'antd';
import styled, { css } from 'styled-components';

export const NewEvent = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;

`;

export const Map = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 30px;
`;

export const Popup = styled.div`
  width: 135px;
  height: 95px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DeleteMarkerButton = styled(Button)`

`;

export const MyForm = styled(Form)`
  width: 100%;
  max-width: 500px;
  margin-top: 30px;
`;

export const EventType = styled(Select)`
`;

export const Title = styled(Input)`
  width: 100%;
`;

export const Description = styled(Input.TextArea)`

`;

export const Submit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(Button)`
`;