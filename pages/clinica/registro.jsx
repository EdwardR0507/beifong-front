import Image from "next/image"
import { useForm } from "react-hook-form"
import TextInput from "ui/TextInput"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { clinicRegisterSchema } from "schemas/clinica/registro"
import Button from "ui/Button"

export default function RegistroClinicaIndex() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clinicRegisterSchema),
  })

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
              className="pt-4 pl-10"
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
            <Button variant="primary" type="submit">
              Registrar clínica
            </Button>
          </form>
        </div>
      </div>
      <div className="flex-col items-center justify-center flex-1 hidden w-full p-4 md:flex bg-sky-500">
        <h1 className="max-w-md text-2xl font-bold text-gray-900 rounded shadow-lg bg-sky-200 p-36">
          Muestra de UI
        </h1>
        <p className="max-w-md mt-8 text-lg font-medium text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          consectetur orci sed cursus pharetra.
        </p>
        <div className="py-6 mt-10 rounded px-14 bg-sky-50">
          <p className="w-full font-medium text-center text-gray-700">
            ¿Ya tienes una clínica registrada?{" "}
            <a
              className="underline text-sky-500 hover:text-sky-700 decoration-sky-500 underline-offset-4"
              href="/clinica/login"
            >
              Ingresa aquí
            </a>
          </p>
          <p className="w-full mt-4 font-medium text-center text-gray-700">
            ¿Eres un cliente?{" "}
            <a
              className="text-teal-500 underline hover:text-teal-700 decoration-teal-500 underline-offset-4"
              href="/cliente/login"
            >
              Ingresa aquí
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
