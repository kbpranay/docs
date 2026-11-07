/** Low-opacity voice-wave lines (EB brand element). Static, decorative. */
export function Waves() {
  const lines = Array.from({ length: 7 }, (_, i) => {
    const amp = 26 + i * 7
    const y = 210 + i * 9
    const phase = i * 34
    let d = `M -40 ${y}`
    for (let x = -40; x <= 1480; x += 40) {
      const yy = y + Math.sin((x + phase) / 150) * amp * Math.sin((x + 200) / 520)
      d += ` L ${x} ${yy.toFixed(1)}`
    }
    return d
  })
  return (
    <div className="hero__waves" aria-hidden="true">
      <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" fill="none">
        {lines.map((d, i) => (
          <path key={i} d={d} stroke="currentColor" strokeWidth={1.2} />
        ))}
      </svg>
    </div>
  )
}
