import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import Button from "ui/Button"
import Logo from "ui/Logo"
import * as yup from "yup"
import Image from "next/image"
import FileInput from "ui/FileInput"
import SelectInput from "ui/SelectInput"
import RadioGroup from "ui/RadioGroup"
import TextareaInput from "ui/TextareaInput"

const schema = yup.object().shape({
  logo: yup.mixed().required("El logo es requerido"),
  slogan: yup.string().required("El slogan es requerido"),
  subslogan: yup.string().required("El subslogan es requerido"),
  image1: yup.mixed().required("La imagen es requerida"),
  image1_position: yup.string().required("La posición es requerida"),
  image2: yup.mixed().required("La imagen es requerida"),
  image2_position: yup.string().required("La posición es requerida"),
  description1: yup.string().required("La descripción es requerida"),
  description2: yup.string().required("La descripción es requerida"),
  initial_day: yup.string().required("El día inicial es requerido"),
  final_day: yup.string().required("El día final es requerido"),
  initial_hour: yup.string().required("La hora inicial es requerida"),
  final_hour: yup.string().required("La hora final es requerida"),
  initial_minute: yup.string().required("El minuto inicial es requerido"),
  final_minute: yup.string().required("El minuto final es requerido"),
})

export default function PageBuilder() {
  const [showSideBar, setShowSideBar] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const logo = watch("logo")
  const slogan = watch("slogan")
  const subslogan = watch("subslogan")
  const image1 = watch("image1")
  const image1Position = watch("image1_position")
  console.log(image1Position, "image1Position")
  const description1 = watch("description1")
  const image2 = watch("image2")
  const image2Position = watch("image2_position")
  const description2 = watch("description2")
  const initialDay = watch("initial_day")
  const finalDay = watch("final_day")
  const initialHour = watch("initial_hour")
  const finalHour = watch("final_hour")
  const initialMinute = watch("initial_minute")
  const finalMinute = watch("final_minute")

  console.log(image1, "image1")

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="relative flex flex-col bg-sky-50 dark:bg-gray-800">
      <div className="absolute flex w-full min-h-screen bg-sky-50 dark:bg-gray-800">
        {showSideBar && (
          <aside className="w-1/4 min-h-screen bg-sky-50 dark:bg-gray-800"></aside>
        )}
        <div className="flex flex-col flex-1 min-h-screen transition-all duration-300 bg-sky-50 dark:bg-gray-800">
          <main className="flex flex-col text-slate-700 dark:text-white">
            <section className="h-screen px-4">
              <header className="flex items-center justify-between h-48">
                {logo?.length > 0 && (
                  <figure className="relative w-1/4 h-full ml-10">
                    <Image
                      src={URL.createObjectURL(logo[0])}
                      alt="logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </figure>
                )}
              </header>
              <div className="grid grid-cols-2 place-items-center">
                <article className="flex flex-col items-center max-w-prose">
                  <span className="mb-6 text-5xl font-bold">{slogan}</span>
                  <span className="my-6 text-xl font-semibold">
                    {subslogan}
                  </span>
                  <Button className="w-2/4 mt-6" variant="tertiary">
                    Realizar consulta
                  </Button>
                </article>
                <article className="px-16 py-10 bg-white rounded-lg shadow-lg dark:bg-sky-100">
                  <div className="flex flex-col items-center dark:text-slate-700">
                    <p className="mb-6 text-2xl font-semibold">
                      <span className="material-icons">schedule</span>
                      <span className="ml-2 font-bold uppercase">
                        Horario de atención
                      </span>
                    </p>
                    <p className="flex justify-between w-full mb-6 text-xl font-semibold">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Días
                      </span>
                      <span className="ml-2">
                        {initialDay} a {finalDay}
                      </span>
                    </p>
                    <p className="flex justify-between w-full mb-6 text-xl font-semibold">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Horario
                      </span>
                      <span className="ml-2">
                        {initialHour}:{initialMinute} a {finalHour}:
                        {finalMinute}
                      </span>
                    </p>
                    <p className="flex justify-between w-full mb-6 text-xl font-semibold">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Teléfono
                      </span>
                      <span className="ml-2">+51 999 999 999</span>
                    </p>
                    <Button className="w-2/4 mt-4" variant="secondary">
                      Contacto
                    </Button>
                  </div>
                </article>
              </div>
            </section>
            <section
              className={`flex items-center h-screen px-10 justify-evenly bg-sky-300 dark:bg-sky-800 ${
                image1Position?.name === "Derecha"
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              {image1?.length > 0 && (
                <figure className="relative w-5/12 h-full">
                  <Image
                    src={URL.createObjectURL(image1[0])}
                    alt="logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </figure>
              )}
              <p className="flex flex-col items-center px-10 py-8 rounded-lg max-w-prose bg-sky-200 dark:bg-gray-800">
                <span className="mb-6 text-xl font-semibold">
                  <p className="flex items-center justify-center mb-10 text-2xl font-semibold">
                    <span className="material-icons">work</span>
                    <span className="ml-2 text-4xl font-bold text-center uppercase">
                      ¿Quiénes somos?
                    </span>
                  </p>
                  <span className="ml-2">{description1}</span>
                </span>
              </p>
            </section>
            <section
              className={`flex items-center h-screen px-10 justify-evenly bg-sky-50 dark:bg-gray-800 ${
                image2Position?.name === "Derecha"
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              {image2?.length > 0 && (
                <figure className="relative w-5/12 h-full">
                  <Image
                    src={URL.createObjectURL(image2[0])}
                    alt="logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </figure>
              )}
              <p className="flex flex-col items-center px-10 py-8 rounded-lg max-w-prose bg-sky-200 dark:bg-sky-100 text-slate-700">
                <span className="mb-6 text-xl font-semibold">
                  <p className="flex items-center justify-center mb-10 text-2xl font-semibold">
                    <span className="material-icons">place</span>
                    <span className="ml-2 text-4xl font-bold text-center uppercase">
                      Conozca nuestras instalaciones
                    </span>
                  </p>
                  <span className="ml-2">{description2}</span>
                </span>
              </p>
            </section>
          </main>
        </div>
      </div>
      <aside
        className={`w-1/4 min-h-screen dark:bg-gray-700 bg-gray-100 transition-all duration-300 ease-in-out shadow-lg shadow-black/20 rounded-lg
        ${showSideBar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-screen border-b border-gray-700">
            <div className="flex flex-col items-center justify-center">
              <Logo />
            </div>
            <div className="grid w-full gap-3 px-3">
              <div>
                <span className="mb-4 font-semibold text-gray-400">
                  Sección 1
                </span>
                <FileInput
                  errors={errors.logo}
                  register={register}
                  label="Logo"
                  name="logo"
                  fileWatch={logo}
                />
                <TextareaInput
                  className="mt-4"
                  label="Eslogan"
                  name="slogan"
                  register={register}
                  error={errors.slogan}
                  size="sm"
                />
              </div>
              <TextareaInput
                label="Subeslogan"
                name="subslogan"
                register={register}
                error={errors.subslogan}
                size="md"
              />
              <label className="flex items-center px-3 py-2 text-xs font-bold text-gray-700 uppercase select-none dark:text-gray-100">
                Días de atención
              </label>
              <div className="flex items-center">
                <SelectInput
                  name="initial_day"
                  options={[
                    { value: "Lunes", label: "Lunes" },
                    { value: "Martes", label: "Martes" },
                    { value: "Miércoles", label: "Miércoles" },
                    { value: "Jueves", label: "Jueves" },
                    { value: "Viernes", label: "Viernes" },
                    { value: "Sábado", label: "Sábado" },
                    { value: "Domingo", label: "Domingo" },
                  ]}
                  {...register("initial_day")}
                  noLabel
                />
                <span className="mx-2">a</span>
                <SelectInput
                  name="final_day"
                  options={[
                    { value: "Lunes", label: "Lunes" },
                    { value: "Martes", label: "Martes" },
                    { value: "Miércoles", label: "Miércoles" },
                    { value: "Jueves", label: "Jueves" },
                    { value: "Viernes", label: "Viernes" },
                    { value: "Sábado", label: "Sábado" },
                    { value: "Domingo", label: "Domingo" },
                  ]}
                  {...register("final_day")}
                  noLabel
                />
              </div>
              <div className="mt-3">
                <label className="flex items-center px-3 py-2 text-xs font-bold text-gray-700 uppercase select-none dark:text-gray-100">
                  Horario de atención
                </label>
                <div className="flex items-center">
                  <SelectInput
                    name="initial_hour"
                    placeholder="HH"
                    options={Array.from(Array(24).keys()).map((hour) => ({
                      value: hour.toString().padStart(2, "0"),
                      label: hour.toString().padStart(2, "0"),
                    }))}
                    {...register("initial_hour")}
                    noLabel
                  />
                  <span className="mx-2">:</span>
                  <SelectInput
                    name="initial_minute"
                    placeholder="MM"
                    options={Array.from(Array(60).keys()).map((minute) => ({
                      value: minute.toString().padStart(2, "0"),
                      label: minute.toString().padStart(2, "0"),
                    }))}
                    {...register("initial_minute")}
                    noLabel
                  />
                  <span className="mx-2">a</span>
                  <SelectInput
                    name="final_hour"
                    placeholder="HH"
                    options={Array.from(Array(24).keys()).map((hour) => ({
                      value: hour.toString().padStart(2, "0"),
                      label: hour.toString().padStart(2, "0"),
                    }))}
                    {...register("final_hour")}
                    noLabel
                  />
                  <span className="mx-2">:</span>
                  <SelectInput
                    name="final_minute"
                    placeholder="MM"
                    options={Array.from(Array(60).keys()).map((minute) => ({
                      value: minute.toString().padStart(2, "0"),
                      label: minute.toString().padStart(2, "0"),
                    }))}
                    {...register("final_minute")}
                    noLabel
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-screen border-b border-gray-700">
            <div className="grid w-full gap-5 px-3 pt-6">
              <div>
                <span className="mb-6 ml-3 font-semibold text-gray-400">
                  Sección 2
                </span>
                <FileInput
                  errors={errors.image1}
                  register={register}
                  label="Imagen de sección 2"
                  name="image1"
                  fileWatch={image1}
                />
              </div>
              <div className="mt-3">
                <label className="flex items-center px-3 py-2 text-xs font-bold text-gray-700 uppercase select-none dark:text-gray-100">
                  Ubicación de la imagen
                </label>
                <RadioGroup
                  options={[
                    { value: "left", name: "Izquierda" },
                    { value: "right", name: "Derecha" },
                  ]}
                  setValue={(value) => setValue("image1_position", value)}
                />
              </div>
              <TextareaInput
                label="Descripción de sección 2"
                name="description1"
                register={register}
                error={errors.description1}
              />
            </div>
          </div>
          <div className="h-screen border-b border-gray-700">
            <div className="w-full px-3 mt-4">
              <span className="mb-6 ml-3 font-semibold text-gray-400">
                Sección 3
              </span>
              <FileInput
                errors={errors.image2}
                register={register}
                label="Imagen de sección 3"
                name="image2"
                fileWatch={image2}
              />
              <div className="mt-3">
                <label className="flex items-center px-3 py-2 text-xs font-bold text-gray-700 uppercase select-none dark:text-gray-100">
                  Ubicación de la imagen
                </label>
                <RadioGroup
                  options={[
                    { value: "left", name: "Izquierda" },
                    { value: "right", name: "Derecha" },
                  ]}
                  setValue={(value) => setValue("image2_position", value)}
                />
              </div>
              <TextareaInput
                label="Descripción de sección 3"
                name="description2"
                register={register}
                error={errors.description1}
              />
            </div>
          </div>
        </form>
      </aside>
      <Button
        className="fixed top-0 right-0 mt-4 mr-4"
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
