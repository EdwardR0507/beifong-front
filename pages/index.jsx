import AccessibilityButton from "components/AccessibilityButton";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTextToSpeech, setIsTextToSpeech] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  console.log(isDarkMode);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow-md rounded pb-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-center text-white bg-gray-800 px-2 py-4">
              Calculadora de accesibilidad
            </h1>
          </div>
          <div className="flex">
            <div className="mb-4 flex">
              <div className="flex flex-1 flex-col px-8">
                <div className="text-gray-700 text-base mb-4">
                  <span className="font-bold text-lg">
                    Ajustes de la fuente
                  </span>
                  <br />
                  <span className="text-gray-500 font-semibold">
                    Selecciona el tamaño de la fuente
                  </span>
                  <div className="flex mt-2">
                    <p className="text-gray-700 text-lg font-bold">10%</p>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      defaultValue="20"
                      className="w-full mx-4"
                      step="5"
                    />
                    <p className="text-gray-700 text-lg font-bold">50%</p>
                  </div>
                </div>
                <div className="text-gray-700 text-base">
                  <span className="font-bold text-lg">Ajustes de estilos</span>
                  <br />
                  <span className="text-gray-500 font-semibold">
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
                <div className="text-gray-700 text-base">
                  <h1 className="font-bold text-2xl">H1 Título</h1>
                  <h2 className="font-bold text-xl">H2 Título</h2>
                  <h3 className="font-bold text-lg">H3 Título</h3>
                  <p className="font-bold text-sm">
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
  );
}
