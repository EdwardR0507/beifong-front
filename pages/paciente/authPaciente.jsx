import { useSession, getSession } from "next-auth/react"

export default function Page() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }
  return ""
}

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  console.log(session)

  return (
    <>
      <h1>Protected Page</h1>
      <p>Logeado como {session.user.email}.</p>
    </>
  )
}
