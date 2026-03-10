import { supabase } from "@/integrations/supabase/client";

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
    "Hi, I'm THUY NGUYEN — a multidisciplinary creative based in Vietnam.",
    "With over 5 years of experience working with brands, startups and agencies.",
    "My work lives at the intersection of design and technology."
  ],
  skills: ["Figma", "React", "Next.js", "TailwindCSS", "Motion Design", "TypeScript", "Photography", "Branding"],
  services: [],
  workItems: [],
  testimonials: [],
  contactEmail: "hello@THUYNGUYEN.xyz",
  contactLocation: "Ho Chi Minh City, Vietnam",
  contactResponse: "Within 24 hours",
  marqueeItems: ["UI/UX Design", "Web Development", "Brand Identity", "Motion Design", "Creative Direction", "Photography"],
  worksPageTitle: "My Works",
  worksPageDesc: "A collection spanning fashion design, video editing, brand collaborations, and creative direction.",
  polaroids: [],
  stickers: ["🐱", "😸", "🐈", "🧤", "😹", "🐾"]
};

// Fetch site data from Supabase
export async function fetchSiteData(): Promise<SiteData> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("data")
      .eq("id", "main")
      .single();

    if (error || !data) {
      console.warn("Could not fetch site data from DB, using defaults:", error?.message);
      return DEFAULT_DATA;
    }

    return { ...DEFAULT_DATA, ...(data.data as Partial<SiteData>) };
  } catch (e) {
    console.warn("fetchSiteData error:", e);
    return DEFAULT_DATA;
  }
}

// Save site data to Supabase (upsert)
export async function saveSiteDataToDB(updates: Partial<SiteData>): Promise<boolean> {
  try {
    // First fetch current
    const current = await fetchSiteData();
    const merged = { ...current, ...updates };

    const { error } = await supabase
      .from("site_settings")
      .update({ data: JSON.parse(JSON.stringify(merged)) })
      .eq("id", "main");

    if (error) {
      console.error("saveSiteData error:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("saveSiteData error:", e);
    return false;
  }
}

// Legacy sync functions (kept for fallback)
export function getSiteData(): SiteData {
  return DEFAULT_DATA;
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
