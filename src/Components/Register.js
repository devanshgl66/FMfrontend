import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import { LocalForm, Control } from "react-redux-form";
import { Label } from "reactstrap";
import Message from "./Message";
import {useDispatch, useSelector} from 'react-redux'
import { userRegister } from "../redux/actions/authAction";
import Loader from './Loader'
import ModalMessage from './ModalMessage'
import {Link} from 'react-router-dom'
import WebcamCapture from "./WebcamCapture";
import Webcam from "react-webcam";
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
                  model=".profilePic"
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
                <Label htmlFor="firstname">Name</Label>
                <Control.text
                  model=".name"
                  id="name"
                  name="name"
                  placeholder="name"
                  className="form-control"
                  required
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
      // console.log(val)
      // const teacher=JSON.parse(JSON.stringify(val)) 
      //   teacher.role=1  //1=TEACHER
      //   if(val.image && val.image.length>0)
      //   teacher.profilePic=val.profilePic
      //   console.log(teacher)
        handleRegister({...val,role:1},msg)
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
      else if(selectedImg.length<6)
        seterrorMessage('Please at least select 6 photos')
      else {
        const msg={seterror,setloading,setsuccess}
        seterrorMessage("");
        const student=JSON.parse(JSON.stringify(val)) 
        student.role=0  //0=STUDENT
        if(val.image && val.image.length>0)
        student.profilePic=val.image[0]
        var photos=[]
        for(var i=0;i<selectedImg.length;i++){
          photos.push(imgSrc[selectedImg[i]])
        }
        // console.log(selectedImg)
        student.images=photos
        console.log(student)
        await handleRegister({...val,role:0,images:photos},msg)
      }
    }
    const [imgSrc, setImgSrc] = useState([]);
    const [selectedImg, setselectedImg] = useState([])
    const [styleImg, setstyleImg] = useState([])

    const WebcamCapture = () => {
      
      function selectimg(i){
        var temp=[...selectedImg]
        var index=temp.indexOf(i)
        if(index>-1){
          temp.splice(index,1)
          setselectedImg(temp)
        }
        else
          setselectedImg([...selectedImg,i])
        var tempStyle=[...styleImg]
        if(styleImg[i].border=='none')
          tempStyle[i]={...tempStyle[i],border:'2px solid black'}
        else
          tempStyle[i]={...tempStyle[i],border:'none'}
        setstyleImg(tempStyle)
        // console.log(selectedImg)
      }
      const webcamRef = React.useRef(null);
    
      const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({width: 512, height:512})
        // (imgSrc.push(imageSrc));
        setImgSrc([...imgSrc,imageSrc])
        setstyleImg([...styleImg,{border:'none'}])
      }, [webcamRef]);
      const showImages=imgSrc.map((image,i)=>{        
        return(
            <Image onClick={()=>{selectimg(i)}}
             src={image} style={{...styleImg[i],width:150,height:150}}/>
           
        )
      })
      return (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button onClick={capture}>Capture photo</button>
          {imgSrc && (
            <>{showImages.map(im=>im)}</>
            
          )}
        </>
      );
    };
    
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
            <Row className="form-group">
              <Col>
                <Label htmlFor="yearOfStart">year of admission</Label>
                <Control.text
                  type='number'
                  model=".yearOfStart"
                  id="yearOfStart"
                  name="yearOfStart"
                  placeholder="yearOfStart"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Upload photos</h4>
                <h6 className='text-muted'>Select 6 photos</h6>
                <h6 className='text-muted'>Click a photo to select it</h6>
                <WebcamCapture/>
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
