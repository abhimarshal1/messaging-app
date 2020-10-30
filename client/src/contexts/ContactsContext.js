import React, { useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ContactsContext = React.createContext();

export const useContacts = () => {
    return useContext(ContactsContext)
}

const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useLocalStorage('contact', [])

    const createContacts = (id, name) => {
        setContacts(prevContacts => {
            return [...prevContacts, { id, name }]
        })
    }
    return (
        <ContactsContext.Provider value={{ contacts, createContacts }}>
            {children}
        </ContactsContext.Provider>
    )
}

export { ContactProvider }
