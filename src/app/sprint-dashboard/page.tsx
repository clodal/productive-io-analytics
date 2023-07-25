import { Text, Title } from '@tremor/react'
import sum from 'lodash/sum'
import { Metadata } from 'next'
import {
  handleDecryptProductiveAuth,
  makeFetchProductive,
} from '@/lib/Productive'
import getBusinessDates from '@/utils/getBusinessDates'
import BurndownChart from './BurndownChart'
import BurndownFilters from './BurndownFilters'
import BurndownKpiCards from './BurndownKpiCards'
import BurndownResourcesList from './BurndownResourcesList'
import getActualByBusinessDates from './getActualByBusinessDates'
import { ProductiveTask, ProductiveTimeEntry } from './types'

export const metadata: Metadata = {
  title: 'Sprint Dashboard',
  description: 'An overview of your sprint.',
}

export interface BurndownPageProps {
  searchParams?: {
    task_list_name?: string
    start_date?: string
    end_date?: string
    productive_token?: string
  }
}

const BurndownPage: React.FC<BurndownPageProps> = async (props) => {
  const { searchParams = {} } = props

  // ==============================
  // Retrieve Search Params
  // ==============================
  const taskListName = searchParams.task_list_name ?? ''
  const startDate = searchParams.start_date ?? ''
  const endDate = searchParams.end_date ?? ''
  const productiveToken = searchParams.productive_token ?? ''

  // ==============================
  // Prepare fetcher
  // ==============================
  // Format of `authToken:organizationId`
  const productiveAuth = handleDecryptProductiveAuth(productiveToken) || ''
  const fetchProductive = makeFetchProductive({
    authToken: productiveAuth.split(':')[0],
    organizationId: productiveAuth.split(':')[1],
  })

  // ==============================
  // Fetch Data from Productive
  // ==============================
  const estimatedTasks =
    taskListName &&
    (await fetchProductive('/tasks', {
      params: {
        'filter[task_list_name][contains]': taskListName,
      },
    }))
  const actualTasks =
    taskListName &&
    (await fetchProductive('/tasks', {
      params: {
        'filter[task_list_name][contains]': taskListName,
        'filter[workflow_status_category_id]': 3, // Completed
      },
    }))
  const estimatedTaskIds = estimatedTasks.data?.map(
    ({ id }: ProductiveTask) => id,
  )
  // TODO: Ensure that we fetch all the pages. Currently only limited to the first page
  const tasklistTimeEntrys =
    taskListName &&
    (await fetchProductive('/time_entries', {
      params: {
        'page[size]': 200, // Max page size is 200
        'filter[task_id]': estimatedTaskIds.join(','),
      },
    }))

  // ==============================
  // Prepare data
  // ==============================
  const estimatedMinutes = estimatedTasks.data?.reduce(
    (acc: number, estimatedTask: ProductiveTask) => {
      if (!estimatedTask) return acc
      const { initial_estimate } = estimatedTask.attributes
      return acc + initial_estimate
    },
    0,
  )
  const timeEntrys = tasklistTimeEntrys.data?.map(
    ({ attributes }: ProductiveTimeEntry) => attributes,
  )

  // ==============================
  // Calculate
  // ==============================
  const businessDates = getBusinessDates(startDate, endDate)
  const actualByBusinessDates = getActualByBusinessDates(
    timeEntrys,
    businessDates,
  )
  const actualMinutes = sum(Object.values(actualByBusinessDates))

  const estimatedTasksCount = estimatedTasks.data?.length
  const actualTasksCount = actualTasks.data?.length

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* Heading + Filters */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <Title>Sprint Dashboard</Title>
          <Text>
            An overview of your sprint's performance in the given period.
          </Text>
        </div>

        <BurndownFilters />
      </div>

      {/* Cards */}
      <div className="mb-6">
        <BurndownKpiCards
          estimatedMinutes={estimatedMinutes}
          actualMinutes={actualMinutes}
          estimatedTasksCount={estimatedTasksCount}
          actualTasksCount={actualTasksCount}
          businessDates={businessDates}
        />
      </div>

      {/* Chart */}
      <BurndownChart
        estimatedMinutes={estimatedMinutes}
        businessDates={businessDates}
        actualByBusinessDates={actualByBusinessDates}
      />

      {/* Resources */}
      <div className="mt-6">
        <BurndownResourcesList />
      </div>
    </main>
  )
}

export default BurndownPage
