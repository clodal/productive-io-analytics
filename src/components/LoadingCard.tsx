import { Card } from '@tremor/react'

export interface LoadingCardProps {
  className?: string
}

const LoadingCard: React.FC<LoadingCardProps> = (props) => {
  const { className } = props
  return (
    <Card className={className || 'h-40'}>
      {/* Placeholder to set height */}
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded col-span-2" />
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded col-span-1" />
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    </Card>
  )
}

export default LoadingCard
