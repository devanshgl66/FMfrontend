import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import sidebarBg from "../bg1.jpg";
import Loader from "../Components/Loader";
import ModalMessage from '../Components/ModalMessage'
const MySubMenu = (props) => {
  return (
    <SubMenu title={props.name} icon={props.icon}>
      {props.data.map((data) =>
        data.type === "submenu" ? (
          <MySubMenu
            setcomp={props.setcomp}
            {...data}
          />
        ) : (
          <MenuItem
            onClick={() => {
              props.setcomp(data.compName);
              if (data.onClick) data.onClick();
            }}
          >
            {data.name}
          </MenuItem>
        )
      )}
    </SubMenu>
  );
};
const UserPage = (props) => {
  const { isMobile, userHandle, setcomp,loading,error,success,setloading,setsuccess,seterror } = props;
  const [showNav, setshowNav] = useState(false);
  function DispComponent({ state }) {
    return <>{props.compEnum[state]}</>;
  }
  // console.log(loading)
  return (
    <>
      {props.isMobile ? (
        <Row>
          <Col>
            <Button onClick={() => setshowNav(!showNav)}>&#9776;</Button>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <Col md="auto">
          <ProSidebar
            image={sidebarBg}
            collapsedWidth="0px"
            collapsed={isMobile ? showNav : false}
            className={isMobile ? "sidenav" : ""}
            id={isMobile ? "mySidenav" : ""}
          >
            {isMobile ? (
              <span
                class="closebtn"
                style={{ cursor: "pointer" }}
                onClick={() => setshowNav(!showNav)}
              >
                &times;
              </span>
            ) : (
              <></>
            )}

            <SidebarHeader>
              <div
                style={{
                  padding: "24px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: "1px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userHandle}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="circle">
                {props.item.map((item) => {
                  return item.type === "menu" ? (
                    <MenuItem
                      icon={item.icon}
                      onClick={() => {
                        setcomp(item.compName);

                        if (props.onClick) props.onClick();
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ) : (
                    <MySubMenu
                    // onClick={item.onClick}
                      setcomp={setcomp}
                      // icon={item.icon}
                      {...item}
                    />
                  );
                })}
              </Menu>
            </SidebarContent>
          </ProSidebar>
        </Col>
        <Col>
          <DispComponent state={props.comp} />
        </Col>
      </Row>
      {loading ? (
        <ModalMessage
          isOpen={loading}
          toggle={() => setloading(!loading)}
          header="Profile"
          variant="none"
        >
          <Loader />
        </ModalMessage>
      ) : success!=null ? (
        <ModalMessage
          isOpen={success!=null}
          toggle={() => setsuccess(null)}
          header="Profile"
          variant="success"
        >
          {success}
        </ModalMessage>
      ): error != null ? (
        <ModalMessage
          isOpen={error != null}
          toggle={() => seterror(null)}
          header="Profile"
          variant="danger"
        >
          {error}
        </ModalMessage>
      )  : (
        <></>
      )}
    </>
  );
};

export default UserPage;
