export default function PageLink({
  callback,
  children,
  isActive,
  isDisabled = false,
}) {
  return (
    <li
      className={`flex border bg-white border-gray-300 py-1 px-3 text-desk select-none cursor-pointer ${
        isActive ? "block bg-sky-500 text-white" : "text-gray-700"
      }
      ${isDisabled && "opacity-50 select-none cursor-not-allowed"}
      `}
      onClick={isDisabled ? () => {} : callback}
    >
      {children}
    </li>
  )
}
