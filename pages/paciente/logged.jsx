import { useSession } from "next-auth/react"

export default function Logged() {
    const [session, loadingSession] = useSession()
    return (
        <h1>
            Logeado como {session.user.email}
        </h1>
    )
}