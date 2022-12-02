import styled from "styled-components";

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const EventDescription = styled.div`
  overflow: auto;
  position: absolute;
  bottom: 0px;
  width: 100%;
  max-height: 250px;
  background-color: white;
  z-index: 1001;
  padding: 20px;
`;

export const EventDescriptionTitle = styled.p`
  font-size: 16px;
  color: black;
  font-weight: 600;
`;

export const EventDescriptionDate = styled.span`
  text-decoration: underline;
`;

export const EventDescriptionDescription = styled.p`

`;