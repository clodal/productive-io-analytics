import React from 'react'
import { Flex } from '@tremor/react'

export interface LoadingHeadingProps {}

const LoadingHeading: React.FC<LoadingHeadingProps> = (props) => {
  return (
    <Flex
      className="animate-pulse"
      justifyContent="between"
      alignItems="center"
    >
      <div className="space-y-2">
        <div className="w-80 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="w-56 h-2 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="w-32 h-2 bg-slate-200 dark:bg-slate-800 rounded" />
    </Flex>
  )
}

export default LoadingHeading
