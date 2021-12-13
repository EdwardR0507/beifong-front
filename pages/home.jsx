import Image from "next/image"
import Link from "next/link"
import Button from "ui/Button"
import ExampleUI from "ui/ExampleUI"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50">
      <header className="flex items-center justify-around w-full pt-8 text-xl max-h-24">
        <div className="flex justify-self-start">
          <Image
            className="pt-4 pl-10"
            src="/images/logo-beifong.png"
            width={145}
            height={46}
            alt="Logo de Beifong"
          />
        </div>
        <div>
          <Link href="/home">
            <a className="m-12 underline text decoration-sky-500 decoration-4 underline-offset-4">
              Home
            </a>
          </Link>
          <Link href="/suscripciones">
            <a className="m-12">Suscripciones</a>
          </Link>

          <Link href="/sobre_nosotros">
            <a className="m-12">Sobre Nosotros</a>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-8">
          <Button className="px-4" variant="primary">
            Registrarse
          </Button>
          <Button className="px-4" variant="secondary">
            Iniciar Sesion
          </Button>
        </div>
      </header>
      <main className="flex flex-col flex-1 w-screen font-semibold bg-sky-50">
        <section className="flex items-center justify-center flex-1">
          <div className="flex flex-col justify-center flex-1 w-1/2 px-16">
            <h1 className="flex flex-col text-5xl font-bold leading-tight">
              Construimos páginas de clínicas oftalmológicas
              <span className="text-orange-400">
                orientadas a la <br /> accesibilidad.
              </span>
            </h1>
            <p className="my-10 text-lg font-medium text-slate-700 lg:text-2xl">
              Digitaliza la gestión completa de tu clínica.
              <br />
              Páginas de Presentación, sistema de citas, de planes
              <br />
              personalizados y mucho más.
              <br />
            </p>

            <div className="grid grid-cols-2 gap-4 place-content-center">
              <Button variant="primary" size="large">
                Ver suscripciones
              </Button>
              <Button variant="outline_primary" size="large">
                Prueba nuestro widget
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1">
            <ExampleUI.Box size="large" />
          </div>
        </section>
      </main>
    </div>
  )
}
