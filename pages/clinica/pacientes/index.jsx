import { useEffect, useState } from "react"
import { patientHeaders } from "utils/constants"
import TableData from "components/TableData"
import { getPatients } from "helpers/getPatients"

export default function PatientApp({ updateTooltip }) {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    getPatients().then((data) => {
      setPatients(data.patients)
    })
  }, [])

  return (
    patients.length > 0 && (
      <TableData
        updateTooltip={updateTooltip}
        type="Pacientes"
        data={patients}
        gridTemplateHeader="grid-cols-3"
        headerType={patientHeaders}
      />
    )
  )
}
