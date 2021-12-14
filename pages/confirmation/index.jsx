import Image from "next/image"
import { useRouter } from "next/router"
import Button from "ui/Button"

export default function index({ email }) {
  const router = useRouter()

  return (
    <article className="w-full min-h-screen bg-gray-100 flex justify-center">
      <div className="absolute top-5 left-5">
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

      <form className="w-4/5 p-4 min-h-screen flex flex-col items-center justify-evenly">
        <div className="text-center ">
          <h1 className="text-gray-800 font-bold text-4xl">
            Verifica tu correo electrónico
          </h1>
          <p className="mt-4 text-lg">
            Debes verificar tu correo para completar con el proceso de registro
          </p>
        </div>
        <div className="sm:w-full md:w-7/12 h-1/2 flex bg-red-500 flex-col items-center justify-between ">
          <Image
            src="/images/icono-email.png"
            alt="email icon"
            width={200}
            height={200}
          />
          <p className="text-center text-lg">
            Un correo ha sido enviado a {""}
            <span className="font-bold">
              {email || "example@company.com"}
            </span>{" "}
            con un link de verificación. Si no has recibido algún correo, revisa
            la carpeta de spam
          </p>
        </div>
        <div className="sm:w-full md:w-1/2 flex justify-around">
          <Button variant="primary" size="large">
            Reenviar correo
          </Button>
          <Button variant="outline_primary" size="large">
            Contactar a soporte
          </Button>
        </div>
      </form>
    </article>
  )
}
