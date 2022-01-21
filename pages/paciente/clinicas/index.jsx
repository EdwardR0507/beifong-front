import TableData from "components/TableData"
import { getClinics } from "helpers/getClinics"
import { useEffect, useState } from "react"
import { clinicHeaders } from "utils/constants"

export default function PatientApp({ updateTooltip }) {
  const [clinics, setClinics] = useState([])

  useEffect(() => {
    getClinics().then((data) => {
      setClinics(data.clinics)
    })
  }, [])

  return (
    clinics.length > 0 && (
      <TableData
        updateTooltip={updateTooltip}
        type="Clínicas"
        data={clinics?.filter((clinic) => clinic?.verified)}
        gridTemplateHeader="grid-cols-5"
        headerType={clinicHeaders}
      />
    )
  )
}
