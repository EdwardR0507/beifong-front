import { useState } from "react"
import Button from "ui/Button"
import ClientOnlyPortal from "../ClientOnlyPortal"

export default function Modal({ children }) {
  const [open, setOpen] = useState()

  return (
    <>
      <Button variant="primary" size="medium" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="fixed bg-black bg-opacity-70 inset-0">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded p-6 shadow-2xl w-11/12 md:w-2/3 z-10 ">
              {children}
              <div className="flex justify-evenly ">
                <Button
                  variant="danger"
                  size="medium"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  size="medium"
                  onClick={() => setOpen(false)}
                >
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  )
}

export const ModalLabel = ({ field, value }) => {
  return (
    <div className="flex justify-between py-2">
      <strong>{field}:</strong>
      <span>{value}</span>
    </div>
  )
}
