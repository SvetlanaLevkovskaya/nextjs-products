import { FC } from 'react'

import { Button } from '@/components/ui/button/button'

import styles from './pagination.module.css'

import { getPaginationItems } from '@/lib/utils/getPaginationItems'

interface PaginationProps {
  page: number
  totalPages: number
  handlePreviousPage: () => void
  handleNextPage: () => void
  handlePageClick: (pageNumber: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
}) => {
  const paginationItems = getPaginationItems(page, totalPages)

  return (
    <div className={styles.paginationContainer}>
      <Button variant="pagination" onClick={handlePreviousPage} disabled={page <= 1}>
        &laquo;
      </Button>
      {paginationItems.map((item, index) =>
        typeof item === 'number' ? (
          <Button
            key={index}
            variant="pagination"
            className={`${page === item ? styles.activePage : ''}`}
            onClick={() => handlePageClick(item)}
          >
            {item}
          </Button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {item}
          </span>
        )
      )}
      <Button variant="pagination" onClick={handleNextPage} disabled={page >= totalPages}>
        &raquo;
      </Button>
    </div>
  )
}
