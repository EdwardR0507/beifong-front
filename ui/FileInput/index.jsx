export default function FileInput({
  errors,
  register,
  label,
  name,
  fileWatch,
}) {
  return (
    <>
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
      </div>
      <div>
        <input
          className={`file:transition file:cursor-pointer file:mx-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-700 ${
            fileWatch?.length > 0 && "file:bg-red-500 file:hover:bg-red-700"
          }`}
          id={name}
          name={name}
          type="file"
          {...register(name)}
        />
      </div>
    </>
  )
}
