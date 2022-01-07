const size = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

export default function Paragraph({ className, fontSize, children, ...rest }) {
  return (
    <p className={`font-medium ${className} ${size[fontSize]}`} {...rest}>
      {children}
    </p>
  )
}
