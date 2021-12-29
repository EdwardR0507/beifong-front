import AccessibilityTooltip from "components/AccessibilityTooltip"
import { UserContext } from "context/UserContext"
import { useTextToSpeech } from "hooks/useTextToSpeech"
import useTooltip from "hooks/useTooltip"
import { useContext, useState } from "react"

export default function AccessibilityLayout({
  component: Component,
  pageProps,
}) {
  const [rangeRef, setRangeRef] = useState(null)
  const [isPopperOpen, setIsPopperOpen] = useState(false)
  const { accessibility } = useContext(UserContext)

  const { update, highlight, removeHighlights, textToRead } = useTooltip(
    setIsPopperOpen,
    rangeRef,
    setRangeRef
  )

  const { handleSpeak, handleCancelSpeak, isSpeaking } = useTextToSpeech()
  return (
    <>
      <AccessibilityTooltip
        rangeRef={rangeRef}
        isHighlighted={accessibility?.highlightText}
        isTextToSpeech={accessibility?.textToVoice}
        isSpeaking={isSpeaking}
        textToRead={textToRead}
        isPopperOpen={isPopperOpen}
        highlight={highlight}
        removeHighlights={removeHighlights}
        handleCancelSpeak={handleCancelSpeak}
        handleSpeak={handleSpeak}
        setIsPopperOpen={setIsPopperOpen}
      />
      <Component {...pageProps} updateTooltip={update} />
    </>
  )
}
