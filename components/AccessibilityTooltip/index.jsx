import { useEffect, useState } from "react"
import { usePopper } from "react-popper"
import Button from "ui/Button"

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

export default function AccessibilityTooltip({
  isHighlighted,
  isTextToSpeech,
  highlight,
  removeHighlights,
  isSpeaking,
  handleSpeak,
  handleCancelSpeak,
  textToRead,
  rangeRef,
  isPopperOpen,
  setIsPopperOpen,
}) {
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)

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

  useEffect(() => {
    if (isHighlighted || isTextToSpeech) {
      if (rangeRef && typeof popperInstance.update === "function") {
        const asyncUpdate = async () => {
          await popperInstance.update()
        }
        rangeRef.rectChangedCallback = (rect) => {
          if (rect.width > 0) {
            virtualReference.getBoundingClientRect = () =>
              generateGetBoundingClientRect(rect)
            asyncUpdate()
          } else {
            setIsPopperOpen(false)
          }
        }
      }
    }
  })

  return (
    <>
      {isPopperOpen && (isHighlighted || isTextToSpeech) && (
        <div
          id="popper"
          ref={setPopperElement}
          style={popperInstance.styles.popper}
          role="tooltip"
          {...popperInstance.attributes.popper}
          className="flex px-4 py-2 text-gray-800 rounded-lg bg-amber-200 dark:bg-gray-400 dark:text-gray-200"
        >
          {isHighlighted && (
            <>
              <Button
                className="flex mr-4"
                type="button"
                onClick={() => highlight()}
              >
                <span className="mr-2">Resaltar</span>
                <span className="material-icons">highlight</span>
              </Button>
              <Button
                className="flex mr-4"
                variant="danger"
                type="button"
                onClick={() => removeHighlights()}
              >
                <span className="mr-2">Quitar resaltado</span>
                <span className="material-icons">highlight_off</span>
              </Button>
            </>
          )}
          {isTextToSpeech &&
            (!isSpeaking ? (
              <Button
                className="flex"
                variant="secondary"
                type="button"
                onClick={() => handleSpeak(textToRead)}
              >
                <span className="mr-2">Hablar</span>
                <span className="material-icons">volume_up</span>
              </Button>
            ) : (
              <Button
                className="flex"
                variant="danger"
                type="button"
                onClick={() => handleCancelSpeak()}
              >
                <span className="mr-2">Detener</span>
                <span className="material-icons">volume_off</span>
              </Button>
            ))}
          <div
            ref={setArrowElement}
            className="bg-amber-200 -z-10 dark:bg-gray-400 dark:text-gray-200"
            style={{
              ...popperInstance.styles.arrow,
              clipPath: "rect(0, 18px, 18px, -4px)",
              height: "14px",
              width: "14px",
              boxShadow: "rgb(117 117 117) 1px 1px 1px -1px",
              transform: `rotate(45deg) translate(${
                isHighlighted ? "155px" : "80px"
              }, ${isHighlighted ? "-100px" : "-23px"})`,
            }}
          ></div>
        </div>
      )}
    </>
  )
}
