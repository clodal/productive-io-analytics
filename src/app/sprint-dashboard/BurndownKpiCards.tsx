'use client'

import React from 'react'
import dayjs from 'dayjs'
import {
  Card,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Text,
  Title,
} from '@tremor/react'
import getHoursFromMinutes from '../../utils/getHoursFromMinutes'
import { BusinessDate } from '../../utils/getBusinessDates'
import getBusinessDaysDiff from '../../utils/getBusinessDaysDiff'

export interface BurndownKpiCardsProps {
  estimatedMinutes: number
  actualMinutes: number
  estimatedTasksCount: number
  actualTasksCount: number
  businessDates: BusinessDate[]
}

const BurndownKpiCards: React.FC<BurndownKpiCardsProps> = (props) => {
  const {
    estimatedMinutes,
    actualMinutes,
    estimatedTasksCount,
    actualTasksCount,
    businessDates,
  } = props

  const estimatedHours = getHoursFromMinutes(estimatedMinutes)
  const actualHours = getHoursFromMinutes(actualMinutes)
  const dateFormat = 'DD MMM'

  const startOfSprintDay = dayjs(businessDates[0])
  const today = dayjs()

  const businessDaysDiffOfTodayFromStartOfSprintDay = getBusinessDaysDiff(
    startOfSprintDay,
    today,
  )

  const burndownKpiCardData = [
    {
      category: `Completion by Days (${dayjs(businessDates[0]).format(
        dateFormat,
      )} –– ${dayjs(businessDates.at(-1)).format(dateFormat)})`,
      stat: `${businessDaysDiffOfTodayFromStartOfSprintDay} / ${businessDates.length}`,
      unit: 'business days',
      numerator: businessDaysDiffOfTodayFromStartOfSprintDay,
      numeratorUnit: 'days',
      denominator: businessDates.length || 0,
      denominatorUnit: 'total days',
    },
    {
      category: 'Completion by Tasks',
      stat: `${actualTasksCount} / ${estimatedTasksCount}`,
      unit: 'tasks',
      numerator: actualTasksCount,
      numeratorUnit: 'done',
      denominator: estimatedTasksCount,
      denominatorUnit: 'total tasks',
    },
    {
      category: 'Completion by Time',
      stat: `${actualHours} h / ${estimatedHours} h`,
      unit: 'hours',
      numerator: actualHours,
      numeratorUnit: 'act. hours',
      denominator: estimatedHours,
      denominatorUnit: 'est. hours',
    },
  ]

  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      {burndownKpiCardData.map((item) => {
        const {
          category,
          stat,
          unit,
          numerator,
          numeratorUnit,
          denominator,
          denominatorUnit,
        } = item
        const percentage = Math.round((numerator / Number(denominator)) * 100)

        const emptyJsx = (
          <Flex
            justifyContent="center"
            alignItems="center"
            className="p-6 border rounded border-dashed border-gray-200 mt-2 flex-grow"
          >
            <Text>No data</Text>
          </Flex>
        )
        const contentJsx = (
          <>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-1"
            >
              <Metric>{stat}</Metric>
              <Text>{unit}</Text>
            </Flex>

            <Flex className="mt-4">
              <Text className="truncate">
                {numerator} {numeratorUnit || unit} ({percentage}% completed)
              </Text>
              <Text>
                {denominator} {denominatorUnit}
              </Text>
            </Flex>
            <ProgressBar value={percentage} className="mt-2" />
          </>
        )

        return (
          <Card key={category} className="flex flex-col">
            <Title>{category}</Title>
            {!denominator ? emptyJsx : contentJsx}
          </Card>
        )
      })}
    </Grid>
  )
}

export default BurndownKpiCards
