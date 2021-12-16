import { useState } from "react"
import { Switch } from "@headlessui/react"

export default function Toggle({ isActive, name }) {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex items-center justify-center">
      <Switch
        as="div"
        checked={enabled}
        onChange={setEnabled}
        className={`${
          isActive ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span className="sr-only">{name}</span>
        <span
          className={`${
            isActive ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
    </div>
  )
}
