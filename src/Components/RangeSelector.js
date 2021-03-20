import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Control } from "react-redux-form";
import { Label } from 'reactstrap'


//Rest of code is in homepage file


const RangeSelector=({fields,setFields})=>{
    // const [fields, setFields] = useState([{ value: null }]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    values.push({ value: null });
    setFields(values);
  }
  function handleRemove(i) {
    const values = [...fields];
    values.splice(i-1, 2);
    setFields(values);
  }

  return (
    <>
      {/* <h1>Hello CodeSandbox</h1> */}

      <button type="button" onClick={() => handleAdd()}>
        Add range
      </button>

      {fields.map((field, idx) => {
        return (
            
          <span key={`${field}-${idx}`}>
              {idx%2==0?<input
              type="number"
              placeholder="Starting Roll no."
              value={field.value || ""}
              onChange={e => handleChange(idx, e)}
              required
            />:<><input
              type="number"
              placeholder="Ending Roll no."
              value={field.value || ""}
              onChange={e => handleChange(idx, e)}
              required
            /> <button type="button" onClick={() => handleRemove(idx)}>
              X
            </button>
            </>}
           
          </span>
        );
      })}
    </>
  );
}
export default RangeSelector