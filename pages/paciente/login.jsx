import Image from "next/image"
import { useForm } from "react-hook-form"
import TextInput from "ui/TextInput"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import Button from "ui/Button"
import { useRouter } from "next/router"
import Link from "ui/Link"
import { loginSchema } from "schemas/login"
import { useTheme } from "next-themes"
import { signIn } from "next-auth/react"
import { injectStyle } from "react-toastify/dist/inject-style"
import { ToastContainer, toast } from "react-toastify"
import CalculatorModal from "components/CalculatorModal"

if (typeof window !== "undefined") {
  injectStyle()
}

export default function LoginPaciente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const { theme } = useTheme()
  const router = useRouter()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/patients/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
      const json = await res.json()
      console.log(json)
      if (json.ok) {
        window.localStorage.setItem("token", JSON.stringify(json.token))
        window.localStorage.setItem("patient", JSON.stringify(json.patient))
        router.push("/paciente/app")
      } else {
        if (json.errors) {
          json.errors.forEach((error) => {
            toast.error(error.msg)
          })
        } else {
          toast.error(json.msg)
        }
      }
    } catch (err) {
      toast.error(err)
      console.log(err)
    }
  }

  console.log(errors, "errors")

  return (
    <main className="flex min-h-screen">
      <div className="w-full p-4 bg-gray-100 md:w-6/12 dark:bg-gray-800">
        <div className="flex flex-col items-center w-full">
          <div className="w-full ">
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
          <form
            className="grid w-full max-w-xl p-6 mt-2 placeholder-gray-400 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-700"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
              Inicio de sesión de paciente
            </h1>
            <div className="grid grid-cols-1 gap-4 mb-8">
              <TextInput
                name="email"
                label="Correo electrónico"
                register={register}
                errors={errors?.email}
              />
              <TextInput
                name="password"
                label="Contraseña"
                type="password"
                register={register}
                errors={errors?.password}
              />
            </div>
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
            <div className="flex items-center justify-between mt-3">
              <hr className="w-full" />
              <span className="p-2 mb-1 text-gray-400">O</span>
              <hr className="w-full" />
            </div>
            <button
              // style the google login button
              className="flex justify-center w-full px-2 py-3 font-medium text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline dark:bg-white dark:text-gray-900"
              onClick={() => signIn()}
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 256 262">
                <g>
                  {theme === "dark" ? (
                    <>
                      <path
                        d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451"
                        fill="#4285f4"
                      ></path>
                      <path
                        d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479"
                        fill="#EB4335"
                      ></path>
                    </>
                  ) : (
                    <>
                      <path
                        d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479"
                        fill="#FFFFFF"
                      ></path>
                    </>
                  )}
                </g>
              </svg>
              Iniciar sesión con Google
            </button>
          </form>
          <div className="py-6 mt-10 bg-white rounded shadow-lg px-14 dark:bg-gray-700">
            <p className="w-full mb-4 font-medium text-center text-gray-700 dark:text-gray-100">
              ¿Aún no tienes una cuenta?{" "}
              <Link to="/paciente/registro">Regístrala</Link>
            </p>
            <p className="w-full font-medium text-center text-gray-700 dark:text-gray-100">
              ¿Eres una clínica?{" "}
              <Link to="/clinica/registro" variant="secondary">
                Regístrate como clínica
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-col items-center justify-center flex-1 hidden w-full p-4 md:flex bg-sky-500 dark:bg-sky-700">
        <CalculatorModal type="home" />
      </div>
      <ToastContainer />
    </main>
  )
}
