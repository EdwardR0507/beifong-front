export default function Toggle({ isActive, name }) {
  return (
    <div className="flex items-center justify-center">
      <input type="checkbox" name={name} className="hidden" />
      <label
        className="relative flex w-12 h-6 cursor-pointer select-none"
        htmlFor="toggle"
      >
        <span
          className={`absolute left-0 top-0 h-full w-full rounded-full transition-colors duration-300 ${
            isActive ? "bg-sky-500" : "bg-gray-400"
          }`}
        ></span>
        <span
          className={`h-6 w-6 border-2 absolute z-10 rounded-full bg-white transition-transform duration-300 ease-in-out flex justify-center items-center border-gray-100 ${
            isActive && "transform translate-x-full"
          }`}
        ></span>
      </label>
    </div>
  )
}
