import Headers from "components/Headers"
import { useEffect, useState } from "react"
import Span from "ui/Accessibility/Span"
import Button from "ui/Button"
import { appointmentHeaders } from "utils/constants"

export default function CitaRow({ data: appointment }) {
  console.log("appointment:", appointment)
  const [clinicInfo, setClinicInfo] = useState({})
  const [medicInfo, setMedicInfo] = useState({})

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))

    const getClinicInfo = async () => {
      const patient = await window.fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics/${appointment.clinic}`,
        {
          method: "GET",
          Authorization: `Bearer ${token}`,
        }
      )

      const { clinic: clinicInfo } = await patient.json()
      setClinicInfo(clinicInfo)
      console.log(clinicInfo, "clinicInfo")
    }

    getClinicInfo()
  }, [])

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))

    const getMedicInfo = async () => {
      const medic = await window.fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/medics/${appointment.medic}`,
        {
          method: "GET",
          Authorization: `Bearer ${token}`,
        }
      )

      const { medic: medicInfo } = await medic.json()
      setMedicInfo(medicInfo)
      console.log(medicInfo, "medicInfo")
    }

    getMedicInfo()
  }, [])

  return (
    <section className="grid grid-cols-2 mt-8 rounded md:mt-0 md:grid-cols-1">
      <Headers.Mobile headers={appointmentHeaders} />
      <div className="grid text-sm text-right bg-gray-100 dark:bg-gray-700 md:border-b md:grid-cols-7 md:text-center">
        <Span className="flex items-center justify-end h-16 px-4 break-words border-b md:text-left md:justify-center md:h-20 md:border-none">
          {clinicInfo?.name}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 border-b md:justify-center md:h-20 md:border-none">
          {clinicInfo?.direction}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {clinicInfo?.telephone}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {medicInfo?.name} {medicInfo?.surname}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {medicInfo?.specialty}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {new Date(appointment.startAttentionDate).toLocaleString("es-ES", {
            timeZone: "UTC",
          })}
        </Span>
        <div className="flex items-center justify-end h-16 pr-4 border-b md:flex-col md:justify-center md:h-20 md:border-none">
          <Button variant="primary" className="flex" onClick={() => {}}>
            <span className="material-icons">edit</span>
            <Span className="ml-2">Editar</Span>
          </Button>
        </div>
      </div>
    </section>
  )
}
