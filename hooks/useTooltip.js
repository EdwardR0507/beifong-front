import { useEffect, useState } from "react"
import RangeRef from "utils/rangeRef"
import rangy from "rangy"
import "rangy/lib/rangy-classapplier"
import "rangy/lib/rangy-highlighter"

export default function useTooltip(setIsPopperOpen, rangeRef, setRangeRef) {
  const [highlighter, setHighlighter] = useState(null)

  useEffect(() => {
    const _rangeRef = new RangeRef()
    setRangeRef(_rangeRef)
    rangy.init()
    const highlighter = rangy.createHighlighter()
    highlighter.addClassApplier(rangy.createClassApplier("bg-yellow-300"))
    setHighlighter(highlighter)
  }, [])

  function highlight() {
    highlighter.highlightSelection("bg-yellow-300")
    const selTxt = rangy.getSelection()
    console.log("selTxt: " + selTxt)
    rangy.getSelection().removeAllRanges()
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

  return {
    update,
    highlight,
    removeHighlights,
    textToRead:
      typeof rangy.getSelection === "function"
        ? rangy.getSelection().toString()
        : "",
  }
}
