import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import CalculatorModal from "components/CalculatorModal"
import { SessionProvider } from "next-auth/react"
import UserProvider from "context/UserContext"
import { useRouter } from "next/router"
import AccessibilityLayout from "components/AccessibilityLayout"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ThemeProvider attribute="class">
          {router.pathname.includes("paciente") ||
          router.pathname.includes("clinica") ||
          router.pathname.includes("medico") ? (
            <AccessibilityLayout
              component={Component}
              pageProps={{ ...pageProps, session }}
            />
          ) : (
            <Component {...pageProps} />
          )}
          {router.pathname !== "/" &&
            !router.pathname.includes("login") &&
            !router.pathname.includes("registro") && (
              <CalculatorModal type="global" />
            )}
        </ThemeProvider>
      </UserProvider>
    </SessionProvider>
  )
}

export default MyApp
