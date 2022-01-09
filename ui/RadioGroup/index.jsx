import { useState } from "react"
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react"

const plans = [
  {
    name: "Izquierda",
  },
  {
    name: "Derecha",
  },
]

export default function RadioGroup({ options, setValue }) {
  const [selected, setSelected] = useState(plans[0])

  return (
    <div className="w-full px-3 py-4">
      <div className="w-full max-w-md mx-auto">
        <HeadlessRadioGroup
          value={selected}
          onChange={(value) => {
            setSelected(value)
            if (value.name === "Izquierda") {
              console.log("Izquierda")
              setValue("left")
            } else {
              console.log("Derecha")
              setValue("right")
            }
          }}
        >
          <HeadlessRadioGroup.Label className="sr-only">
            Server size
          </HeadlessRadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <HeadlessRadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${active ? "ring-2 ring-white ring-opacity-60" : ""}
                  ${
                    checked
                      ? "bg-sky-500 bg-opacity-80 text-white"
                      : "dark:bg-gray-600 bg-white"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <HeadlessRadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked
                                ? "text-white"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {plan.name}
                          </HeadlessRadioGroup.Label>
                          <HeadlessRadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          ></HeadlessRadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </HeadlessRadioGroup.Option>
            ))}
          </div>
        </HeadlessRadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
