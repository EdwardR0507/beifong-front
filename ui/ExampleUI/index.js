const sizing = {
  small: "p-18",
  medium: "p-36",
  large: "p-60",
}

function ExampleUIBox({ size = "medium" }) {
  return (
    <h1
      className={`max-w-2xl text-2xl font-bold text-gray-900 rounded shadow-lg bg-sky-200 dark:bg-sky-400 ${sizing[size]}`}
    >
      Muestra de UI
    </h1>
  )
}

function ExampleUIText() {
  return (
    <p className="max-w-md mt-8 text-lg font-medium text-white">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur orci sed cursus pharetra.
    </p>
  )
}

export default {
  Box: ExampleUIBox,
  Text: ExampleUIText,
}
