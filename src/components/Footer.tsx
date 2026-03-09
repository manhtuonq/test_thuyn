import { getSiteData } from "@/lib/portfolio-data";

export default function Footer() {
  const data = getSiteData();
  const logoParts = data.logo.split(".");

  return (
    <footer className="border-t border-border px-8 lg:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-playfair text-xl font-bold">
        {logoParts[0]}<span className="text-primary">.</span>{logoParts[1] || ""}
      </div>
      <div className="font-space text-[0.65rem] tracking-[0.1em] text-muted-foreground">
        © 2025 {data.logo.replace(".", " ")}. All rights reserved.
      </div>
      <div className="flex gap-4">
        {["instagram", "linkedin", "github"].map((s) => (
          <a
            key={s}
            href="#"
            className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            <span className="text-xs">{s[0].toUpperCase()}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}
