import type { ReactNode } from 'react'

/** White hero figure card with an "Illustrative"-style label and staggered rows. */
export function FigureCard({ title, label, rows, icon }: { title: string; label?: string; rows: ReactNode[]; icon?: ReactNode }) {
  return (
    <figure className="mini-scene figure-card">
      <div className="scene__bar">
        <span className="scene__channel">
          {icon && (
            <span className="scene__dot" aria-hidden="true">
              {icon}
            </span>
          )}
          {title}
        </span>
        {label && <span className="scene__label">{label}</span>}
      </div>
      <div className="mini-scene__lines">
        {rows.map((r, i) => (
          <div key={i} className="mini-line figure-row" style={{ ['--i' as string]: i }}>
            {r}
          </div>
        ))}
      </div>
    </figure>
  )
}
