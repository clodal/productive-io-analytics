import dayjs from 'dayjs'
import dayjsBusinessTime from 'dayjs-business-time'

dayjs.extend(dayjsBusinessTime)

const getBusinessDaysDiff = (start, end) => {
  return start.businessDaysDiff(end)
}

export default getBusinessDaysDiff
