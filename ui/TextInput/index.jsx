export default function TextInput({
  register,
  name,
  type = "text",
  label,
  errors,
}) {
  return (
    <div className="w-full px-3 mb-4">
      <div className="grid grid-cols-2 mb-2">
        <label
          className="flex items-center py-2 text-xs font-bold text-gray-700 uppercase select-none"
          htmlFor="grid-first-name"
        >
          {label}
        </label>
        {errors && (
          <span className="flex items-center justify-center px-2 text-sm font-medium text-center rounded select-none bg-rose-100 text-rose-600 ">
            {errors.message}
          </span>
        )}
      </div>
      <input
        className="block w-full px-4 py-3 mt-2 text-base leading-tight text-gray-700 transition rounded appearance-none ring-gray-200 ring-2 focus:ring-sky-400 focus:outline-none focus:bg-white"
        id={name}
        type={type}
        name={name}
        placeholder={label}
        {...register(name)}
      />
    </div>
  )
}
