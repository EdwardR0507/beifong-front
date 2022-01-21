import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Button from "ui/Button"
import { daysToSpanish } from "utils/constants"

export default function ClinicCustomPage() {
  const router = useRouter()
  const { clinicId } = router.query
  const [template, setTemplate] = useState(null)

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics/${clinicId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const { clinic } = await res.json()
        console.log(clinic)
        const data = {
          slogan: clinic.slogan,
          subSlogan: clinic.subSlogan,
          startAttentionDay: clinic.attentionDays[0],
          endAttentionDay: clinic.attentionDays[1],
          startAttentionTime: clinic.startAttentionTime,
          endAttentionTime: clinic.endAttentionTime,
          img: clinic.logoImg,
          sections: clinic.sections,
          telephone: clinic.telephone,
        }
        setTemplate(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (clinicId) {
      fetchClinic()
    }
  }, [clinicId])

  return (
    <div className="flex flex-col flex-1 min-h-screen transition-all duration-300 bg-sky-50 dark:bg-gray-800">
      <main className="flex flex-col text-slate-700 dark:text-white">
        <section className="h-screen px-4">
          <header className="flex items-center justify-between h-48">
            {template?.img && (
              <figure className="relative w-1/4 h-full ml-10">
                <Image
                  src={template.img}
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                />
              </figure>
            )}
          </header>
          <div className="grid grid-cols-2 place-items-center">
            <article className="flex flex-col items-center max-w-prose">
              <span className="mb-6 text-5xl font-bold">
                {template?.slogan}
              </span>
              <span className="my-6 text-xl font-semibold">
                {template?.subSlogan}
              </span>
              <Button
                onClick={() => {
                  router.push(`/paciente/clinicas/${clinicId}/cita`)
                }}
                className="w-2/4 mt-6"
                variant="tertiary"
              >
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
                    {daysToSpanish[template?.startAttentionDay]} a{" "}
                    {daysToSpanish[template?.endAttentionDay]}
                  </span>
                </p>
                <p className="flex justify-between w-full mb-6 text-xl font-semibold">
                  <span className="font-semibold text-gray-400 dark:text-gray-500">
                    Horario
                  </span>
                  <span className="ml-2">
                    {template?.startAttentionTime} a{" "}
                    {template?.endAttentionTime}
                  </span>
                </p>
                <p className="flex justify-between w-full mb-6 text-xl font-semibold">
                  <span className="font-semibold text-gray-400 dark:text-gray-500">
                    Teléfono
                  </span>
                  <span className="ml-2">{template?.telephone}</span>
                </p>
                <Button className="w-2/4 mt-4" variant="secondary">
                  Contacto
                </Button>
              </div>
            </article>
          </div>
        </section>
        {template &&
          template?.sections.map((seccion, index) => {
            return (
              <section
                key={seccion?._id}
                className={`flex items-center h-screen px-10 justify-evenly ${
                  index % 2 === 0
                    ? "bg-sky-300 dark:bg-sky-800"
                    : "bg-sky-50 dark:bg-gray-800"
                } ${
                  seccion?.imgPosition === "right"
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                {seccion?.img && (
                  <figure className="relative w-5/12 h-full">
                    <Image
                      src={seccion?.img}
                      alt="logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </figure>
                )}
                <div
                  className={`flex flex-col items-center px-10 py-8 rounded-lg max-w-prose ${
                    index % 2 === 0
                      ? "bg-sky-300 dark:bg-gray-800"
                      : "bg-sky-200 dark:bg-sky-100 text-slate-700"
                  }`}
                >
                  <p className="mb-6 text-xl font-semibold">
                    <span className="flex items-center justify-center mb-10 text-2xl font-semibold">
                      <span className="ml-2 text-4xl font-bold text-center uppercase">
                        {seccion?.title}
                      </span>
                    </span>
                    <span className="ml-2">{seccion?.description}</span>
                  </p>
                </div>
              </section>
            )
          })}
      </main>
    </div>
  )
}
