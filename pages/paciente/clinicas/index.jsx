import ClinicRow from "components/ClinicRow"
import Headers from "components/Headers"
import { useRouter } from "next/router"
import Logo from "ui/Logo"
import { clinicHeaders, fakeClinicData } from "utils/constants"

export default function PatientApp({ updateTooltip }) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <header className="flex items-center w-full pt-4 text-xl max-h-24">
        <Logo />
      </header>
      <main className="flex flex-col flex-1 w-full font-semibold bg-sky-50 dark:bg-gray-800">
        <section
          onMouseUp={updateTooltip}
          onKeyDown={updateTooltip}
          onInput={updateTooltip}
          className="mx-4 rounded-lg md:pt-2 md:mt-2"
        >
          <Headers.Desktop gridTemplate="grid-cols-5" headers={clinicHeaders} />
          {fakeClinicData.map((clinic) => (
            <ClinicRow key={clinic.id} data={clinic} />
          ))}
        </section>
      </main>
    </div>
  )
}
