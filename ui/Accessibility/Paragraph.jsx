import useUser from "hooks/useUser"

const size = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

export default function Paragraph({ className, fontSize, children, ...rest }) {
  const { accessibility } = useUser()
  return (
    <p
      className={`font-medium ${className} ${size[accessibility?.fontSize]}`}
      {...rest}
    >
      {children}
    </p>
  )
}
