import groupBy from 'lodash/groupBy'
import { ProductiveTimeEntry } from './types'

export type ActualByBusinessDates = { [key: string]: number }

const getActualByBusinessDates = (
  timeEntrys?: ProductiveTimeEntry[],
  businessDates?: string[],
): { [key: string]: number } => {
  const timeEntrysByDate = groupBy(timeEntrys, 'date')
  const timeEntrysSumByDate = Object.entries(timeEntrysByDate).reduce(
    (acc, [key, value]) => {
      const nextValue = value.reduce(
        (acc, { time }: ProductiveTimeEntry['attributes']) => acc + time,
        0,
      )
      return { ...acc, [key]: nextValue }
    },
    {} as ActualByBusinessDates,
  )
  const timeEntrysSumByBusinessDate = Object.entries(
    timeEntrysSumByDate,
  ).reduce((acc, [date, timeEntrysSum]) => {
    const isBusinessDate = businessDates?.includes(date)
    if (!isBusinessDate) return acc
    return { ...acc, [date]: timeEntrysSum }
  }, {} as ActualByBusinessDates)

  return timeEntrysSumByBusinessDate
}

export default getActualByBusinessDates
