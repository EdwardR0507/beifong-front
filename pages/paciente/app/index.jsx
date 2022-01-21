import { useRouter } from "next/router"
import { useEffect } from "react"
import AccessibilityButton from "ui/Accessibility/Button"
import Heading from "ui/Accessibility/Heading"
import Logo from "ui/Logo"

const user = {
  name: "Elian Gómez",
  email: "elian.gomez@gmail.com",
  accessibility: {
    darkMode: true,
    highContrast: false,
    textToVoice: true,
    highligthText: false,
    fontSize: "base",
    visualDisease: "healthy-vision",
  },
}

export default function PatientApp({ updateTooltip }) {
  const router = useRouter()

  useEffect(() => {
    window.localStorage.setItem(
      "user",
      JSON.stringify({ name: user.name, email: user.email })
    )
    window.localStorage.setItem(
      "accessibility",
      JSON.stringify(user.accessibility)
    )
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <header className="flex items-center w-full pt-4 text-xl max-h-24">
        <Logo />
      </header>
      <main className="flex flex-col flex-1 w-screen font-semibold bg-sky-50 dark:bg-gray-800">
        <section
          onMouseUp={updateTooltip}
          onKeyDown={updateTooltip}
          onInput={updateTooltip}
          className="flex flex-col items-center justify-center flex-1"
        >
          <Heading.H1 className="mb-6">¡Bienvenido a Beifong!</Heading.H1>
          <Heading.H2 className="mb-6">
            En esta aplicación podrás encontrar información sobre la
            accesibilidad de tu página web.
          </Heading.H2>
          <Heading.H3 className="mb-6">
            ¡No te olvides de ajustar la fuente de tu página web!
          </Heading.H3>
          <AccessibilityButton
            onClick={() => {
              window.localStorage.removeItem("token")
              window.localStorage.removeItem("patient")
              router.push("/paciente/login")
            }}
            size="large"
            variant="danger"
          >
            Cerrar sesión
          </AccessibilityButton>
          <AccessibilityButton
            className="mt-4"
            onClick={() => {
              router.push("/paciente/clinicas")
            }}
            size="large"
            variant="primary"
          >
            Explorar clínicas
          </AccessibilityButton>
          <AccessibilityButton
            className="mt-4"
            onClick={() => {
              router.push("/paciente/citas")
            }}
            size="large"
            variant="secondary"
          >
            Mis citas
          </AccessibilityButton>
        </section>
      </main>
    </div>
  )
}
