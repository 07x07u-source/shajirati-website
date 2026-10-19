export type IconName =
  | "arrow"
  | "bookmark"
  | "bolt"
  | "camera"
  | "check"
  | "drop"
  | "layers"
  | "leaf"
  | "mail"
  | "menu"
  | "photos"
  | "scan"
  | "shield"
  | "sparkle"
  | "sun"
  | "tag"
  | "translate"
  | "x";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="m9 18 6-6-6-6" />,
  bookmark: <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-4-6 4V4.8Z" />,
  bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
  camera: <><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3h5Z" /><circle cx="12" cy="13" r="3.4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  drop: <path d="M12 2s6 6.2 6 12a6 6 0 0 1-12 0c0-5.8 6-12 6-12Z" />,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
  leaf: <><path d="M20.5 3.5C13 3.5 6 6 6 13c0 4 3 7 7 7 7 0 7.5-9.5 7.5-16.5Z" /><path d="M4 21c3-6 7-10 13-13" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  photos: <><rect x="3" y="5" width="15" height="14" rx="2" /><path d="m6 16 3.5-4 3 3 2-2 3.5 4" /><path d="M8 5V3h13v14h-3" /></>,
  scan: <><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" /><path d="M8 12h8" /></>,
  shield: <><path d="M12 22s8-3.7 8-10V5l-8-3-8 3v7c0 6.3 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  sparkle: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41" /></>,
  tag: <><path d="M20.6 13.6 11 23.2 1 13.2V3h10.2l9.4 9.4a.9.9 0 0 1 0 1.2Z" /><circle cx="7" cy="9" r="1.5" /></>,
  translate: <><path d="M4 5h9M8.5 3v2M6 5c.5 4 3 7 7 8M11 5c-.5 4-3 7-7 8" /><path d="m14 21 4-10 4 10M15.5 17h5" /></>,
  x: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
