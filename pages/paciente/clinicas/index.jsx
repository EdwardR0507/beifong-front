import TableData from "components/TableData"
import { useEffect, useState } from "react"
import { clinicHeaders } from "utils/constants"

export default function PatientApp({ updateTooltip }) {
  const [clinics, setClinics] = useState([])

  const fetchClinics = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/clinics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setClinics(data.clinics)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchClinics()
  }, [])

  return (
    <TableData
      updateTooltip={updateTooltip}
      type="Clínicas"
      data={clinics}
      gridTemplateHeader="grid-cols-5"
      gridTemplateMDContent="md:grid-cols-5"
      headerType={clinicHeaders}
    />
  )
}
