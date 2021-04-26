import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/actions/authAction";
import Loader from './Loader'
import Message from './Message'
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const user={}
  const [loading, setloading] = useState(undefined)
  const logoutHandler = () => {
    setloading(false)
    dispatch(userLogout({ role: user.role }));
    setloading(true)
  };
  return (
    <header>
      {/* {loading===true&&<Message variant='success'>You are logout</Message>} */}
      {loading===false&&<Loader/>}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        {/* Container removed in below line */}
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src="logo192.png"
                alt="pending logo"
              />
              Name of project
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" />
                  Cart
                </Nav.Link>
              </LinkContainer> */}
              {user ? (
                <NavDropdown title={
                <span className="pull-left">
                  {user.profilePic?
                    <img className="thumbnail-image" 
                        src={user.profilePic} 
                        alt="user pic"
                        style={{height:'75px',width:'75px'}}
                    />
                    :
                    <i className="fa fa-user"/>
                  }
                {' '+user.name}
                </span>}>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                <NavDropdown title="Sign in" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/login/0">Student</NavDropdown.Item>
        <NavDropdown.Item href="/login/1">teacher</NavDropdown.Item>
        <NavDropdown.Item href="/login/2">Department</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Register" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/register/0">Student</NavDropdown.Item>
        <NavDropdown.Item href="/register/1">teacher</NavDropdown.Item>
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
