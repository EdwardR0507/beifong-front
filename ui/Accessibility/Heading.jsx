import useUser from "hooks/useUser"

const sizeH1 = {
  xs: "text-xl",
  sm: "text-2xl",
  base: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
}

const sizeH2 = {
  xs: "text-lg",
  sm: "text-xl",
  base: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
}

const sizeH3 = {
  xs: "text-base",
  sm: "text-lg",
  base: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
}

function H1({ className, fontSize = "base", example, children }) {
  const { accessibility } = useUser()
  const fontStyles = example
    ? sizeH1[fontSize]
    : sizeH1[accessibility?.fontSize]

  return <h1 className={`font-bold ${className} ${fontStyles}`}>{children}</h1>
}

function H2({ className, fontSize = "base", example, children }) {
  const { accessibility } = useUser()
  const fontStyles = example
    ? sizeH2[fontSize]
    : sizeH2[accessibility?.fontSize]

  return <h2 className={`font-bold ${className} ${fontStyles}`}>{children}</h2>
}

function H3({ className, fontSize = "base", example, children }) {
  const { accessibility } = useUser()
  const fontStyles = example
    ? sizeH3[fontSize]
    : sizeH3[accessibility?.fontSize]

  return <h3 className={`font-bold ${className} ${fontStyles}`}>{children}</h3>
}

export default {
  H1,
  H2,
  H3,
}
