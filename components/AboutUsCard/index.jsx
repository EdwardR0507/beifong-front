import Image from "next/image"

const names = {
  arian: "Arian Zambrano",
  edward: "Edward Ramos",
  leonardo: "Leonardo Torres",
  elian: "Elian Gómez",
  railly: "Railly Hugo",
  default: "Daniel Cifuentes",
}

export default function AboutUsCard({
  fileImage,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam",
}) {
  return (
    <article className="m-4 text-gray-700 bg-white rounded-lg shadow-lg dark:text-white dark:bg-gray-800 dark:shadow-white/20">
      <div className="flex flex-col items-center justify-center">
        <span className="my-4 text-lg font-bold">
          {names[fileImage.split(".")[0]]}
        </span>
        <div>
          <Image
            className="rounded-full"
            src={`/images/${fileImage}`}
            width={100}
            height={100}
            alt="Arian"
          />
        </div>
      </div>
      <p className="mt-4 text-lg text-center">{description}</p>
    </article>
  )
}
