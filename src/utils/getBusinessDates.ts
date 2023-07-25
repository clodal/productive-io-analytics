import dayjs from 'dayjs'
import dayjsBusinessTime from 'dayjs-business-time'

dayjs.extend(dayjsBusinessTime)

export type BusinessDate = string

const getBusinessDates = (startDate?: string, endDate?: string): string[] => {
  if (!startDate || !endDate) return []

  const dateRange: dayjs.Dayjs[] = Array.from(
    { length: dayjs(endDate).diff(dayjs(startDate), 'day') + 1 },
    (_, i) => dayjs(startDate).add(i, 'day'),
  )

  const businessDates: dayjs.Dayjs[] = dateRange.filter((date) =>
    date.isBusinessDay(),
  )

  const businessDatesInStrings = businessDates.map((date) =>
    date.format('YYYY-MM-DD'),
  )

  return businessDatesInStrings
}

export default getBusinessDates
