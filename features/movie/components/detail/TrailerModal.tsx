import { Film } from "lucide-react";
import { MovieDetailResponse } from "../../types";

interface TrailerModalProps {
  movie: MovieDetailResponse;
  embedUrl: string | null;
}

function TrailerModal({ movie, embedUrl }: TrailerModalProps) {
  return (
    <div className="bg-black aspect-video relative flex flex-col items-center justify-center">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${movie.title} Trailer`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        // Fallback
        <div className="text-zinc-500 flex flex-col items-center">
          <Film className="w-12 h-12 mb-2 opacity-50" />
          <p className="text-sm font-bold uppercase tracking-widest">
            Trailer Unavailable
          </p>
        </div>
      )}
    </div>
  );
}

export default TrailerModal;
