const styles = {
  base: "w-full py-3 mt-4 text-base font-bold text-white transition rounded-lg",
  primary:
    "bg-sky-500 shadow-lg hover:shadow-sky-800/50 shadow-sky-500/40  hover:bg-sky-700",
  secondary:
    "bg-emerald-500 shadow-lg hover:shadow-emerald-800/50 shadow-emerald-500/40 hover:bg-emerald-700",
  tertiary:
    "bg-pink-500 shadow-lg hover:shadow-pink-800/50 shadow-pink-500/40 hover:bg-pink-700",
  danger:
    "bg-rose-500 shadow-lg hover:shadow-rose-800/50 shadow-rose-500/40 hover:bg-rose-700",
}

export default function Button({
  children,
  className,
  disabled = false,
  type = "submit",
  variant = "primary",
  onClick,
  ...rest
}) {
  return (
    <button
      className={`${styles.base} ${styles[variant]} ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
