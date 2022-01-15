import Headers from "components/Headers"
import Pagination from "components/Pagination"
import SearchBar from "components/SearchBar"
import { useState } from "react"
import Logo from "ui/Logo"
import PatientRow from "components/PatientRow"
import MedicRow from "components/MedicRow"
import ClinicRow from "components/ClinicRow"
import CitaRow from "components/CitaRow"
import CitaClinicaRow from "components/CitaClinicaRow"

export default function TableData({
  updateTooltip,
  type,
  data,
  gridTemplateHeader,
  headerType,
}) {
  console.log("data:", data)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentData, setCurrentData] = useState(data)

  const handlePageChange = (d) => {
    const { currentPage, totalPages, pageLimit } = d
    const offset = (currentPage - 1) * pageLimit
    const _currentData = data.slice(offset, offset + pageLimit)
    setTotalPages(totalPages)
    setCurrentPage(currentPage)
    setCurrentData(_currentData)
  }

  return (
    data && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-800">
        <header className="flex items-center w-full pt-4 text-xl max-h-24">
          <Logo />
          <h1 className="ml-10 text-2xl text-center md:text-3xl">
            Ver {type} - Página {currentPage} de {totalPages}
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
              handleSearch={(el) => {
                const filteredData = data.filter((element) =>
                  element.name.toLowerCase().includes(el.search.toLowerCase())
                )
                setCurrentData(filteredData)
              }}
            />
            <Headers.Desktop
              gridTemplate={`${gridTemplateHeader}`}
              headers={headerType}
            />
            {currentData.map((el) => {
              switch (type) {
                case "Pacientes":
                  return <PatientRow key={el.email} data={el} />
                case "Médicos":
                  return <MedicRow key={el.email} data={el} />
                case "Clínicas":
                  return <ClinicRow key={el.email} data={el} />
                case "Citas":
                  return <CitaRow key={el.email} data={el} />
                case "Citas de clínica":
                  return <CitaClinicaRow key={el.email} data={el} />
                default:
                  return null
              }
            })}
          </section>
          <section>
            <Pagination
              totalRecords={data.length}
              pageLimit={6}
              pageNeighbours={1}
              onPageChanged={handlePageChange}
            />
          </section>
        </main>
      </div>
    )
  )
}
