import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat max-md:bg-[position:36%_center]"
          style={{
            backgroundImage: "url('/bg.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Overlay effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]"></div>
      <div className="pointer-events-none absolute inset-0 bg-orange-950/5 mix-blend-multiply"></div>

      {/* Hero Heading - जय छठ पूजा */}
      <div className="absolute inset-0 flex items-start justify-center pt-[10%] pointer-events-none">
        <h1
          className="text-center font-bold leading-none select-none"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 10rem)",
            fontFamily: "'Noto Sans Devanagari', 'Mangal', 'Kokila', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.08em",
            lineHeight: 1.1,
            color: "#FFD700",
            WebkitTextStroke: "2px #1a0a00",
            textShadow: `
              0 4px 8px rgba(0,0,0,0.8),
              0 2px 4px rgba(0,0,0,0.6),
              0 0 40px rgba(255,215,0,0.3),
              inset 0 -2px 4px rgba(0,0,0,0.3),
              inset 0 2px 4px rgba(255,255,200,0.2)
            `,
            transform: "scale(1)",
            filter: "brightness(1.1)",
          }}
        >
          जय छठी मैया
        </h1>
      </div>

      {/* Header */}
      <Header />

       {/* Music Player */}
      <MusicPlayer />

      {/* Footer */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center text-center text-white/40 text-xs">
        <span>Chhath Vibes</span>
      </div>
    </main>
  );
}
