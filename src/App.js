import "./App.css";
import HomePage from "./Screens/HomePage/HomePage";
import Header from "./Components/Header";
import Register from "./Components/Register/Register";
import Login from "./Components/Login";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import VerifyEmail from "./Components/VerifyEmail";
import { useEffect, useState } from "react";
import TeacherData from "./Screens/TeacherData";
import DepttData from "./Screens/DepttData";
import StudentData from "./Screens/StudentData";
// import Temp from "./Components/Temp";
function App() {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(null);
  const [heading, setheading] = useState("");
  const [width, setWidth] = useState(window.innerWidth <= 768);
  const [showNav, setshowNav] = useState(false);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth <= 768);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const { user } = useSelector((state) => state.auth);
  const newprop = {
    isMobile: width,
    loading,
    success,
    error,
    setsuccess,
    setloading,
    seterror,
    heading,
    setheading,
  };
  const userRoute = {
    home: (
      <Route
        path="/"
        render={(props) => <HomePage {...props} {...newprop} />}
        exact
      />
    ),
    0: (
      <Route
        path="/"
        render={(props) => <StudentData {...props} {...newprop} />}
        exact
      />
    ),
    1: (
      <Route
        path="/"
        render={(props) => <TeacherData {...props} {...newprop} />}
        exact
      />
    ),
    2: (
      <Route
        path="/"
        render={(props) => <DepttData {...props} {...newprop} />}
        exact
      />
    ),
  };
  function DispUserRoute({ state }) {
    return <>{userRoute[state]}</>;
  }
  return (
    <BrowserRouter>
      <Header style={{ backgroundColor: "#222" }} isMobile={newprop.isMobile} showNav={showNav} setshowNav={setshowNav}/>
      <main className="" style={{ backgroundColor: "#222" }}>
        <Container fluid>
          <Route
            path="/login"
            render={(props) => (
              <Login
                location={props.location}
                history={props.history}
                role={1}
              />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <Register location={props.location} history={props.history} />
            )}
          />
          <Route
            path="/verifyAccount/:role"
            render={(props) => <VerifyEmail {...props} />}
          />
          {/* <Route path="/temp" render={(props) => <Temp {...props} />} /> */}
          {user ? (
            <DispUserRoute state={user.role} />
          ) : (
            <>
              <DispUserRoute state="home" />
            </>
          )}
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
