export function ActivityLog() {
  const logs = [
    { id: 1, action: "Uploaded interview_v2.wav", time: "2m ago" },
    { id: 2, action: "Job #019... processed", time: "1h ago" },
    { id: 3, action: "User login from IP", time: "3h ago" },
  ];

  return (
    <div className="rounded-lg border border-border bg-card">
      {logs.map((log) => (
        <div key={log.id} className="flex items-center justify-between p-4 border-b border-border last:border-0">
          <p className="body-sm text-foreground font-body">{log.action}</p>
          <p className="font-mono text-[11px] text-muted-foreground">{log.time}</p>
        </div>
      ))}
    </div>
  );
}
