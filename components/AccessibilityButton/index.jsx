import Toggle from "ui/Toggle"

export default function AccessibilityButton({
  isActive,
  onClick,
  label,
  iconName,
}) {
  return (
    <button
      onClick={onClick}
      className={`text-gray-700 font-bold py-2 px-4 rounded border-8 flex flex-col items-center justify-center transition-colors duration-300 ${
        isActive ? "bg-sky-200 border-sky-500" : "bg-gray-300 border-gray-400"
      }`}
    >
      <Toggle isActive={isActive} name={iconName} />
      <span className="text-lg">{label}</span>
      <span className="material-icons">{iconName}</span>
    </button>
  )
}
