import { FC } from 'react'

import styles from './pagination.module.css'

interface PaginationProps {
  page: number
  totalPages: number
  handlePreviousPage: () => void
  handleNextPage: () => void
  handlePageClick: (pageNumber: number) => void
}

const generatePaginationItems = (currentPage: number, totalPages: number, delta: number = 2) => {
  const range = []
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i)
  }

  if (currentPage - delta > 2) {
    range.unshift('...')
  }
  if (currentPage + delta < totalPages - 1) {
    range.push('...')
  }

  range.unshift(1)
  if (totalPages > 1) {
    range.push(totalPages)
  }

  return range
}

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
}) => {
  const paginationItems = generatePaginationItems(page, totalPages)

  return (
    <div className={styles.paginationContainer}>
      <button className={styles.paginationButton} onClick={handlePreviousPage} disabled={page <= 1}>
        &laquo;
      </button>
      {paginationItems.map((item, index) =>
        typeof item === 'number' ? (
          <button
            key={index}
            className={`${styles.paginationButton} ${page === item ? styles.activePage : ''}`}
            onClick={() => handlePageClick(item)}
          >
            {item}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {item}
          </span>
        )
      )}
      <button
        className={styles.paginationButton}
        onClick={handleNextPage}
        disabled={page >= totalPages}
      >
        &raquo;
      </button>
    </div>
  )
}
