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
import { signIn, signOut } from "next-auth/react"

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

  const onSubmit =async (data) => {
    console.log(data);
    try{
      const res = await fetch(
      `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/patients/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      const json = await res.json();
      console.log(json);
      if (json.ok) {
        window.localStorage.setItem("tokenPaciente", JSON.stringify(json.token))
        router.push("/paciente/authPaciente")
      } else {
        console.log(json)
        setError(json)
      }
    }
    catch(err){
      console.log(err);
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
                register={register}
                errors={errors?.password}
              />
            </div>
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
            <div className="flex justify-between items-center mt-3">
                <hr className="w-full" />
                <span className="p-2 text-gray-400  mb-1">O</span>
                <hr className="w-full" />
            </div>
            <button className="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900"
                    onClick={() => signIn()}>
                  <i className="fa fa-google mr-2"></i>
                  Google
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
        <ExampleUI.Box />
        <ExampleUI.Text />
      </div>
    </main>
  )
}
