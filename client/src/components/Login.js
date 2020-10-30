import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

const Login = ({ onIDSubmit }) => {
    const idRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        onIDSubmit(idRef.current.value)
    }

    const createNewId = () => {
        onIDSubmit(uuidV4())
    }
    return (
        <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>Enter your ID:</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button variant="secondary" onClick={createNewId}>Create a new ID</Button>
            </Form>
        </Container>
    )
}

export default Login
