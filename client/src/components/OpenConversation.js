import React, { useCallback, useState } from 'react'
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsContext';

const OpenConversation = () => {
    const [message, setMessage] = useState('');
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    const { sendMessage, selectedConversation } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipients = selectedConversation.recipients.map(r => r.id);
        sendMessage(recipients, message)
        setMessage('')
    }
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column 
                align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                key={index}
                                className={`d-flex my-1 flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                                ref={lastMessage ? setRef : null}
                            >
                                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.message}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <FormControl
                            as="textarea"
                            className="rounded-2"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your ping!!"
                        />
                        <InputGroup.Append>
                            <Button type="submit" className="rounded-2">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation
