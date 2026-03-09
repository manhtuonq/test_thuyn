export interface SiteData {
  logo: string;
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStatsNum: string;
  heroStatsLabel: string;
  heroPhotoUrl: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  skills: string[];
  services: { num: string; icon: string; title: string; desc: string }[];
  workItems: { id: string; category: string; name: string; bgClass: string }[];
  testimonials: { text: string; name: string; role: string; avatar: string }[];
  contactEmail: string;
  contactLocation: string;
  contactResponse: string;
  marqueeItems: string[];
  worksPageTitle: string;
  worksPageDesc: string;
  polaroids: { id: string; category: string; caption: string; badgeStyle: string; width: string; rotation: string }[];
  stickers: string[];
}

const DEFAULT_DATA: SiteData = {
  logo: "THUY.NGUYEN",
  heroTag: "Available for work",
  heroTitle: "Creative\nDesigner\n& Developer",
  heroSubtitle: "I craft beautiful digital experiences that blend thoughtful design with clean, performant code. Turning ideas into memorable products.",
  heroStatsNum: "5+",
  heroStatsLabel: "Years Experience",
  heroPhotoUrl: "",
  aboutTitle: "Crafting digital stories",
  aboutParagraphs: [
    "Hi, I'm THUY NGUYEN — a multidisciplinary creative based in Vietnam. I specialise in designing and building digital products that are both beautiful and functional.",
    "With over 5 years of experience working with brands, startups and agencies, I bring a blend of strategic thinking and hands-on craftsmanship to every project I touch.",
    "My work lives at the intersection of design and technology — where thoughtful aesthetics meet solid engineering."
  ],
  skills: ["Figma", "React", "Next.js", "TailwindCSS", "Motion Design", "TypeScript", "Photography", "Branding"],
  services: [
    { num: "01", icon: "✦", title: "UI/UX Design", desc: "User-centred interfaces built with empathy." },
    { num: "02", icon: "◈", title: "Web Development", desc: "Clean, performant code using modern frameworks." },
    { num: "03", icon: "◎", title: "Brand Identity", desc: "Strategic visual identities that tell your story." },
    { num: "04", icon: "⬡", title: "Motion Design", desc: "Purposeful animation that breathes life into interfaces." },
    { num: "05", icon: "✿", title: "Photography", desc: "Editorial and commercial photography." },
    { num: "06", icon: "⬦", title: "Creative Direction", desc: "Holistic creative leadership for campaigns." }
  ],
  workItems: [
    { id: "1", category: "UI/UX Design", name: "Bloom — Wellness App", bgClass: "bg-gradient-to-br from-[#E8D8D0] to-[#D4B8A8]" },
    { id: "2", category: "Branding", name: "Verdant Studio", bgClass: "bg-gradient-to-br from-[#EAD8D8] to-[#D8B8B8]" },
    { id: "3", category: "Web Development", name: "Cosmica Portfolio", bgClass: "bg-gradient-to-br from-[#E8E0D8] to-[#D0C4B8]" },
    { id: "4", category: "UI Design", name: "Nova Dashboard", bgClass: "bg-gradient-to-br from-[#F0D8D0] to-[#E0B8A8]" },
    { id: "5", category: "Photography", name: "Horizon Series", bgClass: "bg-gradient-to-br from-[#EAD8D0] to-[#D8C0B0]" },
    { id: "6", category: "Branding", name: "Aurum Collective", bgClass: "bg-gradient-to-br from-[#F0DADA] to-[#E0B8B8]" }
  ],
  testimonials: [
    { text: "THUY delivered beyond our expectations. The final product was stunning.", name: "Alex Chen", role: "CEO, Verdant Studio", avatar: "A" },
    { text: "The attention to detail and design sensibility is exceptional.", name: "Sarah Nguyen", role: "Founder, Bloom Wellness", avatar: "S" },
    { text: "Fast, communicative, and incredibly talented.", name: "Marcus Lee", role: "Creative Dir, Cosmica", avatar: "M" }
  ],
  contactEmail: "hello@THUYNGUYEN.xyz",
  contactLocation: "Ho Chi Minh City, Vietnam",
  contactResponse: "Within 24 hours",
  marqueeItems: ["UI/UX Design", "Web Development", "Brand Identity", "Motion Design", "Creative Direction", "Photography"],
  worksPageTitle: "My Works",
  worksPageDesc: "A collection spanning fashion design, video editing, brand collaborations, and creative direction.",
  polaroids: [
    { id: "1", category: "Fashion", caption: "Fashion Design", badgeStyle: "default", width: "224px", rotation: "-3deg" },
    { id: "2", category: "Video / CGI", caption: "Video Editing – CGI", badgeStyle: "default", width: "238px", rotation: "2deg" },
    { id: "3", category: "Brand", caption: "Brand Collaborations", badgeStyle: "default", width: "228px", rotation: "-1.5deg" },
    { id: "4", category: "Vlog", caption: "Vlog / Travel", badgeStyle: "default", width: "238px", rotation: "3.5deg" },
    { id: "5", category: "Hosting", caption: "VJ / Hosting", badgeStyle: "default", width: "220px", rotation: "-2.5deg" },
    { id: "6", category: "Speaker", caption: "Speaker / Diễn Giả", badgeStyle: "light", width: "238px", rotation: "1deg" }
  ],
  stickers: ["🐱", "😸", "🐈", "🧤", "😹", "🐾"]
};

export function getSiteData(): SiteData {
  try {
    const stored = localStorage.getItem("portfolio-data");
    if (stored) return { ...DEFAULT_DATA, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_DATA;
}

export function saveSiteData(data: Partial<SiteData>) {
  const current = getSiteData();
  localStorage.setItem("portfolio-data", JSON.stringify({ ...current, ...data }));
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem("admin-auth") === "true";
}

export function adminLogin(username: string, password: string): boolean {
  if (username === "tuongadmin" && password === "123123123") {
    sessionStorage.setItem("admin-auth", "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem("admin-auth");
}
