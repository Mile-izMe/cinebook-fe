import { Film } from "lucide-react";
import { useTranslations } from "next-intl";
import { MovieDetailResponse } from "../../types";

interface TrailerModalProps {
  movie: MovieDetailResponse;
  embedUrl: string | null;
}

function TrailerModal({ movie, embedUrl }: TrailerModalProps) {
  const t = useTranslations("movie");
  return (
    <div className="bg-black aspect-video relative flex flex-col items-center justify-center">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${movie.title} ${t("trailer")}`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        // Fallback
        <div className="text-zinc-500 flex flex-col items-center">
          <Film className="w-12 h-12 mb-2 opacity-50" />
          <p className="text-sm font-bold uppercase tracking-widest">
            {t("trailer_unavailable")}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrailerModal;
