import React from 'react'
import { CommonInput } from './CommonInput'

const SearchInput = ({searchValue, setSearchValue, handleSearch}) => {
  return (
    <div className='flex flex-col lg:flex-row h-full items-end gap-2 w-full'>
      <CommonInput 
        label={'Search:'}
        placeholder={'Search item by title'}
        value={searchValue}
        type='search'
        onchange={setSearchValue}
      />
      <button 
        onClick={handleSearch}
        className={`bg-blue-500 active:bg-blue-200 text-white text-lg font-bold py-2 rounded-xl px-3 h-2/3 mb-2`}
      >
        Search
      </button>
    </div>
  )
}

export default SearchInput