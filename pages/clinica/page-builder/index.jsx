import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import Button from "ui/Button"
import Logo from "ui/Logo"
import TextInput from "ui/TextInput"
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
  const description1 = watch("description1")
  const image2 = watch("image2")
  const image2Position = watch("image2_position")
  const description2 = watch("description2")

  console.log(image1Position, "image1_position")
  console.log(image2Position, "image2_position")

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
            {logo?.length > 0 && (
              <figure className="relative w-1/4 ml-4 h-4/6">
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
            <span className="mb-6 text-xl font-semibold">{description1}</span>
            <span className="mb-6 text-xl font-semibold">{description2}</span>
            <Button className="mb-6" variant="tertiary">
              Realizar consulta
            </Button>
          </main>
        </main>
      </div>
      <aside
        className={`w-1/4 min-h-screen dark:bg-gray-700 bg-gray-100 transition-all duration-300 ease-in-out shadow-lg shadow-black/20 rounded-lg
        ${showSideBar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Logo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full px-3 mt-4">
            <span className="mb-6 ml-3 font-semibold text-gray-400">
              Cabecera
            </span>
            <FileInput
              errors={errors.logo}
              register={register}
              label="Logo"
              name="logo"
              fileWatch={logo}
            />
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
          <div className="w-full px-3 mt-4">
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
