import { useSession } from "next-auth/react"
import { useEffect } from "react";

export default function Logged() {
    const {data: session, status} = useSession();
    if(status === "authenticated"){
        return (
            <h1>
                Logeado como {session.user.email}
            </h1>
        )
    }
    return <></>
}