import Image from "next/image"
import { useForm } from "react-hook-form"
import TextInput from "ui/TextInput"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import Button from "ui/Button"
import { actualizacionSchema } from "schemas/medico/actualizacion"
import { useTheme } from "next-themes"
import { injectStyle } from "react-toastify/dist/inject-style"
import { ToastContainer, toast } from "react-toastify"
import { useRouter } from "next/router"

if (typeof window !== "undefined") {
  injectStyle()
}

export default function ActualizarFecha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(actualizacionSchema),
  })
  const router = useRouter()
  const { theme } = useTheme()

  const onSubmit = (data) => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    const formData = new FormData()
    console.log(data)
    formData.append("attentionTime", data.attentionTime)
    formData.append("startAttentionTime", data.startAttentionTime)
    formData.append("endAttentionTime", data.endAttentionTime)
    formData.append("password", data.password)
    window
      .fetch(`${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/medics`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((resJSON) => {
        if (resJSON.ok) {
          toast.success(resJSON.msg)
        } else {
          if (resJSON.errors){
            resJSON.errors.forEach((error) => {
              toast.error(error.msg)
            })
          }
          else{
            toast.error(resJSON.msg)
          }
        }
      })
      .catch((err) => {
        toast.error("Hubo un error, vuelva a intentarlo")
        console.log(err)
      })
  }

  return (
    <main className="flex min-h-screen">
      <div className="w-full p-4 bg-gray-100 dark:bg-gray-800">
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
              Actualización de Horario de Atención
            </h1>
            <div className="grid grid-cols-1 gap-4 mb-8">
              <TextInput
                name="attentionTime"
                label="Duración de la Atención (en minutos)"
                type="number"
                register={register}
                min="15"
                max="60"
              />
              <TextInput
                name="startAttentionTime"
                label="Inicio de Horario de Atención"
                type="time"
                register={register}
              />
              <TextInput
                name="endAttentionTime"
                label="Fin de Horario de Atención"
                type="time"
                register={register}
              />
              <TextInput
                name="password"
                label="Contraseña"
                type="password"
                register={register}
                errors={errors?.password}
              />
            </div>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}
