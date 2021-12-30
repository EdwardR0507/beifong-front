export default function RadioInput({ label, register, name, options, errors }) {
  return (
    <div className="w-full px-3">
      <div className="grid grid-cols-2 mb-2">
        <label
          className="flex items-center py-2 text-xs font-bold text-gray-700 uppercase select-none dark:text-gray-100"
          htmlFor={name}
        >
          {label}
        </label>
        {errors && (
          <span className="flex items-center justify-center px-2 text-sm font-medium text-center rounded select-none bg-rose-100 text-rose-600 dark:bg-rose-800 dark:text-gray-100">
            {errors.message}
          </span>
        )}
      </div>
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            name={name}
            id={option.value}
            value={option.value}
            className="w-4 h-4 text-blue-500 transition duration-150 ease-in-out form-radio"
            {...register(name)}
          />
          <label
            className="ml-2 font-normal text-gray-700"
            htmlFor={option.value}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}
