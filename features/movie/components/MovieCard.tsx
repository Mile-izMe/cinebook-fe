import { motion } from "motion/react";
import { MovieSummaryResponse } from "../types";
import { Clock, Star } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface MovieCardProps {
  key?: string;
  movie: MovieSummaryResponse;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const t = useTranslations("movie");
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-brand-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl hover:shadow-brand-red/10 hover:border-white/10 transition-all duration-200"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {/* Poster */}
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {/* {movie.isHot && (
            <span className="flex items-center gap-1 bg-brand-red text-white font-black text-[10px] uppercase px-2.5 py-1 rounded shadow-md tracking-wider">
              <Flame className="w-3 h-3 fill-white" />
              Hot
            </span>
          )} */}
          <span className="bg-black text-white font-black text-[10px] uppercase border border-white/10 px-2 py-0.5 rounded shadow-sm">
            {movie.ageRating}
          </span>
        </div>

        {/* Score Badge */}
        <div className="absolute top-3 right-3 bg-black border border-white/10 text-amber-500 font-black text-xs flex items-center gap-1 px-2.5 py-1 rounded shadow-md z-10 font-mono">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{movie.score}</span>
        </div>

        {/* Overlay Hover Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <div className="space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>
                {movie.duration} {t("mins")}
              </span>
            </div>

            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {movie.description}
            </p>
            <div onClick={(e) => e.stopPropagation()}>
              <Link
                href={`/movie/${movie.id}`}
                className="block w-full text-center bg-brand-red hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
              >
                {t("book_tickets")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-black text-white group-hover:text-brand-red transition-colors line-clamp-1 text-sm uppercase tracking-wide">
          {movie.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((g) => (
            <span
              key={g.id}
              className="text-[10px] font-black uppercase tracking-wider text-zinc-400 bg-black/45 border border-white/5 px-2 py-0.5 rounded"
            >
              {g.name}
            </span>
          ))}
          {movie.genres.length > 2 && (
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1 flex items-center">
              {t("more_genres", { count: movie.genres.length - 2 })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
