import React, {useState} from 'react'
import UserContext from './UserContext'

function UserContextProvider({children}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
  return (
    <>
    <UserContext.Provider value={{email, setEmail, password, setPassword, name, setName}}>
    {children}
    </UserContext.Provider>
    </>
  )
}

export default UserContextProvider