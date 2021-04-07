import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { userLogin } from '../redux/actions/authAction'
import {Link} from 'react-router-dom'
import Loader from './Loader' 
import Message from './Message'
const Login = ({location,history}) => {
    // const role=0
    const role=parseInt(location.pathname.split('/')[2])
    const dispatch = useDispatch()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const loginHandler=async (e)=>{
        e.preventDefault();
        const result=await dispatch(userLogin(email,password,role))
    }
    const auth = useSelector(state => state.auth)
        const {loading,error,user}=auth
        // console.log(user)
        // console.log('hlo')
    const redirect=location.search?location.search.split('redirec=')[1]:'/'
    useEffect(() => {
        if(user)
            history.push(redirect)
    }, [user,redirect,history])
    return (
        <Container>
      <Row className="justify-content-md-center">
        <Col md={6} xs={12}>
            {error&&<Message variant='danger'>{error}</Message>}
            {loading&&<Loader/>}
            <h1>{role===0?'Student':role===1?'Teacher':'Department'} Login</h1>
            <Form onSubmit={loginHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter email'
                    value={email}
                    onChange={e=>setemail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password'
                    value={password}
                    onChange={e=>setpassword(e.target.value)}/>
                </Form.Group> 
                <Button type='submit' variant='primary'>Login</Button>
            </Form>
            {/* <Row className='py-3'>
                <Col>
                    New User? <Link to={`/register`}>Register</Link>
                </Col>
            </Row> */}
        </Col>
        </Row>
        </Container>
    )
}

export default Login
