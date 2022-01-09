export const LEFT_PAGE = "LEFT"
export const RIGHT_PAGE = "RIGHT"

const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

export default function usePagination(
  pageNeighbours,
  totalPages,
  currentPage,
  goToPage
) {
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  const handleMoveTo = (page) => {
    goToPage(page)
    scrollToTop()
  }

  const handleMoveBefore = () => {
    goToPage(currentPage - 1)
    scrollToTop()
  }

  const handleMoveAfter = () => {
    goToPage(currentPage + 1)
    scrollToTop()
  }

  const handleMoveLeft = () => {
    goToPage(currentPage - pageNeighbours * 2 - 1)
    scrollToTop()
  }

  const handleMoveRight = () => {
    goToPage(currentPage + pageNeighbours * 2 + 1)
    scrollToTop()
  }

  const fetchPages = () => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }

    return range(1, totalPages)
  }
  return {
    handleMoveTo,
    handleMoveBefore,
    handleMoveAfter,
    handleMoveLeft,
    handleMoveRight,
    pages: fetchPages(),
  }
}
