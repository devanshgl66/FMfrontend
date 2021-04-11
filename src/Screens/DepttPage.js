import React, { Children, useState } from "react";
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
import {Container,Row,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import sidebarBg from "../bg1.jpg";
import "../NavStyle.scss";
import AddClass from "../Components/AddClass";
import ShowAllClass from "../Components/ShowAllClass";
import DeptProfile from "../Components/profile/Dept";
// import '../NavStyle.css'
const DepttPage= () => {
  const [comp, setcomp] = useState('dashboard')
  const [particularClass, setparticularClass] = useState(null)
  const compEnum={
    dashboard:<h1>DashBoard</h1>,
    addClass:<AddClass Class={null}/>,
    editClass:<AddClass Class={particularClass}/>,
    profile:<DeptProfile/>
  }
  function DispComponent({state}){
    return <>{compEnum[state]}</>
  }
  return (
      <Row>
        <Col md='auto'>
        <ProSidebar
        image={sidebarBg}
      >
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
            <MenuItem icon={<FaGem />} onClick={()=>setcomp('profile')}> Profile</MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              title="Manage Classes"
              icon={<FaRegLaughWink />}
            >
              <MenuItem onClick={()=>setcomp('addClass')}>Add Class</MenuItem>
              <SubMenu  title={'Edit Class'}>
                <ShowAllClass  particularClass={particularClass} setparticularClass={setparticularClass}onClick={()=>setcomp('editClass')}/>
              </SubMenu>
            </SubMenu>
            <SubMenu
              prefix={<span className="badge gray">3</span>}
              title="With Prefix"
              icon={<FaHeart />}
            >
              <MenuItem>Submenu 1</MenuItem>
              <MenuItem>Submenu 2</MenuItem>
              <MenuItem>Submenu 3</MenuItem>
            </SubMenu>
            <SubMenu title="Multi Level" icon={<FaList />}>
              <MenuItem>Submenu 1</MenuItem>
              <MenuItem>Submenu 2</MenuItem>
              <SubMenu title={"Submenu 3"}>
                <MenuItem>Submenu 3.1</MenuItem>
                <MenuItem>Submenu 3.2</MenuItem>
                <SubMenu title={"Submenu 3.3"}>
                  <MenuItem>Submenu 1</MenuItem>
                  <MenuItem>Submenu 2</MenuItem>
                  <MenuItem>Submenu 3</MenuItem>
                </SubMenu>
              </SubMenu>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          {/* <div
              className="sidebar-btn-wrapper"
              style={{
                padding: '20px 24px',
              }}
            >
              <a
                href="https://github.com/azouaoui-med/react-pro-sidebar"
                target="_blank"
                className="sidebar-btn"
                rel="noopener noreferrer"
              >
                <FaGithub />
                <span> {intl.formatMessage({ id: 'viewSource' })}</span>
              </a>
            </div> */}
        </SidebarFooter>
      </ProSidebar>
        </Col>
        <Col>
            <DispComponent state={comp}/>
        </Col>
      </Row>
  );
};
const DepttPage2=()=>{
  return(
    <Row>
      <Col>
        col1
      </Col>
      <Col>
        col2
      </Col>
    </Row>
  )
}
export default DepttPage;
