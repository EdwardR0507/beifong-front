import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/router"
import Button from "ui/Button"

export default function index({ email }) {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <article className="flex justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="absolute top-5 left-5">
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

      <form className="flex flex-col items-center w-4/5 min-h-screen p-4 justify-evenly">
        <div className="text-center ">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Verifica tu correo electrónico
          </h1>
          <p className="mt-4 text-lg">
            Debes verificar tu correo para completar con el proceso de registro
          </p>
        </div>
        <div className="flex flex-col items-center justify-between sm:w-full md:w-7/12 h-1/2">
          <Image
            src="/images/icono-email.png"
            alt="email icon"
            width={200}
            height={200}
          />
          <p className="text-lg text-center">
            Un correo ha sido enviado a {""}
            <span className="font-bold">
              {email || "example@company.com"}
            </span>{" "}
            con un link de verificación. Si no has recibido algún correo, revisa
            la carpeta de spam
          </p>
        </div>
        <div className="flex justify-around sm:w-full md:w-1/2">
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
