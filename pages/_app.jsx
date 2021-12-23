import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import CalculatorModal from "components/CalculatorModal"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <CalculatorModal global />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
