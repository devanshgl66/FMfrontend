import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { dropDown } from "../redux/actions/classAction";
import { markAttendance } from "../redux/actions/attendance";
const TeacherPage = (props) => {
  const dispatch = useDispatch()
  const [comp, setcomp] = useState("dashboard");
  const [particularClass, setparticularClass] = useState(null);
  const [teacherClass, setteacherClass] = useState()
  const [Class, setClass] = useState({})
  const compEnum = {
    dashboard: <h1>DashBoard</h1>,
    addClass: <AddClass Class={null} />,
    editClass: <AddClass Class={particularClass} />,
    profile: <TeacherProfile {...props} />,
    markAttendance:<AddAttendanceForm Class={Class}/>
  };
  function DispComponent({ state }) {
    return <>{compEnum[state]}</>;
  }
  useEffect(() => {
    (async function(){
      try{
        const data=await dispatch(dropDown({teacherData:'1'}))
      setteacherClass(data.class)
      }catch(err){
        console.log(err)
        setteacherClass(null)
      }
    })()
  }, [dispatch])
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
              Teacher Handle
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem icon={<FaTachometerAlt />} onClick={() => setcomp("dashboard")}>Dashboard</MenuItem>
              <MenuItem icon={<FaGem />} onClick={() => setcomp("profile")}>
                {" "}
                Profile
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu title="Manage Classes" icon={<FaRegLaughWink />}>
              <SubMenu title={"Mark attendance"}>
                {teacherClass&&teacherClass.map((Class,idx)=>{
                  return <SubMenu title={<>Branch:{Class.branchCode}{" "}YoS:{Class.yearOfStart}</>}>
                    {Class.section.map(section=>{
                      return <SubMenu title={section.name}>
                        {section.subject.map(subject=>{
                          return <MenuItem onClick={() => {
                            setcomp("markAttendance");
                            setClass({branchCode:Class.branchCode,yearOfStart:Class.yearOfStart,sectionName:section.name,subjectCode:subject})
                          }}
                          >{subject}</MenuItem>
                        })}
                      </SubMenu>
                    })}
                  </SubMenu>
                })}
                </SubMenu>
                {/* <SubMenu onClick={() => {
                    setcomp("markAttendance");
                    setClass({branchCode:Class.branchCode,yearOfStart:Class.yearOfStart})
                  }}>
                    Branch:{Class.branchCode}{" "}YoS:{Class.yearOfStart}
                  </SubMenu>
                <SubMenu title={"Edit Class"}>
                  <ShowAllClass
                    particularClass={particularClass}
                    setparticularClass={setparticularClass}
                    onClick={() => setcomp("editClass")}
                  />
                </SubMenu> */}
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
