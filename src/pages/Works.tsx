import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import RevealOnScroll from "@/components/RevealOnScroll";
import CustomCursor from "@/components/CustomCursor";
import { getSiteData } from "@/lib/portfolio-data";

const CameraSVG = () => (
  <svg viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
    <rect x="8" y="55" width="244" height="228" rx="16" fill="#1A1A1A"/>
    <rect x="8" y="38" width="244" height="28" rx="7" fill="#222"/>
    <rect x="95" y="26" width="34" height="18" rx="4" fill="#888"/>
    <rect x="97" y="28" width="30" height="14" rx="3" fill="rgba(170,204,230,0.6)"/>
    <rect x="25" y="32" width="48" height="20" rx="4" fill="#333"/>
    <rect x="27" y="34" width="44" height="16" rx="3" fill="#445566"/>
    <rect x="25" y="88" width="110" height="18" rx="3" fill="#222"/>
    <text x="80" y="100" fontFamily="DM Sans,sans-serif" fontSize="8" fill="#B03020" textAnchor="middle" letterSpacing="1">instax mini 40</text>
    <circle cx="145" cy="185" r="72" fill="#111"/>
    <circle cx="145" cy="185" r="62" fill="#0a0a0a"/>
    <circle cx="145" cy="185" r="55" fill="none" stroke="#2a2a2a" strokeWidth="2.5"/>
    <circle cx="145" cy="185" r="46" fill="none" stroke="#222" strokeWidth="1.5"/>
    <circle cx="145" cy="185" r="32" fill="url(#lg1)"/>
    <ellipse cx="133" cy="173" rx="9" ry="6" fill="rgba(255,255,255,0.10)" transform="rotate(-30 133 173)"/>
    <circle cx="138" cy="170" r="3.5" fill="rgba(255,255,255,0.07)"/>
    <text x="145" y="228" fontFamily="DM Sans,sans-serif" fontSize="6.5" fill="#555" textAnchor="middle">INSTAX LENS 60mm</text>
    <text x="145" y="237" fontFamily="DM Sans,sans-serif" fontSize="5.5" fill="#444" textAnchor="middle">FOCUS RANGE 0.3m–∞</text>
    <circle cx="232" cy="138" r="11" fill="#1e1e1e"/>
    <circle cx="232" cy="138" r="4" fill="#2a2a2a"/>
    <rect x="45" y="272" width="170" height="7" rx="2" fill="#0a0a0a"/>
    <defs>
      <radialGradient id="lg1" cx="42%" cy="38%">
        <stop offset="0%" stopColor="#1a2a4a"/>
        <stop offset="45%" stopColor="#0d1a30"/>
        <stop offset="100%" stopColor="#050d1a"/>
      </radialGradient>
    </defs>
  </svg>
);

const polaroidBgs = [
  "bg-gradient-to-br from-[#F5F0EC] to-[#EDE0D8]",
  "bg-gradient-to-br from-[#F0F0EC] to-[#E4E8E0]",
  "bg-gradient-to-br from-[#EEF2F5] to-[#E0E8EE]",
  "bg-gradient-to-br from-[#F0F5EC] to-[#E0ECD8]",
  "bg-gradient-to-br from-[#F5EEF5] to-[#EAE0F0]",
  "bg-gradient-to-br from-[#1A1A2E] to-[#0D0D1A]",
];

