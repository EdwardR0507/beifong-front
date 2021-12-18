import Image from "next/image"
import { useForm } from "react-hook-form"
import TextInput from "ui/TextInput"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import Button from "ui/Button"
import ExampleUI from "ui/ExampleUI"
import { useRouter } from "next/router"
import Link from "ui/Link"
import { loginSchema } from "schemas/login"
import { useTheme } from "next-themes"

export default function LoginClinica() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const { theme } = useTheme()
  const router = useRouter()

  const onSubmit = (data) => {
    console.log(data)
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
              Inicio de sesión de clínica
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
                type="password"
                label="Contraseña"
                register={register}
                errors={errors?.password}
              />
            </div>
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </form>
          <div className="py-6 mt-10 bg-white rounded shadow-lg px-14 dark:bg-gray-700">
            <p className="w-full mb-4 font-medium text-center text-gray-700 dark:text-gray-100">
              ¿Tu clínica no está registrada?{" "}
              <Link to="/clinica/registro">Regístrala</Link>
            </p>
            <p className="w-full font-medium text-center text-gray-700 dark:text-gray-100">
              ¿Eres un paciente?{" "}
              <Link to="/paciente/registro" variant="secondary">
                Registrarse como cliente
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-col items-center justify-center flex-1 hidden w-full p-4 md:flex bg-sky-500 dark:bg-sky-700">
        <ExampleUI.Box />
        <ExampleUI.Text />
      </div>
    </main>
  )
}
