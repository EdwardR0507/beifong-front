import AboutUsCard from "components/AboutUsCard"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/router"
import Button from "ui/Button"
import Link from "ui/Link"

export default function SobreNosotros() {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <header className="flex items-center justify-around w-full pt-8 text-xl max-h-24">
        <div className="flex justify-self-start">
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
        <div className="grid grid-cols-3 text-lg font-semibold gap-x-8 place-items-center">
          <Link to="/" active={router.pathname === "/"}>
            Home
          </Link>
          <Link
            to="/suscripciones"
            active={router.pathname === "/suscripciones"}
          >
            Suscripciones
          </Link>
          <Link
            to="/sobre-nosotros"
            active={router.pathname === "/sobre-nosotros"}
          >
            Sobre Nosotros
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-8">
          <Button
            onClick={() => {
              router.push("/clinica/registro")
            }}
            className="px-4"
            variant="primary"
          >
            Registrarse
          </Button>
          <Button
            onClick={() => {
              router.push("/clinica/login")
            }}
            className="px-4"
            variant="outline_primary"
          >
            Iniciar Sesión
          </Button>
        </div>
      </header>
      <div>
        <h1 className="mt-8 text-3xl font-semibold text-center">
          Sobre nosotros
        </h1>
      </div>
      <main className="grid flex-1 w-full grid-cols-3 px-10 py-8 font-semibold gap-x-8 bg-sky-50 dark:bg-gray-800">
        <AboutUsCard fileImage="leonardo.jpg" />
        <AboutUsCard fileImage="railly.png" />
        <AboutUsCard fileImage="default.png" />
        <AboutUsCard fileImage="edward.jpg" />
        <AboutUsCard fileImage="arian.jpg" />
        <AboutUsCard fileImage="elian.png" />
      </main>
    </div>
  )
}
