import useUser from "hooks/useUser"
import { DEUTERANOPIA_PROTANOPIA, TRITANOPIA } from "utils/constants"

const styles = {
  base: "transition rounded-lg",
  primary:
    "bg-sky-500 text-white shadow-lg hover:shadow-sky-800/50 shadow-sky-500/40  hover:bg-sky-700",
  outline_primary:
    "border-2 border-sky-500 text-sky-500 shadow-lg hover:shadow-sky-700/20 hover:bg-sky-100 shadow-sky-500/20",
  secondary:
    "bg-emerald-500 text-white shadow-lg hover:shadow-emerald-800/50 shadow-emerald-500/40 hover:bg-emerald-700",
  tertiary:
    "bg-pink-500 text-white shadow-lg hover:shadow-pink-800/50 shadow-pink-500/40 hover:bg-pink-700 disabled:bg-pink-200",
  quaternary:
    "bg-orange-400 text-white shadow-lg hover:shadow-orange-700/50 shadow-orange-400/40 hover:bg-orange-600",
  danger:
    "bg-rose-500 text-white shadow-lg hover:shadow-rose-800/50 shadow-rose-500/40 hover:bg-rose-700",
}

const sizing = {
  small: "font-medium py-1 px-2",
  medium: "font-semibold py-2 px-4",
  large: "font-bold py-3 px-6",
}

const _fontSize = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const deuteranopiaProtanopia = {
  base: "transition rounded-lg",
  primary:
    "bg-sky-500 text-white shadow-lg hover:shadow-sky-800/50 shadow-sky-500/40  hover:bg-sky-700",
  outline_primary:
    "border-2 border-sky-500 text-sky-500 shadow-lg hover:shadow-sky-700/20 hover:bg-sky-100 shadow-sky-500/20",
  secondary:
    "bg-lime-500 text-white shadow-lg hover:shadow-lime-800/50 shadow-lime-500/40 hover:bg-lime-700",
  tertiary:
    "bg-pink-500 text-white shadow-lg hover:shadow-pink-800/50 shadow-pink-500/40 hover:bg-pink-700 disabled:bg-pink-300 disabled:hover:shadow-pink-500/40",
  quaternary:
    "bg-yellow-500 text-white shadow-lg hover:shadow-yellow-800/50 shadow-yellow-500/40 hover:bg-yellow-700",
  danger:
    "bg-orange-500 text-white shadow-lg hover:shadow-orange-800/50 shadow-orange-500/40 hover:bg-orange-700",
}

const tritanopia = {
  base: "transition rounded-lg",
  primary:
    "bg-indigo-500 text-white shadow-lg hover:shadow-indigo-800/50 shadow-indigo-500/40  hover:bg-indigo-700",
  outline_primary:
    "border-2 border-sky-500 text-sky-500 shadow-lg hover:shadow-sky-700/20 hover:bg-sky-100 shadow-sky-500/20",
  secondary:
    "bg-emerald-500 text-white shadow-lg hover:shadow-emerald-800/50 shadow-emerald-500/40 hover:bg-emerald-700",
  tertiary:
    "bg-pink-500 text-white shadow-lg hover:shadow-pink-800/50 shadow-pink-500/40 hover:bg-pink-700 disabled:bg-pink-300",
  quaternary:
    "bg-orange-400 text-white shadow-lg hover:shadow-orange-700/50 shadow-orange-400/40 hover:bg-orange-600",
  danger:
    "bg-rose-500 text-white shadow-lg hover:shadow-rose-800/50 shadow-rose-500/40 hover:bg-rose-700",
}

export default function AccessibilityButton({
  fontSize = "base",
  size = "medium",
  variant,
  className,
  children,
  onClick,
  type,
  disabled,
  ...rest
}) {
  const { accessibility } = useUser()

  return (
    <button
      className={`${styles.base} ${_fontSize[accessibility?.fontSize]} ${
        sizing[size]
      } ${
        accessibility?.visualDisease === DEUTERANOPIA_PROTANOPIA
          ? deuteranopiaProtanopia[variant]
          : accessibility?.visualDisease === TRITANOPIA
          ? tritanopia[variant]
          : styles[variant]
      } ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
