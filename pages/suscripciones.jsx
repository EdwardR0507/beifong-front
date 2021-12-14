import Image from "next/image"
import { useRouter } from "next/router"
import Button from "ui/Button"
import Link from "ui/Link"

export default function Suscripciones() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50">
      <header className="flex items-center justify-around w-full pt-8 text-xl max-h-24">
        <div className="flex justify-self-start">
          <Image
            onClick={() => {
              router.push("/")
            }}
            className="pt-4 pl-10 cursor-pointer"
            src="/images/logo-beifong.png"
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
            to="/sobre_nosotros"
            active={router.pathname === "/sobre_nosotros"}
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
      <main className="flex flex-col flex-1 w-screen font-semibold bg-sky-50">
        <h1 className="text-3xl font-semibold text-center">Suscripciones</h1>
      </main>
    </div>
  )
}
