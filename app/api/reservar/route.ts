import { NextResponse } from "next/server";
import {
  ReservationEmailError,
  sendReservationEmail,
} from "@/lib/email/send-reservation";
import { validateReservation } from "@/lib/validations/reservation";
import { brand } from "@/lib/data/brand";
import { site } from "@/lib/data/site";

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, message: "Datos del formulario no válidos." },
        { status: 400 },
      );
    }

    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const result = validateReservation(body);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, errors: result.errors },
        { status: 400 },
      );
    }

    await sendReservationEmail(result.data);

    return NextResponse.json({
      ok: true,
      message:
        "Recibimos tu solicitud. Te contactaremos pronto para confirmar tu cita.",
    });
  } catch (error) {
    if (error instanceof ReservationEmailError) {
      if (error.code === "FORMSUBMIT_NOT_ACTIVATED") {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Estamos activando el correo del formulario. Mientras tanto, escríbenos por WhatsApp o llámanos.",
            fallback: "whatsapp",
          },
          { status: 503 },
        );
      }

      if (error.code === "SMTP_NOT_CONFIGURED") {
        return NextResponse.json(
          {
            ok: false,
            message:
              "No pudimos enviar por correo. Contáctanos por WhatsApp o al teléfono de la óptica.",
            fallback: "whatsapp",
          },
          { status: 503 },
        );
      }

      return NextResponse.json(
        {
          ok: false,
          message:
            "No pudimos enviar tu solicitud. Intenta por WhatsApp o vuelve a intentar en unos minutos.",
          fallback: "whatsapp",
        },
        { status: 500 },
      );
    }

    console.error("[reservar]", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos enviar tu solicitud. Intenta de nuevo o contáctanos por WhatsApp.",
        fallback: "whatsapp",
        phone: site.phoneDisplay,
        email: brand.email,
      },
      { status: 500 },
    );
  }
}
