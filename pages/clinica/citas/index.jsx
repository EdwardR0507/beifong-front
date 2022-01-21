import { useEffect, useState } from "react"
import { appointmentClinicHeaders } from "utils/constants"
import TableData from "components/TableData"

export default function AllAppointments({ updateTooltip }) {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const getAppointmentsByUser = async () => {
      const token = JSON.parse(window.localStorage.getItem("token"))
      const clinic = JSON.parse(window.localStorage.getItem("clinic"))
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics/${clinic.clinicId}?clinicalAppointments=true`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const {
        clinic: { clinicalAppointments },
      } = await response.json()
      console.log(clinicalAppointments)
      setAppointments(clinicalAppointments)
    }
    getAppointmentsByUser()
  }, [])

  return (
    appointments.length > 0 && (
      <TableData
        updateTooltip={updateTooltip}
        type="Citas de clínica"
        data={appointments}
        gridTemplateHeader="grid-cols-5"
        headerType={appointmentClinicHeaders}
      />
    )
  )
}
