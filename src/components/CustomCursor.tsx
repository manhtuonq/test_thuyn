import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    const animate = () => {
      followerPos.current.x += (mouse.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (mouse.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = followerPos.current.x + "px";
        followerRef.current.style.top = followerPos.current.y + "px";
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    animate();

    // Hover effects
    const addHover = () => {
      document.querySelectorAll("a, button, .hoverable").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(2)";
          if (followerRef.current) followerRef.current.style.transform = "translate(-50%,-50%) scale(1.5)";
        });
        el.addEventListener("mouseleave", () => {
          if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)";
          if (followerRef.current) followerRef.current.style.transform = "translate(-50%,-50%) scale(1)";
        });
      });
    };

    const timer = setTimeout(addHover, 500);
    return () => {
      document.removeEventListener("mousemove", onMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />
    </>
  );
}
