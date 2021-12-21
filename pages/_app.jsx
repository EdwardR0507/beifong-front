import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import CalculatorModal from "components/CalculatorModal"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <CalculatorModal global />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
