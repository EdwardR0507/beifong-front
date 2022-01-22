import { Dialog } from "@headlessui/react"
import AccessibilityButton from "components/AccessibilityButton"
import AccessibilityButton2 from "ui/Accessibility/Button"
import { UserContext } from "context/UserContext"
import { useTextToSpeech } from "hooks/useTextToSpeech"
import { useTheme } from "next-themes"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Heading from "ui/Accessibility/Heading"
import Paragraph from "ui/Accessibility/Paragraph"
import Modal from "ui/Modal"
import useTooltip from "hooks/useTooltip"
import AccessibilityTooltip from "components/AccessibilityTooltip"
import { useRouter } from "next/router"

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

export default function CalculatorModal({ type }) {
  const router = useRouter()
  const [rangeRef, setRangeRef] = useState(null)
  const [isPopperOpen, setIsPopperOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [visualDisease, setVisualDisease] = useState("healthy-vision")
  const { accessibility, reloadUser, setReloadUser } = useContext(UserContext)
  const {
    isTextToSpeech,
    setIsTextToSpeech,
    handleSpeak,
    handleCancelSpeak,
    isSpeaking,
  } = useTextToSpeech()

  const { update, highlight, removeHighlights, textToRead } = useTooltip(
    setIsPopperOpen,
    rangeRef,
    setRangeRef
  )

  const { systemTheme, theme, setTheme } = useTheme()
  const { register, watch, handleSubmit, setValue } = useForm()
  const currentTheme = theme === "system" ? systemTheme : theme
  const fontSize = watch("fontSize")

  useEffect(() => {
    if (accessibility) {
      setValue("fontSize", invertedSize[accessibility?.fontSize])
      setIsHighContrast(accessibility?.highContrast)
      setIsHighlighted(accessibility?.highlightText)
      setIsTextToSpeech(accessibility?.textToVoice)
      setVisualDisease(accessibility?.visualDisease)
    }
  }, [accessibility])

  const onSubmit = async (data) => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(token)
    const path = router.pathname
    const role = path.includes("clinica")
      ? "clinics"
      : path.includes("medico")
      ? "medics"
      : "patients"

    const settings = {
      highContrast: isHighContrast,
      highlightText: isHighlighted,
      textToVoice: isTextToSpeech,
      fontSize: size[data.fontSize],
      darkMode: theme === "dark",
      visualDisease: visualDisease,
    }

    const newFormData = new FormData()
    newFormData.append("highContrast", settings.highContrast)
    newFormData.append("highlightText", settings.highlightText)
    newFormData.append("textToVoice", settings.textToVoice)
    newFormData.append("fontSize", settings.fontSize)
    newFormData.append("darkMode", settings.darkMode)
    newFormData.append("visualDisease", settings.visualDisease)

    const setAccessibility = async () => {
      console.log("entraaa")
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/${role}/accesibility`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: newFormData,
          }
        )
        const json = await res.json()
        console.log(json, "json")
      } catch (error) {
        console.log(error)
      }
    }

    console.log(settings, "settings")

    window.localStorage.setItem("accessibility", JSON.stringify(settings))
    setAccessibility()
    setReloadUser(!reloadUser)
    setIsOpen(false)
  }

  return (
    <>
      {type === "home" ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="inline-block w-full max-w-3xl p-6 my-8 mr-3 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-gray-800 dark:text-gray-200 dark:shadow-2xl"
        >
          <h1 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
            Calculadora de accesibilidad
          </h1>
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
                      onClick={() => setIsTextToSpeech(!isTextToSpeech)}
                      label="Texto a voz"
                      iconName="volume_up"
                    />
                    <AccessibilityButton
                      isActive={isHighlighted}
                      onClick={() => setIsHighlighted(!isHighlighted)}
                      label="Texto resaltado"
                      iconName="highlight"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 px-8">
                <AccessibilityTooltip
                  rangeRef={rangeRef}
                  isHighlighted={isHighlighted}
                  isTextToSpeech={isTextToSpeech}
                  isSpeaking={isSpeaking}
                  textToRead={textToRead}
                  isPopperOpen={isPopperOpen}
                  highlight={highlight}
                  removeHighlights={removeHighlights}
                  handleCancelSpeak={handleCancelSpeak}
                  handleSpeak={handleSpeak}
                  setIsPopperOpen={setIsPopperOpen}
                />
                <div>
                  <div
                    onMouseUp={update}
                    onKeyDown={update}
                    onInput={update}
                    className="text-base leading-tight text-gray-700 dark:text-gray-300"
                  >
                    <Heading.H1 fontSize={size[fontSize]} example>
                      H1 Título
                    </Heading.H1>
                    <Heading.H2 fontSize={size[fontSize]} example>
                      H2 Título
                    </Heading.H2>
                    <Heading.H3 fontSize={size[fontSize]} example>
                      H3 Título
                    </Heading.H3>
                    <Paragraph fontSize={size[fontSize]} example>
                      Digitaliza la gestión completa de tu clínica.
                    </Paragraph>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <AccessibilityButton
                      onClick={() => setVisualDisease("tritanopia")}
                      isActive={visualDisease === "tritanopia"}
                      label="Tritanopia"
                      iconName="visibility"
                    />
                    <AccessibilityButton
                      onClick={() =>
                        setVisualDisease("deuteranopia/protanopia")
                      }
                      isActive={visualDisease === "deuteranopia/protanopia"}
                      label="Protanopia o Deuteranopia"
                      iconName="visibility"
                    />
                    <AccessibilityButton
                      onClick={() => setVisualDisease("healthy-vision")}
                      isActive={visualDisease === "healthy-vision"}
                      label="Visión normal"
                      iconName="visibility"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <AccessibilityButton2
              type="submit"
              variant="primary"
              size="large"
              // onClick={handleSaveSettings}
            >
              Guardar configuración
            </AccessibilityButton2>
          </div>
        </form>
      ) : (
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
                          setTheme(currentTheme === "dark" ? "light" : "dark")
                        }}
                        label="Modo oscuro"
                        iconName="dark_mode"
                      />
                      <AccessibilityButton
                        isActive={isTextToSpeech}
                        onClick={() => setIsTextToSpeech(!isTextToSpeech)}
                        label="Texto a voz"
                        iconName="volume_up"
                      />
                      <AccessibilityButton
                        isActive={isHighlighted}
                        onClick={() => setIsHighlighted(!isHighlighted)}
                        label="Texto resaltado"
                        iconName="highlight"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 px-8">
                  <AccessibilityTooltip
                    rangeRef={rangeRef}
                    isHighlighted={isHighlighted}
                    isTextToSpeech={isTextToSpeech}
                    isSpeaking={isSpeaking}
                    textToRead={textToRead}
                    isPopperOpen={isPopperOpen}
                    highlight={highlight}
                    removeHighlights={removeHighlights}
                    handleCancelSpeak={handleCancelSpeak}
                    handleSpeak={handleSpeak}
                    setIsPopperOpen={setIsPopperOpen}
                  />
                  <div>
                    <div
                      onMouseUp={update}
                      onKeyDown={update}
                      onInput={update}
                      className="text-base leading-tight text-gray-700 dark:text-gray-300"
                    >
                      <Heading.H1 fontSize={size[fontSize]} example>
                        H1 Título
                      </Heading.H1>
                      <Heading.H2 fontSize={size[fontSize]} example>
                        H2 Título
                      </Heading.H2>
                      <Heading.H3 fontSize={size[fontSize]} example>
                        H3 Título
                      </Heading.H3>
                      <Paragraph fontSize={size[fontSize]} example>
                        Digitaliza la gestión completa de tu clínica.
                      </Paragraph>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-8">
                      <AccessibilityButton
                        onClick={() => setVisualDisease("tritanopia")}
                        isActive={visualDisease === "tritanopia"}
                        label="Tritanopia"
                        iconName="visibility"
                      />
                      <AccessibilityButton
                        onClick={() =>
                          setVisualDisease("deuteranopia/protanopia")
                        }
                        isActive={visualDisease === "deuteranopia/protanopia"}
                        label="Protanopia o Deuteranopia"
                        iconName="visibility"
                      />
                      <AccessibilityButton
                        onClick={() => setVisualDisease("healthy-vision")}
                        isActive={visualDisease === "healthy-vision"}
                        label="Visión normal"
                        iconName="visibility"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <AccessibilityButton2
                type="submit"
                variant="primary"
                size="large"
                // onClick={handleSaveSettings}
              >
                Guardar configuración
              </AccessibilityButton2>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
