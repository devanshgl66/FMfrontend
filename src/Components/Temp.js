import axios from "axios";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
class Temp extends Component {
  constructor() {
    super();
    this.state = {
      branchCode: "",
      yearOfStart: [],
    };
  }
  async handleChange(st) {
    try {
      const { data } = await axios.get("/class/get_data", {
        params: { ...this.state },
      });
      this.setState({yearOfStart:data})
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <>
        <Form>
          Branch Code :
          <input
            type="text"
            value={this.state.branchCode}
            onChange={(e) => this.setState({ branchCode: e.target.value })}
            onBlur={()=>this.handleChange()}
          />
          <br />
          Year of start
          <select>
            {this.state.yearOfStart ? (
              this.state.yearOfStart.map((year) => <option value={year} >{year}</option>)
            ) : (
              <></>
            )}

          </select>
        </Form>
      </>
    );
  }
}
export default Temp;
