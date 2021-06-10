import React, {useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Dashboard from "../Components/Dashboard";
import { dropDown, viewClass } from "../redux/actions/classAction";
import UserPage from "./UserPage";
import { AiOutlineDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import AddClass from "../Components/AddClass";
import DeptProfile from "../Components/profile/Dept";
import AddSubject from "../Components/AddSubject";
import { FcManager } from "react-icons/fc";
import { MdSubject } from "react-icons/md";
import "../NavStyle.scss";
import "./navbar.css";
class DepttData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comp: "dashboard",
      classes: [],
      particularClass: null,
    };
    const {
      error,
      seterror,
      loading,
      setloading,
      success,
      setsuccess,
      setheading,
      heading,
    } = this.props;
    this.renderEditClass = this.renderEditClass.bind(this);
    this.compEnum = {
      dashboard: <Dashboard />,
      addClass: <AddClass Class={null} />,
      editClass: <AddClass Class={this.state.particularClass} />,
      profile: (
        <DeptProfile
          {...this.props}
          setsuccess={this.setsuccess}
          setloading={this.setloading}
          seterror={this.seterror}
        />
      ),
      addSubject: <AddSubject />,
      editSubject: <AddSubject Subject={{}} />,
    };
  }
  componentDidMount() {
    console.log(this.props.user)
    this.props
      .dropDown({
        branchCode: this.props.user.branch,
      })
      .then((response) => {
        if (response.success !== false)
          this.setState({ class: response.class });
      });
  }
  renderEditClass = async (cl) => {
    var Class = await this.props.viewClass({
      branchCode: cl.branchCode,
      yearOfStart: cl.yearOfStart,
    });
    if (Class.error) console.error(Class.error);
    else this.setState({ particularClass: Class.class });
  };

  render() {
    return (
      <>
        <UserPage
          compEnum={this.compEnum}
          comp={this.state.comp}
          setcomp={(val) => {
            this.setState({ comp: val });
          }}
          isMobile={this.props.isMobile}
          showNav={this.props.showNav}
          setshowNav={this.props.setshowNav}
          userHandle="Department's Handle"
          loading={this.state.loading}
          success={this.success}
          error={this.error}
          setsuccess={this.setsuccess}
          setloading={this.setloading}
          seterror={this.seterror}
          heading={this.heading}
          setheading={this.setheading}
          item={[
            {
              type: "menu",
              name: "Dashboard",
              icon: <AiOutlineDashboard />,
              compName: "dashboard",
            },
            {
              type: "menu",
              name: "Profile",
              icon: <CgProfile />,
              compName: "profile",
            },
            {
              type: "submenu",
              name: "Manage Classes",
              icon: <FcManager />,
              data: [
                {
                  type: "menu",
                  compName: "addClass",
                  name: "Add Class",
                },
                {
                  type: "submenu",
                  name: "Edit Class",
                  data: this.state.classes.map((Class) => {
                    return {
                      type: "menu",
                      name: (
                        <>
                          BranchCode:{Class.branchCode}
                          <br />
                          yearOfStart:{Class.yearOfStart}
                        </>
                      ),
                      compName: "editClass",
                      onClick: () => {
                        this.renderEditClass(Class);
                      },
                    };
                  }),
                },
              ],
            },
            {
              type: "submenu",
              name: "Manage Subjects",
              icon: <MdSubject />,
              data: [
                {
                  type: "menu",
                  compName: "addSubject",
                  name: "Add Subject",
                },
                {
                  type: "menu",
                  compName: "editSubject",
                  name: "Edit Subject",
                },
              ],
            },
          ]}
        />
      </>
    );
  }
}
export default connect(
  (state) => {
    return { user: state.auth.user };
  },
  (dispatch) => {
    return {
      dropDown: (val) => dispatch(dropDown(val)),
      viewClass: (val) => dispatch(viewClass(val)),
    };
  }
)(DepttData);
