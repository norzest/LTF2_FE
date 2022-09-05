// writer: 권혁준
import styled from "styled-components";

export const OrderContainer = styled.div`
  box-sizing: border-box;
  text-align: left;
  display: flex;
  border-bottom: 1px solid lightgrey;
  background-color: white;
  width: 100%;
  min-width: 1440px;
  overflow: hidden;
  position: sticky;
  top: 102px;
  left: 0px;
  right: 0px;
  z-index: 9;
  padding-left: 48px;
  padding-right: 48px;
`;

export const OrderItem = styled.div`
  margin: 0px 25px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => (props.navId === props.active ? 500 : 100)};
  font-size: 24px;
  border-bottom: ${(props) =>
    props.navId === props.active ? "2px solid #e6007e" : "none"};
  color: ${(props) => (props.navId === props.active ? "#e6007e" : "black")};

  &:hover {
    color: #e6007e;
  }
`;

export const NavContainer = styled.div`
  box-sizing: border-box;
  text-align: left;
  display: flex;
  border-bottom: 1px solid lightgrey;
  background-color: white;
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  width: 100%;
  min-width: 1440px;
  overflow: hidden;
  height: 52px;
  z-index: 10;
  padding-left: 48px;
  padding-right: 48px;
`;

export const NavItem = styled.div`
  margin: 0px 25px;
  height: 49px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-bottom: ${(props) =>
    props.navId === props.active ? "2px solid #e6007e" : "none"};
  color: ${(props) =>
    props.navId === props.active || props.navId === props.nowHover
      ? "#e6007e"
      : "black"};

  &:hover {
    color: #e6007e;
  }
`;

export const NavMap = styled.div`
  box-sizing: border-box;
  position: fixed;
  height: 350px;
  background: #fff;
  display: ${(props) => (props.nowHover ? "flex" : "none")};
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  top: 102px;
  left: 0px;
  right: 0px;
  width: 100%;
  min-width: 1440px;
  z-index: 150;
  padding-left: 48px;
  padding-right: 48px;
`;

export const NavMapCategory = styled.div`
  width: 12.5%;
  height: 100%;
  background: #fff;

  ul {
    list-style: none;
    text-indent: -15px;

    p {
      margin: 15px 0px;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: #e6007e;
      }
    }

    li {
      margin: 5px 0px;
      cursor: pointer;
      text-indent: -10px;
      color: grey;

      &:hover {
        text-decoration: underline;
        color: #e6007e;
      }

      &:before {
        content: "- ";
      }
    }
  }
`;

export const NavMapMain = styled.p`
  font-weight: bold;
  list-style-type: none;
  padding-left: 0px;
  margin: 10px 0px;
`;

export const NavMapContent = styled.li`
  list-style-type: none;
  padding-left: 0px;
  margin: 10px 0px;

  &:before {
    content: –;
  }
`;

export const MainContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
  text-align: left;
  border-bottom: 1px solid lightgrey;
  background-color: white;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  min-width: 1440px;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 10;
  padding-left: 78px;
  padding-right: 78px;
`;

export const MainLogo = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const ShowflowMenu = styled.ul`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  width: 240px;
  top: 100px;
  right: 15px;
  margin-top: -3px;
  padding: 0 10px;
  border-radius: 12px;
  box-shadow: 2px 3px 20px rgb(0 0 0 / 18%);
  background: #fff;
  z-index: 99;
`;

export const ShowflowMenuLi = styled.li`
  list-style: none;
  padding: 8px 0;
  display: flex;
`;

export const SearchInput = styled.input`
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #e6007e;
  width: 200px;

  &:focus {
    outline: none;
  }
`;
