'use client'

import { useRef, useState, type KeyboardEvent } from 'react'

type Channel = 'voice' | 'email' | 'chat'

const CHANNELS: { id: Channel; label: string }[] = [
  { id: 'voice', label: 'Voice' },
  { id: 'email', label: 'Email' },
  { id: 'chat', label: 'Chat' },
]

const INPUT: Record<Channel, { from: string; meta: string; body: string; chip: string }> = {
  voice: {
    from: 'Inbound call',
    meta: 'German · 00:42',
    body: '“I moved last month and my bill still goes to the old address. Can you fix that?”',
    chip: 'Transcribed and understood in the caller’s language',
  },
  email: {
    from: 'Email to service@',
    meta: '1 attachment · 2 requests',
    body: '“Please update my address, see the attached rental contract. Also, is my last invoice paid?”',
    chip: 'rental-contract.pdf · address extracted',
  },
  chat: {
    from: 'Web chat',
    meta: 'Logged-in customer',
    body: '“Hi, new address since May. Can I change it here?”',
    chip: 'Customer already authenticated by your site',
  },
}

const STEPS: { title: string; detail: Record<Channel, string> }[] = [
  {
    title: 'Understand',
    detail: {
      voice: 'Change of address, said in the caller’s own words.',
      email: 'Two requests: change of address and invoice status.',
      chat: 'Change of address, asked in free text.',
    },
  },
  {
    title: 'Ground in your knowledge',
    detail: {
      voice: 'Address-change rule found; identity check required on calls.',
      email: 'Address-change rule found; contract accepted as proof.',
      chat: 'Address-change rule found; session already verified.',
    },
  },
  {
    title: 'Act in your systems',
    detail: {
      voice: 'Billing address updated after verification.',
      email: 'Address updated; invoice status read: paid.',
      chat: 'Address updated in the customer record.',
    },
  },
  {
    title: 'Hand over when it matters',
    detail: {
      voice: 'Not needed: resolved by the AI agent.',
      email: 'Not needed: both requests resolved.',
      chat: 'Offered a person; customer declined.',
    },
  },
  {
    title: 'Summarise and measure',
    detail: {
      voice: 'Call summary and outcome saved to the CRM.',
      email: 'Reply sent; both outcomes logged.',
      chat: 'Chat summary and outcome saved to the CRM.',
    },
  },
]

export function Journey() {
  const [channel, setChannel] = useState<Channel>('voice')
  const [runs, setRuns] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (c: Channel) => {
    if (c === channel) return
    setChannel(c)
    setRuns((r) => r + 1)
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = CHANNELS.findIndex((c) => c.id === channel)
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % CHANNELS.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + CHANNELS.length) % CHANNELS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = CHANNELS.length - 1
    else return
    e.preventDefault()
    select(CHANNELS[next].id)
    tabRefs.current[next]?.focus()
  }

  const input = INPUT[channel]

  return (
    <div className="journey">
      <div>
        <div className="tabs" role="tablist" aria-label="Choose a channel" onKeyDown={onKey}>
          {CHANNELS.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              id={`tab-${c.id}`}
              role="tab"
              type="button"
              className="tab"
              aria-selected={channel === c.id}
              aria-controls="journey-panel"
              tabIndex={channel === c.id ? 0 : -1}
              onClick={() => select(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="inbox-card" key={channel + '-in'}>
          <div className={runs ? 'swap' : undefined}>
            <div className="inbox-card__meta">
              <b>{input.from}</b>
              <span>{input.meta}</span>
            </div>
            <p className="inbox-card__body">{input.body}</p>
            <span className="chip">{input.chip}</span>
          </div>
        </div>
      </div>

      <div
        id="journey-panel"
        role="tabpanel"
        aria-labelledby={`tab-${channel}`}
        className="pipeline"
        data-animate={runs ? 'true' : 'false'}
        key={channel + '-pipe'}
      >
        <div className="pipeline__line" aria-hidden="true">
          <div className="pipeline__pulse" />
        </div>
        {STEPS.map((st, i) => (
          <div className="node" key={st.title} style={{ ['--i' as string]: i }}>
            <span className="node__mark" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className="node__title">{st.title}</p>
              <p className={'node__detail' + (runs ? ' swap' : '')}>{st.detail[channel]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
