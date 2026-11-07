/** Hand-drawn orange brush underline. pathLength=1 lets CSS draw it once on load. */
export function Brush({ draw = false }: { draw?: boolean }) {
  return (
    <svg
      className={draw ? 'brush brush--draw' : 'brush'}
      viewBox="0 0 300 18"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        pathLength={1}
        d="M3 12.5C48 8.2 96 6.4 146 6.9c48 .5 95 2.6 151 5.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        d="M28 15.2c52-3.4 118-4.4 196-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}
