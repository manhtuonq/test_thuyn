import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import RevealOnScroll from "@/components/RevealOnScroll";
import CustomCursor from "@/components/CustomCursor";
import { fetchSiteData, SiteData, getSiteData } from "@/lib/portfolio-data";

const Index = () => {
  const [data, setData] = useState<SiteData>(getSiteData());

  useEffect(() => {
    fetchSiteData().then(setData);
  }, []);

  const titleLines = data.heroTitle.split("\n");

  return (
    <div className="min-h-screen bg-background text-foreground cursor-none md:cursor-none">
      <CustomCursor />
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-8 lg:px-16 pt-28 relative overflow-hidden">
        {/* Background circle */}
        <div className="absolute w-[600px] h-[600px] rounded-full right-[-100px] top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(176,48,32,0.06) 0%, transparent 70%)" }} />

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="inline-flex items-center gap-2.5 font-space text-[0.72rem] text-primary tracking-[0.12em] uppercase mb-8"
          >
            <span className="w-8 h-px bg-primary" />
            {data.heroTag}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.8 }}
            className="font-playfair text-[clamp(3.5rem,6vw,6rem)] font-black leading-[1] tracking-tight mb-6"
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {i === 1 ? <em className="italic text-primary">{line}</em> : line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.8 }}
            className="text-base text-muted-foreground leading-relaxed max-w-[420px] mb-12"
          >
            {data.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.8 }}
            className="flex gap-5 items-center"
          >
            <a href="#work" className="bg-primary text-primary-foreground px-8 py-4 text-[0.82rem] font-medium tracking-[0.1em] uppercase relative overflow-hidden group">
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>
            <a href="#contact" className="text-foreground text-[0.82rem] tracking-[0.1em] uppercase flex items-center gap-2.5 hover:gap-4 transition-all">
              Let's Talk
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Hero Right - Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center items-center relative mt-12 md:mt-0"
        >
          <div className="relative w-[420px] max-w-full">
            <div className="absolute -top-5 -right-5 w-full h-full border border-primary opacity-35 z-0" />
            {data.heroPhotoUrl ? (
              <img src={data.heroPhotoUrl} alt="Portrait" className="w-full aspect-[3/4] object-cover relative z-[1] grayscale-[20%]" />
            ) : (
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#EBEBEB] via-[#D8D8D8] to-[#EBEBEB] flex items-center justify-center relative z-[1]">
                <span className="font-space text-[0.7rem] tracking-[0.2em] text-[#BBB]">YOUR PHOTO</span>
              </div>
            )}
            <div className="absolute -bottom-[30px] -left-10 bg-foreground border border-foreground p-5 z-[2]">
              <div className="font-playfair text-3xl font-bold text-primary">{data.heroStatsNum}</div>
              <div className="text-[0.72rem] text-[#AAA] tracking-[0.1em] uppercase">{data.heroStatsLabel}</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
          <div className="w-px h-[60px] bg-gradient-to-b from-primary to-transparent" style={{ animation: "scrollPulse 2s infinite" }} />
          <span className="font-space text-[0.6rem] tracking-[0.2em] text-muted-foreground" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={data.marqueeItems} />

      {/* ABOUT */}
      <section id="about" className="px-8 lg:px-16 py-32 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <RevealOnScroll>
          <div className="relative h-[500px]">
            <div className="absolute top-0 left-0 w-3/4 aspect-[3/4] bg-gradient-to-br from-[#E8E0D8] to-[#D5CBC0] overflow-hidden">
              <div className="absolute top-5 left-5 font-space text-[0.6rem] tracking-[0.15em] text-primary bg-white/85 px-2.5 py-1">
                {data.logo.replace(".", " ")} / PORTRAIT
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-[55%] aspect-square bg-gradient-to-br from-[#F0E8E0] to-[#E0D0C8] border-[3px] border-background">
              <div className="absolute top-5 left-5 font-space text-[0.6rem] tracking-[0.15em] text-primary bg-white/85 px-2.5 py-1">
                STUDIO
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="inline-flex items-center gap-3 font-space text-[0.7rem] tracking-[0.2em] uppercase text-primary mb-4">
            <span className="w-6 h-px bg-primary" />About Me
          </div>
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tight mb-6">
            Crafting <em className="italic text-primary">digital</em> stories
          </h2>
          {data.aboutParagraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-[0.95rem] mb-6">{p}</p>
          ))}
          <div className="flex flex-wrap gap-2.5 mt-8">
            {data.skills.map((skill) => (
              <span key={skill} className="font-space text-[0.7rem] tracking-[0.1em] uppercase border border-border text-muted-foreground px-3.5 py-1.5 hover:border-primary hover:text-primary transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-8 lg:px-16 py-32 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-16">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-3 font-space text-[0.7rem] tracking-[0.2em] uppercase text-primary mb-4">
              <span className="w-6 h-px bg-primary" />What I Do
            </div>
            <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tight">
              Services &<br/><em className="italic text-primary">Expertise</em>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
              I offer end-to-end creative services — from early strategy and ideation through to pixel-perfect execution and deployment.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {data.services.map((svc) => (
              <div key={svc.num} className="bg-background p-10 transition-colors hover:bg-card relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                <div className="font-space text-[0.7rem] text-[#CCC] tracking-[0.1em] mb-8">{svc.num}</div>
                <div className="text-3xl mb-5">{svc.icon}</div>
                <div className="font-playfair text-xl mb-3 text-foreground">{svc.title}</div>
                <p className="text-[0.85rem] text-muted-foreground leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* WORK */}
      <section id="work" className="px-8 lg:px-16 py-32 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-3 font-space text-[0.7rem] tracking-[0.2em] uppercase text-primary mb-4">
              <span className="w-6 h-px bg-primary" />Portfolio
            </div>
            <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tight">
              Selected <em className="italic text-primary">Work</em>
            </h2>
          </RevealOnScroll>
          <div className="flex gap-4">
            {["All", "Design", "Dev", "Brand"].map((f, i) => (
              <button key={f} className={`font-space text-[0.7rem] tracking-[0.1em] uppercase bg-transparent px-4 py-2 cursor-pointer transition-all border-b ${i === 0 ? "text-foreground border-primary" : "text-muted-foreground border-transparent hover:text-foreground hover:border-primary"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <RevealOnScroll>
          <div className="grid grid-cols-12 auto-rows-[200px] gap-px bg-border">
            {data.workItems.map((item, i) => {
              const spans = [
                "col-span-12 md:col-span-7 row-span-2",
                "col-span-12 md:col-span-5 row-span-1",
                "col-span-12 md:col-span-5 row-span-1",
                "col-span-12 md:col-span-4 row-span-2",
                "col-span-12 md:col-span-4 row-span-2",
                "col-span-12 md:col-span-4 row-span-2"
              ];
              return (
                <div key={item.id} className={`${spans[i]} relative overflow-hidden cursor-pointer group hoverable`}>
                  <div className={`absolute inset-0 ${item.bgClass} transition-transform duration-600 group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,28,28,0.92)] to-transparent via-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="font-space text-[0.65rem] tracking-[0.15em] uppercase text-primary mb-1">{item.category}</div>
                    <div className="font-playfair text-xl text-white">{item.name}</div>
                  </div>
                  <div className="absolute top-6 right-6 w-9 h-9 border border-white flex items-center justify-center opacity-0 -rotate-45 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-8 lg:px-16 py-32 border-t border-border">
        <RevealOnScroll className="text-center">
          <div className="inline-flex items-center gap-3 font-space text-[0.7rem] tracking-[0.2em] uppercase text-primary mb-4 justify-center">
            <span className="w-6 h-px bg-primary" />Testimonials
          </div>
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tight">
            What clients <em className="italic text-primary">say</em>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-16 border border-border">
            {data.testimonials.map((t, i) => (
              <div key={i} className="bg-background p-10 transition-colors hover:bg-card">
                <span className="font-playfair text-6xl text-primary leading-[0.5] block mb-6">"</span>
                <p className="text-[0.9rem] text-muted-foreground leading-relaxed italic mb-8">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center font-playfair text-base text-primary">{t.avatar}</div>
                  <div>
                    <div className="font-medium text-[0.9rem] text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground font-space">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-8 lg:px-16 py-32 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-3 font-space text-[0.7rem] tracking-[0.2em] uppercase text-primary mb-4">
            <span className="w-6 h-px bg-primary" />Get In Touch
          </div>
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tight mb-6">
            Let's work<br/><em className="italic text-primary">together</em>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-12">Have a project in mind? I'd love to hear about it.</p>
          <div className="flex flex-col gap-4">
            {[
              { icon: "✉", label: "Email", value: data.contactEmail },
              { icon: "📍", label: "Location", value: data.contactLocation },
              { icon: "⏱", label: "Response Time", value: data.contactResponse },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 p-5 border border-border hover:border-primary transition-colors">
                <div className="w-10 h-10 bg-card flex items-center justify-center text-xl shrink-0">{c.icon}</div>
                <div>
                  <div className="font-space text-[0.65rem] tracking-[0.1em] uppercase text-muted-foreground">{c.label}</div>
                  <div className="text-[0.9rem] text-foreground">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {[
              { label: "Your Name", type: "text", placeholder: "John Doe" },
              { label: "Email Address", type: "email", placeholder: "john@example.com" },
              { label: "Project Type", type: "text", placeholder: "UI Design / Web Dev / Branding..." },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-2">
                <label className="font-space text-[0.65rem] tracking-[0.1em] uppercase text-muted-foreground">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="bg-card border border-border text-foreground px-5 py-4 font-dm text-[0.9rem] outline-none focus:border-primary transition-colors" />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label className="font-space text-[0.65rem] tracking-[0.1em] uppercase text-muted-foreground">Message</label>
              <textarea placeholder="Tell me about your project..." className="bg-card border border-border text-foreground px-5 py-4 font-dm text-[0.9rem] outline-none focus:border-primary transition-colors resize-y min-h-[120px]" />
            </div>
            <button type="submit" className="bg-primary text-primary-foreground border-none px-10 py-4 font-dm text-[0.85rem] font-medium tracking-[0.1em] uppercase cursor-pointer hover:opacity-85 transition-opacity self-start">
              Send Message →
            </button>
          </form>
        </RevealOnScroll>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
