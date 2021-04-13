import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaRegLaughWink,
} from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import sidebarBg from "../bg1.jpg";
import "../NavStyle.scss";
import AddClass from "../Components/AddClass";
import ShowAllClass from "../Components/ShowAllClass";
import TeacherProfile from "../Components/profile/Teacher";
import { AddAttendanceForm } from "../Components/MarkAttendance";
const TeacherPage = () => {
  const [comp, setcomp] = useState("dashboard");
  const [particularClass, setparticularClass] = useState(null);
  const compEnum = {
    dashboard: <h1>DashBoard</h1>,
    addClass: <AddClass Class={null} />,
    editClass: <AddClass Class={particularClass} />,
    profile: <TeacherProfile />,
    markAttendance:<AddAttendanceForm/>
  };
  function DispComponent({ state }) {
    return <>{compEnum[state]}</>;
  }
  return (
    <Row>
      <Col md="auto">
        <ProSidebar image={sidebarBg}>
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
              Department(To be changed)
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem icon={<FaTachometerAlt />}>Dashboard</MenuItem>
              <MenuItem icon={<FaGem />} onClick={() => setcomp("profile")}>
                {" "}
                Profile
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu title="Manage Classes" icon={<FaRegLaughWink />}>
                <MenuItem onClick={() => setcomp("markAttendance")}>
                  Mark Attendance
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
          </SidebarContent>
        </ProSidebar>
      </Col>
      <Col>
        <DispComponent state={comp} />
      </Col>
    </Row>
  );
};
export default TeacherPage;
