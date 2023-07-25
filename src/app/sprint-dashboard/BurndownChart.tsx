'use client'

import { Card, AreaChart, Title, Text } from '@tremor/react'
import minBy from 'lodash/minBy'
import dayjs from 'dayjs'
import getHoursFromMinutes from '../../utils/getHoursFromMinutes'
import { BusinessDate } from '../../utils/getBusinessDates'
import { ActualByBusinessDates } from './getActualByBusinessDates'

export interface BurndownChartDatum {
  Date: string
  Estimated: number
  Actual?: number
}
export type BurndownChartData = BurndownChartDatum[]

export interface BurndownChartProps {
  estimatedMinutes: number
  businessDates: BusinessDate[]
  actualByBusinessDates: ActualByBusinessDates
}

export default function BurndownChart(props: BurndownChartProps) {
  const { estimatedMinutes, businessDates, actualByBusinessDates } = props

  const burndownChartData = businessDates.reduce(
    (acc, businessDate: string, i) => {
      // Calculate the ideal burn down
      const estimatedByBusinessDate =
        estimatedMinutes - (i * estimatedMinutes) / (businessDates.length - 1)
      // Do not plot points that are greater than today
      const currentBusinessDateActual = actualByBusinessDates[businessDate]
      // Get previous actual
      const previousBurndownChartDatum = acc[i - 1] as BurndownChartDatum
      const previousBusinessDateActual = previousBurndownChartDatum?.Actual || 0
      // Get current actual
      const isFutureDate = dayjs(businessDate).isAfter(dayjs())
      // Calculate the actual burn down
      const actualByBusinessDate =
        (i === 0 ? estimatedMinutes : previousBusinessDateActual) -
          currentBusinessDateActual ||
        previousBusinessDateActual ||
        estimatedMinutes
      return acc.concat({
        Date: dayjs(businessDate).format('ddd, DD MMM'),
        Estimated: estimatedByBusinessDate,
        ...(!isFutureDate && {
          Actual: actualByBusinessDate,
        }),
      })
    },
    [] as BurndownChartData,
  )
  const burndownChartDataInHours = burndownChartData.map(
    ({ Date, Estimated, Actual }) => ({
      Date,
      Estimated: getHoursFromMinutes(Estimated),
      Actual: getHoursFromMinutes(Actual),
    }),
  )

  const minValue =
    Number(
      minBy(burndownChartDataInHours, ({ Actual }) => Number(Actual))?.Actual,
    ) || 0

  return (
    <Card>
      <div className="mb-4">
        <Title>Burndown by Hours</Title>
        <Text>Comparison between Estimated and Actual effort in hours.</Text>
      </div>

      <AreaChart
        className="h-96"
        data={burndownChartDataInHours}
        index="Date"
        categories={['Estimated', 'Actual']}
        colors={['indigo', 'fuchsia']}
        yAxisWidth={30}
        minValue={minValue}
        // Show 0 on the yAxis if the actual exceeds the limit
        autoMinValue={minValue <= 0}
        maxValue={Number(getHoursFromMinutes(estimatedMinutes))}
        valueFormatter={(number: number) => {
          return !Number.isNaN(Number(number))
            ? `${Intl.NumberFormat('us').format(number).toString()}h`
            : '-'
        }}
      />
    </Card>
  )
}
