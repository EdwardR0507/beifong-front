import Image from "next/image"
import { useForm } from "react-hook-form"
import TextInput from "ui/TextInput"

export default function RegistroClinicaIndex() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <main className="flex min-h-screen">
      <div className="w-full p-4 bg-gray-100 md:w-5/12">
        <div className="flex flex-col items-center w-full">
          <div className="w-full">
            <Image
              className="pt-4 pl-10"
              src="/images/logo-beifong.png"
              width={145}
              height={46}
              alt="Logo de Beifong"
            />
          </div>
          <form
            className="grid w-full max-w-lg p-6 mt-2 placeholder-gray-400 rounded-lg shadow-lg bg-gray-50"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="w-full mb-6 text-2xl font-bold text-center text-gray-900">
              Registro de clínica
            </h1>
            <TextInput
              name="name"
              label="Nombre de la clínica"
              register={register}
            />
            <TextInput name="phone" label="Teléfono" register={register} />
            <TextInput name="address" label="Dirección" register={register} />
            <TextInput
              name="email"
              label="Correo electrónico"
              register={register}
            />
            <TextInput name="password" label="Contraseña" register={register} />
            <button
              className="w-full py-3 mt-2 text-base font-bold text-white transition rounded-lg shadow-lg hover:shadow-sky-800/50 shadow-sky-500/40 bg-sky-500 hover:bg-sky-700"
              type="submit"
            >
              Registrar clínica
            </button>
            <p className="w-full mt-4 font-medium text-center text-gray-700">
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
          </form>
        </div>
      </div>
      <div className="items-center flex-1 hidden p-4 md:flex bg-sky-500">
        <h1 className="text-2xl font-bold text-gray-900">Muestra de UI</h1>
      </div>
    </main>
  )
}
