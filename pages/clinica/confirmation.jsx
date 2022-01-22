import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Button from "ui/Button"

export default function ClinicConfirmation() {
  const { theme } = useTheme()
  const router = useRouter()
  const { token } = router.query
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    setEmail(window.localStorage.getItem("email"))
  }, [])

  useEffect(() => {
    const verifyClinic = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics/verify?token=${token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const json = await res.json()
        if (json.ok) {
          window.localStorage.setItem("token", JSON.stringify(json.token))
          router.push("/clinica/login")
        } else {
          console.log(json)
          setError(json)
        }
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }

    if (token) {
      console.log(token)
      verifyClinic()
    }
  }, [token])

  const handleResendEmail = async () => {
    console.log("resend email")
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics/resend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clinicId: JSON.parse(window.localStorage.getItem("clinicId")),
          }),
        }
      )
      const json = await res.json()
      if (json.ok) {
        console.log(json)
      } else {
        console.log(json)
        setError(json.errors)
      }
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  return (
    <article className="flex justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="absolute top-5 left-5">
        <Image
          onClick={() => {
            router.push("/")
          }}
          className="pt-4 pl-10 cursor-pointer"
          src={
            theme === "dark"
              ? "/images/logo-beifong-dark.png"
              : "/images/logo-beifong.png"
          }
          width={145}
          height={46}
          alt="Logo de Beifong"
        />
      </div>

      <form className="flex flex-col items-center w-4/5 min-h-screen p-4 justify-evenly">
        <div className="text-center ">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Verifica tu correo electrónico
          </h1>
          <p className="mt-4 text-lg">
            Debes verificar tu correo para completar con el proceso de registro
          </p>
        </div>
        <div className="flex flex-col items-center justify-between sm:w-full md:w-7/12 h-1/2">
          <Image
            src="/images/icono-email.png"
            alt="email icon"
            width={200}
            height={200}
          />
          <p className="text-lg text-center">
            Un correo ha sido enviado a {""}
            <span className="font-bold">
              {email || "example@company.com"}
            </span>{" "}
            con un link de verificación. Si no has recibido algún correo, revisa
            la carpeta de spam
          </p>
        </div>
        <div className="flex justify-around sm:w-full md:w-1/2">
          <Button
            type="button"
            onClick={handleResendEmail}
            variant="primary"
            size="large"
          >
            Reenviar correo
          </Button>
          <Button variant="outline_primary" size="large">
            Contactar a soporte
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          {error &&
            (error?.errors?.length > 0 ? (
              error.errors.map((err) => (
                <div
                  key={err.msg}
                  className="px-4 py-2 mt-2 ml-4 text-center text-white bg-rose-600"
                >
                  {err.error}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 mt-2 text-center text-white bg-rose-600">
                <p>{error.msg}</p>
              </div>
            ))}
        </div>
      </form>
    </article>
  )
}
