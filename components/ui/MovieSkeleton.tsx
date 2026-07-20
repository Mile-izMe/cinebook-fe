export function MovieCardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="aspect-[2/3] bg-zinc-850" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
        <div className="flex gap-1">
          <div className="h-3 bg-zinc-800 rounded w-12" />
          <div className="h-3 bg-zinc-800 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function MoviesGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
