import { z } from "zod";

type MessageGetter = (key: string) => string;

export const cinemaSchema = (t: MessageGetter) =>
  z.object({
    name: z.string().min(1, t("name_empty")),
    address: z.string().min(1, t("address_empty")),
    cityId: z.string().min(1, t("cityId_empty")),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  });

export const createCinemaSchema = (t: MessageGetter) => cinemaSchema(t);

export const updateCinemaSchema = (t: MessageGetter) =>
  cinemaSchema(t).extend({
    id: z.string(),
  });

export type CreateCinemaInput = z.infer<ReturnType<typeof createCinemaSchema>>;
export type UpdateCinemaInput = z.infer<ReturnType<typeof updateCinemaSchema>>;
