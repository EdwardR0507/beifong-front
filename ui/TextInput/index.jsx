export default function TextInput({
  register,
  name,
  type = "text",
  label,
  errors,
}) {
  return (
    <div className="w-full px-3">
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
      <input
        className="block w-full px-4 py-3 mt-2 text-base leading-tight text-gray-700 transition rounded appearance-none dark:bg-gray-600 ring-gray-300 ring-2 focus:ring-sky-400 dark:ring-gray-400 focus:outline-none focus:bg-white dark:focus:ring-sky-600 dark:focus:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
        id={name}
        type={type}
        name={name}
        placeholder={label}
        {...register(name)}
      />
    </div>
  )
}
