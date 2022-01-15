import { useRouter } from "next/router"
import { useEffect } from "react"
import Button from "ui/Button"
import Logo from "ui/Logo"

export default function ClinicApp() {
  const router = useRouter()

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (!token) {
      router.push("/clinica/login")
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <header className="flex items-center w-full pt-4 text-xl max-h-24">
        <Logo />
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
          <Button
            className="mt-4"
            onClick={() => {
              router.push("/clinica/page-builder")
            }}
            size="large"
            variant="primary"
          >
            Ir a constructor de página
          </Button>
          <Button
            className="mt-4"
            onClick={() => {
              router.push("/clinica/medicos/crear")
            }}
            size="large"
            variant="secondary"
          >
            Crear médicos
          </Button>
          <Button
            className="mt-4"
            onClick={() => {
              router.push("/clinica/medicos")
            }}
            size="large"
            variant="tertiary"
          >
            Listar médicos
          </Button>
        </section>
      </main>
    </div>
  )
}
