import { useState } from "react"

export const useTextToSpeech = () => {
  const [isTextToSpeech, setIsTextToSpeech] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleSpeak = (text) => {
    const speech = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(speech)
    setIsSpeaking(true)
    speech.onend = () => {
      setIsSpeaking(false)
    }
  }

  const handleCancelSpeak = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return {
    isTextToSpeech,
    setIsTextToSpeech,
    handleSpeak,
    handleCancelSpeak,
    isSpeaking,
  }
}
