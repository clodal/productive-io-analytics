'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { DateRangePicker, DateRangePickerValue } from '@tremor/react'
import dayjs from 'dayjs'

export interface DateRangePickerWithParamsProps {
  startDateParamName?: string
  endDateParamName?: string
}

const DateRangePickerWithParams: React.FC<DateRangePickerWithParamsProps> = (
  props,
) => {
  const { startDateParamName = 'start_date', endDateParamName = 'end_date' } =
    props

  const [isPending, startTransition] = useTransition()

  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const startDateParam = searchParams.get(startDateParamName)
  const endDateParam = searchParams.get(endDateParamName)
  const defaultFrom = startDateParam ? new Date(startDateParam) : new Date()
  const defaultTo = endDateParam ? new Date(endDateParam) : new Date()

  const [dateRangeValue, setDateRangeValue] = useState<DateRangePickerValue>({
    from: defaultFrom,
    to: defaultTo,
  })

  const handleDateRangeValueChange = (value: DateRangePickerValue) => {
    setDateRangeValue(value)

    const params = new URLSearchParams(window.location.search)
    const { from, to } = value

    const dateFormat = 'YYYY-MM-DD'
    const startDate = dayjs(from).format(dateFormat)
    const endDate = dayjs(to).format(dateFormat)

    if (value) {
      params.set(startDateParamName, startDate)
      params.set(endDateParamName, endDate)
    } else {
      params.delete(startDateParamName)
      params.delete(endDateParamName)
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <DateRangePicker
      className="max-w-full sm:max-w-md [&>*]:ring-0"
      value={dateRangeValue}
      onValueChange={handleDateRangeValueChange}
      enableSelect={false}
    />
  )
}

export default DateRangePickerWithParams
