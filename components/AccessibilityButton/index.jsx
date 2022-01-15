import Toggle from "ui/Toggle"

export default function AccessibilityButton({
  isActive,
  onClick,
  label,
  iconName,
  className = "",
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`text-gray-700 font-bold py-4 px-6 rounded border-8 flex flex-col shadow-lg items-center justify-between transition-colors duration-300 ${
          isActive
            ? "bg-sky-200 border-sky-500 dark:shadow-sky-500/50 shadow-sky-500/60"
            : "bg-gray-300 border-gray-400 dark:shadow-gray-400/50 shadow-gray-400/60"
        }${className}`}
      >
        <Toggle isActive={isActive} name={iconName} />
        <span className="text-md">{label}</span>
        <span className="material-icons">{iconName}</span>
      </button>
    </>
  )
}
