import { InView } from './InView'

/**
 * Horizontal voice pipeline diagram with flow dots (vertical on phones).
 * Dots run only while in view; reduced motion shows static lines.
 */
export function Pipeline({ nodes, label }: { nodes: { name: string; tag?: string; strong?: boolean }[]; label: string }) {
  const all = [{ name: 'Caller' }, ...nodes, { name: 'Caller' }]
  return (
    <InView className="pipe">
      <div role="img" aria-label={label} className="pipe__row">
        {all.map((n, i) => (
          <div key={i} className="pipe__seg">
            {i > 0 && (
              <span className="pipe__link" aria-hidden="true">
                <i />
              </span>
            )}
            <span className={'pipe__node' + (i === 0 || i === all.length - 1 ? ' pipe__node--end' : '') + ('strong' in n && n.strong ? ' pipe__node--strong' : '')}>
              {n.name}
              {'tag' in n && n.tag && <span className="pipe__tag">{n.tag}</span>}
            </span>
          </div>
        ))}
      </div>
    </InView>
  )
}
