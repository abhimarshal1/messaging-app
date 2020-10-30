import React from 'react'
import { useConversations } from '../contexts/ConversationsContext'
import { ListGroup } from 'react-bootstrap'

const Conversations = () => {

    const { conversations, selectConversationIndex } = useConversations()
    return (
        <ListGroup variant="flush">
            {
                conversations.map((conversation, index) => (
                    <ListGroup.Item
                        key={index}
                        action
                        active={conversation.selected}
                        onClick={() => selectConversationIndex(index)}
                    >
                        {conversation.recipients.map(r => r.name).join(', ')}
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default Conversations
