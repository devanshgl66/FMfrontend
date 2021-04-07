import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RangeSelector, getListofRollNo } from "./RangeSelector";
import Loader from "./Loader";
import ModalMessage from "./ModalMessage";
import { addClass } from "../redux/actions/classAction";
import { Link } from "react-router-dom";
const AddSubject = ({ fields, setFields, pos }) => {
  // const [fields, setFields] = useState([]);

  function handleChange(i, position, event) {
    const values = JSON.parse(JSON.stringify(fields));
    if(position==='subjectId')
      values[pos][i][position] = event.target.value.toUpperCase();
    else
    values[pos][i][position] = event.target.value;
    setFields(values);
  }
  // console.log(pos)
  // console.log(fields)
  function handleAdd() {
    // alert(pos)
    const values = JSON.parse(JSON.stringify(fields));
    values[pos].push({
      teacherId: '',
      subjectId: '',
    });
    // console.log(values)
    setFields(values);
  }
  function handleRemove(i) {
    const values = JSON.parse(JSON.stringify(fields));
    values[pos].splice(i, 1);
    setFields(values);
  }
  return (
    <>
      {/* <h1>Hello CodeSandbox</h1> */}

      <button type="button" onClick={() => handleAdd()}>
        Add Subject
      </button>
      <br />
      {fields[pos].map((field, idx) => {
        // console.log(field)
        return (
          <span key={`${field}-${idx}`}>
            {
              <>
                <Form.Group controlId="teacher">
                  <Form.Label>Teacher</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="teacher email id"
                    value={field.teacherId || ""}
                    onChange={(e) => handleChange(idx, "teacherId", e)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="subject Code"
                    value={field.subjectId || ""}
                    onChange={(e) => handleChange(idx, "subjectId", e)}
                    required
                  />
                </Form.Group>

                <button
                  type="button"
                  as="span"
                  onClick={() => handleRemove(idx)}
                >
                  Remove Subject
                </button>
              </>
            }
          </span>
        );
      })}
    </>
  );
};
const AddSection = ({
  fields,
  setFields,
  rollNo,
  setrollNo,
  attendance,
  setattendance,
}) => {
  function handleChange(i, pos, event) {
    const values = JSON.parse(JSON.stringify(fields));
    values[i][pos].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = JSON.parse(JSON.stringify(fields));
    var temp = [...rollNo, []];
    setrollNo(temp);
    var temp2 = [...attendance, []];
    setattendance(temp2);
    values.push({
      name: { value: "" },
      students: { pos: temp.length - 1 },
      attendance: { pos: temp2.length - 1 },
    });
    setFields(values);
  }
  function handleRemove(i) {
    console.log(i);
    const values = JSON.parse(JSON.stringify(fields));
    values.splice(i, 1);
    setFields(values);
  }

  return (
    <>
      {/* <h1>Hello CodeSandbox</h1> */}
      <br />
      <button type="button" onClick={() => handleAdd()}>
        Add section
      </button>

      {fields.map((field, idx) => {
        //   console.log(field)
        return (
          <div key={`${field}-${idx}`}>
            {
              <>
                <Form.Group controlId="section name">
                  <Form.Label>Section Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Section Name"
                    value={field.name.value || ""}
                    onChange={(e) => handleChange(idx, "name", e)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="students">
                  <Form.Label>Students</Form.Label>
                  <RangeSelector
                    fields={rollNo}
                    setFields={setrollNo}
                    pos={field.students.pos}
                  />
                </Form.Group>
                <Form.Group controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <AddSubject
                    fields={attendance}
                    setFields={setattendance}
                    pos={field.attendance.pos}
                  />
                </Form.Group>
                <button
                  type="button"
                  as="span"
                  onClick={() => handleRemove(idx)}
                >
                  Cancel Section
                </button>
              </>
            }
          </div>
        );
      })}
    </>
  );
};
const AddClass = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); //for getting branch Code
  const [section, setsection] = useState([]);
  const [yearOfStart, setyearOfStart] = useState("");
  const [rollNo, setrollNo] = useState([]);
  const [attendance, setattendance] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const handleSubmit = async (e) => {
    //embedding rollno and attending inside section
    const finalSection = section.map((sec) => {
      var rollNopos = sec.students.pos;
      sec.students = getListofRollNo(rollNo[rollNopos]);
      sec.attendance = attendance[sec.attendance.pos];
      sec.name=sec.name.value
      return sec;
    });
    const class1 = {
      branchCode: user.branch,
      yearOfStart,
      section: finalSection,
    };
    console.log(section)
    console.log(rollNo)
    console.log(attendance)

    setrollNo([])
    setattendance([])
    setsection([])
    // e.preventDefault();
    const msg = { seterror, setloading, setsuccess };
    // seterrorMessage("");
    msg.setloading(true);

    //DISPATCH THING HERE
    // console.log(val)
    const response = await dispatch(addClass(class1));
    console.log(response)
    setTimeout(() => {
        msg.setloading(false);
    if (response.success === true){
        if(response.error)
            msg.setsuccess(response.error)
        else
            msg.setsuccess(true)
    }
    else msg.seterror(response.err);
    console.log(error)
    console.log(success)
    }, 1000);
    console.log('hlo')
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8} xs={12}>
            <h1>Add Class</h1>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Form.Group controlId="branch Code">
                <Form.Label>Branch Code</Form.Label>
                <Form.Control
                  type="number"
                  value={user.branch}
                  disabled={true}
                />
              </Form.Group>
              <Form.Group controlId="Year of Start">
                <Form.Label>Year of Start</Form.Label>
                <Form.Control
                  type="number"
                  value={yearOfStart}
                  onChange={(e) => setyearOfStart(e.target.value)}
                  required
                />
              </Form.Group>
              <AddSection
                fields={section}
                setFields={setsection}
                rollNo={rollNo}
                setrollNo={setrollNo}
                attendance={attendance}
                setattendance={setattendance}
              />
              <Button type="submit">Add Class</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {loading ? (
        <ModalMessage
          isOpen={loading}
          toggle={() => setloading(!loading)}
          header="Add a new Class"
          variant="none"
        >
          <Loader />
        </ModalMessage>
      ) : error != null ? (
        <ModalMessage
          isOpen={error != null}
          toggle={() => seterror(null)}
          header="Registration"
          variant="danger"
        >
          {error}
        </ModalMessage>
      ) : success ? (
        <>
          <ModalMessage
            isOpen={success}
            toggle={() => setsuccess(!success)}
            header="Registration"
            variant="success"
          >
            Class is added. Go to <Link to={`/`}>home</Link> page
            <br />
            {success}
          </ModalMessage>
        </>
      ) : (
        <></>
      )}
      <Row></Row>
    </>
  );
};

export default AddClass;
