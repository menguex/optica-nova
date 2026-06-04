import nodemailer from "nodemailer";
import { brand } from "@/lib/data/brand";
import type { ReservationPayload } from "@/lib/validations/reservation";
import {
  getReservationMailTo,
  reservationHtml,
  reservationSubject,
  reservationTextLines,
} from "@/lib/email/reservation-mail";

export class ReservationEmailError extends Error {
  constructor(
    message: string,
    readonly code:
      | "SMTP_NOT_CONFIGURED"
      | "FORMSUBMIT_NOT_ACTIVATED"
      | "FORMSUBMIT_FAILED"
      | "SMTP_FAILED",
  ) {
    super(message);
    this.name = "ReservationEmailError";
  }
}

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

async function sendViaSmtp(data: ReservationPayload) {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const to = getReservationMailTo();
  const from =
    process.env.MAIL_FROM || `"${brand.name}" <${user}>`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: data.email,
      subject: reservationSubject(data),
      text: reservationTextLines(data).join("\n"),
      html: reservationHtml(data),
    });
  } catch {
    throw new ReservationEmailError(
      "No se pudo enviar por SMTP.",
      "SMTP_FAILED",
    );
  }
}

async function sendViaFormSubmit(data: ReservationPayload) {
  const to = getReservationMailTo();
  const siteOrigin =
    process.env.NEXT_PUBLIC_SITE_URL || brand.siteUrl || "https://saludvisualyoptica.cl";

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: siteOrigin,
        Referer: `${siteOrigin}/reservar`,
      },
      body: JSON.stringify({
        _subject: reservationSubject(data),
        _template: "table",
        _captcha: "false",
        _replyto: data.email,
        name: data.name,
        email: data.email,
        phone: data.phone,
        preferredDate: data.preferredDate ?? "",
        preferredTime: data.preferredTime ?? "",
        message: data.message ?? "",
      }),
      cache: "no-store",
    },
  );

  let payload: { success?: string; message?: string } = {};
  try {
    payload = (await response.json()) as { success?: string; message?: string };
  } catch {
    throw new ReservationEmailError(
      "Respuesta inválida del servicio de correo.",
      "FORMSUBMIT_FAILED",
    );
  }

  if (payload.message?.toLowerCase().includes("activation")) {
    throw new ReservationEmailError(
      "FormSubmit pendiente de activación.",
      "FORMSUBMIT_NOT_ACTIVATED",
    );
  }

  if (payload.success !== "true" && !response.ok) {
    throw new ReservationEmailError(
      payload.message || "FormSubmit rechazó el envío.",
      "FORMSUBMIT_FAILED",
    );
  }
}

export async function sendReservationEmail(data: ReservationPayload) {
  if (hasSmtpConfig()) {
    await sendViaSmtp(data);
    return;
  }

  await sendViaFormSubmit(data);
}
