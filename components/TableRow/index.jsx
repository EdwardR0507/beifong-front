import Headers from "components/Headers"
import Image from "next/image"
import Span from "ui/Accessibility/Span"
import Button from "ui/Button"

export default function TableRow({
  type,
  data,
  headerType,
  gridTemplateMDContent,
}) {
  const renderContent = () => {
    switch (type) {
      case "Pacientes":
        return (
          <>
            <Span className="flex items-center justify-end h-16 px-4 text-right break-words border-b md:text-left md:justify-center md:h-20 md:border-none">
              {data?.name}
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 border-b md:justify-center md:h-20 md:border-none">
              {data?.email}
            </Span>
          </>
        )
      case "Clínicas":
        return (
          <>
            <Span className="flex items-center justify-end h-16 px-4 text-right break-words border-b md:text-left md:justify-center md:h-20 md:border-none">
              {data?.name}
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 border-b md:justify-center md:h-20 md:border-none">
              {data?.direction}
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
              {data?.telephone}
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
              {data?.email}
            </Span>
          </>
        )
      case "Médicos":
        return (
          <>
            <Span className="flex items-center justify-end h-16 px-4 text-right break-words border-b md:text-center md:justify-center md:h-20 md:border-none ">
              <Image
                src={data?.img}
                className="rounded-full"
                width={50}
                height={50}
              />
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 text-right break-words border-b md:text-center md:justify-center md:h-20 md:border-none">
              {data?.name}
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 text-right break-words border-b md:text-center md:justify-center md:h-20 md:border-none">
              {data?.surname}
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
              {data?.specialty}
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
              {data?.attentionCost}
            </Span>
            <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
              {data?.email}
            </Span>
          </>
        )
      default:
        return null
    }
  }
  return (
    <section className="grid grid-cols-2 mt-8 rounded md:mt-0 md:grid-cols-1">
      <Headers.Mobile headers={headerType} />
      <div
        className={`grid text-sm bg-gray-100 dark:bg-gray-700 md:border-b ${gridTemplateMDContent} `}
      >
        {renderContent()}
        <div className="flex items-center justify-end h-16 pr-4 border-b md:flex-col md:justify-center md:h-20 md:border-none">
          <Button variant="primary" className="flex" onClick={() => {}}>
            <span className="material-icons">edit</span>
            <Span className="ml-2">Editar</Span>
          </Button>
        </div>
      </div>
    </section>
  )
}
