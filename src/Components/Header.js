import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/actions/authAction";
import Loader from "./Loader";
import Message from "./Message";
import logo from "./logo.jpeg";
const Header = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const user={}
  const [loading, setloading] = useState(undefined);
  const logoutHandler = () => {
    setloading(false);
    dispatch(userLogout({ role: user.role }));
    setloading(true);
  };
  // console.log(user.profilePic.data.data.length)
  // console.log(new Buffer(user.profilePic.data.data,'base64').toString('base64').length)
  // console.log(`data:${user.profilePic.contentType};base64,${new Buffer(user.profilePic.data.data,'base64').toString('base64')}`)
  return (
    <header>
      {/* {loading===true&&<Message variant='success'>You are logout</Message>} */}
      {loading === false && <Loader />}
      <Navbar  variant="dark" bg="primary" collapseOnSelect>
        <Container fluid>
          <LinkContainer className="" to="/">
            <Navbar.Brand className="" href="/">
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src={logo}
                alt="logo"
              />
              <>One Click</>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            style={{ justifyContent: "end", fontSize: "larger" }}
            id="basic-navbar-nav"
          >
            <Nav className="">
              {user ? (
                <>
                  <NavDropdown
                    title={
                      <span className="pull-left">
                        {user.profilePic ? (<></>
                          // <img
                          //   className="thumbnail-image"
                          //   // src={user.profilePic}
                          //   src={
                          //     user.profilePic
                          //       ? `data:${
                          //           user.profilePic.contentType
                          //         };base64,${new Buffer(
                          //           user.profilePic.data.data,
                          //           "base64"
                          //         ).toString("base64")}`
                          //       : null
                          //   }
                          //   alt="user pic"
                          //   style={{ height: "50px", width: "50px" }}
                          // />
                        ) : (
                          <i className="fa fa-user" />
                        )}
                        {" " + user.name}
                      </span>
                    }
                  >
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  {props.isMobile ? (
                    <Row>
                      <Col>
                        <Button
                          onClick={() => props.setshowNav(!props.showNav)}
                        >
                          &#9776;
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <NavDropdown title="Sign in" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/login/0">Student</NavDropdown.Item>
                    <NavDropdown.Item href="/login/1">teacher</NavDropdown.Item>
                    <NavDropdown.Item href="/login/2">
                      Department
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Register" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/register/0">
                      Student
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/register/1">
                      Teacher
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/register/2">
                      Department
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
