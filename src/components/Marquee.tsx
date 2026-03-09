interface MarqueeProps {
  items: string[];
  reverse?: boolean;
}

export default function Marquee({ items, reverse = false }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-t border-b border-border py-5 bg-background">
      <div
        className="flex gap-12 w-max"
        style={{
          animation: `marquee ${reverse ? "22s" : "20s"} linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-4 whitespace-nowrap">
            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <span className="font-playfair text-base italic text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
