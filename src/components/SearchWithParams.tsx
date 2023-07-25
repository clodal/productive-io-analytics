'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export interface SearchWithParamsProps {
  label?: string
  paramName?: string
  disabled?: boolean
}

const SearchWithParams: React.FC<SearchWithParamsProps> = (props) => {
  const { label = 'name', paramName = 'q', disabled } = props

  const router = useRouter()
  const { replace } = router
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()

  const defaultSearchTerm = searchParams.get(paramName) ?? ''
  const [currentSearchTerm, setCurrentSearchTerm] = useState(defaultSearchTerm)

  function handleSearch(term: string) {
    setCurrentSearchTerm(term)
    const params = new URLSearchParams(window.location.search)

    if (term) {
      params.set(paramName, term)
    } else {
      params.delete(paramName)
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="relative min-w-full sm:min-w-[260px]">
      <label htmlFor={`search-${paramName}`} className="sr-only">
        Search
      </label>

      <div className="rounded-md shadow-sm">
        <div
          className="pointer-events-none absolute top-3 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          <MagnifyingGlassIcon
            className="mr-3 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>

        <input
          id={`search-${paramName}`}
          type="text"
          name={paramName}
          disabled={disabled}
          className="w-full h-[38px] dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200 block rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          placeholder={`Search by ${label}...`}
          spellCheck={false}
          onChange={(e) => handleSearch(e.target.value)}
          value={currentSearchTerm}
        />
      </div>

      {isPending && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 -mt-2 mr-3 h-4 w-4 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default SearchWithParams
