import { Dialog, Transition } from "@headlessui/react"
import AccessibilityButton from "components/AccessibilityButton"
import { UserContext } from "context/UserContext"
import { useTextToSpeech } from "hooks/useTextToSpeech"
import { useTheme } from "next-themes"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Heading from "ui/Accessibility/Heading"
import Paragraph from "ui/Accessibility/Paragraph"
import Button from "ui/Button"
import rangy from "rangy"
import "rangy/lib/rangy-classapplier"
import "rangy/lib/rangy-highlighter"

const size = {
  1: "xs",
  2: "sm",
  3: "base",
  4: "lg",
  5: "xl",
}

const invertedSize = {
  xs: 1,
  sm: 2,
  base: 3,
  lg: 4,
  xl: 5,
}

export default function CalculatorModal({ global }) {
  // const [selectedText, setSelectedText] = useState("")
  const [highlighter, setHighlighter] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const textRef = useRef("")
  const { accessibility, reloadUser, setReloadUser } = useContext(UserContext)
  const { isTextToSpeech, setIsTextToSpeech, handleSpeak } = useTextToSpeech()
  const { systemTheme, theme, setTheme } = useTheme()
  const { register, watch, handleSubmit, setValue } = useForm()
  const currentTheme = theme === "system" ? systemTheme : theme
  const fontSize = watch("fontSize")

  useEffect(() => {
    if (accessibility) {
      console.log("accessibility", accessibility)
      setValue("fontSize", invertedSize[accessibility?.fontSize])
      setIsHighContrast(accessibility?.highContrast)
      setIsHighlighted(accessibility?.highlightText)
      setIsTextToSpeech(accessibility?.textToVoice)
    }
  }, [accessibility])

  const onSubmit = (data) => {
    const settings = {
      highContrast: isHighContrast,
      highlightText: isHighlighted,
      textToVoice: isTextToSpeech,
      fontSize: size[data.fontSize],
      darkMode: theme === "dark",
    }

    console.log(settings, "settings")

    window.localStorage.setItem("accessibility", JSON.stringify(settings))
    setReloadUser(!reloadUser)
    setIsOpen(false)
  }

  useEffect(() => {
    rangy.init()
    const highlighter = rangy.createHighlighter()
    highlighter.addClassApplier(rangy.createClassApplier("bg-yellow-300"), {
      ignoreWhiteSpace: true,
      tagNames: ["span"],
      elementProperties: {
        style: {
          backgroundColor: "green",
          color: "black",
        },
      },
    })
    setHighlighter(highlighter)
  }, [])

  function highlight() {
    highlighter.highlightSelection("bg-yellow-300")
    const selTxt = rangy.getSelection()
    console.log("selTxt: " + selTxt)
    rangy.getSelection().removeAllRanges()
  }

  function removeHighlights() {
    highlighter.removeAllHighlights()
  }

  return (
    <>
      {global ? (
        <div className="fixed bottom-10 right-10">
          <Button
            variant="secondary"
            type="button"
            size="large"
            onClick={() => setIsOpen(true)}
          >
            Calculadora de accesibilidad
          </Button>
        </div>
      ) : (
        <Button
          variant="outline_primary"
          size="large"
          onClick={() => setIsOpen(true)}
        >
          Prueba nuestro widget
        </Button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-gray-800 dark:text-gray-200 dark:shadow-2xl"
              >
                <Dialog.Title
                  as="h1"
                  className="mb-4 text-xl font-bold text-center text-gray-800 dark:text-gray-200"
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
                        <div className="flex mt-2">
                          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                            1
                          </p>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            defaultValue="3"
                            className="w-full mx-4"
                            step="1"
                            {...register("fontSize")}
                          />
                          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                            5
                          </p>
                        </div>
                      </div>
                      <div className="text-base text-gray-700 dark:text-gray-300">
                        <span className="text-lg font-bold">
                          Ajustes de estilos
                        </span>
                        <br />
                        <div className="grid grid-cols-2 gap-6 mt-2">
                          <AccessibilityButton
                            isActive={currentTheme === "dark" || false}
                            onClick={() => {
                              setTheme(
                                currentTheme === "dark" ? "light" : "dark"
                              )
                            }}
                            label="Modo oscuro"
                            iconName="dark_mode"
                          />
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
                        <Heading.H1 fontSize={size[fontSize]}>
                          H1 Título
                        </Heading.H1>
                        <Heading.H2 fontSize={size[fontSize]}>
                          H2 Título
                        </Heading.H2>
                        <Heading.H3 fontSize={size[fontSize]}>
                          H3 Título
                        </Heading.H3>
                        <Paragraph
                          // onMouseUp={handleMouseUp}
                          // onKeyUp={handleKeyUp}
                          // onBlur={handleBlur}
                          fontSize={size[fontSize]}
                        >
                          Digitaliza la gestión completa de tu clínica. Páginas
                          de presentación, sistema de citas, de planes
                          personalizados y mucho más.
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    // onClick={handleSaveSettings}
                  >
                    Guardar configuración
                  </Button>
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    type="button"
                    variant="primary"
                    size="large"
                    onClick={highlight}
                  >
                    Resaltar texto
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="large"
                    onClick={removeHighlights}
                  >
                    Quitar resaltado
                  </Button>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
