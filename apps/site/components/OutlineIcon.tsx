/**
 * EB brand iconography: outlined, orange stroke, no fill.
 * Icons always sit next to a text label, so they are decorative (aria-hidden).
 */
export type IconName =
  | 'phone'
  | 'route'
  | 'globe'
  | 'plug'
  | 'handover'
  | 'summary'
  | 'mail'
  | 'layers'
  | 'clip'
  | 'question'
  | 'shield'
  | 'log'
  | 'chat'
  | 'book'
  | 'bolt'
  | 'bulb'
  | 'compass'
  | 'sync'
  | 'eye'
  | 'cap'
  | 'pulse'
  | 'bars'
  | 'target'
  | 'split'
  | 'trend'
  | 'link'
  | 'headset'
  | 'turns'
  | 'code'

const paths: Record<IconName, string[]> = {
  phone: ['M6.6 3.5h2.6l1.4 4-2 1.4a10 10 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2.1-2.2Z'],
  route: ['M5 4v6a4 4 0 0 0 4 4h10', 'M15 10l4 4-4 4', 'M5 20v-4'],
  globe: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3.5 9h17M3.5 15h17', 'M12 3c2.6 2.6 3.6 5.6 3.6 9s-1 6.4-3.6 9c-2.6-2.6-3.6-5.6-3.6-9s1-6.4 3.6-9Z'],
  plug: ['M9 3v5M15 3v5', 'M6.5 8h11v3a5.5 5.5 0 0 1-11 0V8Z', 'M12 16.5V21'],
  handover: ['M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M3 20a5.5 5.5 0 0 1 11 0', 'M15 9h6M18 6l3 3-3 3'],
  summary: ['M6 3h9l4 4v14H6Z', 'M14.5 3v4.5H19', 'M9 12h7M9 15.5h7M9 19h4'],
  mail: ['M3.5 6h17v12h-17Z', 'M3.5 6.5l8.5 6.5 8.5-6.5'],
  layers: ['M12 3l9 5-9 5-9-5 9-5Z', 'M3 12.5l9 5 9-5', 'M3 16.5l9 5 9-5'],
  clip: ['M20 11.5l-7.6 7.6a5 5 0 0 1-7.1-7.1l8-8a3.4 3.4 0 0 1 4.8 4.8l-8 8a1.7 1.7 0 0 1-2.4-2.4l7.3-7.3'],
  question: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M9.6 9.3a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2 1-1.2 1.9v.5', 'M12 17h.01'],
  shield: ['M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3Z', 'M8.8 12.2l2.3 2.3 4.3-4.6'],
  log: ['M9 6h11M9 12h11M9 18h11', 'M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2'],
  chat: ['M4 5h16v11H9l-5 4V5Z', 'M8 9.5h8M8 12.5h5'],
  book: ['M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z', 'M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5', 'M9 7.5h7'],
  bolt: ['M13 3L5 13.5h6L10 21l8-10.5h-6L13 3Z'],
  bulb: ['M9 17.5h6M10 21h4', 'M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V17h5v-1.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z'],
  compass: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M15.5 8.5l-2 5-5 2 2-5 5-2Z'],
  sync: ['M20 7h-5V2', 'M19.5 7A8 8 0 0 0 4.3 9.5', 'M4 17h5v5', 'M4.5 17a8 8 0 0 0 15.2-2.5'],
  eye: ['M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  cap: ['M2.5 9L12 4.5 21.5 9 12 13.5 2.5 9Z', 'M6.5 11v4.5c1.5 1.6 3.4 2.5 5.5 2.5s4-.9 5.5-2.5V11', 'M21.5 9v5'],
  pulse: ['M3 12h4l2-5 4 10 2-5h6'],
  bars: ['M4 20V10M10 20V4M16 20v-7M21 20H3'],
  target: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z', 'M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z'],
  split: ['M4 6h5l6 12h5', 'M4 18h5l1.5-3M15 6h5', 'M17 3.5L20 6l-3 2.5M17 15.5l3 2.5-3 2.5'],
  trend: ['M3 17l6-6 4 4 8-8', 'M15 7h6v6'],
  link: ['M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1', 'M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1'],
  headset: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M4 14h3v5H5.5A1.5 1.5 0 0 1 4 17.5V14ZM20 14h-3v5h1.5a1.5 1.5 0 0 0 1.5-1.5V14Z', 'M17 19c0 1.1-1.8 2-4 2'],
  turns: ['M4 7h10a4 4 0 0 1 0 8H8', 'M11 12l-3 3 3 3'],
  code: ['M8.5 8L4.5 12l4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13'],
}

export function OutlineIcon({ name, size = 28 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="outline-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
