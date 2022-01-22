import Image from "next/image"
import { useForm } from "react-hook-form"
import TextInput from "ui/TextInput"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import Button from "ui/Button"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import SelectInput from "ui/SelectInput"
import { useEffect, useState } from "react"
import * as yup from "yup"
import { toast, ToastContainer } from "react-toastify"
import { injectStyle } from "react-toastify/dist/inject-style"

const schema = yup.object().shape({
  specialty: yup.string().required("Especialidad es requerida"),
  medicId: yup.string().required("Médico es requerido"),
  startAttentionDate: yup
    .string()
    .required("Fecha de inicio de atención es requerida"),
})

if (typeof window !== "undefined") {
  injectStyle()
}

export default function ActualizarFecha() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const specialty = watch("specialty")

  const router = useRouter()
  const [medics, setMedics] = useState([])
  const { clinicId } = router.query
  const { theme } = useTheme()

  console.log(errors, "errors")

  const onSubmit = (data) => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    const formData = new FormData()
    console.log(data)

    formData.append("clinicId", clinicId)
    formData.append("medicId", data.medicId)
    formData.append(
      "startAttentionDate",
      data.startAttentionDate.split("T").join(" ") + ":00"
    )

    window
      .fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinicalAppointments`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.json())
      .then((resJSON) => {
        if (resJSON.ok) {
          toast.success(resJSON.msg)
        } else {
          if (resJSON.errors) {
            resJSON.errors.forEach((error) => {
              toast.error(error.msg)
            })
          } else {
            toast.error(resJSON.msg)
          }
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error("Hubo un error, vuelva a intentarlo")
      })
  }

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))

    const getMedics = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/medics/${clinicId}/clinics`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      setMedics(data.medics)
      console.log(data)
    }

    if (clinicId) {
      getMedics()
    }
  }, [clinicId])

  return (
    <>
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
                Cita médica
              </h1>
              <div className="grid grid-cols-1 gap-4 mb-8">
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
                <SelectInput
                  label="Médico"
                  name="medic"
                  type="text"
                  disabled={specialty === ""}
                  options={
                    medics
                      .filter(
                        (medic) =>
                          medic.specialty === specialty && medic.verified
                      )
                      .map((medic) => ({
                        value: medic.medicId,
                        label: `${medic.name} ${medic.surname}`,
                      })) || []
                  }
                  {...register("medicId")}
                />
                <TextInput
                  name="startAttentionDate"
                  label="Hora de inicio de atención"
                  type="datetime-local"
                  register={register}
                />
              </div>
              <Button variant="primary" type="submit">
                Separar cita
              </Button>
            </form>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  )
}
