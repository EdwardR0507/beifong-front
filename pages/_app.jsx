import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import CalculatorModal from "components/CalculatorModal"
import { SessionProvider } from "next-auth/react"
import UserProvider from "context/UserContext"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ThemeProvider attribute="class">
          <CalculatorModal type="global" />
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </SessionProvider>
  )
}

export default MyApp
