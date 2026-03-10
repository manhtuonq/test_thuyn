import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Session } from "@supabase/supabase-js";

type Post = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  updated_at: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate("/login");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate("/login");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Post[];
    },
    enabled: !!session,
  });

  const createMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      const { error } = await supabase.from("posts").insert({ title, content });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetForm();
      triggerSaved();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, title, content }: { id: string; title: string; content: string }) => {
      const { error } = await supabase.from("posts").update({ title, content }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetForm();
      triggerSaved();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (editingPost) resetForm();
    },
  });

  const resetForm = () => {
    setEditingPost(null);
    setTitle("");
    setContent("");
  };

  const triggerSaved = () => {
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaveState("saving");
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, title, content });
    } else {
      createMutation.mutate({ title, content });
    }
  };

  const startEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content || "");
    setSaveState("idle");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-heading">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-[1100px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold">Quản trị</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-admin/10 text-admin">
              admin
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              Xem trang
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-[1100px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8">
          {/* Left: Form */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {editingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-[72px_1fr] items-center gap-2">
                <label className="text-sm font-medium text-right">Tiêu đề</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="font-mono text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-[72px_1fr] items-start gap-2">
                <label className="text-sm font-medium text-right pt-2">Nội dung</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="font-mono text-sm min-h-[160px]"
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-[72px_1fr] gap-2">
                <div />
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={saveState === "saving"}
                    className={saveState === "saved" ? "animate-save-fade border" : ""}
                  >
                    {saveState === "saved" ? "Đã lưu" : saveState === "saving" ? "Đang lưu..." : "Lưu"}
                  </Button>
                  {editingPost && (
                    <Button type="button" variant="ghost" onClick={resetForm}>
                      Hủy
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Right: Post list */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Danh sách bài viết
            </h2>
            {!posts || posts.length === 0 ? (
              <p className="font-mono text-sm text-muted-foreground">Chưa có bài viết.</p>
            ) : (
              <div className="space-y-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`border rounded-sm p-4 transition-colors ${
                      editingPost?.id === post.id
                        ? "border-admin bg-admin/5"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm truncate">{post.title}</h3>
                        {post.content && (
                          <p className="font-mono text-xs text-muted-foreground mt-1 line-clamp-2">
                            {post.content}
                          </p>
                        )}
                        <time className="block mt-2 text-xs font-mono text-muted-foreground">
                          {new Date(post.updated_at).toLocaleDateString("vi-VN")}
                        </time>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(post)}
                          className="text-xs"
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm("Xóa bài viết này?")) {
                              deleteMutation.mutate(post.id);
                            }
                          }}
                          className="text-xs text-destructive hover:text-destructive"
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
