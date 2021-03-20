import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RangeSelector from "../Components/RangeSelector";

const HomePage = () => {
    const [fields, setFields] = useState([{ value: null },{ value: null }]);
    function getListofRollNo(fields){
        var roll=fields.map(f=> parseInt(f.value))
        // console.log(roll)
        var result=[]
        for(var i=0;i<roll.length;i+=2){
            var x=Array.from(new Array(roll[i+1]-roll[i]+1), (_, j) => j + roll[i]);
            result=result.concat(x)
        }
        result=result.sort((a,b)=>a-b)
        //removing duplicate entries
        result=new Set(result)
        result=[...result]
        // console.log(result)
        return result
    }
    function handleSubmit() {
        // console.log(values);
        // console.log(fields);
        getListofRollNo(fields)
        alert('see logs for list of students')
    }
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} xs={12}>
            <h1>Add student</h1>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
                <RangeSelector fields={fields} setFields={setFields}/>
                <Button type='submit'>Add students</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
