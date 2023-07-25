import { Card } from '@tremor/react'

export interface LoadingChartProps {
  className?: string
}
const LoadingChart: React.FC<LoadingChartProps> = (props) => {
  const { className } = props
  return (
    <Card className={className || 'h-96'}>
      {/* Placeholder to set height */}
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3 mb-6">
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    </Card>
  )
}

export default LoadingChart
