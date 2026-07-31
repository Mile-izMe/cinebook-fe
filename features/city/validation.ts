import { z } from "zod";

type MessageGetter = (key: string) => string;

export const citySchema = (t: MessageGetter) =>
  z.object({
    cityName: z.string().nonempty(t("cityName_empty")),
  });

export const createCitySchema = (t: MessageGetter) => citySchema(t);
export const updateCitySchema = (t: MessageGetter) => citySchema(t);

export type CreateCityInput = z.infer<ReturnType<typeof createCitySchema>>;
export type UpdateCityInput = z.infer<ReturnType<typeof updateCitySchema>>;
