import { ChangeEvent, FC } from 'react'

import clsx from 'clsx'

import { Button } from '@/components/ui/button/button'
import { CardsView, TableView } from '@/components/ui/icons'
import { Input } from '@/components/ui/input/input'

import styles from './search.module.css'

interface SearchBarProps {
  searchQuery: string
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSwitchView: (view: 'table' | 'cards') => void
  handleAddProduct: () => void
  viewMode: 'table' | 'cards'
}

export const SearchBar: FC<SearchBarProps> = ({
  searchQuery,
  handleSearchChange,
  handleSwitchView,
  handleAddProduct,
  viewMode,
}) => {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputContainer}>
        <Input
          autoFocus
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.input}
        />
      </div>

      <div className={styles.viewSwitchContainer}>
        <div className="flex mr-6">
          <button
            onClick={() => handleSwitchView('table')}
            className={clsx(styles.viewSwitchButton, {
              [styles.viewSwitchButtonTableActive]: viewMode === 'table',
              [styles.viewSwitchButtonTableInactive]: viewMode !== 'table',
            })}
          >
            <TableView />
          </button>
          <button
            onClick={() => handleSwitchView('cards')}
            className={clsx(styles.viewSwitchButton, {
              [styles.viewSwitchButtonCardsActive]: viewMode === 'cards',
              [styles.viewSwitchButtonCardsInactive]: viewMode !== 'cards',
            })}
          >
            <CardsView />
          </button>
        </div>

        <Button onClick={handleAddProduct}>Добавить</Button>
      </div>
    </div>
  )
}
