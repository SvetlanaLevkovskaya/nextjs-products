import { ChangeEvent, FC } from 'react'

import { CardsView, TableView } from '@/components/ui/icons'

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
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center">
        <input
          autoFocus
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] w-[240px] rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none mr-4"
        />
      </div>

      <div className="flex items-center">
        <div className="flex">
          <button
            onClick={() => handleSwitchView('table')}
            className={`p-2 rounded-l-md ${viewMode === 'table' ? 'bg-gray-400' : 'bg-gray-200'}`}
          >
            <TableView />
          </button>
          <button
            onClick={() => handleSwitchView('cards')}
            className={`p-2 rounded-r-md ${viewMode === 'cards' ? 'bg-gray-400' : 'bg-gray-200'}`}
          >
            <CardsView />
          </button>
        </div>

        <button
          onClick={handleAddProduct}
          className="px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400 ml-4"
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
