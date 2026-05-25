import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { ExamenVisualHighlight } from "@/components/ui/ExamenVisualHighlight";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { schedule } from "@/lib/data/clinic";
import { brand } from "@/lib/data/brand";
import { site, whatsappUrlWithMessage } from "@/lib/data/site";
import { ICON_STROKE } from "@/lib/icons";

const steps = [
  "Completa el formulario con tus datos y preferencia de horario.",
  "Te contactamos por teléfono, WhatsApp o correo para confirmar la cita.",
  "Asiste a tu examen en nuestra sala en Coquimbo #177, Ovalle.",
] as const;

const includes = [
  "Evaluación de salud visual con equipamiento clínico",
  "Asesoría en armazones y cristales según tu receta",
  "Atención FONASA y particular",
] as const;

export function ReservarPageView() {
  return (
    <div className="min-h-[100svh] bg-background">
      <div className="relative overflow-hidden border-b border-line bg-cream">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(30,77,140,0.08), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(126,184,232,0.1), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-container px-6 pb-10 pt-28 md:px-16 md:pb-14 md:pt-32">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" strokeWidth={ICON_STROKE} aria-hidden />
            Volver al inicio
          </Link>
          <p className="mt-8 font-mono text-xs tracking-[0.2em] text-subtle">
            RESERVAR CITA
          </p>
          <h1 className="mt-4 flex max-w-2xl flex-col items-start gap-2 font-display text-[clamp(1.85rem,6.5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-ink sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-2">
            <span className="shrink-0">Agenda tu</span>
            <ExamenVisualHighlight />
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Solicita tu hora en {brand.name}. Te confirmamos a la brevedad para
            coordinar tu visita en Ovalle.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-container px-6 py-12 md:px-16 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <aside className="space-y-8 lg:col-span-5 xl:col-span-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-subtle">
                CÓMO FUNCIONA
              </p>
              <ol className="mt-5 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper font-mono text-xs text-optic">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-muted">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-line bg-cream p-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-subtle">
                TU VISITA INCLUYE
              </p>
              <ul className="mt-4 space-y-3">
                {includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-optic"
                      strokeWidth={ICON_STROKE}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`tel:${site.phone}`}
                className="group flex gap-3 rounded-2xl border border-line bg-paper p-4 transition-[border-color,box-shadow] hover:border-optic/30 hover:shadow-soft"
              >
                <Phone
                  className="size-4 text-optic"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
                <span>
                  <span className="block text-xs text-subtle">Teléfono</span>
                  <span className="mt-0.5 block text-sm font-medium text-ink group-hover:text-optic">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href={whatsappUrlWithMessage}
                aria-label={`Escribir por WhatsApp al ${site.phoneDisplay}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 rounded-2xl border border-line bg-paper p-4 transition-[border-color,box-shadow] hover:border-optic/30 hover:shadow-soft"
              >
                <MessageCircle
                  className="size-4 text-optic"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
                <span>
                  <span className="block text-xs text-subtle">WhatsApp</span>
                  <span className="mt-0.5 block text-sm font-medium text-ink group-hover:text-optic">
                    Escríbenos
                  </span>
                </span>
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-subtle">
                <Clock className="size-3.5 text-optic" aria-hidden />
                HORARIO DE ATENCIÓN
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {schedule.map((row) => (
                  <li
                    key={row.day}
                    className="flex justify-between gap-4 border-b border-line/70 pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="font-medium text-ink">{row.day}</span>
                    <span className="text-right text-muted">
                      {row.morning}
                      {row.afternoon !== "—" ? (
                        <>
                          <br />
                          <span className="text-xs">{row.afternoon}</span>
                        </>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 rounded-2xl border border-line bg-cream p-4">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-optic"
                strokeWidth={ICON_STROKE}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{site.address}</p>
                <p className="mt-1 text-xs text-muted">{site.payment}</p>
                <a
                  href={site.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-optic hover:underline"
                >
                  Cómo llegar
                  <ArrowUpRight className="size-3" aria-hidden />
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-28">
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-optic/20 bg-optic/[0.06] px-4 py-3">
                <Calendar
                  className="size-4 shrink-0 text-optic"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
                <p className="text-sm text-muted">
                  Indica fecha y horario preferido. Confirmaremos disponibilidad
                  según nuestro calendario de atención.
                </p>
              </div>
              <ReservationForm className="shadow-float md:p-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
