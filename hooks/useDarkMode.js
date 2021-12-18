import { useState, useEffect } from "react"

// using localStorage to store the dark mode state
export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true)
    }
  }, [])

  function toggleDarkMode(e) {
    e.preventDefault()
    if (darkMode) {
      localStorage.setItem("theme", "light")
    } else {
      localStorage.setItem("theme", "dark")
    }
    setDarkMode(!darkMode)
  }

  return { darkMode, toggleDarkMode }
}
