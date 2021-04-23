import React, { useState } from "react";
import Sidebar from "react-sidebar";
import styled from "@emotion/styled";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import SideBarContent from "./SideBarContent";
import { PROTECTED_PATHS } from "../constants";
import { SUB_ROUTES } from "../routes";
import { nanoid } from "nanoid";
import { useMediaQuery } from "@chakra-ui/react";
import NavBar from "../NavBar";
import  logo  from '../resources/kokeblack.png'

const { DASHBOARD, USERS, MEMBERS, SHOP, ORDER } = PROTECTED_PATHS;

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobile] = useMediaQuery("(min-width: 800px)");
  const { path } = useRouteMatch();

  const links = [
    {
      to: DASHBOARD,
      text: "Home"
    },
    {
      to: MEMBERS,
      text: "Members"
    },
    {
      to: ORDER,
      text: "Orders"
    },
    {
      to: SHOP,
      text: "Products"
    },
    {
      to: USERS,
      text: "Users"
    },
  
    
  ];
  return (
    <Layout.Wrapper>
      <Sidebar
        sidebar={
          <div className="sidebar-content">
            <div
              className="logo d-flex justify-content-center"
              style={{ backgroundColor: "#1F2833" }}>
           <img src={logo} alt="logo"style={{ width: "100px", height:"50px"}}/>
            </div>
            <SideBarContent pages={links} />
          </div>
        }
        open={isOpen}
        onSetOpen={() => setIsOpen(false)}
        docked={mobile}
        // onSetOpen={OpenSideBar}
        styles={{
          sidebar: { background: "white" },
          root: { height: "100vh" }
        }}>
        <NavBar showSideBar={() => setIsOpen(true)} />
        <div className="sidebar-body">
          <Switch>
            {SUB_ROUTES.map(({ page, path: route }) => (
              <Route exact key={nanoid()} component={page} path={`${path}/${route}`} />
            ))}

            <Route exact path="/*">
              <Redirect to={`${path}/${DASHBOARD}`} />
            </Route>
          </Switch>
        </div>
      </Sidebar>
    </Layout.Wrapper>
  );
};

Layout.Wrapper = styled.div`
  .sidebar-body {
    background-color: #fcfcfc;
    min-height: 100vh;
    padding: 33px;
    @media only screen and (max-width: 600px) {
      padding: 13px;
    }
  }
  .sidebar-content {
    background: #0B0C10;
    height: 100%;
    color: white;
    width: 238px;
    .logo {
      display: flex;
      /* justify-content:center; */
      padding: 26px 0;
      .dash {
        width: 22px;
        height: 19.5px;
        margin-left: 20px;
      }
      .word {
        width: 76px;
        height: 24px;
        margin-left: 20px;
      }
    }
  }
`;
export default Layout;
