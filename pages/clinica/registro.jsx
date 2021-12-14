import Image from "next/image"
import { useForm } from "react-hook-form"
import TextInput from "ui/TextInput"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { clinicRegisterSchema } from "schemas/clinica/registro"
import Button from "ui/Button"
import ExampleUI from "ui/ExampleUI"
import { useRouter } from "next/router"
import Link from "ui/Link"

export default function RegistroClinicaIndex() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clinicRegisterSchema),
  })

  const router = useRouter()

  const onSubmit = (data) => {
    console.log(data)
  }

  console.log(errors, "errors")

  return (
    <main className="flex min-h-screen">
      <div className="w-full p-4 bg-gray-100 md:w-6/12">
        <div className="flex flex-col items-center w-full">
          <div className="w-full ">
            <Image
              onClick={() => {
                router.push("/home")
              }}
              className="pt-4 pl-10 cursor-pointer"
              src="/images/logo-beifong.png"
              width={145}
              height={46}
              alt="Logo de Beifong"
            />
          </div>
          <form
            className="grid w-full max-w-xl p-6 mt-2 placeholder-gray-400 rounded-lg shadow-lg bg-gray-50"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-6 text-2xl font-bold text-center text-gray-900 ">
              Registro de clínica
            </h1>
            <div className="grid grid-cols-1 gap-4 mb-8">
              <TextInput
                name="name"
                label="Nombre de la clínica"
                register={register}
                errors={errors?.name}
              />
              <TextInput
                name="phone"
                label="Teléfono"
                register={register}
                errors={errors?.phone}
              />
              <TextInput
                name="address"
                label="Dirección"
                register={register}
                errors={errors?.address}
              />
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
              Registrar clínica
            </Button>
          </form>
        </div>
      </div>
      <div className="flex-col items-center justify-center flex-1 hidden w-full p-4 md:flex bg-sky-500">
        <ExampleUI.Box />
        <ExampleUI.Text />
        <div className="py-6 mt-10 rounded px-14 bg-sky-50">
          <p className="w-full mb-4 font-medium text-center text-gray-700">
            ¿Ya tienes una clínica registrada?{" "}
            <Link to="/clinica/login">Iniciar Sesión</Link>
          </p>
          <p className="w-full font-medium text-center text-gray-700">
            ¿Eres un paciente?{" "}
            <Link to="/cliente/registro" variant="secondary">
              Registrarse como cliente
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
