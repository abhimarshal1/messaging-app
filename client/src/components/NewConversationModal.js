import React, { useState } from 'react'
import { useContacts } from '../contexts/ContactsContext'
import { useConversations } from '../contexts/ConversationsContext'
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'

const NewConversationModal = ({ closeModal }) => {
    const { contacts } = useContacts()
    const { createConversations } = useConversations()
    const [selectedIds, setSelectedIds] = useState([])
    const createButtonShow = contacts.length > 0

    const createMessage = (e) => {
        e.preventDefault()
        createConversations(selectedIds)
        closeModal()
    }

    const handleCheck = (id) => {
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter(i => i !== id)
            }
            return [...prevSelectedIds, id]
        })
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>New Message</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={createMessage}>
                    {contacts.map(({ name, id }) => {
                        return (
                            <InputGroup key={id} className="mb-4">
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox value={selectedIds.includes(id)} onChange={() => handleCheck(id)} />
                                </InputGroup.Prepend>
                                <FormControl value={name} readOnly />
                            </InputGroup>
                        )
                    })}
                    {createButtonShow ? <Button variant="primary" type="submit">Create</Button> : <span className="text-muted">* Please create a contact to initiate a conversation</span>}
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewConversationModal
