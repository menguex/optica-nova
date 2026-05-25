import { NextResponse } from "next/server";
import { sendReservationEmail } from "@/lib/email/send-reservation";
import { validateReservation } from "@/lib/validations/reservation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
    if (error instanceof Error && error.message === "SMTP_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          ok: false,
          message:
            "El envío de correo no está configurado. Contacta a la óptica por teléfono.",
        },
        { status: 503 },
      );
    }

    console.error("[reservar]", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.",
      },
      { status: 500 },
    );
  }
}
