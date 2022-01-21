import Image from "next/image"
import { useForm } from "react-hook-form"
import TextInput from "ui/TextInput"
import SelectInput from "ui/SelectInput"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import Button from "ui/Button"
import { useRouter } from "next/router"
import { loginSchema } from "schemas/login"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
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

  const [clinics, setClinics] = useState([])

  useEffect(() => {
    window
      .fetch(`${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then(({ clinics }) => {
        console.log(clinics)
        const clinicas = clinics.map((clinica) => {
          return {
            label: clinica.name,
            value: clinica.clinicId,
          }
        })
        setClinics(clinicas)
      })
      .catch((err) => console.log(err))
  }, [])

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/medics/login/${data.clinic}`,
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
        window.localStorage.setItem("medic", JSON.stringify(json.medic))
        window.localStorage.setItem("email", data.email)
        if (json.medic.verified) {
          router.push("/medico/app")
        } else {
          router.push("/medico/confirmation")
        }
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
      toast.error("Hubo un error, vuelva a intentarlo")
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
              Inicio de sesión de médico
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
              <SelectInput
                name="clinic"
                options={clinics}
                label="Seleccione Clínica"
                {...register("clinic")}
              />
            </div>
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
      <div className="flex-col items-center justify-center flex-1 hidden w-full p-4 md:flex bg-sky-500 dark:bg-sky-700">
        <CalculatorModal type="home" />
      </div>
      <ToastContainer />
    </main>
  )
}
