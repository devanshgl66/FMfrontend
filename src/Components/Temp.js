import React from 'react'
import { Form } from 'react-bootstrap';
class Temp{
    state={
        branchCode:'',
        startOfYear:''
    }
    render(){
        return(
            <>
                <Form>
                    Branch Code :
                    <input type='text' value={this.state.branchCode} 
                    onChange={(e)=>this.setState({branchCode:e.target.value})}
                    />
                </Form>
            </>
        )
    }
}
export default Temp;
