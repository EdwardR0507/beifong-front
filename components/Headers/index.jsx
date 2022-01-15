const Desktop = ({ gridTemplate, headers }) => (
  <div
    className={`hidden h-full px-2 text-xs bg-white dark:bg-gray-700 border-b ${gridTemplate} place-items-center md:text-sm md:grid`}
  >
    {headers.map((header) => (
      <div key={header.id} className="p-2">
        <p className="grid text-gray-400 place-items-center text-center">
          {header.name}
        </p>
      </div>
    ))}
  </div>
)

const Mobile = ({ headers }) => (
  <div className="grid text-sm bg-white dark:bg-gray-700 md:text-desk md:hidden place-items-center">
    {headers.map((header) => (
      <div
        key={header.id}
        className="flex items-center w-full h-full pl-4 border-b"
      >
        <p className="text-gray-400 ">{header.name}</p>
      </div>
    ))}
  </div>
)

export default { Desktop, Mobile }
