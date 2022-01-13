import { useEffect, useState } from "react"
import { medicHeaders } from "utils/constants"
import TableData from "components/TableData"

export default function ClinicApp({ updateTooltip }) {
  const [medics, setMedics] = useState([])

  const fetchMedics = async () => {
    try {
      const clinicId = JSON.parse(window.localStorage.getItem("clinicId"))
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/medics/${clinicId}/clinics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setMedics(data.medics)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchMedics()
  }, [])

  return (
    <TableData
      updateTooltip={updateTooltip}
      type="Médicos"
      data={medics}
      gridTemplateHeader="grid-cols-7"
      gridTemplateMDContent="md:grid-cols-7"
      headerType={medicHeaders}
    />
  )
}
