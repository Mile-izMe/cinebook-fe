import { z } from "zod";

type MessageGetter = (key: string) => string;

export const ROOM_TYPES = ["STANDARD", "IMAX", "FOUR_DX"] as const;

export const roomSchema = (t: MessageGetter) =>
  z.object({
    name: z.string().min(1, t("name_empty")),
    capacity: z.number().min(1, t("capacity_empty")),
    type: z.enum(ROOM_TYPES),
  });

export const createRoomSchema = (t: MessageGetter) => roomSchema(t);

export const updateRoomSchema = (t: MessageGetter) =>
  roomSchema(t).extend({
    id: z.string(),
  });

export type CreateRoomInput = z.infer<ReturnType<typeof createRoomSchema>>;
export type UpdateRoomInput = z.infer<ReturnType<typeof updateRoomSchema>>;
