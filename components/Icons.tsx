/** SVG sprite rendered once in the root layout; reference with <Icon name="..." />. */
export function IconSprite() {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.4 } as const;
  const s24 = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="i-decor" viewBox="0 0 48 48" {...s}><path d="M24 6c-5 6-5 12 0 16 5-4 5-10 0-16z" /><path d="M24 22c-7-3-13-1-15 5 6 2 12 0 15-5zM24 22c7-3 13-1 15 5-6 2-12 0-15-5z" /><path d="M24 22v12" /><path d="M15 34h18l-3 8H18z" /></symbol>
        <symbol id="i-music" viewBox="0 0 48 48" {...s}><circle cx="24" cy="24" r="17" /><circle cx="24" cy="24" r="4" /><circle cx="24" cy="24" r="10" strokeDasharray="2 3" /><path d="M38 8l-8 10" /></symbol>
        <symbol id="i-glass" viewBox="0 0 48 48" {...s}><path d="M10 8h28L24 24z" /><path d="M24 24v14M16 40h16" /><path d="M14 12h20" /><circle cx="33" cy="9" r="3" /></symbol>
        <symbol id="i-crown" viewBox="0 0 48 48" {...s}><path d="M8 34l-2-20 10 8 8-12 8 12 10-8-2 20z" /><path d="M8 40h32" /></symbol>
        <symbol id="i-chair" viewBox="0 0 48 48" {...s}><path d="M15 6h18v18H15z" /><path d="M19 6v18M24 6v18M29 6v18" /><path d="M12 24h24v4H12z" /><path d="M14 28l-2 14M34 28l2 14M18 28v10M30 28v10" /></symbol>
        <symbol id="i-bar" viewBox="0 0 48 48" {...s}><path d="M14 10h10l-1 8c0 3-2 5-4 5s-4-2-4-5z" /><path d="M19 23v13M14 38h10" /><path d="M30 14h6v22a3 3 0 0 1-6 0z" /><path d="M30 20h6" /><path d="M33 8v6" /></symbol>
        <symbol id="i-catering" viewBox="0 0 48 48" {...s}><path d="M6 34h36" /><path d="M9 34a15 15 0 0 1 30 0" /><path d="M24 15v-4M21 11h6" /><path d="M4 39h40" /></symbol>
        <symbol id="i-light" viewBox="0 0 48 48" {...s}><path d="M18 30l-6 12h24l-6-12z" /><circle cx="24" cy="18" r="6" /><path d="M24 4v4M10 18H6M42 18h-4M14 8l3 3M34 8l-3 3" /></symbol>
        <symbol id="i-mic" viewBox="0 0 48 48" {...s}><rect x="18" y="6" width="12" height="22" rx="6" /><path d="M12 22a12 12 0 0 0 24 0M24 34v8M17 42h14" /></symbol>
        <symbol id="i-drum" viewBox="0 0 48 48" {...s}><ellipse cx="10" cy="24" rx="4" ry="10" /><ellipse cx="38" cy="24" rx="4" ry="10" /><path d="M10 14h28M10 34h28" /><path d="M14 16l8 16 8-16 6 16" /></symbol>
        <symbol id="i-sync" viewBox="0 0 48 48" {...s}><circle cx="24" cy="24" r="16" /><path d="M24 14v10l7 5" /></symbol>
        <symbol id="i-shield" viewBox="0 0 48 48" {...s}><path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10z" /><path d="M17 24l5 5 9-10" /></symbol>
        <symbol id="i-clock" viewBox="0 0 48 48" {...s}><circle cx="24" cy="24" r="17" /><path d="M24 13v11h9" /></symbol>
        <symbol id="i-mail" viewBox="0 0 24 24" {...s24}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 6l9 7 9-7" /></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24" {...s24}><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" /></symbol>
        <symbol id="i-pin" viewBox="0 0 24 24" {...s24}><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></symbol>
        <symbol id="i-ig" viewBox="0 0 24 24" {...s24}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></symbol>
        <symbol id="i-sc" viewBox="0 0 24 24" fill="currentColor"><path d="M11 8v9h8a3 3 0 0 0 0-6 5 5 0 0 0-8-3zM9 9v8h1V9zM7 10v7h1v-7zM5 11v6h1v-6zM3 13v4h1v-4z" /></symbol>
        <symbol id="i-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" /></symbol>
        <symbol id="i-note" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3h3a4 4 0 0 0 4 4v3a7 7 0 0 1-4-1.3V15a6 6 0 1 1-6-6v3.2a2.8 2.8 0 1 0 3 2.8z" /></symbol>
        <symbol id="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></symbol>
        <symbol id="i-cal" viewBox="0 0 24 24" {...s24}><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 10h18M8 3v4M16 3v4" /></symbol>
        <symbol id="i-info" viewBox="0 0 24 24" {...s24}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></symbol>
      </defs>
    </svg>
  );
}

export type IconName =
  | "decor" | "music" | "glass" | "crown" | "chair" | "bar" | "catering" | "light" | "mic" | "drum"
  | "sync" | "shield" | "clock" | "mail" | "phone" | "pin" | "ig" | "sc" | "star" | "note" | "play" | "cal" | "info";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
