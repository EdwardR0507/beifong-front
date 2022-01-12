import useUser from "hooks/useUser"

const size = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

export default function Paragraph({
  className,
  fontSize,
  example,
  children,
  ...rest
}) {
  const { accessibility } = useUser()

  const fontStyles = example ? size[fontSize] : size[accessibility?.fontSize]

  return (
    <p className={`font-medium ${className} ${fontStyles}`} {...rest}>
      {children}
    </p>
  )
}
