import Toggle from "ui/Toggle"

export default function AccessibilityButton({
  isActive,
  onClick,
  label,
  iconName,
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`text-gray-700 font-bold py-2 px-4 rounded border-8 flex flex-col shadow-lg items-center justify-between transition-colors duration-300 ${
          isActive
            ? "bg-sky-200 border-sky-500 dark:shadow-sky-500/50 shadow-sky-500/60"
            : "bg-gray-300 border-gray-400 dark:shadow-gray-400/50 shadow-gray-400/60"
        }`}
      >
        <Toggle isActive={isActive} name={iconName} />
        <span className="text-lg">{label}</span>
        <span className="material-icons">{iconName}</span>
      </button>
    </>
  )
}
