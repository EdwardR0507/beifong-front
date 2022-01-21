import { useRouter } from "next/router"
import { useEffect } from "react"
import AccessibilityButton from "ui/Accessibility/Button"
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
          <AccessibilityButton
            onClick={() => {
              window.localStorage.removeItem("token")
              window.localStorage.removeItem("clinic")
              router.push("/clinica/login")
            }}
            size="large"
            variant="danger"
          >
            Cerrar sesión
          </AccessibilityButton>
          <AccessibilityButton
            className="mt-4"
            onClick={() => {
              router.push("/clinica/page-builder")
            }}
            size="large"
            variant="primary"
          >
            Ir a constructor de página
          </AccessibilityButton>
          <AccessibilityButton
            className="mt-4"
            onClick={() => {
              router.push("/clinica/medicos/crear")
            }}
            size="large"
            variant="secondary"
          >
            Crear médicos
          </AccessibilityButton>
          <AccessibilityButton
            className="mt-4"
            onClick={() => {
              router.push("/clinica/medicos")
            }}
            size="large"
            variant="tertiary"
          >
            Listar médicos
          </AccessibilityButton>
          <AccessibilityButton
            className="mt-4"
            onClick={() => {
              router.push("/clinica/citas")
            }}
            size="large"
            variant="quaternary"
          >
            Listar citas
          </AccessibilityButton>
        </section>
      </main>
    </div>
  )
}
