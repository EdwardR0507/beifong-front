import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import AccessibilityButton from "ui/Accessibility/Button"
import Button from "ui/Button"

export default function Modal({ children, type, isOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const renderButton = () => {
    switch (type) {
      case "global":
        return (
          <AccessibilityButton
            variant="secondary"
            type="button"
            size="large"
            className="fixed bottom-10 right-10"
            onClick={openModal}
          >
            Calculadora de accesibilidad
          </AccessibilityButton>
        )
      case "tryWidget":
        return (
          <Button variant="outline_primary" size="large" onClick={openModal}>
            Prueba nuestro widget
          </Button>
        )
      case "subscription":
        return (
          <Button
            variant="primary"
            type="button"
            size="medium"
            onClick={openModal}
            className="mt-10 mb-4"
          >
            Comprar
          </Button>
        )
      case "cita":
        return (
          <Button
            variant="primary"
            type="button"
            size="medium"
            onClick={openModal}
            className="mt-10 mb-4"
          >
            Reservar cita
          </Button>
        )
      default:
        return (
          <Button
            variant="primary"
            type="button"
            size="medium"
            onClick={openModal}
          >
            Open Modal
          </Button>
        )
    }
  }

  return (
    <>
      {renderButton()}
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
              <Dialog.Overlay className="fixed inset-0 bg-slate-800/40 dark:bg-gray-50/10" />
            </Transition.Child>

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
              {children}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
