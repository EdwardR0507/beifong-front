import { Dialog } from "@headlessui/react"
import Modal from "ui/Modal"
import { useState } from "react"
import Button from "ui/Button"
export default function ConfirmationModal({ info }) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  const { medico, especialidad, fecha, hora } = info
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} type={"cita"}>
      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-sky-50 dark:bg-gray-600 shadow-xl rounded-2xl">
        <Dialog.Title
          as="h3"
          className="py-2 font-bold text-lg uppercase leading-6 text-gray-700 dark:text-gray-100"
        >
          Confirmar Cita
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm font-bold text-gray-600 dark:text-gray-100">
            ¿Está seguro que desea reservar su cita para la especialiad de{" "}
            <span className="font-blod ">{especialidad}</span> el{" "}
            <span className="font-blod ">{fecha}</span> a las{" "}
            <span className="font-blod ">{hora}</span> horas con el médico{" "}
            <span className="font-blod ">{medico}</span>?
          </p>
        </div>
        <div className="flex justify-evenly my-4">
          <Button
            variant="danger"
            type="button"
            size="medium"
            onClick={closeModal}
          >
            Cancelar
          </Button>
          <Button
            variant="secondary"
            type="button"
            size="medium"
            onClick={closeModal}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
