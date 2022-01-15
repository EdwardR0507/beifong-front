import Headers from "components/Headers"
import { useRouter } from "next/router"
import Span from "ui/Accessibility/Span"
import Button from "ui/Button"
import { clinicHeaders } from "utils/constants"

export default function ClinicRow({ data: clinic }) {
  const router = useRouter()
  console.log(clinic)
  return (
    <section className="grid grid-cols-2 mt-8 rounded md:mt-0 md:grid-cols-1">
      <Headers.Mobile headers={clinicHeaders} />
      <div className="grid text-sm text-right bg-gray-100 dark:bg-gray-700 md:border-b md:grid-cols-5 md:text-center">
        <Span className="flex items-center justify-end h-16 px-4 break-words border-b md:text-left md:justify-center md:h-20 md:border-none">
          {clinic?.name}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 border-b md:justify-center md:h-20 md:border-none">
          {clinic?.direction}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {clinic?.telephone}
        </Span>
        <Span className="flex items-center justify-end h-16 px-4 break-all border-b md:justify-center md:h-20 md:border-none">
          {clinic?.email}
        </Span>
        <div className="flex items-center justify-end h-16 pr-4 border-b md:flex-col md:justify-center md:h-20 md:border-none">
          <Button
            variant="primary"
            className="flex"
            onClick={() =>
              router.push(`/paciente/clinicas/${clinic?.clinicId}`)
            }
          >
            <span className="material-icons">web</span>
            <Span className="ml-2">Ver Página</Span>
          </Button>
        </div>
      </div>
    </section>
  )
}
