import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
// import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "ui/Button"
import FileInput from "ui/FileInput"
import Logo from "ui/Logo"
import SelectInput from "ui/SelectInput"
import TextInput from "ui/TextInput"
import * as yup from "yup"
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify"

if (typeof window !== "undefined") {
  injectStyle();
}

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  surname: yup.string().required("El apellido es requerido"),
  dni: yup
    .string()
    .min(8, "El DNI debe tener 8 caracteres")
    .required("El DNI es requerido"),
  specialty: yup.string().required("La especialidad es requerida"),
  password: yup.string().required("La contraseña es requerida"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es requerido"),
  img: yup.mixed().required("La imagen es requerida"),
  attentionCost: yup.string().required("El costo de atención es requerido"),
})

export default function CrearMedicos() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const img = watch("img")

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (!token) {
      router.push("/clinica/login")
    }
  }, [])

  const onSubmit = async (data) => {
    const token = JSON.parse(window.localStorage.getItem("token"))

    console.log(data)

    const newFormData = new FormData()

    newFormData.append("name", data.name)
    newFormData.append("surname", data.surname)
    newFormData.append("dni", data.dni)
    newFormData.append("specialty", data.specialty)
    newFormData.append("password", data.password)
    newFormData.append("email", data.email)
    newFormData.append("img", data.img[0])
    newFormData.append("attentionCost", data.attentionCost)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/medics`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: newFormData,
        }
      )
      const data = await response.json()
      if(!data.ok){
        if (data.errors){
          data.errors.forEach((error) => {
            toast.error(error.msg)
          })
        }
        else{
          toast.error(data.msg)
        }
      }
      else{
        toast.success(data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(errors, "errors")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <header className="flex items-center w-full pt-4 text-xl max-h-24">
        <Logo />
      </header>
      <main className="flex flex-col flex-1 w-screen font-semibold bg-sky-50 dark:bg-gray-800">
        <h1 className="text-2xl text-center text-sky-500 dark:text-gray-300">
          Crear Médicos
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="grid items-center justify-center w-full grid-cols-3 px-20 mt-14">
            <TextInput
              label="Nombre"
              name="name"
              errors={errors?.name}
              register={register}
              placeholder="Nombre"
            />
            <TextInput
              label="Apellido"
              name="surname"
              errors={errors?.surname}
              register={register}
              placeholder="Apellido"
            />
            <TextInput
              label="DNI"
              name="dni"
              errors={errors?.dni}
              register={register}
              placeholder="DNI"
            />
            <SelectInput
              label="Especialidad"
              name="specialty"
              options={[
                { value: "Odontología", label: "Odontología" },
                { value: "Oftalmología", label: "Oftalmología" },
                { value: "Neurología", label: "Neurología" },
                { value: "Traumatología", label: "Traumatología" },
                { value: "Urología", label: "Urología" },
                { value: "Cardiología", label: "Cardiología" },
                { value: "Ginecología", label: "Ginecología" },
                { value: "Pediatría", label: "Pediatría" },
                {
                  value: "Otorrinolaringología",
                  label: "Otorrinolaringología",
                },
                { value: "Dermatología", label: "Dermatología" },
                { value: "Neumología", label: "Neumología" },
                {
                  value: "Otorrinolaringología",
                  label: "Otorrinolaringología",
                },
              ]}
              {...register("specialty")}
            />
            <TextInput
              label="Contraseña"
              name="password"
              type="password"
              errors={errors?.password}
              register={register}
              placeholder="Contraseña"
            />
            <TextInput
              label="Email"
              name="email"
              errors={errors?.email}
              register={register}
              placeholder="Email"
            />
            <div>
              <FileInput
                errors={errors.img}
                register={register}
                label="Foto"
                name="img"
                fileWatch={img}
              />
            </div>
            {/* {img?.length > 0 && (
              <figure className="relative w-full h-full">
                <Image
                  src={URL.createObjectURL(img[0])}
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                />
              </figure>
            )} */}
            <TextInput
              label="Costo de atención"
              name="attentionCost"
              errors={errors?.attentionCost}
              register={register}
              placeholder="Costo de atención"
            />
          </div>
          <Button type="submit" className="mt-10">
            Crear Médico
          </Button>
        </form>
      </main>
      <ToastContainer />
    </div>
  )
}
