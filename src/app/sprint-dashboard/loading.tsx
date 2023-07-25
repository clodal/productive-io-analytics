'use client'

import { Grid } from '@tremor/react'
import { LoadingCard, LoadingChart, LoadingHeading } from '@/components'

export default function Loading() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl space-y-6">
      <LoadingHeading />

      <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </Grid>

      <div>
        <LoadingChart />
      </div>

      <Grid numItemsMd={1} numItemsLg={2} className="gap-6">
        <LoadingCard />
        <LoadingCard />
      </Grid>
    </main>
  )
}
