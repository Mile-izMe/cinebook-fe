import { z } from "zod";

type MessageGetter = (key: string) => string;

export const createGenreSchema = (t: MessageGetter) =>
  z.object({
    name: z.string().nonempty(t("genreName_empty")),
  });

export const movieSchema = (t: MessageGetter) =>
  z.object({
    title: z.string().trim().min(1, t("title_required")),
    description: z.string().trim().min(1, t("description_required")),
    duration: z.number().positive(t("duration_positive")),
    ageRating: z.string().trim().min(1, t("age_rating_required")),
    releaseDate: z.string().min(1, t("release_date_required")),
    director: z.string().trim().min(1, t("director_required")),
    cast: z.array(z.string().trim().min(1)).min(1, t("cast_required")),
    trailerUrl: z.string().url(t("invalid_url")).optional().or(z.literal("")),
    genreIds: z.array(z.string().uuid()).min(1, t("genre_required")),
    posterObjectKey: z.string().optional(),
    backdropObjectKey: z.string().optional(),
  });

export const createMovieSchema = (t: MessageGetter) =>
  movieSchema(t).extend({
    posterUrl: z.string().optional(),
    backdropUrl: z.string().optional(),
  });

export const updateMovieSchema = (t: MessageGetter) => movieSchema(t);

export type GenreInput = z.infer<ReturnType<typeof createGenreSchema>>;
export type CreateMovieInput = z.infer<ReturnType<typeof createMovieSchema>>;
export type UpdateMovieInput = z.infer<ReturnType<typeof updateMovieSchema>>;
