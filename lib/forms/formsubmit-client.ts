import { brand } from "@/lib/data/brand";
import {
  reservationSubject,
  reservationTextLines,
} from "@/lib/email/reservation-mail";
import type { ReservationPayload } from "@/lib/validations/reservation";

export type FormSubmitResult =
  | { ok: true }
  | { ok: false; needsActivation: boolean; message: string };

export async function submitReservationViaFormSubmit(
  data: ReservationPayload,
): Promise<FormSubmitResult> {
  const text = reservationTextLines(data).join("\n");

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(brand.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: reservationSubject(data),
        _template: "table",
        _captcha: "false",
        _replyto: data.email,
        _autoresponse: `Recibimos tu solicitud en ${brand.name}. Te contactaremos pronto para confirmar tu cita.`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        preferredDate: data.preferredDate ?? "",
        preferredTime: data.preferredTime ?? "",
        message: data.message ?? "",
        resumen: text,
      }),
    },
  );

  let payload: { success?: string; message?: string } = {};
  try {
    payload = (await response.json()) as { success?: string; message?: string };
  } catch {
    return {
      ok: false,
      needsActivation: false,
      message: "No pudimos enviar tu solicitud. Intenta por WhatsApp.",
    };
  }

  if (payload.message?.toLowerCase().includes("activ")) {
    return {
      ok: false,
      needsActivation: true,
      message:
        "Revisa tu bandeja de entrada en saludvisualyoptica@gmail.com y activa el formulario (enlace de FormSubmit). Luego vuelve a intentar.",
    };
  }

  if (payload.success === "true") {
    return { ok: true };
  }

  return {
    ok: false,
    needsActivation: false,
    message:
      payload.message ||
      "No pudimos enviar tu solicitud. Intenta por WhatsApp o teléfono.",
  };
}
