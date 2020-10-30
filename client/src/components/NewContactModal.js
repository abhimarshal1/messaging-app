import React, { useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsContext'

const NewContactModal = ({ closeModal }) => {
    const nameRef = useRef()
    const idRef = useRef()
    const { createContacts } = useContacts()
    const handleSubmit = (e) => {
        e.preventDefault()
        createContacts(idRef.current.value, nameRef.current.value);
        closeModal();
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>New Contact</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" ref={nameRef} className="rounded-0" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ID:</Form.Label>
                        <Form.Control type="text" ref={idRef} className="rounded-0" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="rounded-0">Create</Button>
                </Form>
            </Modal.Body>

        </>
    )
}

export default NewContactModal
