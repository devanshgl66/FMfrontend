import React, { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FaTachometerAlt, FaGem, FaRegLaughWink } from "react-icons/fa";
import { Row, Col, Button } from "react-bootstrap";
import sidebarBg from "../bg1.jpg";
import "../NavStyle.scss";
import AddClass from "../Components/AddClass";
import ShowAllClass from "../Components/ShowAllClass";
import TeacherProfile from "../Components/profile/Teacher";
import { AddAttendanceForm } from "../Components/MarkAttendance";
import { useDispatch } from "react-redux";
import { dropDown } from "../redux/actions/classAction";
import { markAttendance } from "../redux/actions/attendance";
import SideNav from "./navbar.css";
import SeeClass from "../Components/SeeClass";
const TeacherPage = (props) => {
  const dispatch = useDispatch();
  const [comp, setcomp] = useState("dashboard");
  const [particularClass, setparticularClass] = useState(null);
  const [teacherClass, setteacherClass] = useState();
  const [Class, setClass] = useState({});
  const [showNav, setshowNav] = useState(false);
  
  function DispComponent({ state }) {
    return <>{compEnum[state]}</>;
  }
  const [width, setWidth] = useState(window.innerWidth);
function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
let isMobile= (width <= 768);
  useEffect(() => {
    (async function () {
      try {
        const data = await dispatch(dropDown({ teacherData: "1" }));
        setteacherClass(data.class);
      } catch (err) {
        console.log(err);
        setteacherClass(null);
      }
    })();
  }, [dispatch]);
  const compEnum = {
    dashboard: <h1>DashBoard</h1>,
    profile: <TeacherProfile {...props} />,
    markAttendance: <AddAttendanceForm Class={Class} />,
    seeClass:<SeeClass Class={Class} isMobile={isMobile}/>
  };
  return (
    <>{
      isMobile?
      <Row>
        <Col>
          <Button onClick={() => setshowNav(!showNav)}>&#9776;</Button>
        </Col>
      </Row>:<></>}
      <Row>
        <Col md="auto">
          <ProSidebar
            image={sidebarBg}
            collapsedWidth="0px"
            collapsed={isMobile?showNav:false}
            className={isMobile?'sidenav':''}
            id={isMobile?'mySidenav':''}
          >
            {isMobile?
            <span
              class="closebtn"
              style={{ cursor: "pointer" }}
              onClick={() => setshowNav(!showNav)}
            >
              &times;
            </span>:<></>
            }
            
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
                Teacher Handle
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
                  <SubMenu title={"Mark attendance"}>
                    {teacherClass &&
                      teacherClass.map((Class, idx) => {
                        return (
                          <SubMenu
                            title={
                              <>
                                Branch:{Class.branchCode}<br/>
                                Year Of Start:{Class.yearOfStart}
                              </>
                            }
                          >
                            {Class.section.map((section) => {
                              return (
                                <SubMenu title={section.name}>
                                  {section.subject.map((subject) => {
                                    return (
                                      <MenuItem
                                        onClick={() => {
                                          setcomp("markAttendance");
                                          setClass({
                                            branchCode: Class.branchCode,
                                            yearOfStart: Class.yearOfStart,
                                            sectionName: section.name,
                                            subjectCode: subject,
                                          });
                                        }}
                                      >
                                        {subject}
                                      </MenuItem>
                                    );
                                  })}
                                </SubMenu>
                              );
                            })}
                          </SubMenu>
                        );
                      })}
                  </SubMenu>
                  <SubMenu title={'See Class'}>
                  {teacherClass &&
                      teacherClass.map((Class, idx) => {
                        return (
                          <SubMenu
                            title={
                              <>
                                Branch:{Class.branchCode}<br/>
                                Year Of Start:{Class.yearOfStart}
                              </>
                            }
                          >
                            {Class.section.map((section) => {
                              return (
                                <SubMenu title={section.name}>
                                  {section.subject.map((subject) => {
                                    return (
                                      <MenuItem
                                        onClick={() => {
                                          setcomp("seeClass");
                                          setClass({
                                            branchCode: Class.branchCode,
                                            yearOfStart: Class.yearOfStart,
                                            sectionName: section.name,
                                            subjectCode: subject,
                                          });
                                        }}
                                      >
                                        {subject}
                                      </MenuItem>
                                    );
                                  })}
                                </SubMenu>
                              );
                            })}
                          </SubMenu>
                        );
                      })}
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
    </>
  );
};
export default TeacherPage;
