import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSiteData,
  saveSiteData,
  isAdminLoggedIn,
  adminLogin,
  adminLogout,
  SiteData,
} from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(username, password)) {
      onLogin();
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-playfair text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">Đăng nhập</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  const [data, setData] = useState<SiteData>(getSiteData());
  const [activeTab, setActiveTab] = useState<"general" | "services" | "works" | "testimonials" | "polaroids">("general");
  const { toast } = useToast();
  const navigate = useNavigate();

  const save = (updates: Partial<SiteData>) => {
    const newData = { ...data, ...updates };
    saveSiteData(newData);
    setData(newData);
    toast({ title: "Đã lưu!", description: "Thay đổi đã được cập nhật." });
  };

  const handleLogout = () => {
    adminLogout();
    navigate("/admin");
    window.location.reload();
  };

  const tabs = [
    { key: "general" as const, label: "Tổng quan" },
    { key: "services" as const, label: "Dịch vụ" },
    { key: "works" as const, label: "Tác phẩm" },
    { key: "testimonials" as const, label: "Đánh giá" },
    { key: "polaroids" as const, label: "Polaroids" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-playfair text-xl font-bold">Admin Panel</h1>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>Xem trang</Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>Đăng xuất</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-6 flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {activeTab === "general" && (
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Thông tin chung</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Logo</label>
                  <Input value={data.logo} onChange={(e) => setData({ ...data, logo: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Hero Tag</label>
                  <Input value={data.heroTag} onChange={(e) => setData({ ...data, heroTag: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Hero Title (dùng \n để xuống dòng)</label>
                  <Textarea value={data.heroTitle} onChange={(e) => setData({ ...data, heroTitle: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Hero Subtitle</label>
                  <Textarea value={data.heroSubtitle} onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Hero Photo URL</label>
                  <Input value={data.heroPhotoUrl} onChange={(e) => setData({ ...data, heroPhotoUrl: e.target.value })} placeholder="https://..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Stats Number</label>
                    <Input value={data.heroStatsNum} onChange={(e) => setData({ ...data, heroStatsNum: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Stats Label</label>
                    <Input value={data.heroStatsLabel} onChange={(e) => setData({ ...data, heroStatsLabel: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input value={data.contactEmail} onChange={(e) => setData({ ...data, contactEmail: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Input value={data.contactLocation} onChange={(e) => setData({ ...data, contactLocation: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Skills (phẩy cách)</label>
                  <Input value={data.skills.join(", ")} onChange={(e) => setData({ ...data, skills: e.target.value.split(",").map(s => s.trim()) })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Marquee Items (phẩy cách)</label>
                  <Input value={data.marqueeItems.join(", ")} onChange={(e) => setData({ ...data, marqueeItems: e.target.value.split(",").map(s => s.trim()) })} />
                </div>
                <Button onClick={() => save(data)}>Lưu thay đổi</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-4">
            {data.services.map((svc, i) => (
              <Card key={i}>
                <CardContent className="pt-6 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <Input placeholder="Số" value={svc.num} onChange={(e) => {
                      const s = [...data.services]; s[i] = { ...s[i], num: e.target.value }; setData({ ...data, services: s });
                    }} />
                    <Input placeholder="Icon" value={svc.icon} onChange={(e) => {
                      const s = [...data.services]; s[i] = { ...s[i], icon: e.target.value }; setData({ ...data, services: s });
                    }} />
                    <Input placeholder="Tiêu đề" value={svc.title} onChange={(e) => {
                      const s = [...data.services]; s[i] = { ...s[i], title: e.target.value }; setData({ ...data, services: s });
                    }} />
                  </div>
                  <Textarea placeholder="Mô tả" value={svc.desc} onChange={(e) => {
                    const s = [...data.services]; s[i] = { ...s[i], desc: e.target.value }; setData({ ...data, services: s });
                  }} />
                  <Button variant="destructive" size="sm" onClick={() => {
                    const s = data.services.filter((_, idx) => idx !== i);
                    setData({ ...data, services: s });
                  }}>Xóa</Button>
                </CardContent>
              </Card>
            ))}
            <Button onClick={() => setData({ ...data, services: [...data.services, { num: String(data.services.length + 1).padStart(2, "0"), icon: "✦", title: "Mới", desc: "Mô tả" }] })}>
              + Thêm dịch vụ
            </Button>
            <Button className="ml-3" onClick={() => save({ services: data.services })}>Lưu</Button>
          </div>
        )}

        {activeTab === "works" && (
          <div className="space-y-4">
            {data.workItems.map((item, i) => (
              <Card key={i}>
                <CardContent className="pt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Category" value={item.category} onChange={(e) => {
                      const w = [...data.workItems]; w[i] = { ...w[i], category: e.target.value }; setData({ ...data, workItems: w });
                    }} />
                    <Input placeholder="Tên" value={item.name} onChange={(e) => {
                      const w = [...data.workItems]; w[i] = { ...w[i], name: e.target.value }; setData({ ...data, workItems: w });
                    }} />
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => {
                    const w = data.workItems.filter((_, idx) => idx !== i);
                    setData({ ...data, workItems: w });
                  }}>Xóa</Button>
                </CardContent>
              </Card>
            ))}
            <Button onClick={() => setData({ ...data, workItems: [...data.workItems, { id: Date.now().toString(), category: "New", name: "New Work", bgClass: "bg-gradient-to-br from-[#E8D8D0] to-[#D4B8A8]" }] })}>
              + Thêm tác phẩm
            </Button>
            <Button className="ml-3" onClick={() => save({ workItems: data.workItems })}>Lưu</Button>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="space-y-4">
            {data.testimonials.map((t, i) => (
              <Card key={i}>
                <CardContent className="pt-6 space-y-3">
                  <Textarea placeholder="Nội dung" value={t.text} onChange={(e) => {
                    const ts = [...data.testimonials]; ts[i] = { ...ts[i], text: e.target.value }; setData({ ...data, testimonials: ts });
                  }} />
                  <div className="grid grid-cols-3 gap-3">
                    <Input placeholder="Tên" value={t.name} onChange={(e) => {
                      const ts = [...data.testimonials]; ts[i] = { ...ts[i], name: e.target.value }; setData({ ...data, testimonials: ts });
                    }} />
                    <Input placeholder="Chức vụ" value={t.role} onChange={(e) => {
                      const ts = [...data.testimonials]; ts[i] = { ...ts[i], role: e.target.value }; setData({ ...data, testimonials: ts });
                    }} />
                    <Input placeholder="Avatar" value={t.avatar} onChange={(e) => {
                      const ts = [...data.testimonials]; ts[i] = { ...ts[i], avatar: e.target.value }; setData({ ...data, testimonials: ts });
                    }} />
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => {
                    const ts = data.testimonials.filter((_, idx) => idx !== i);
                    setData({ ...data, testimonials: ts });
                  }}>Xóa</Button>
                </CardContent>
              </Card>
            ))}
            <Button onClick={() => setData({ ...data, testimonials: [...data.testimonials, { text: "Mới", name: "Tên", role: "Role", avatar: "N" }] })}>
              + Thêm đánh giá
            </Button>
            <Button className="ml-3" onClick={() => save({ testimonials: data.testimonials })}>Lưu</Button>
          </div>
        )}

        {activeTab === "polaroids" && (
          <div className="space-y-4">
            {data.polaroids.map((p, i) => (
              <Card key={i}>
                <CardContent className="pt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Category" value={p.category} onChange={(e) => {
                      const ps = [...data.polaroids]; ps[i] = { ...ps[i], category: e.target.value }; setData({ ...data, polaroids: ps });
                    }} />
                    <Input placeholder="Caption" value={p.caption} onChange={(e) => {
                      const ps = [...data.polaroids]; ps[i] = { ...ps[i], caption: e.target.value }; setData({ ...data, polaroids: ps });
                    }} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Input placeholder="Width" value={p.width} onChange={(e) => {
                      const ps = [...data.polaroids]; ps[i] = { ...ps[i], width: e.target.value }; setData({ ...data, polaroids: ps });
                    }} />
                    <Input placeholder="Rotation" value={p.rotation} onChange={(e) => {
                      const ps = [...data.polaroids]; ps[i] = { ...ps[i], rotation: e.target.value }; setData({ ...data, polaroids: ps });
                    }} />
                    <select
                      className="border border-input rounded-md px-3 py-2 text-sm bg-background"
                      value={p.badgeStyle}
                      onChange={(e) => {
                        const ps = [...data.polaroids]; ps[i] = { ...ps[i], badgeStyle: e.target.value }; setData({ ...data, polaroids: ps });
                      }}
                    >
                      <option value="default">Badge tối</option>
                      <option value="light">Badge sáng</option>
                    </select>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => {
                    const ps = data.polaroids.filter((_, idx) => idx !== i);
                    setData({ ...data, polaroids: ps });
                  }}>Xóa</Button>
                </CardContent>
              </Card>
            ))}
            <Button onClick={() => setData({ ...data, polaroids: [...data.polaroids, { id: Date.now().toString(), category: "New", caption: "New", badgeStyle: "default", width: "224px", rotation: "0deg" }] })}>
              + Thêm polaroid
            </Button>
            <Button className="ml-3" onClick={() => save({ polaroids: data.polaroids })}>Lưu</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());

  if (!loggedIn) {
    return <LoginForm onLogin={() => setLoggedIn(true)} />;
  }

  return <AdminDashboard />;
}
