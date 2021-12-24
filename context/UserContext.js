const { createContext, useState } = require("react")

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessibility, setAccessibility] = useState(null)
  const [reloadUser, setReloadUser] = useState(false)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessibility,
        setAccessibility,
        reloadUser,
        setReloadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
