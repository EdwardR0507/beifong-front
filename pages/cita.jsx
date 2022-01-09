import ConfirmationModal from "components/ConfirmationModal"

const cita = () => {
  const info = {
    medico: "Jesus Luján",
    especialidad: "Odontología",
    fecha: "14/01/22",
    hora: "14:00",
  }
  return (
    <div>
      <ConfirmationModal info={info} />
    </div>
  )
}

export default cita
