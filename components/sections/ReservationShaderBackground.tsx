/** Fondo premium sin WebGL — evita cargar Three.js en la home. */
export function ReservationShaderBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden bg-ink" aria-hidden>
        <div
          className="absolute -inset-[45%] animate-optic-drift opacity-[0.55]"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 25% 15%, rgba(30, 77, 140, 0.65), transparent 58%), radial-gradient(ellipse 50% 55% at 78% 85%, rgba(126, 184, 232, 0.4), transparent 52%)",
          }}
        />
        <div
          className="absolute -inset-[35%] animate-optic-drift-slow opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(44, 94, 158, 0.45), transparent 48%)",
          }}
        />
        <div className="absolute inset-0 animate-optic-shimmer opacity-30">
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(184, 220, 250, 0.08) 50%, transparent 60%)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/50 to-ink/80" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-ink/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(126,184,232,0.35), transparent 65%)",
        }}
      />
    </>
  );
}
