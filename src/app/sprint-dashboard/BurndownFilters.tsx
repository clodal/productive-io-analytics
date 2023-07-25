'use client'

import SearchWithParams from '@/components/SearchWithParams'
import DateRangePickerWithParams from '@/components/DateRangePickerWithParams'

export default function BurndownFilters() {
  return (
    <div className="gap-2 w-full sm:w-auto flex flex-col sm:flex-row sm:justify-between">
      {/* Search Input */}
      <SearchWithParams label="Task List Name" paramName="task_list_name" />
      {/* DateRangeInput */}
      <DateRangePickerWithParams />
    </div>
  )
}
