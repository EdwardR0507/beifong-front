import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import CalculatorModal from "components/CalculatorModal"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <CalculatorModal global />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
