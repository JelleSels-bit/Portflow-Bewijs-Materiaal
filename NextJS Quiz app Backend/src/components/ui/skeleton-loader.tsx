import { Card } from "@/components/ui/card"

export function SkeletonLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-4">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="h-8 w-3/4 mx-auto animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 mx-auto animate-pulse rounded bg-muted" />
        <div className="pt-4 space-y-3">
          <div className="h-12 w-full animate-pulse rounded bg-muted" />
          <div className="h-12 w-full animate-pulse rounded bg-muted" />
        </div>
      </Card>
    </div>
  )
}

export function QuizSkeleton() {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <div className="h-12 w-full animate-pulse rounded bg-muted" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export function PlayersSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  )
}
