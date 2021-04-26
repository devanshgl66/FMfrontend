import React, {  useState } from "react";
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
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import sidebarBg from "../bg1.jpg";
import "../NavStyle.scss";
import AddClass from "../Components/AddClass";
import ShowAllClass from "../Components/ShowAllClass";
import DeptProfile from "../Components/profile/Dept";
import AddSubject from "../Components/AddSubject";
import { editSubject } from "../redux/actions/subject";
// import '../NavStyle.css'
const DepttPage = () => {
  const [comp, setcomp] = useState("dashboard");
  const [particularClass, setparticularClass] = useState(null);
  const compEnum = {
    dashboard: <h1>DashBoard</h1>,
    addClass: <AddClass Class={null} />,
    editClass: <AddClass Class={particularClass} />,
    profile: <DeptProfile />,
    addSubject:<AddSubject/>,
    editSubject:<AddSubject Subject={{}}/>
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
              Department Handle
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
  );
};
export default DepttPage;
