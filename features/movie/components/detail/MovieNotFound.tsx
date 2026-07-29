"use client";
import { Film } from "lucide-react";
import { useRouter } from "next/navigation";

function MovieNotFound() {
  const router = useRouter();
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-brand-black text-center py-24 px-4">
      <Film className="w-12 h-12 text-zinc-700 mb-4 animate-bounce" />
      <h2 className="text-sm font-black text-white mb-2 uppercase tracking-widest">
        Movie Not Found
      </h2>
      <p className="text-zinc-500 text-xs max-w-sm mb-6 leading-relaxed">
        The movie you are looking for does not exist or has been removed from
        our current listing.
      </p>
      <button
        onClick={() => router.push("/")}
        className="cursor-pointer bg-brand-red hover:bg-red-700 text-white font-black py-4.5 px-8 rounded-xl text-xs uppercase tracking-widest transition-all"
      >
        Return to Catalog
      </button>
    </div>
  );
}

export default MovieNotFound;
