import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { LocalForm, Control } from "react-redux-form";
import { Label } from "reactstrap";
import Message from "./Message";
import {useDispatch, useSelector} from 'react-redux'
import { userRegister } from "../redux/actions/authAction";
import Loader from './Loader'
import ModalMessage from './ModalMessage'
import {Link} from 'react-router-dom'
const Register = (props) => {
  const dispatch = useDispatch()
  const CommonRegistration=(props)=>{
    const [profilePic, setprofilePic] = useState(null)
    return(
        <>
            <Row className="form-group">
              <Col>
                <Label htmlFor="image">Profile Pic:</Label>
                <Control.file
                  type='file'
                  model=".image"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    setprofilePic(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <img
                  style={{ height: "100px", width: "100px" }}
                  src={profilePic}
                  alt="Profile Pic"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="email">Email</Label>
                <Control.text
                  model=".email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="firstname">Firstname</Label>
                <Control.text
                  model=".firstname"
                  id="firstname"
                  name="firstname"
                  placeholder="firstname"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="lastname">LastName</Label>
                <Control.text
                  model=".lastname"
                  id="lastname"
                  name="lastname"
                  className="form-control"
                  placeholder="Last Name"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="password">Password</Label>
                <Control.text
                  model=".password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  type="password"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="password">RetypePassword</Label>
                <Control.text
                  model=".password2"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  type="password"
                  required
                />
              </Col>
            </Row>
        </>
    )
}
function RegisterTeacher (props) {

  const [error,seterror]=useState(null)
  const [loading,setloading]=useState(false)
  const [success,setsuccess]=useState(false)
  const [errorMessage, seterrorMessage] = useState("");
  function TeacherRegisterHandler(val, e) {
    e.preventDefault();
    if (val.password.length < 8)
      seterrorMessage("Password must be of length 8");
    else if (val.password !== val.password2)
      seterrorMessage("Password do not Match");
    else {
      const msg={seterror,setloading,setsuccess}
      seterrorMessage("");
      const teacher=JSON.parse(JSON.stringify(val)) 
        teacher.role=1  //1=TEACHER
        handleRegister(teacher,msg)
    }
  }
  return (
    <>
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6} xs={12}>
          <h1>Teacher Register</h1>
          <LocalForm
            onSubmit={(values, e) => {e.preventDefault(); TeacherRegisterHandler(values, e)}}
          >
            <CommonRegistration/>
            <Row>
              <Col>
                {errorMessage.length > 0 ? (
                  <Message variant="danger">{errorMessage}</Message>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit" color="primary">
                  Register
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </Col>
      </Row>
    </Container>
    {loading?<ModalMessage isOpen={loading} toggle={()=>setloading(!loading)} header='Registration' variant='none'>
        <Loader/>
      </ModalMessage>:error!=null?<ModalMessage isOpen={error!=null} toggle={()=>seterror(null)} header='Registration' variant='danger'>
        {error}
      </ModalMessage>:success?<ModalMessage isOpen={success} toggle={()=>setsuccess(!success)} header='Registration' variant='success'>
        Registration success Go to <Link to={`/`}>home</Link> page
      </ModalMessage>:<></>}
    </>
  );
};

function RegisterStudent(props)  {

  const [error,seterror]=useState(null)
  const [loading,setloading]=useState(false)
  const [success,setsuccess]=useState(false)
  const [errorMessage, seterrorMessage] = useState("");
    async function StudentRegisterHandler(val, e) {
      e.preventDefault();
      if (val.password.length < 8)
        seterrorMessage("Password must be of length 8");
      else if (val.password !== val.password2)
        seterrorMessage("Password do not Match");
      else if((val.rollNo).toString().length!=11)
        seterrorMessage("Roll no. does not exist");
      else {
        const msg={seterror,setloading,setsuccess}
        seterrorMessage("");
        const student=JSON.parse(JSON.stringify(val)) 
        student.role=0  //0=STUDENT
        await handleRegister(student,msg)
        console.log(success)

      }
    }
    return (
      <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} xs={12}>
            <h1>Student Register</h1>
            <LocalForm
              onSubmit={(values, e) => StudentRegisterHandler(values, e)}
            >
              <CommonRegistration/>
              <Row className="form-group">
              <Col>
                <Label htmlFor="rollNo">Roll No.</Label>
                <Control.text
                  type='number'
                  model=".rollNo"
                  id="rollNo"
                  name="rollNo"
                  placeholder="rollNo"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="branch">Branch Code</Label>
                <Control.text
                  type='number'
                  model=".branch"
                  id="branch"
                  name="branch"
                  placeholder="branch"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
              <Row>
                <Col>
                  {errorMessage.length > 0 ? (
                    <Message variant="danger">{errorMessage}</Message>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit" color="primary">
                    Register
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </Col>
        </Row>
      </Container>
      {loading?<ModalMessage isOpen={loading} toggle={()=>setloading(!loading)} header='Registration' variant='none'>
        <Loader/>
      </ModalMessage>:error!=null?<ModalMessage isOpen={error!=null} toggle={()=>seterror(null)} header='Registration' variant='danger'>
        {error}
      </ModalMessage>:success?<ModalMessage isOpen={success} toggle={()=>setsuccess(!success)} header='Registration' variant='success'>
        Registration success Go to <Link to={`/`}>home</Link> page
      </ModalMessage>:<></>}
      
      </>
    );
  };
  async function handleRegister(val,msg){
        msg.setloading(true)
        const err=await dispatch(userRegister(val))
        msg.setloading(false)
        if(err==null)
          msg.setsuccess(true)
        else
          msg.seterror(err)
}
  return (
    <div>
      {props.user=='Student'?<RegisterStudent />:<RegisterTeacher/>}
    </div>
  );
};

export default Register;
