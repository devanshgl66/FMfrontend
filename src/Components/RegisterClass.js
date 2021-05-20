/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Image, Form } from "react-bootstrap";
import { LocalForm, Control } from "react-redux-form";
import { Input, Label } from "reactstrap";
import Message from "./Message";
import {useDispatch, useSelector} from 'react-redux'
import { userRegister } from "../redux/actions/authAction";
import Loader from './Loader'
import ModalMessage from './ModalMessage'
import {Link} from 'react-router-dom'
import Webcam from "react-webcam";
import Avatar from 'react-avatar-edit'
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
function Register (props) {
  const dispatch = useDispatch()
  const [error,seterror]=useState(null)
  const [success,setsuccess]=useState(false)
  const [loading,setloading]=useState(false)
  const role=parseInt(props.location.pathname.split('/')[2])
  const webcamRef = React.useRef(null);
  function RegisterDepartment (props) {
    const [email,setemail]=useState('')
    const [profilePic, setprofilePic] = useState(null)
      const [preview, setpreview] = useState(null)
     const [branch, setbranch] = useState([''])
      function onClose() {
        setpreview( null)
    }
    
    function onCrop(preview) {
        setpreview(preview)
    }
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
          handleRegister({...val,role:2,profilePic:preview,branch:branch},msg)
      }
    }
    return (
      <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} xs={12}>
            <h1>Department Register</h1>
            <LocalForm
              onSubmit={(values, e) => {e.preventDefault(); TeacherRegisterHandler(values, e)}}
            >
              <>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="image">Profile Pic:</Label>
                  <Avatar
                      width={390}
                      height={295}
                      onCrop={onCrop}
                      onClose={onClose}
                      src={profilePic}
                  />
                  <img src={preview} alt="Preview" />
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
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
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
              <Row>
                <Col>
                <Label htmlFor="branch">Branch Code</Label>
                <Button onClick={()=>{
            var br=[...branch,'']
            setbranch(br)
          }}><CgAdd/></Button>
          {branch.map((branchCode,idx)=>(
            <>
            <Form.Control
            type="number"
            value={branchCode}
            min={1}
            onChange={(e) => {
              var br=[...branch];
              br[idx]=e.target.value
              setbranch(br)
            }}
            required
          />
          <Button onClick={()=>{
            var br=[...branch]
            br.splice(idx,1)
            setbranch(br)
          }}><RiDeleteBin6Line/></Button>
          </>
          ))}          
                </Col>
              </Row>
          </>
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
      </>
    );
  };
  function RegisterTeacher (props) {
  const [email,setemail]=useState('')
  const [profilePic, setprofilePic] = useState(null)
    const [preview, setpreview] = useState(null)
    function onClose() {
      setpreview( null)
  }
  
  function onCrop(preview) {
      setpreview(preview)
  }
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
        handleRegister({...val,role:1,profilePic:preview},msg)
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
            <>
            <Row className="form-group">
              <Col>
                <Label htmlFor="image">Profile Pic:</Label>
                <Avatar
                    width={390}
                    height={295}
                    onCrop={onCrop}
                    onClose={onClose}
                    src={profilePic}
                />
                <img src={preview} alt="Preview" />
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
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
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
    </>
  );
};
function RegisterStudent(props)  {
  const [email,setemail]=useState('')
  const [profilePic, setprofilePic] = useState(null)
    const [preview, setpreview] = useState(null)
    function onClose() {
      setpreview( null)
  }
  
  function onCrop(preview) {
      setpreview(preview)
  }
  
  const [errorMessage, seterrorMessage] = useState("");    
  async function StudentRegisterHandler(val, e) {
      e.preventDefault();
      if (val.password.length < 8)
        seterrorMessage("Password must be of length 8");
      else if (val.password !== val.password2)
        seterrorMessage("Password do not Match");
      else if((val.rollNo).toString().length!==11)
        seterrorMessage("Wrong Roll no");
      else if(selectedImg.length<6)
        seterrorMessage('Please at least select 6 photos')
      else {
        const msg={seterror,setloading,setsuccess}
        seterrorMessage("");
        const student=JSON.parse(JSON.stringify(val)) 
        student.role=0  //0=STUDENT
        student.profilePic=preview
        var photos=[]
        for(var i=0;i<selectedImg.length;i++){
          photos.push(imgSrc[selectedImg[i]])
        }
        // console.log(selectedImg)
        student.images=photos
        console.log(student)
        await handleRegister(student,msg)
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
          tempStyle[i]={...tempStyle[i],border:'2px solid green'}
        else
          tempStyle[i]={...tempStyle[i],border:'none'}
        setstyleImg(tempStyle)
        // console.log(selectedImg)
      }
      
    
      const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({width: 512, height:512})
        // (imgSrc.push(imageSrc));
        setImgSrc([...imgSrc,imageSrc])
        setstyleImg([...styleImg,{border:'none'}])
      }, []);
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
          <br/>
          <Button onClick={capture}>Capture photo</Button>
          <Row>
          {imgSrc && (
            <>{showImages.map(im=>
              (
                <Col sm={12} md={4} className='py-4'>{im}</Col>
              ))}</>
            
          )}
          </Row>
        </>
      );
    };
    
    return (
      <>
        <>
        <Row className="justify-content-md-center">
          <Col md={6} xs={12}>
            <h1>Student Register</h1>
            <LocalForm
              onSubmit={(values, e) => StudentRegisterHandler(values, e)}
            >
              <>
            <Row className="form-group">
              <Col>
                <Label htmlFor="image">Profile Pic:</Label>
                <Avatar
                    width={390}
                    height={295}
                    onCrop={onCrop}
                    onClose={onClose}
                    src={profilePic}
                />
                <img src={preview} alt="Preview" />
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
      </> 
      </>
    );
  };
  async function handleRegister(val,msg){
        // console.log(val)
        msg.setloading(true)
        const err=await dispatch(userRegister({...val}))
        // const err=null
        msg.setloading(false)
        if(err==null){
          //PENDING
          setTimeout(() => {
            props.history.push(`/verifyAccount/${role}`,{email:val.email,role:role,loggedIn:false})
          }, 5000);
        }
        else
          msg.seterror(err)
}
  console.log(error)
  
  return (
    <>
    {
      role==0?<RegisterStudent />:role==1?<RegisterTeacher />:<RegisterDepartment/>
    }
    {loading?<ModalMessage isOpen={loading} toggle={()=>setloading(!loading)} header='Registration' variant='none'>
        <Loader/>
      </ModalMessage>:error!=null?<ModalMessage isOpen={error!=null} toggle={()=>seterror(null)} header='Registration' variant='danger'>
        {error}
      </ModalMessage>:success?<ModalMessage isOpen={success} toggle={()=>setsuccess(!success)} header='Registration' variant='success'>
        Registration success.Please verify your email also from profile.Go to <Link to={`/`}>home</Link> page
      </ModalMessage>:<></>}
    </>
  );
};

export default Register;
