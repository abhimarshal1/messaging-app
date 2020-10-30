import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ContactProvider } from '../contexts/ContactsContext'
import { ConversationProvider } from '../contexts/ConversationsContext'
import { SocketProvider } from '../contexts/SocketsContext'


function App() {
  const [id, setID] = useLocalStorage('id')
  const dashboard = (
    <SocketProvider id={id}>
      <ContactProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactProvider>
    </SocketProvider>

  );
  return (
    id ? dashboard : <Login onIDSubmit={setID} />
  );
}

export default App;
