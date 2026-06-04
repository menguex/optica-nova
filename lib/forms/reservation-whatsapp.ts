import { brand } from "@/lib/data/brand";
import type { ReservationPayload } from "@/lib/validations/reservation";
import { formatReservationDate } from "@/lib/email/reservation-mail";
import { site } from "@/lib/data/site";

export function buildReservationWhatsAppMessage(data: Partial<ReservationPayload>) {
  const lines = [
    `Hola, quisiera agendar una cita en ${brand.name}.`,
    "",
    data.name ? `Nombre: ${data.name}` : null,
    data.phone ? `Teléfono: ${data.phone}` : null,
    data.email ? `Correo: ${data.email}` : null,
    data.preferredDate
      ? `Fecha preferida: ${formatReservationDate(data.preferredDate)}`
      : null,
    data.preferredTime ? `Horario: ${data.preferredTime}` : null,
    data.message ? `Comentario: ${data.message}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

export function reservationWhatsAppUrl(data: Partial<ReservationPayload>) {
  const text = buildReservationWhatsAppMessage(data);
  return `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
