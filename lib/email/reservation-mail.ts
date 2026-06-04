import { brand } from "@/lib/data/brand";
import type { ReservationPayload } from "@/lib/validations/reservation";

export function formatReservationDate(iso: string) {
  try {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function reservationSubject(data: ReservationPayload) {
  return `[Reserva] ${data.name} — ${brand.name}`;
}

export function reservationTextLines(data: ReservationPayload) {
  return [
    `Nueva solicitud de cita — ${brand.name}`,
    "",
    `Nombre: ${data.name}`,
    `Correo: ${data.email}`,
    `Teléfono: ${data.phone}`,
    data.preferredDate
      ? `Fecha preferida: ${formatReservationDate(data.preferredDate)}`
      : null,
    data.preferredTime ? `Horario: ${data.preferredTime}` : null,
    data.message ? `Mensaje: ${data.message}` : null,
  ].filter(Boolean) as string[];
}

export function reservationHtml(data: ReservationPayload) {
  const rows = [
    ["Nombre", data.name],
    ["Correo", data.email],
    ["Teléfono", data.phone],
    ...(data.preferredDate
      ? [["Fecha preferida", formatReservationDate(data.preferredDate)] as const]
      : []),
    ...(data.preferredTime
      ? [["Horario", data.preferredTime] as const]
      : []),
    ...(data.message ? [["Mensaje", data.message] as const] : []),
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#6b6f78;font-size:14px;vertical-align:top;">${label}</td><td style="padding:8px 0;font-size:14px;color:#0a0a0b;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;">
      <h1 style="font-size:20px;color:#0a2342;margin:0 0 8px;">Nueva solicitud de cita</h1>
      <p style="margin:0 0 24px;color:#4a4d55;font-size:14px;">${escapeHtml(brand.name)}</p>
      <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getReservationMailTo() {
  return process.env.MAIL_TO || brand.email;
}
