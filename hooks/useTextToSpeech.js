import { useState } from "react"

export const useTextToSpeech = () => {
  const [isTextToSpeech, setIsTextToSpeech] = useState(false)

  const handleSpeak = (text) => {
    const speech = new SpeechSynthesisUtterance(text)
    !isTextToSpeech ? speechSynthesis.speak(speech) : speechSynthesis.cancel()
    setIsTextToSpeech(!isTextToSpeech)
  }
  return { isTextToSpeech, setIsTextToSpeech, handleSpeak }
}
