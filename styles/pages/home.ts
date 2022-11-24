import Layout from "components/global/Layout/Layout";
import styled from "styled-components";

export const HomeLayout = styled(Layout)`
  & > #content {
    margin: unset;
  }
`;

export const Row = styled.div`
  width: 100%;
  height: 100px;
  background-color: blue;
`;