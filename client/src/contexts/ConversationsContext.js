import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useContacts } from '../contexts/ContactsContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useSocket } from './SocketsContext';

const ConversationsContext = React.createContext();

export const useConversations = () => {
    return useContext(ConversationsContext)
}

const ConversationProvider = ({ id, children }) => {
    const { contacts } = useContacts()
    const socket = useSocket()
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

    const createConversations = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    const addMessageToConversation = useCallback(({ recipients, message, sender }) => {
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, message }
            const newConversations = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            if (madeChange) {
                return newConversations
            } else {
                return [
                    ...prevConversations,
                    { recipients, messages: [newMessage] }
                ]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-message', addMessageToConversation)

        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])

    function sendMessage(recipients, message) {
        console.log(socket)
        socket.emit('send-message', { recipients, message })

        addMessageToConversation({ recipients, message, sender: id })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
        })

        const selected = selectedConversationIndex === index
        return { ...conversation, messages, recipients, selected }
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversations,
        sendMessage
    }
    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}

const arrayEquality = (a, b) => {
    if (a.length !== b.length) return false;

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}

export { ConversationProvider }
