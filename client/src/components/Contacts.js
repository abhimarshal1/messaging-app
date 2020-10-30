import React from 'react'
import { useContacts } from '../contexts/ContactsContext'
import { ListGroup } from 'react-bootstrap'

const Contacts = () => {
    const { contacts } = useContacts()
    return (
        <ListGroup variant="flush">
            {
                contacts.map(({ name, id }) => {
                   return <ListGroup.Item key={id} className="rounded-0">{name}</ListGroup.Item>
                })
            }
        </ListGroup>
    )
}

export default Contacts
