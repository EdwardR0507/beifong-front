export default function TextInput({ register, name, type = "text", label }) {
  return (
    <div className="w-full px-3 mb-2">
      <label
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
        htmlFor="grid-first-name"
      >
        {label}
      </label>
      <input
        className="block w-full px-4 py-3 mt-2 mb-3 text-base leading-tight text-gray-700 transition rounded appearance-none ring-gray-200 ring-2 focus:ring-sky-400 focus:outline-none focus:bg-white"
        id={name}
        type={type}
        name={name}
        placeholder={label}
        {...register(name)}
      />
    </div>
  )
}
