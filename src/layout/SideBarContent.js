import React, { useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import { nanoid } from "nanoid";
// import { useToast } from "@chakra-ui/react";

const MenuItem = (props) => {
  const { page, isSubMenu = false, onClick, isActive = false } = props;

  const { text} = page;

  return (
    <MenuItem.Wrapper isActive={isActive} isSubMenu={isSubMenu} onClick={() => onClick(page)}>
      <h2 className="ml-3 mt-1 p-3"> {text}</h2>
    </MenuItem.Wrapper>
  );
};

MenuItem.Wrapper = styled.span`
  display: flex;
  font-size: 0.875rem;
  align-items: center;
  padding: 0 0.3rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  transition: all 0.3s ease;
  img {
    width: 2.5rem;
    padding: 0.5rem;
  }
  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.isSubMenu &&
    css`
      padding-left: 2rem;
    `}

  ${(props) =>
    props.isActive &&
    css`
      background: #1F2833 0% 0% no-repeat padding-box;
      cursor: pointer;
      padding: 5px
      border-raduis: 5px;
    `}
`;

const SubMenu = (props) => {
  const [visible, setVisible] = useState(false);
  const { text, pages, onSubMenuClick } = props;
  const itemPage = {
    text,
    to: ""
  };

  const currentLocation = window.location.pathname;

  return (
    <>
      <MenuItem page={itemPage} onClick={() => setVisible(!visible)} />
      <SubMenu.Wrapper visible={visible} className={`${visible ? "is-visible" : ""}`}>
        {pages.map((page) => (
          <MenuItem
            isActive={currentLocation.includes(page.to)}
            key={nanoid()}
            isSubMenu
            page={page}
            onClick={onSubMenuClick}
          />
        ))}
      </SubMenu.Wrapper>
    </>
  );
};

SubMenu.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.visible &&
    css`
      display: none;
    `}
`;

const SideBarContent = (props) => {
  const { pages } = props;
  const history = useHistory();
  const currentLocation = window.location.pathname;
  // const toast = useToast();
  const menuItemClickHandler = (page) => history.push(page.to);
  // const logout = async () => {
  //   try {
  //     toast({
  //       title: "success",
  //       description: "success",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //       position: "top"
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "error",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //       position: "top"
  //     });
  //   }
  // };
  return (
    <>
      <aside>
        {pages.map((page) => {
          const { text, icon, submenu } = page;
          return submenu === undefined ? (
            <MenuItem
              isActive={currentLocation.includes(page.to)}
              page={page}
              key={nanoid()}
              onClick={menuItemClickHandler}
            />
          ) : (
            <SubMenu
              onSubMenuClick={menuItemClickHandler}
              key={page.text}
              text={text}
              pages={submenu}
            />
          );
        })}
      </aside>
    </>
  );
};

export default SideBarContent;
