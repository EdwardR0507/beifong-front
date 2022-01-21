import Headers from "components/Headers"
import Image from "next/image"
import Span from "ui/Accessibility/Span"
import Button from "ui/Button"
import { medicHeaders } from "utils/constants"

export default function MedicRow({ data: medic }) {
  console.log("medic:", medic)
  const isVerified = medic?.verified

  return (
    <section className="grid grid-cols-2 mt-8 rounded md:mt-0 md:grid-cols-1">
      <Headers.Mobile headers={medicHeaders} />
      <div className="grid text-sm text-right bg-gray-100 dark:bg-gray-700 md:border-b md:grid-cols-7 md:text-center">
        <Span className="flex items-center justify-end h-16 px-4 text-right break-words border-b md:text-center md:justify-center md:h-20 md:border-none ">
          <Image
            src={medic?.img}
            className="rounded-full"
            width={50}
            height={50}
          />
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-words border-b md:text-left md:justify-center md:h-20 md:border-none">
          {medic?.name}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 border-b md:justify-center md:h-20 md:border-none">
          {medic?.surname}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {medic?.specialty}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {medic?.attentionCost}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {medic?.email}
        </Span>
        <div className="flex items-center justify-end h-16 pr-4 border-b md:flex-col md:justify-center md:h-20 md:border-none">
          <Button
            variant={isVerified ? "secondary" : "danger"}
            className="flex"
            onClick={() => {}}
          >
            <span className="material-icons">
              {isVerified ? "check" : "close"}
            </span>
            <Span className="ml-2">
              {isVerified ? "Verificado" : "No verificado"}
            </Span>
          </Button>
        </div>
      </div>
    </section>
  )
}
