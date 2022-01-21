import Image from "next/image"
import Github from "ui/Github"
import Linkedin from "ui/Linkedin"

const names = {
  arian: "Arian Zambrano",
  edward: "Edward Ramos",
  leonardo: "Leonardo Torres",
  elian: "Elian Gómez",
  railly: "Railly Hugo",
  default: "Daniel Cifuentes",
}

const linkedin = {
  arian: "https://www.linkedin.com/in/arian-zambrano-b8a8b8a4/",
  edward: "https://www.linkedin.com/in/edward-ramos-b8a8b8a4/",
  leonardo: "https://www.linkedin.com/in/leonardotorresdev/",
  elian: "https://www.linkedin.com/in/elian-g%C3%B3mez-b8a8b8a4/",
  railly: "https://www.linkedin.com/in/railly-hugo/",
  default: "https://www.linkedin.com/in/daniel-cifuentes-b8a8b8a4/",
}

const github = {
  arian: "https://github.com/ArianZambrano",
  edward: "https://github.com/EdwardR0507",
  leonardo: "https://github.com/LTSpark",
  elian: "https://github.com/EGH2019",
  railly: "https://github.com/Railly",
  default: "https://github.com/daercimi ",
}

const description = {
  arian: "Desarrollador Frontend",
  edward: "Desarrollador Frontend",
  leonardo: "Desarrollador Backend",
  railly: "Desarrollador Frontend",
  default: "Desarrollador Backend",
  elian: "Scrum Master",
}

export default function AboutUsCard({ fileImage }) {
  return (
    <article className="py-4 m-4 text-gray-700 bg-white rounded-lg shadow-lg dark:text-white dark:bg-gray-800 dark:shadow-white/20">
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
        <p className="mt-4 text-lg text-center">
          {description[fileImage.split(".")[0]]}
        </p>
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="flex items-center justify-center mt-4">
            <Linkedin width={32} height={32} />
            <a
              href={linkedin[fileImage.split(".")[0]]}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-lg font-semibold transition hover:text-sky-500"
            >
              Linkedin
            </a>
          </div>
          <div className="flex items-center justify-center mt-4">
            <Github width={32} height={32} />
            <a
              href={github[fileImage.split(".")[0]]}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-lg font-semibold transition hover:text-sky-500"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
