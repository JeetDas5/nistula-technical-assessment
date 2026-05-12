import { z } from "zod";

export const messageSchema = z.object({
  source: z.enum(["whatsapp", "booking_com", "airbnb", "instagram", "direct"]),
  guest_name: z.string(),
  message: z.string(),
  timestamp: z.string(),
  booking_ref: z.string(),
  property_id: z.string(),
});
