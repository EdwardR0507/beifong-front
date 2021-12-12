import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col w-screen min-h-screen font-semibold bg-sky-50">
      <header className="flex flex-row items-center justify-center w-full text-xl">
        <div>
          <Link href="/home">
            <a className="m-12 text">Home</a>
          </Link>
          <Link href="/suscripciones">
            <a className="m-12">Suscripciones</a>
          </Link>

          <Link href="/sobre_nosotros">
            <a className="m-12">Sobre Nosotros</a>
          </Link>

          <button className="p-4 mr-16 font-bold text-white rounded-lg bg-sky-500">
            Registrarse
          </button>

          <button className="p-4 mr-16 font-bold border-2 border-solid rounded-lg text-sky-500 border-sky-500 ">
            Iniciar Sesion
          </button>
        </div>
      </header>
      <section className="flex items-center justify-center pb-20 m-4">
        <div className="flex flex-col w-2/5">
          <h1 className="flex flex-col p-2 mt-10 text-3xl font-bold lg:text-4xl xl:text-5xl">
            Construimos páginas de clínicas oftalmológicas
            <span className="text-yellow-500">
              orientadas a la accesibilidad.
            </span>
          </h1>
          <p className="mt-10 text-lg font-medium lg:text-xl xl:text-2xl">
            Digitaliza la gestión completa de tu clínica. Páginas de
            Presentación, sistema de citas, de planes personalizados y mucho
            más.
            <br />
          </p>

          <div className="flex items-center w-full">
            <button className="p-2 m-8 text-xl font-bold text-white rounded-lg bg-sky-600">
              Ver Suscripciones
            </button>
            <button className="p-2 m-8 mr-12 text-xl font-bold border-2 border-solid rounded-lg text-sky-500 border-sky-500">
              Prueba nuestro widget
            </button>
          </div>
        </div>
        <div className="box-border box-content flex flex-col justify-center w-2/5">
          <img
            src="https://thumbs.dreamstime.com/z/dise%C3%B1o-de-interfaz-m%C3%B3vil-del-web-ui-ux-progreso-la-transferencia-directa-los-indicadores-app-dispositivo-pesta%C3%B1a-ordenador-114358389.jpg"
            alt="ilustración"
            className="hidden w-full lg:inline-block"
          />
        </div>
      </section>
    </main>
  )
}
