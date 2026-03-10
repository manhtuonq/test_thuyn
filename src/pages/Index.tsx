import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-heading">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-[1100px] mx-auto px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Bài viết</h1>
          <Link
            to="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Quản trị
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-[1100px] mx-auto px-8 py-10">
        {isLoading ? (
          <p className="font-mono text-muted-foreground">Đang tải...</p>
        ) : !posts || posts.length === 0 ? (
          <div className="border border-border rounded-sm p-10 text-center">
            <p className="font-mono text-muted-foreground">
              Chưa có bài viết nào. Hãy đăng nhập trang quản trị để tạo bài viết.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border border-border rounded-sm p-6 bg-card"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                {post.content && (
                  <p className="font-mono text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                    {post.content}
                  </p>
                )}
                <time className="block mt-4 text-xs font-mono text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
