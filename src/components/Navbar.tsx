import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSiteData } from "@/lib/portfolio-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const data = getSiteData();
  const logoParts = data.logo.split(".");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/works", label: "My Works" },
    { href: "/#work", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 lg:px-16 py-8 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="absolute bottom-0 left-16 right-16 h-px bg-border" />
      <Link to="/" className="font-playfair text-2xl font-bold text-foreground tracking-tight">
        {logoParts[0]}<span className="text-primary">.</span>{logoParts[1] || ""}
      </Link>
      <ul className="hidden md:flex gap-10 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className={`font-space text-xs tracking-[0.15em] uppercase transition-colors hover:text-foreground ${
                location.pathname === link.href || (link.href === "/works" && location.pathname === "/works")
                  ? "text-primary border-b border-primary pb-0.5"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/#contact"
        className="text-xs tracking-[0.1em] uppercase border border-primary text-primary px-5 py-2.5 transition-all hover:bg-primary hover:text-primary-foreground"
      >
        Hire Me
      </Link>
    </nav>
  );
}
