/**
 * Product composition for product pages: a labelled, illustrative view of the
 * product doing one job. Hand-written examples on synthetic data, not product
 * screenshots; each card says so.
 */
export type ShowcaseKind = 'call' | 'inbox' | 'chat' | 'suggest' | 'transcript' | 'bars' | 'metrics'

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="showcase" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
      <div className="showcase__bar">
        <span>{title}</span>
        <span className="scene__label">Example</span>
      </div>
      <div className="showcase__body">{children}</div>
      <figcaption>Example on synthetic data, to show the format.</figcaption>
    </figure>
  )
}

export function ShowcaseFigure({ kind }: { kind: ShowcaseKind }) {
  switch (kind) {
    case 'call':
      return (
        <Card title="Claims line · live call">
          <ol className="sc-steps">
            <li><b>Caller</b><span>“I need to change the account for my payout.”</span></li>
            <li><b>Verified</b><span className="chip chip--ok">Identity checked</span></li>
            <li><b>Knowledge</b><span className="chip chip--source">Payout policy §4.2</span></li>
            <li><b>Action</b><span className="chip chip--ok">Account updated in your CRM</span></li>
            <li><b>Handover</b><span>Amount above limit · to Claims with a summary</span></li>
          </ol>
        </Card>
      )
    case 'inbox':
      return (
        <Card title="Service inbox · one email, two requests">
          <div className="sc-mail">
            <p className="sc-mail__subject">Re: Policy 48-2291 · address and invoice copy</p>
            <div className="chips">
              <span className="chip">Address change</span>
              <span className="chip">Invoice copy</span>
              <span className="chip chip--source">Policy 48-2291</span>
            </div>
            <p className="sc-mail__draft">
              <b>Draft reply</b> Your new address is saved and your invoice copy is attached.
            </p>
            <p className="sc-mail__status"><span className="chip chip--warn">Waiting for approval</span></p>
          </div>
        </Card>
      )
    case 'chat':
      return (
        <Card title="Website chat">
          <div className="sc-chat">
            <p className="sc-chat__msg sc-chat__msg--user">Is my 18:05 to Zurich running?</p>
            <p className="sc-chat__msg">It’s running about 6 minutes late, now due 18:11 on platform 7.</p>
            <p className="sc-chat__msg sc-chat__msg--user">Can I get a refund if I miss my connection?</p>
            <p className="sc-chat__msg">Yes. I can start the refund request now, or connect you to a colleague.</p>
          </div>
        </Card>
      )
    case 'suggest':
      return (
        <Card title="Agent desktop · live suggestion">
          <div className="sc-suggest">
            <p className="sc-suggest__heard"><b>Customer said</b> “My card was charged twice for one order.”</p>
            <div className="sc-suggest__card">
              <b>Suggested answer</b>
              <p>Apologise, confirm the two transactions, then open a duplicate-charge case. Refunds take 3–5 working days.</p>
              <div className="chips">
                <span className="chip chip--source">Source: disputes guide §2.1</span>
              </div>
            </div>
          </div>
        </Card>
      )
    case 'transcript':
      return (
        <Card title="Live call · German ⇄ English">
          <ol className="sc-pair">
            <li><span className="sc-pair__who">Customer · DE</span><p>Ich möchte meine Adresse ändern.</p><p className="sc-pair__tr">→ I would like to change my address.</p></li>
            <li><span className="sc-pair__who">Agent · EN</span><p>Of course. What is the new address?</p><p className="sc-pair__tr">→ Natürlich. Wie lautet die neue Adresse?</p></li>
          </ol>
        </Card>
      )
    case 'metrics':
      return (
        <Card title="New custom metric">
          <div className="sc-metric">
            <p className="sc-metric__prompt">
              <b>Describe it</b> “Did the customer ask for a callback?”
            </p>
            <table className="sc-metric__table">
              <thead>
                <tr>
                  <th scope="col">Conversation</th>
                  <th scope="col">Score</th>
                  <th scope="col">Callback requested</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Claims call 10:42</td><td>2 of 3 met</td><td><span className="chip chip--warn">Yes</span></td></tr>
                <tr><td>Billing chat 10:51</td><td>3 of 3 met</td><td><span className="chip">No</span></td></tr>
                <tr><td>Policy call 11:05</td><td>3 of 3 met</td><td><span className="chip chip--warn">Yes</span></td></tr>
              </tbody>
            </table>
            <p className="sc-metric__ask">
              <b>Ask</b> “Which topics lead to callback requests?” → answered as a chart
            </p>
          </div>
        </Card>
      )
    case 'bars':
      return (
        <Card title="Why calls were handed over · last 30 days">
          <div className="sc-bars">
            {[
              { k: 'Amount above approval limit', w: 82 },
              { k: 'Caller asked for a person', w: 61 },
              { k: 'Question not in knowledge', w: 38 },
              { k: 'Identity check failed', w: 19 },
            ].map((r, n) => (
              <div key={r.k} className="sc-bars__row">
                <span>{r.k}</span>
                <span className="sc-bars__track" aria-hidden="true">
                  <i style={{ width: `${r.w}%`, ['--n' as string]: n }} />
                </span>
              </div>
            ))}
          </div>
        </Card>
      )
  }
}
