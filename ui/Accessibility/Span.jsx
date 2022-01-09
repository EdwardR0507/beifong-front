import useUser from "hooks/useUser"

const size = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

export default function Span({ className, fontSize, children }) {
  const { accessibility } = useUser()
  return (
    <span
      className={`font-medium ${className} ${size[accessibility?.fontSize]}`}
    >
      {children}
    </span>
  )
}
