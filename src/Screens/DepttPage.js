import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import sidebarBg from "../bg1.jpg";
import "../NavStyle.scss";
import AddClass from "../Components/AddClass";
import ShowAllClass from "../Components/ShowAllClass";
import DeptProfile from "../Components/profile/Dept";
import AddSubject from "../Components/AddSubject";
import { editSubject } from "../redux/actions/subject";
import SideNav from "./navbar.css";
import { SeeAttendanceForm } from "../Components/SeeAttendance";
// import '../NavStyle.css'
const DepttPage = (props) => {
  const [comp, setcomp] = useState("dashboard");
  const [particularClass, setparticularClass] = useState(null);
  const [showNav, setshowNav] = useState(true);
  console.log(particularClass)
  const compEnum = {
    dashboard: <><h1>DashBoard</h1><SeeAttendanceForm askDate={false}/></>,
    addClass: <AddClass Class={null} />,
    editClass: <AddClass Class={particularClass} />,
    profile: <DeptProfile {...props} />,
    addSubject: <AddSubject />,
    editSubject: <AddSubject Subject={{}} />,
  };
  function DispComponent({ state }) {
    return <>{compEnum[state]}</>;
  }
  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => setshowNav(!showNav)}>&#9776;</Button>
        </Col>
      </Row>
      <Row>
        <Col md="auto">
          <ProSidebar
            image={sidebarBg}
            collapsedWidth="0px"
            collapsed={showNav}
            className="sidenav"
            id="mySidenav"
          >
            <span
              class="closebtn"
              style={{ cursor: "pointer" }}
              onClick={() => setshowNav(!showNav)}
            >
              &times;
            </span>
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
                Department Handle
              </div>
            </SidebarHeader>

            <SidebarContent>
              <Menu iconShape="circle">
                <MenuItem
                  icon={<FaTachometerAlt />}
                  onClick={() => setcomp("dashboard")}
                >
                  Dashboard
                </MenuItem>
                <MenuItem icon={<FaGem />} onClick={() => setcomp("profile")}>
                  {" "}
                  Profile
                </MenuItem>
              </Menu>
              <Menu iconShape="circle">
                <SubMenu title="Manage Classes" icon={<FaRegLaughWink />}>
                  <MenuItem onClick={() => setcomp("addClass")}>
                    Add Class
                  </MenuItem>
                  <SubMenu title={"Edit Class"}>
                    <ShowAllClass
                      particularClass={particularClass}
                      setparticularClass={setparticularClass}
                      onClick={() => setcomp("editClass")}
                    />
                  </SubMenu>
                </SubMenu>
              </Menu>
              <Menu iconShape="circle">
                <SubMenu title="Manage Subjects" icon={<FaRegLaughWink />}>
                  <MenuItem onClick={() => setcomp("addSubject")}>
                    Add Subject
                  </MenuItem>
                  <MenuItem onClick={() => setcomp("editSubject")}>
                    Edit Subject
                  </MenuItem>
                </SubMenu>
              </Menu>
            </SidebarContent>
          </ProSidebar>
        </Col>
        <Col>
          <DispComponent state={comp} />
        </Col>
      </Row>
    </>
  );
};
export default DepttPage;
