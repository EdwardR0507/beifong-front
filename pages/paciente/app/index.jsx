// import useUser from "hooks/useUser"
import useUser from "hooks/useUser"
import { useRouter } from "next/router"
import AccessibilityButton from "ui/Accessibility/Button"
import Heading from "ui/Accessibility/Heading"
import Logo from "ui/Logo"

// const user = {
//   name: "Elian Gómez",
//   email: "elian.gomez@gmail.com",
//   accessibility: {
//     darkMode: true,
//     highContrast: false,
//     textToVoice: true,
//     highligthText: false,
//     fontSize: "base",
//     visualDisease: "healthy-vision",
//   },
// }

export default function PatientApp({ updateTooltip }) {
  const router = useRouter()
  const { accessibility } = useUser()
  // const user = {}

  // useEffect(() => {
  //   window.localStorage.setItem(
  //     "user",
  //     JSON.stringify({ name: user.name, email: user.email })
  //   )
  //   window.localStorage.setItem(
  //     "accessibility",
  //     JSON.stringify(user.accessibility)
  //   )
  // }, [])

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
          <Heading.H1 className="mb-6" fontSize={accessibility?.fontSize}>
            ¡Bienvenido a Beifong!
          </Heading.H1>
          <Heading.H2 className="mb-6" fontSize={accessibility?.fontSize}>
            En esta aplicación podrás encontrar información sobre la
            accesibilidad de tu página web.
          </Heading.H2>
          <Heading.H3 className="mb-6" fontSize={accessibility?.fontSize}>
            ¡No te olvides de ajustar la fuente de tu página web!
          </Heading.H3>
          <AccessibilityButton
            onClick={() => {
              window.localStorage.removeItem("token")
              router.push("/paciente/login")
            }}
            size="large"
            variant="danger"
            fontSize={accessibility?.fontSize}
          >
            Cerrar sesión
          </AccessibilityButton>
        </section>
      </main>
    </div>
  )
}
