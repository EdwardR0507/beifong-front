import { useState } from "react"

export default function TextInput({
  register,
  name,
  type = "text",
  min,
  max,
  label,
  placeholder,
  errors,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [typeInput, setTypeInput] = useState(type)

  return (
    <div className="w-full px-3 mb-3">
      <div className="grid grid-cols-2 mb-2">
        <label
          className="flex items-center py-2 text-xs font-bold text-gray-700 uppercase select-none dark:text-gray-100"
          htmlFor="grid-first-name"
        >
          {label}
        </label>
        {errors && (
          <span className="flex items-center justify-center px-2 text-sm font-medium text-center rounded select-none bg-rose-100 text-rose-600 dark:bg-rose-800 dark:text-gray-100">
            {errors.message}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          className="block w-full px-4 py-3 mt-2 text-base leading-tight text-gray-700 transition rounded appearance-none dark:bg-gray-600 ring-gray-300 ring-2 focus:ring-sky-400 dark:ring-gray-400 focus:outline-none focus:bg-white dark:focus:ring-sky-600 dark:focus:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
          id={name}
          type={typeInput}
          name={name}
          min={min}
          max={max}
          placeholder={placeholder || label}
          {...register(name)}
        />
        {type === "credit_card" && (
          <span className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 pointer-events-none material-icons dark:text-gray-100">
            credit_card
          </span>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => {
              setIsVisible(!isVisible)
              setTypeInput(typeInput === "password" ? "text" : "password")
            }}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-100"
          >
            <span className="material-icons">
              {isVisible ? "visibility" : "visibility_off"}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
