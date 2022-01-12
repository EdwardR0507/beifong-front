import { UserContext } from "context/UserContext"
// import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

export default function useUser(role) {
  // const router = useRouter()
  const {
    user,
    setUser,
    accessibility,
    setAccessibility,
    reloadUser,
    setReloadUser,
  } = useContext(UserContext)

  useEffect(() => {
    // const user = window.localStorage.getItem("user")
    const accessibility = window.localStorage.getItem("accessibility")
    // if (!user) {
    //   router.push(`/${role}/login`)
    // } else {

    if (accessibility) {
      setUser(JSON.parse(user))
      setAccessibility(JSON.parse(accessibility))
    }
    // }
  }, [reloadUser])

  return { user, accessibility, reload: () => setReloadUser(!reloadUser) }
}
