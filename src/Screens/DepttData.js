import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Components/Dashboard";
import { AddAttendanceForm } from "../Components/MarkAttendance";
import TeacherProfile from "../Components/profile/Teacher";
import SeeClass from "../Components/SeeClass";
import { dropDown, viewClass } from "../redux/actions/classAction";
import UserPage from "./UserPage";
import { AiOutlineDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import AddClass from "../Components/AddClass";
import DeptProfile from "../Components/profile/Dept";
import AddSubject from "../Components/AddSubject";
import ShowAllClass from "../Components/ShowAllClass";
import { FcManager } from "react-icons/fc";
import { MdSubject } from "react-icons/md";
import "../NavStyle.scss";
import "./navbar.css";
const DepttData = (props) => {
  const dispatch = useDispatch();
  const [comp, setcomp] = useState("dashboard");
  const [classes, setclasses] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [particularClass, setparticularClass] = useState(null);
  const {error,seterror,loading,setloading,success,setsuccess,setheading,heading}=props
  useEffect(() => {
    (async function () {
      var response = await dispatch(
        dropDown({
          branchCode: user.branch,
        })
      );
      if (response.success !== false) setclasses(response.class);
    })();
  }, []);
  async function renderEditClass(cl) {
    var Class = await dispatch(
      viewClass({ branchCode: cl.branchCode, yearOfStart: cl.yearOfStart })
    );
    if (Class.error) console.error(Class.error);
    else setparticularClass(Class.class);
  }
  const compEnum = {
    dashboard: <Dashboard />,
    addClass: <AddClass Class={null} />,
    editClass: <AddClass Class={particularClass} />,
    profile: (
      <DeptProfile
        {...props}
        setsuccess={setsuccess}
        setloading={setloading}
        seterror={seterror}
      />
    ),
    addSubject: <AddSubject />,
    editSubject: <AddSubject Subject={{}} />,
  };
  // console.log("hlo");
  console.log(loading)
  return (
    <>
      <UserPage
        compEnum={compEnum}
        comp={comp}
        setcomp={setcomp}
        isMobile={props.isMobile}
        userHandle="Department's Handle"
        loading={loading}
        success={success}
        error={error}
        setsuccess={setsuccess}
        setloading={setloading}
        seterror={seterror}
        heading={heading}
        setheading={setheading}
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
                data: classes.map((Class) => {
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
                      renderEditClass(Class);
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
};

export default DepttData;
