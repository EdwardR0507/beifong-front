import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import Button from "ui/Button"
import Logo from "ui/Logo"
import TextInput from "ui/TextInput"
import * as yup from "yup"
import Image from "next/image"

const schema = yup.object().shape({
  logo: yup.mixed().required("El logo es requerido"),
  slogan: yup.string().required("El slogan es requerido"),
  subslogan: yup.string().required("El subslogan es requerido"),
})

export default function PageBuilder() {
  const [showSideBar, setShowSideBar] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const logo = watch("logo")
  const slogan = watch("slogan")
  const subslogan = watch("subslogan")
  console.log(logo, "logo")

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="relative flex flex-col bg-sky-50 dark:bg-gray-800">
      <div className="absolute flex w-full min-h-screen bg-sky-50 dark:bg-gray-800">
        {showSideBar && (
          <aside className="w-1/4 min-h-screen bg-sky-50 dark:bg-gray-800"></aside>
        )}
        <main className="flex flex-col flex-1 min-h-screen transition-all duration-300 bg-sky-50 dark:bg-gray-800">
          <header className="flex items-center justify-between h-1/5">
            {logo && (
              <figure className="relative w-1/4 ml-4 h-2/6">
                <Image
                  src={URL.createObjectURL(logo[0])}
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                />
              </figure>
            )}
            <div>
              <Button className="mr-32" variant="secondary">
                Contacto
              </Button>
            </div>
          </header>
          <main className="flex flex-col ml-4">
            <span className="mb-6 text-4xl font-semibold">{slogan}</span>
            <span className="mb-6 text-xl font-semibold">{subslogan}</span>
            <Button className="mb-6" variant="tertiary">
              Realizar consulta
            </Button>
          </main>
        </main>
      </div>
      <aside
        className={`w-1/4 min-h-screen dark:bg-gray-700 bg-sky-100 transition-all duration-300 ease-in-out shadow-lg shadow-black/20 rounded-lg
        ${showSideBar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Logo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full px-3 mt-4">
            <span className="mb-6 ml-3 font-semibold text-gray-400">
              Cabecera
            </span>
            <div className="w-full px-3">
              <div className="grid grid-cols-2 mb-2">
                <label
                  className="flex items-center py-2 text-xs font-bold text-gray-700 uppercase select-none dark:text-gray-100"
                  htmlFor="grid-first-name"
                >
                  Logo de la clinica
                </label>
                {errors?.logo && (
                  <span className="flex items-center justify-center px-2 text-sm font-medium text-center rounded select-none bg-rose-100 text-rose-600 dark:bg-rose-800 dark:text-gray-100">
                    {errors.logo}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                className="file:transition file:cursor-pointer file:mx-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-700"
                id="logo"
                type="file"
                name={name}
                {...register("logo")}
              />
            </div>
          </div>
          <div className="w-full px-3 mt-4">
            <span className="mb-6 ml-3 font-semibold text-gray-400">
              Sección 1
            </span>
            <TextInput
              label="Eslogan"
              name="slogan"
              register={register}
              error={errors.slogan}
            />
            <TextInput
              label="Subeslogan"
              name="subslogan"
              register={register}
              error={errors.subslogan}
            />
          </div>
        </form>
      </aside>
      <Button
        className="absolute top-0 right-0 mt-4 mr-4"
        onClick={() => setShowSideBar(!showSideBar)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </Button>
    </div>
  )
}
