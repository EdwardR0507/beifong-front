import { Dialog } from "@headlessui/react"
import AccessibilityButton from "components/AccessibilityButton"
import { UserContext } from "context/UserContext"
import { useTextToSpeech } from "hooks/useTextToSpeech"
import { useTheme } from "next-themes"
import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Heading from "ui/Accessibility/Heading"
import Paragraph from "ui/Accessibility/Paragraph"
import Button from "ui/Button"
import rangy from "rangy"
import "rangy/lib/rangy-classapplier"
import "rangy/lib/rangy-highlighter"
import Modal from "ui/Modal"
import { usePopper } from "react-popper"
import RangeRef from "utils/rangeRef"

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

function generateGetBoundingClientRect(rect) {
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
  }
}

const virtualReference = {
  getBoundingClientRect() {
    return {
      top: 10,
      left: 10,
      bottom: 20,
      right: 100,
      width: 90,
      height: 10,
    }
  },
}

export default function CalculatorModal({ type }) {
  const [rangeRef, setRangeRef] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  // const [isSelected, setIsSelected] = useState(false)
  const popperInstance = usePopper(virtualReference, popperElement, {
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
      { name: "offset", options: { offset: [0, 8] } },
    ],
    placement: "top",
  })

  const [isPopperOpen, setIsPopperOpen] = useState(false)
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
    const rangeRef = new RangeRef()
    setRangeRef(rangeRef)
    rangy.init()
    const highlighter = rangy.createHighlighter()
    highlighter.addClassApplier(rangy.createClassApplier("bg-yellow-300"))
    setHighlighter(highlighter)
  }, [])

  useEffect(() => {
    if (rangeRef && typeof popperInstance.update === "function") {
      const asyncUpdate = async () => {
        await popperInstance.update()
      }
      rangeRef.rectChangedCallback = (rect) => {
        console.log(rect.width, "rect.width")
        if (rect.width > 0) {
          virtualReference.getBoundingClientRect = () =>
            generateGetBoundingClientRect(rect)
          asyncUpdate()
          // setIsPopperOpen(true)
        } else {
          setIsPopperOpen(false)
        }
      }
    }
  })

  // console.log(isPopperOpen, "isPopperOpen")

  function highlight() {
    highlighter.highlightSelection("bg-yellow-300")
    const selTxt = rangy.getSelection()
    console.log("selTxt: " + selTxt)
    rangy.getSelection().removeAllRanges()
    // setIsSelected(true)
    setIsPopperOpen(false)
  }

  function removeHighlights() {
    highlighter.removeAllHighlights()
    setIsPopperOpen(false)
  }

  const update = (evt, hide) => {
    const selection = document.getSelection()

    rangeRef.range =
      selection && selection.rangeCount && selection.getRangeAt(0)

    if (rangy.getSelection().toString() !== "") {
      setIsPopperOpen(true)
    } else {
      setIsPopperOpen(false)
    }

    updateRect(hide)
  }

  const updateRect = (hide) => {
    if (!hide && rangeRef.range) {
      rangeRef.rect = rangeRef.range.getBoundingClientRect()
    } else {
      rangeRef.rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      }
    }

    rangeRef.rectChangedCallback(rangeRef.rect)
  }

  return (
    <Modal type={type} isOpen={isOpen} setIsOpen={setIsOpen}>
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
                <span className="text-lg font-bold">Ajustes de la fuente</span>
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
                <span className="text-lg font-bold">Ajustes de estilos</span>
                <br />
                <div className="grid grid-cols-2 gap-6 mt-2">
                  <AccessibilityButton
                    isActive={currentTheme === "dark" || false}
                    onClick={() => {
                      setTheme(currentTheme === "dark" ? "light" : "dark")
                    }}
                    label="Modo oscuro"
                    iconName="dark_mode"
                  />
                  <AccessibilityButton
                    isActive={isTextToSpeech}
                    onClick={() => handleSpeak(textRef.current.textContent)}
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
            {console.log(
              popperInstance.attributes,
              "popperInstance.attributes"
            )}
            <div className="flex flex-1 px-8">
              {isPopperOpen && (
                <div
                  id="popper"
                  ref={setPopperElement}
                  style={popperInstance.styles.popper}
                  role="tooltip"
                  {...popperInstance.attributes.popper}
                  className="flex px-4 py-2 text-gray-800 rounded-lg bg-amber-200 dark:bg-gray-400 dark:text-gray-200"
                >
                  <Button
                    className="flex mr-4"
                    type="button"
                    onClick={() => highlight()}
                  >
                    <span className="mr-2">Resaltar</span>
                    <span className="material-icons">highlight</span>
                  </Button>
                  <Button
                    className="flex"
                    variant="danger"
                    type="button"
                    onClick={() => removeHighlights()}
                  >
                    <span className="mr-2">Quitar resaltado</span>
                    <span className="material-icons">highlight_off</span>
                  </Button>
                  <div
                    ref={setArrowElement}
                    className="bg-amber-200 -z-10 dark:bg-gray-400 dark:text-gray-200"
                    style={{
                      ...popperInstance.styles.arrow,
                      clipPath: "rect(0, 18px, 18px, -4px)",
                      height: "14px",
                      width: "14px",
                      boxShadow: "rgb(117 117 117) 1px 1px 1px -1px",
                      transform: "rotate(45deg) translate(155px, -100px)",
                    }}
                  ></div>
                </div>
              )}
              <div
                // ref={setReferenceElement}
                onMouseUp={() => {
                  if (rangeRef) {
                    update()
                  }
                }}
                onKeyDown={(e) => {
                  if (rangeRef) {
                    update(e, true)
                  }
                }}
                onInput={() => {
                  if (rangeRef) {
                    update()
                  }
                }}
                className="text-base leading-tight text-gray-700 dark:text-gray-300"
              >
                <Heading.H1 fontSize={size[fontSize]}>H1 Título</Heading.H1>
                <Heading.H2 fontSize={size[fontSize]}>H2 Título</Heading.H2>
                <Heading.H3 fontSize={size[fontSize]}>H3 Título</Heading.H3>
                <Paragraph fontSize={size[fontSize]}>
                  Digitaliza la gestión completa de tu clínica. Páginas de
                  presentación, sistema de citas, de planes personalizados y
                  mucho más.
                </Paragraph>
                <span ref={textRef}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
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
    </Modal>
  )
}
