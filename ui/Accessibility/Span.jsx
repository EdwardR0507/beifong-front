const size = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

export default function Span({ className, fontSize, children }) {
  return (
    <span className={`font-medium ${className} ${size[fontSize]}`}>
      {children}
    </span>
  )
}
