/* eslint-disable react/jsx-pascal-case */
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
import { markAttendance } from "../redux/actions/attendance";

export const AddAttendanceForm=(props)=>{
    const dispatch = useDispatch()
    const [image, setimage] = useState([])
    const [error,seterror]=useState(null)
    const [loading,setloading]=useState(false)
    const [success,setsuccess]=useState(false)
    const [errorMessage, seterrorMessage] = useState("");
    const AttendanceImage=()=>{
        return(
            <>
                <Control.file
                    type='file'
                    model='.images'
                    id="image"
                    name="image"
                    multiple={true}
                    onChange={(e) => {
                      var im=[]
                      // console.log(e.target.files)
                      for(var i=0;i<e.target.files.length;i++)
                        im.push(URL.createObjectURL(e.target.files[i]))//.map(file=>URL.createObjectURL(im))
                      // console.log(im)
                      setimage(im);
                    }}
                />
                {
                  image.map((im,i)=>(
                    <>
                    <img
                      style={{ height: "100px", width: "100px" }}
                      src={im}
                      key={i}
                      alt="attendance"
                    />
                    {' '}
                    </>
                  ))
                }
            </>
        )
    }
    async function addAttendanceHandler(val, e) {
      if(val.images.length<=0)
        seterrorMessage('Choose images please')
      var i=0;
      for(i=0;i<val.images.length;i++){
        // console.log(val.images[i].type.split('/'));
        if(val.images[i].type.split('/')[0]!='image'){
          break;
        }
      }
      if(i!==val.images.length)
        seterrorMessage('Choose Images only.')
      else{
        e.preventDefault();
        const msg={seterror,setloading,setsuccess}
        // seterrorMessage("");
        msg.setloading(true)

        //DISPATCH THING HERE
        console.log(val)
        const err=await dispatch(markAttendance(val))
        console.log(err)
        msg.setloading(false)
        if(err==null)
            msg.setsuccess(true)
        else
            msg.seterror(err)
      }
    }
    return(
        <>
            <Container>
      <Row className="justify-content-md-center">
        <Col md={6} xs={12}>
          <h1>Mark Attendance</h1>
          <LocalForm
            onSubmit={(values, e) => {e.preventDefault(); addAttendanceHandler(values, e)}}
          >
            <Row className="form-group">
              <Col>
                <Label htmlFor="branchCode">Branch Code</Label>
                <Control.text
                  model=".branchCode"
                  id="branchCode"
                  name="branchCode"
                  type="number"
                  placeholder="branchCode"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="yearOfStart">Year of Start</Label>
                <Control.text
                  model=".yearOfStart"
                  id="yearOfStart"
                  name="yearOfStart"
                  type="number"
                  placeholder="yearOfStart"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="sectionName">section Name</Label>
                <Control.text
                  model=".sectionName"
                  id="sectionName"
                  name="sectionName"
                  type="text"
                  placeholder="sectionName"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="subjectCode">subject Code</Label>
                <Control.text
                  model=".subjectCode"
                  id="subjectCode"
                  name="subjectCode"
                  type="text"
                  placeholder="subjectCode"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="subjectCode">Date</Label>
                <Control.text
                  model=".date"
                  id="date"
                  name="date"
                  type="date"
                  placeholder="date"
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="image">Attendance photos:</Label>
                </Col>
                </Row>
                <Row><Col>
                <AttendanceImage/>
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
                  Mark Attendance
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
        Attendance is marked. Go to <Link to={`/`}>home</Link> page
      </ModalMessage>:<></>}
            <Row></Row>
        </>
    )
}