export type ReservationPayload = {
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
};

export type ReservationErrors = Partial<Record<keyof ReservationPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateReservation(
  data: Record<string, unknown>,
): { ok: true; data: ReservationPayload } | { ok: false; errors: ReservationErrors } {
  const errors: ReservationErrors = {};

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const preferredDate =
    typeof data.preferredDate === "string" ? data.preferredDate.trim() : "";
  const preferredTime =
    typeof data.preferredTime === "string" ? data.preferredTime.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (name.length < 2) errors.name = "Escribe tu nombre completo.";
  if (!EMAIL_RE.test(email)) errors.email = "Correo electrónico no válido.";
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 9)
    errors.phone = "Teléfono chileno con al menos 9 dígitos.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      ...(preferredDate ? { preferredDate } : {}),
      ...(preferredTime ? { preferredTime } : {}),
      ...(message ? { message } : {}),
    },
  };
}
