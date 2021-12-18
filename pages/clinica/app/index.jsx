import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Button from "ui/Button"

export default function ClinicApp() {
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (!token) {
      router.push("/clinica/login")
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <header className="flex items-center w-full pt-4 text-xl max-h-24">
        <div className="flex ml-4">
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
      </header>
      <main className="flex flex-col flex-1 w-screen font-semibold bg-sky-50 dark:bg-gray-800">
        <section className="flex flex-col items-center justify-center flex-1">
          <span className="mb-6 text-4xl font-semibold">
            ¡Bienvenido a Beifong!
          </span>
          <Button
            onClick={() => {
              window.localStorage.removeItem("token")
              router.push("/clinica/login")
            }}
            size="large"
            variant="danger"
          >
            Cerrar sesión
          </Button>
        </section>
      </main>
    </div>
  )
}
