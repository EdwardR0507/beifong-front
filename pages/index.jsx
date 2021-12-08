import AccessibilityButton from "components/AccessibilityButton"
import { useState } from "react"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isTextToSpeech, setIsTextToSpeech] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)
  console.log(isDarkMode)

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
                    <AccessibilityButton
                      isActive={isDarkMode}
                      onClick={() => setIsDarkMode(!isDarkMode)}
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
                <div className="text-base text-gray-700">
                  <h1 className="text-2xl font-bold">H1 Título</h1>
                  <h2 className="text-xl font-bold">H2 Título</h2>
                  <h3 className="text-lg font-bold">H3 Título</h3>
                  <p className="text-sm font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam consectetur ipsum id ligula tincidunt, ut hendrerit
                    libero commodo. Suspendisse malesuada quam ac tempor
                    lacinia. Vestibulum varius sed nulla sit amet tempus. Donec
                    vehicula rhoncus dapibus. Etiam ultrices ac urna non
                    molestie. Quisque porta condimentum ligula eget tincidunt.
                    Sed vel erat turpis. Nullam feugiat luctus nibh vel
                    malesuada. In hac habitasse platea dictumst. Integer quis
                    fermentum nisi, non convallis tortor. Fusce sed justo purus.
                    Phasellus accumsan auctor laoreet. Aliquam sollicitudin
                    suscipit libero in hendrerit. Morbi eget risus quam.
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
