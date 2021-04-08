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
import {Link} from 'react-router-dom'
import sidebarBg from "../bg1.jpg";
import "../NavStyle.scss";
// import '../NavStyle.css'
const DepttPage = () => {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div className="app">
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
            <MenuItem icon={<FaGem />}> Components</MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">3</span>}
              title="Manage Classes"
              icon={<FaRegLaughWink />}
            >
              <MenuItem> 
              <Link to='/'>Add Class</Link>
              </MenuItem>
              <MenuItem> 2</MenuItem>
              <MenuItem> 3</MenuItem>
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
    </div>
  );
};

export default DepttPage;
