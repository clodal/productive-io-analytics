const getHoursFromMinutes = (minutes?: number) =>
  minutes && (minutes / 60).toFixed(1)

export default getHoursFromMinutes
