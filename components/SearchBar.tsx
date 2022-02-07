import { useState } from 'react'
import { useFiltersContext } from '../context/FiltersContext'
import { StarIcon } from './StarIcon'
import { HeartIcon } from './HeartIcon'

type Props = {
  resultsAmount: number
}

export const SearchBar = ({ resultsAmount }: Props) => {
  const { filters, dispatch } = useFiltersContext()
  const [value, setValue] = useState('')

  const handleOnChange = e => {
    const searchValue = e.target.value
    //trigger search when typing 3 or more characters
    if (searchValue.length > 2 || searchValue.length === 0) {
      dispatch({ type: 'filter_title', searchValue })
    }
    setValue(searchValue)
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row items-center justify-around my-10 md:mb-20 w-5/6 md:w-3/4">
      <input
        type="text"
        placeholder="Search anime"
        value={value}
        onChange={handleOnChange}
        className="bg-slate-200 appearance-none border-2 border-slate-400 rounded-xl w-full md:w-2/5 md:order-2 py-2 px-4 text-gray-600 leading-tight focus:outline-none focus:bg-white"
      />

      <p className="text-xl md:text-base md:order-3">
        {resultsAmount} {resultsAmount === 1 ? 'result' : 'results'}
      </p>

      <div className="flex items-center justify-between md:order-1">
        <p className="mx-1 hidden md:flex md:text-base">Filter</p>
        <StarIcon
          isSelected={filters.byStarred}
          onClick={() => dispatch({ type: 'filter_starred' })}
        />
        <HeartIcon
          isSelected={filters.byFav}
          onClick={() => dispatch({ type: 'filter_favs' })}
        />
      </div>
    </div>
  )
}
