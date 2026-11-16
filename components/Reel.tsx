"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icons";

export function Reel({ src, poster, kicker, title, wide }: { src: string; poster: string; kicker: string; title: string; wide?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    const v = ref.current;
    if (!v) return;
    // Only one reel plays at a time.
    document.querySelectorAll<HTMLVideoElement>(".reel video").forEach((o) => o !== v && o.pause());
    v.controls = true;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play();
    });
  }

  return (
    <div className={`reel reveal${wide ? " wide" : ""}${playing ? " playing" : ""}`}>
      <video
        ref={ref}
        preload="none"
        playsInline
        poster={poster}
        src={src}
        onPlay={() => setPlaying(true)}
        onPause={(e) => {
          const v = e.currentTarget;
          if (v.currentTime === 0 || v.ended) setPlaying(false);
        }}
        onEnded={(e) => {
          const v = e.currentTarget;
          setPlaying(false);
          v.controls = false;
          v.currentTime = 0;
        }}
      />
      <button className="reel-play" aria-label={`Play video: ${title}`} onClick={play}>
        <span className="circle"><Icon name="play" /></span>
      </button>
      <div className="reel-cap">
        <small>{kicker}</small>
        <b>{title}</b>
      </div>
    </div>
  );
}
