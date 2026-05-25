"use client";

const SPARKLES = [
  { left: "8%", top: "12%", size: 3, delay: "0s", duration: "3.2s" },
  { left: "22%", top: "28%", size: 2, delay: "0.8s", duration: "4s" },
  { left: "78%", top: "8%", size: 4, delay: "1.2s", duration: "3.6s" },
  { left: "92%", top: "22%", size: 2, delay: "0.4s", duration: "4.4s" },
  { left: "65%", top: "38%", size: 3, delay: "1.8s", duration: "3.8s" },
  { left: "12%", top: "52%", size: 2, delay: "2.2s", duration: "4.2s" },
  { left: "88%", top: "58%", size: 3, delay: "0.6s", duration: "3.4s" },
  { left: "45%", top: "18%", size: 2, delay: "1.5s", duration: "5s" },
  { left: "35%", top: "72%", size: 4, delay: "2.8s", duration: "3.9s" },
  { left: "72%", top: "78%", size: 2, delay: "1s", duration: "4.6s" },
  { left: "55%", top: "88%", size: 3, delay: "2s", duration: "3.5s" },
  { left: "18%", top: "85%", size: 2, delay: "3s", duration: "4.1s" },
] as const;

export function OpticSparkles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <div className="absolute -left-[12%] top-[6%] h-[min(28rem,50vw)] w-[min(28rem,50vw)] animate-optic-drift rounded-full bg-[radial-gradient(circle,rgba(168,212,245,0.22)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute -right-[8%] top-[32%] h-[min(24rem,45vw)] w-[min(24rem,45vw)] animate-optic-drift-slow rounded-full bg-[radial-gradient(circle,rgba(126,184,232,0.18)_0%,transparent_72%)] blur-3xl [animation-delay:-6s]" />
      <div className="absolute bottom-[12%] left-[30%] h-[min(20rem,38vw)] w-[min(20rem,38vw)] animate-optic-drift rounded-full bg-[radial-gradient(circle,rgba(90,160,220,0.14)_0%,transparent_68%)] blur-3xl [animation-delay:-10s]" />

      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute animate-optic-sparkle rounded-full bg-[#b8dcfa] shadow-[0_0_10px_2px_rgba(168,212,245,0.55)]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      <div className="absolute left-[50%] top-[42%] h-px w-24 -translate-x-1/2 rotate-[-25deg] bg-gradient-to-r from-transparent via-[rgba(168,212,245,0.5)] to-transparent opacity-60 animate-optic-shimmer" />
      <div className="absolute right-[18%] top-[48%] h-px w-16 rotate-[35deg] bg-gradient-to-r from-transparent via-[rgba(140,195,240,0.45)] to-transparent opacity-50 animate-optic-shimmer [animation-delay:1.5s]" />
    </div>
  );
}
