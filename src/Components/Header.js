import React from 'react'
import {Row,Col} from 'react-bootstrap'
const Header = (props) => {
    return (
        <header style={{backgroundColor:'violet'}}>
            <Row>
                <Col md={9}>
                    Name of project
                </Col>
                {/* If login then show next component */}
                <Col>
                    <image style={{borderRadius:'50%'}} src={props.profilePic} alt='profile pic'/>
                </Col>
            </Row>
            
           
        </header>
    )
}

export default Header
