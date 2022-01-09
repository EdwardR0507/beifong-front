import ClinicRow from "components/ClinicRow"
import Headers from "components/Headers"
import Pagination from "components/Pagination"
import SearchBar from "components/SearchBar"
import { useState } from "react"
import Logo from "ui/Logo"
import { clinicHeaders, fakeClinicData } from "utils/constants"

export default function PatientApp({ updateTooltip }) {
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentClinics, setCurrentClinics] = useState(fakeClinicData)

  const handlePageChange = (data) => {
    const { currentPage, totalPages, pageLimit } = data
    const offset = (currentPage - 1) * pageLimit
    const _currentClinics = fakeClinicData.slice(offset, offset + pageLimit)
    console.log(currentClinics)
    console.log(_currentClinics)
    setTotalPages(totalPages)
    setCurrentPage(currentPage)
    setCurrentClinics(_currentClinics)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
      <header className="flex items-center w-full pt-4 text-xl max-h-24">
        <Logo />
        <h1 className="ml-10 text-2xl text-center md:text-3xl">
          Ver Clínicas - Página {currentPage} de {totalPages}
        </h1>
      </header>
      <main className="flex flex-col flex-1 w-full font-semibold bg-sky-50 dark:bg-gray-800">
        <section
          onMouseUp={updateTooltip}
          onKeyDown={updateTooltip}
          onInput={updateTooltip}
          className="mx-4 rounded-lg md:pt-2"
        >
          <SearchBar
            handleSearch={(data) => {
              console.log(data)
              const filteredData = fakeClinicData.filter((clinic) =>
                clinic.name.toLowerCase().includes(data.search.toLowerCase())
              )
              console.log(filteredData)
              setCurrentClinics(filteredData)
            }}
          />
          <Headers.Desktop gridTemplate="grid-cols-5" headers={clinicHeaders} />
          {currentClinics.map((clinic) => (
            <ClinicRow key={clinic.id} data={clinic} />
          ))}
        </section>
        <section>
          <Pagination
            totalRecords={fakeClinicData.length}
            pageLimit={6}
            pageNeighbours={1}
            onPageChanged={handlePageChange}
          />
        </section>
      </main>
    </div>
  )
}
