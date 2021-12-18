import AccessibilityButton from "components/AccessibilityButton"
import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { useTextToSpeech } from "hooks/useTextToSpeech"

export default function Calculadora() {
  const [isMounted, setIsMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [fontSizePer, setFontSizePer] = useState(1);
  console.log(isDarkMode)

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

  const handleFontSizeChange = (evt) =>{
    let perctentage = evt.target.value/20;
    setFontSizePer(perctentage);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="w-full max-w-3xl">
        <div className="pb-8 bg-white rounded shadow-md">
          <div className="mb-4">
            <h1 className="px-2 py-4 text-2xl font-bold text-center text-white bg-gray-800">
              Calculadora de accesibilidad
            </h1>
          </div>
          <div className="flex">
            <div className="flex mb-4">
              <div className="flex flex-col flex-1 px-8">
                <div className="mb-4 text-base text-gray-700">
                  <span className="text-lg font-bold">
                    Ajustes de la fuente
                  </span>
                  <br />
                  <span className="font-semibold text-gray-500">
                    Selecciona el tamaño de la fuente
                  </span>
                  <div className="flex mt-2">
                    <p className="text-lg font-bold text-gray-700">10%</p>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      defaultValue="20"
                      className="w-full mx-4"
                      step="5"
                      onChange={handleFontSizeChange}
                    />
                    <p className="text-lg font-bold text-gray-700">50%</p>
                  </div>
                </div>
                <div className="text-base text-gray-700">
                  <span className="text-lg font-bold">Ajustes de estilos</span>
                  <br />
                  <span className="font-semibold text-gray-500">
                    Selecciona los estilos
                  </span>
                  <div className="grid grid-cols-2 gap-6 mt-2">
                    {renderThemeChanger()}
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
              <div className="flex flex-1 px-8">
                <div className="text-base text-gray-700  leading-tight">
                  <h1 className="font-bold" 
                      style={{fontSize: `${(fontSizePer*1.5).toString()}rem`, 
                              margin: `${(fontSizePer*.75).toString()}rem 0`}}>
                    H1 Título
                  </h1>
                  <h2 className="font-bold" 
                      style={{fontSize: `${(fontSizePer*1.25).toString()}rem`, 
                              margin: `${(fontSizePer*.75).toString()}rem 0`}}>
                    H2 Título
                  </h2>
                  <h3 className="font-bold" 
                      style={{fontSize: `${(fontSizePer*1.125).toString()}rem`, 
                              margin: `${(fontSizePer*.75).toString()}rem 0`}}>
                    H3 Título
                  </h3>
                  <p className="font-bold" 
                      style={{fontSize: `${(fontSizePer*.875).toString()}rem`, 
                              margin: `${(fontSizePer*.75).toString()}rem 0`}} ref={textRef}>
                    Digitaliza la gestión completa de tu clínica. Páginas de
                    presentación, sistema de citas, de planes personalizados y
                    mucho más.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
