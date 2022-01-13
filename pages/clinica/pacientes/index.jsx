import { useEffect, useState } from "react"
import { patientHeaders } from "utils/constants"
import TableData from "components/TableData"

export default function PatientApp({ updateTooltip }) {
  const [patients, setPatients] = useState([])

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/patients`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setPatients(data.patients)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return (
    <TableData
      updateTooltip={updateTooltip}
      type="Pacientes"
      data={patients}
      gridTemplateHeader="grid-cols-3"
      gridTemplateMDContent="md:grid-cols-3"
      headerType={patientHeaders}
    />
  )
}
