import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import Button from "ui/Button"

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <Button
          variant="primary"
          type="button"
          size="medium"
          onClick={openModal}
        >
          Open Modal
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Verifique sus Datos
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Se muestran los datos de la persona que está registrando.
                  </p>
                </div>

                <div className="flex justify-evenly mt-4">
                  <Button
                    variant="danger"
                    size="medium"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="secondary"
                    type="submit"
                    size="medium"
                    onClick={closeModal}
                  >
                    Aceptar
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
