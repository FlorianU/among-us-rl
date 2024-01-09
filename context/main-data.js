import { createContext, useContext, useState } from 'react'

const AmongUsContext = createContext(undefined)

export function AmongUsProvider({ children }) {
  const [assignmentCounter, setAssignmentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AmongUsContext.Provider
      value={{
        assignmentCounter,
        setAssignmentCounter,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </AmongUsContext.Provider>
  )
}

export function useAmongUsContext() {
  const context = useContext(AmongUsContext)

  if (!context)
    throw new Error('useContext must be used inside a `AmongUsProvider`')

  return context
}