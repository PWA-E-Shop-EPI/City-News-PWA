import styled from 'styled-components';
import { Button, Dropdown, Menu as AntdMenu } from 'antd';

export const Layout = styled.div`
  overflow: auto;
  width: 100%;
`;

export const Navbar = styled.div`
  width: 100%;
  height: 80px;
  background-color: #292929;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NavbarTitle = styled.div`
  width: 192px;
  height: 80px;
  background-image: url('/logo.png');
  background-position: center;
  background-size: contain;
  //background-color: blue;
`;

export const NavbarLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
  font-weight: 600;
  flex: 1;
  height: 100%;
  //background-color: green;

  & > a {
    margin-left: 30px;
  }

  & > a:first-child {
    margin: unset;
  }
`;

interface NavbarLinkProps {
  isSelected: boolean;
}

export const NavbarLink = styled.a`
  text-decoration: ${(props: NavbarLinkProps) => (props.isSelected ? 'underline' : 'unset')};
`;

export const NavbarOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100%;
`;

interface AvatarProps {
  src: string;
}
export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  background-image: ${(props: AvatarProps) => `url("${props.src}")`};
  background-position: center;
  background-size: contain;
  border-radius: 60px;

  &:hover {
    cursor: pointer;
  }
`;

export const MenuDropdown = styled(Dropdown)``;

export const Menu = styled(AntdMenu)`
  background-color: white;
  max-width: 200px;
`;

interface MenuParentLinkProps {
  isFirst?: boolean;
  isSelected: boolean;
}

export const MenuParentLink = styled.a`
  margin-left: ${(props: MenuParentLinkProps) => (props.isFirst ? '0px' : '30px')};
  text-decoration: ${(props: MenuParentLinkProps) => (props.isSelected ? 'underline' : 'none')};

  &:hover {
    text-decoration: underline;
    color: unset;
  }

  @media (max-width: 1040px) {
    margin-left: ${(props: MenuParentLinkProps) => (props.isFirst ? '0px' : '15px')};
  }
`;

export const MenuChildrenLink = styled.a`
  color: black !important;
`;

export const Content = styled.div`
  overflow: auto;
  margin-left: 100px;
  margin-right: 100px;
`;