export default function Works() {
  const [data, setData] = useState(getSiteData());
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setData(getSiteData());
  }, []);

  const filters = ["All", "Fashion", "Video", "Brand", "Hosting"];
  const worksMarquee = ["Fashion Design", "Video Editing", "Brand Collaborations", "CGI / Motion", "VJ / Hosting", "Content Creation"];
  const bottomMarquee = ["5+ Years Experience", ...worksMarquee];

  return (
    <div className="min-h-screen bg-background text-foreground cursor-none md:cursor-none">
      <CustomCursor />
      <Navbar />

      {/* TOP MARQUEE */}
      <div className="mt-[5.5rem]">
        <Marquee items={worksMarquee} />
      </div>

      {/* HERO HEADER */}
      <div className="px-8 lg:px-16 pt-16 pb-12 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-border gap-8">
        <div>
          <div className="inline-flex items-center gap-3 font-space text-[0.7rem] tracking-[0.2em] uppercase text-primary mb-4">
            <span className="w-6 h-px bg-primary" />Portfolio
          </div>
          <h1 className="font-playfair text-[clamp(4rem,8vw,7rem)] font-black leading-[0.92] tracking-tight">
            My<br/><em className="italic text-primary">Works</em>
          </h1>
        </div>
        <div className="flex flex-col items-end gap-4 pb-2">
          <p className="font-space text-[0.7rem] tracking-[0.08em] text-muted-foreground text-right max-w-[280px] leading-relaxed">
            {data.worksPageDesc}
          </p>
          <div className="flex gap-2.5 flex-wrap justify-end">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-space text-[0.65rem] tracking-[0.1em] uppercase border px-4 py-1.5 bg-transparent cursor-pointer transition-all ${
                  activeFilter === f
                    ? "border-primary text-primary bg-[rgba(176,48,32,0.04)]"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STAGE */}
      <div className="px-8 lg:px-16 py-16 relative min-h-[700px]">
        {/* Left panel */}
        <div className="lg:absolute lg:left-16 lg:top-14 z-20 flex lg:flex-col gap-8 lg:w-[220px] mb-8 lg:mb-0 flex-wrap">
          <div className="w-[200px]" style={{ animation: "floatCam 5s ease-in-out infinite", filter: "drop-shadow(4px 8px 22px rgba(0,0,0,0.18))" }}>
            <CameraSVG />
          </div>
          <div className="flex flex-wrap gap-1.5 w-[150px]">
            {data.stickers.map((s, i) => (
              <span
                key={i}
                className="cursor-pointer transition-transform hover:scale-[1.4] hover:rotate-12"
                style={{
                  fontSize: `${[2.2, 1.8, 2.4, 1.6, 2, 1.8][i]}rem`,
                  animation: `stickerWobble 3s ease-in-out infinite`,
                  animationDelay: `${[0, 0.4, 0.9, 0.2, 0.7, 1.1][i]}s`,
                  filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.10))",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Polaroid area */}
        <div className="lg:pl-[255px] flex flex-col gap-10">
          {/* Row 1 */}
          <RevealOnScroll>
            <div className="flex gap-11 items-start flex-wrap justify-center lg:justify-start">
              {data.polaroids.slice(0, 3).map((p, i) => (
                <div key={p.id} className="flex flex-col items-center gap-3 transition-transform hover:-translate-y-2.5">
                  <div
                    className="bg-white p-3 pb-12 shadow-[3px_6px_18px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.07)] relative cursor-pointer transition-all hover:shadow-[6px_16px_40px_rgba(176,48,32,0.14)] hover:scale-[1.04] hover:rotate-0 hoverable"
                    style={{ width: p.width, transform: `rotate(${p.rotation})` }}
                  >
                    {/* Tape */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 -rotate-2 w-[72px] h-6 bg-[rgba(176,48,32,0.11)] border border-[rgba(176,48,32,0.2)] rounded-sm z-[2]" />
                    {/* Red line on hover */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
                    <div className={`w-full aspect-[3/4] ${polaroidBgs[i]} relative overflow-hidden`}>
                      <span className={`absolute top-3 left-3 font-space text-[0.55rem] tracking-[0.12em] uppercase px-2 py-0.5 z-[5] ${
                        p.badgeStyle === "light" ? "bg-white text-primary border border-[rgba(176,48,32,0.3)]" : "bg-primary text-white"
                      }`}>
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="font-playfair text-base font-bold text-foreground text-center">{p.caption}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Row 2 */}
          <RevealOnScroll delay={0.15}>
            <div className="flex gap-11 items-start flex-wrap justify-center lg:justify-start">
              {data.polaroids.slice(3, 6).map((p, i) => (
                <div key={p.id} className="flex flex-col items-center gap-3 transition-transform hover:-translate-y-2.5">
                  <div
                    className="bg-white p-3 pb-12 shadow-[3px_6px_18px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.07)] relative cursor-pointer transition-all hover:shadow-[6px_16px_40px_rgba(176,48,32,0.14)] hover:scale-[1.04] hover:rotate-0 hoverable"
                    style={{ width: p.width, transform: `rotate(${p.rotation})` }}
                  >
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rotate-[3.5deg] w-[62px] h-6 bg-[rgba(176,48,32,0.11)] border border-[rgba(176,48,32,0.2)] rounded-sm z-[2]" />
                    <div className={`w-full aspect-[3/4] ${polaroidBgs[i + 3]} relative overflow-hidden`}>
                      <span className={`absolute top-3 left-3 font-space text-[0.55rem] tracking-[0.12em] uppercase px-2 py-0.5 z-[5] ${
                        p.badgeStyle === "light" ? "bg-white text-primary border border-[rgba(176,48,32,0.3)]" : "bg-primary text-white"
                      }`}>
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="font-playfair text-base font-bold text-foreground text-center">{p.caption}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* BOTTOM MARQUEE */}
      <Marquee items={bottomMarquee} reverse />

      <Footer />
    </div>
  );
}
