export function ShowtimePageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 aspect-[2/3] bg-zinc-850 rounded-2xl" />
        <div className="flex-1 space-y-4 py-2">
          <div className="h-8 bg-zinc-800 rounded w-1/2" />
          <div className="h-4 bg-zinc-800 rounded w-1/4" />
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-zinc-800 rounded w-full" />
            <div className="h-4 bg-zinc-800 rounded w-full" />
            <div className="h-4 bg-zinc-800 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
