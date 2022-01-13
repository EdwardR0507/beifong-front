import { useEffect, useState } from "react"
import { medicHeaders } from "utils/constants"
import TableData from "components/TableData"
import { getMedics } from "helpers/getMedics"

export default function ClinicApp({ updateTooltip }) {
  const [medics, setMedics] = useState([])

  useEffect(() => {
    getMedics().then((data) => {
      setMedics(data.medics)
    })
  }, [])

  return (
    medics.length > 0 && (
      <TableData
        updateTooltip={updateTooltip}
        type="Médicos"
        data={medics}
        gridTemplateHeader="grid-cols-7"
        headerType={medicHeaders}
      />
    )
  )
}
