export default function Loading() {
  return (
    <main className="bg-background p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="h-10 w-56 animate-pulse rounded-sm bg-muted" />
        <div className="h-72 w-full animate-pulse rounded-sm bg-muted" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-40 animate-pulse rounded-sm bg-muted" />
          <div className="h-40 animate-pulse rounded-sm bg-muted" />
          <div className="h-40 animate-pulse rounded-sm bg-muted" />
        </div>
      </div>
    </main>
  )
}
