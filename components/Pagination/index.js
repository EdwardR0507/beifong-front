import React, { useEffect, useState } from "react"
import usePagination, { LEFT_PAGE, RIGHT_PAGE } from "hooks/usePagination"
import PageLink from "components/PageLink"
import router from "next/router"

export default function Pagination({
  totalRecords = null,
  pageLimit = 30,
  pageNeighbours = 0,
  onPageChanged = (f) => f,
  route = false,
  page,
}) {
  const totalPages = Math.ceil(totalRecords / pageLimit)
  const [currentPage, setCurrentPage] = useState(1)

  const gotoPage = (page) => {
    if (route) {
      const paginationData = {
        page,
        totalPages,
        pageLimit,
        totalRecords,
      }
      setCurrentPage(page)
      onPageChanged(paginationData)
      router.push(`${route}?page=${page}`)
    } else {
      const currentPage = Math.max(0, Math.min(page, totalPages))
      const paginationData = {
        currentPage,
        totalPages,
        pageLimit,
        totalRecords,
      }
      setCurrentPage(Math.max(0, Math.min(page, totalPages)))
      onPageChanged(paginationData)
    }
  }
  const {
    pages,
    handleMoveTo,
    handleMoveAfter,
    handleMoveBefore,
    handleMoveRight,
    handleMoveLeft,
  } = usePagination(pageNeighbours, totalPages, currentPage, gotoPage, route)

  useEffect(() => {
    if (!page) {
      gotoPage(1)
    } else {
      gotoPage(+page)
    }
  }, [])

  return (
    <nav className="py-6">
      <ul className="flex items-center justify-center w-full h-full">
        <PageLink callback={handleMoveBefore} isDisabled={currentPage === 1}>
          <span className="md:mr-2">&lt;</span>
          <span className="hidden text-gray-700 md:block">Anterior</span>
        </PageLink>
        {pages.map((_page, index) => {
          if (_page === LEFT_PAGE)
            return (
              <PageLink key={index} callback={handleMoveLeft}>
                {"..."}
              </PageLink>
            )

          if (_page === RIGHT_PAGE)
            return (
              <PageLink key={index} callback={handleMoveRight}>
                {"..."}
              </PageLink>
            )

          return (
            <PageLink
              key={index}
              callback={() => handleMoveTo(_page)}
              isActive={currentPage === _page}
            >
              {_page}
            </PageLink>
          )
        })}
        <PageLink
          callback={handleMoveAfter}
          isDisabled={currentPage === totalPages}
        >
          <span className="hidden text-gray-700 md:block">Siguiente</span>
          <span className="md:ml-2">&gt;</span>
        </PageLink>
      </ul>
    </nav>
  )
}
