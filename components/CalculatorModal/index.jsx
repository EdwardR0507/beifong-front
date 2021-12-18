import { Dialog, Transition } from "@headlessui/react"
import AccessibilityButton from "components/AccessibilityButton"
import { useTextToSpeech } from "hooks/useTextToSpeech"
import { useTheme } from "next-themes"
import { Fragment, useEffect, useRef, useState } from "react"
import Button from "ui/Button"

export default function CalculatorModal({ global }) {
  const [isOpen, setIsOpen] = useState(false)

  const [isMounted, setIsMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [fontSizePer, setFontSizePer] = useState(1.27)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Renderiza dependiendo del tema
  const renderThemeChanger = () => {
    if (!isMounted) return null
    const currentTheme = theme === "system" ? systemTheme : theme
    return (
      <AccessibilityButton
        isActive={currentTheme === "dark"}
        onClick={() => {
          setTheme(currentTheme === "dark" ? "light" : "dark")
        }}
        label="Modo oscuro"
        iconName="dark_mode"
      />
    )
  }

  // Referencia para el elemento de texto
  const textRef = useRef("")

  /* 
    Hook para habilitar el texto a voz: 
    isTextToSpeech: estado 
    handleSpeak: funcion que recibe el texto a hablar
  */
  const { isTextToSpeech, handleSpeak } = useTextToSpeech()

  const handleFontSizeChange = (evt) => {
    console.log(evt.target.value)
    const percentage = evt.target.value / 20
    setFontSizePer(percentage)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      {global ? (
        <div className="fixed bottom-10 right-10">
          <Button
            variant="secondary"
            type="button"
            size="large"
            onClick={openModal}
          >
            Calculadora de accesibilidad
          </Button>
        </div>
      ) : (
        <Button variant="outline_primary" size="large" onClick={openModal}>
          Prueba nuestro widget
        </Button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 dark:bg-white dark:opacity-10" />
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
              <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-gray-800 dark:text-gray-200 dark:shadow-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Calculadora de accesibilidad
                </Dialog.Title>
                <div className="flex">
                  <div className="flex mb-4">
                    <div className="flex flex-col flex-1 px-8">
                      <div className="mb-4 text-base text-gray-700 dark:text-gray-300">
                        <span className="text-lg font-bold">
                          Ajustes de la fuente
                        </span>
                        <br />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Selecciona el tamaño de la fuente
                        </span>
                        <div className="flex mt-2">
                          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                            20%
                          </p>
                          <input
                            type="range"
                            min="20"
                            max="35"
                            defaultValue="27"
                            className="w-full mx-4"
                            step="1"
                            onChange={handleFontSizeChange}
                          />
                          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                            35%
                          </p>
                        </div>
                      </div>
                      <div className="text-base text-gray-700 dark:text-gray-300">
                        <span className="text-lg font-bold">
                          Ajustes de estilos
                        </span>
                        <br />
                        <span className="font-semibold text-gray-500 dark:text-gray-300">
                          Selecciona los estilos
                        </span>
                        <div className="grid grid-cols-2 gap-6 mt-2">
                          {renderThemeChanger()}
                          <AccessibilityButton
                            isActive={isTextToSpeech}
                            onClick={() =>
                              handleSpeak(textRef.current.textContent)
                            }
                            label="Texto a voz"
                            iconName="volume_up"
                          />
                          <AccessibilityButton
                            isActive={isHighlighted}
                            onClick={() => setIsHighlighted(!isHighlighted)}
                            label="Texto resaltado"
                            iconName="highlight"
                          />
                          <AccessibilityButton
                            isActive={isHighContrast}
                            onClick={() => setIsHighContrast(!isHighContrast)}
                            label="Contraste alto"
                            iconName="contrast"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 px-8">
                      <div className="text-base leading-tight text-gray-700 dark:text-gray-300">
                        <h1
                          className="font-bold"
                          style={{
                            fontSize: `${(fontSizePer * 1.5).toString()}rem`,
                            margin: `${(fontSizePer * 0.75).toString()}rem 0`,
                          }}
                        >
                          H1 Título
                        </h1>
                        <h2
                          className="font-bold"
                          style={{
                            fontSize: `${(fontSizePer * 1.25).toString()}rem`,
                            margin: `${(fontSizePer * 0.75).toString()}rem 0`,
                          }}
                        >
                          H2 Título
                        </h2>
                        <h3
                          className="font-bold"
                          style={{
                            fontSize: `${(fontSizePer * 1.125).toString()}rem`,
                            margin: `${(fontSizePer * 0.75).toString()}rem 0`,
                          }}
                        >
                          H3 Título
                        </h3>
                        <p
                          className="font-bold"
                          style={{
                            fontSize: `${(fontSizePer * 0.875).toString()}rem`,
                            margin: `${(fontSizePer * 0.75).toString()}rem 0`,
                          }}
                          ref={textRef}
                        >
                          Digitaliza la gestión completa de tu clínica. Páginas
                          de presentación, sistema de citas, de planes
                          personalizados y mucho más.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
