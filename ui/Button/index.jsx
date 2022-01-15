const styles = {
  base: "transition rounded-lg",
  primary:
    "bg-sky-500 text-white shadow-lg hover:shadow-sky-800/50 shadow-sky-500/40  hover:bg-sky-700",
  outline_primary:
    "border-2 border-sky-500 text-sky-500 shadow-lg hover:shadow-sky-700/20 hover:bg-sky-100 shadow-sky-500/20",
  secondary:
    "bg-emerald-500 text-white shadow-lg hover:shadow-emerald-800/50 shadow-emerald-500/40 hover:bg-emerald-700",
  tertiary:
    "bg-pink-500 text-white shadow-lg hover:shadow-pink-800/50 shadow-pink-500/40 hover:bg-pink-700",
  quaternary:
    "bg-orange-500 text-white shadow-lg hover:shadow-orange-800/50 shadow-orange-500/40 hover:bg-orange-700",
  danger:
    "bg-rose-500 text-white shadow-lg hover:shadow-rose-800/50 shadow-rose-500/40 hover:bg-rose-700",
}

const sizing = {
  small: "text-sm font-medium py-1 px-2",
  medium: "text-base font-semibold py-2 px-4",
  large: "text-lg font-bold py-3 px-6",
}

export default function Button({
  children,
  className,
  disabled = false,
  type = "submit",
  variant = "primary",
  size = "medium",
  onClick,
  ...rest
}) {
  return (
    <button
      className={`${styles.base} ${sizing[size]} ${styles[variant]} ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
