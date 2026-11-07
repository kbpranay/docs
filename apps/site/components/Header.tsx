'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { nav, site } from '@/content/site'
import { products } from '@/content/products'
import { Arrow, Chevron } from './Icons'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const megaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setMenuOpen(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <header className="site-header" data-scrolled={scrolled ? 'true' : 'false'}>
        <div className="container site-header__inner">
          <Link href="/" className="site-header__logo" aria-label="Enterprise Bot home">
            <img src="/eb-logo-on-dark.svg" alt="Enterprise Bot" width={168} height={26} />
          </Link>

          <nav className="site-nav" aria-label="Main">
            <div className="nav-item" ref={megaRef}>
              <button
                type="button"
                className="nav-trigger"
                aria-expanded={megaOpen}
                aria-controls="mega-platform"
                onClick={() => setMegaOpen((o) => !o)}
              >
                Platform <Chevron />
              </button>
              <div id="mega-platform" className="mega" data-open={megaOpen ? 'true' : 'false'}>
                {products.map((p) => (
                  <Link key={p.slug} href={`/platform/${p.slug}`} tabIndex={megaOpen ? 0 : -1}>
                    <span className="mega__name">{p.name}</span>
                    <span className="mega__line">{p.navLine}</span>
                  </Link>
                ))}
              </div>
            </div>
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link className="quiet" href={site.secondaryCta.href}>
              {site.secondaryCta.label}
            </Link>
            <Link className="btn btn--primary" href={site.primaryCta.href}>
              {site.primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className="mobile-menu" data-open={menuOpen ? 'true' : 'false'} aria-hidden={!menuOpen}>
        <h2>Platform</h2>
        {products.map((p) => (
          <Link key={p.slug} href={`/platform/${p.slug}`} tabIndex={menuOpen ? 0 : -1}>
            {p.name}
          </Link>
        ))}
        <h2 style={{ marginTop: 24 }}>Explore</h2>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
            {n.label}
          </Link>
        ))}
        <Link className="btn btn--primary" href={site.primaryCta.href} tabIndex={menuOpen ? 0 : -1}>
          {site.primaryCta.label} <Arrow />
        </Link>
      </div>
    </>
  )
}
