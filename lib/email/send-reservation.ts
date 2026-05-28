import nodemailer from "nodemailer";
import { brand } from "@/lib/data/brand";
import type { ReservationPayload } from "@/lib/validations/reservation";

function formatDate(iso: string) {
  try {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function buildHtml(data: ReservationPayload) {
  const rows = [
    ["Nombre", data.name],
    ["Correo", data.email],
    ["Teléfono", data.phone],
    ...(data.preferredDate
      ? [["Fecha preferida", formatDate(data.preferredDate)] as const]
      : []),
    ...(data.preferredTime
      ? [["Horario", data.preferredTime] as const]
      : []),
    ...(data.message ? [["Mensaje", data.message] as const] : []),
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#6b6f78;font-size:14px;vertical-align:top;">${label}</td><td style="padding:8px 0;font-size:14px;color:#0a0a0b;">${value}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;">
      <h1 style="font-size:20px;color:#0a2342;margin:0 0 8px;">Nueva solicitud de cita</h1>
      <p style="margin:0 0 24px;color:#4a4d55;font-size:14px;">${brand.name}</p>
      <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
    </div>
  `;
}

export async function sendReservationEmail(data: ReservationPayload) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO || (brand.emails ?? [brand.email]).join(",");
  const from =
    process.env.MAIL_FROM || `"${brand.name}" <${user || "noreply@localhost"}>`;

  if (!host || !user || !pass) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: `[Reserva] ${data.name} — ${brand.name}`,
    text: [
      `Nueva solicitud de cita — ${brand.name}`,
      "",
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.phone}`,
      data.preferredDate ? `Fecha preferida: ${formatDate(data.preferredDate)}` : null,
      data.preferredTime ? `Horario: ${data.preferredTime}` : null,
      data.message ? `Mensaje: ${data.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
    html: buildHtml(data),
  });
}
