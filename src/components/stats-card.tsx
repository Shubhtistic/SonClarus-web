export function StatsCard({ title, value, subtext, percent, color }: {
  title: string;
  value: string;
  subtext: string;
  percent?: number;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <p className="caption-sm text-muted-foreground mb-2">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="heading-xl text-primary font-heading-utility">{value}</h3>
        <p className="caption-md text-muted-foreground">{subtext}</p>
      </div>
      {percent !== undefined && (
        <div className="mt-4 h-1.5 w-full rounded-full bg-input overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color }} />
        </div>
      )}
    </div>
  );
}
