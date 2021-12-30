import { useSession } from "next-auth/react"
import { useEffect } from "react"

function getCookie(cname) {
  const name = cname + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

export default function AuthPaciente() {
  const { data: session, status } = useSession()

  useEffect(async () => {
    if (session) {
      const tokenId = getCookie("next-auth.session-token")
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/patients/login/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: tokenId,
          }
        )
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  })

  if (status === "authenticated") {
    return <h1>Logeado</h1>
  }
  return <h1>Cargando</h1>
}
