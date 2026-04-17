import type { Metadata } from 'next'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import './globals.css'
import type { FC, ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    absolute: 'AIDA Help Center',
    template: '%s – AIDA Help Center',
  },
  description:
    'Official help center for AIDA – Artificial Intelligence Digital Assistance. Find guides, answers, and troubleshooting.',
}

const Logo = () => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '1rem' }}>
    <span
      style={{
        width: 26,
        height: 26,
        borderRadius: 6,
        background: 'linear-gradient(135deg, #2b5ce6 0%, #4cc9f0 100%)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 13,
      }}
    >
      A
    </span>
    <span>AIDA Help Center</span>
  </span>
)

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="🤖" />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<Logo />}
              projectLink="https://enterprisebot.ai"
            />
          }
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/your-org/aida-docs/tree/main/apps/web/content"
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          feedback={{ content: 'Was this page helpful? Contact support →', labels: 'feedback' }}
          editLink="Edit this page"
          footer={
            <Footer>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: 13, color: '#6b7280' }}>
                <span>© {new Date().getFullYear()} EnterpriseBot. All rights reserved.</span>
                <span>AIDA v4.12.x</span>
              </div>
            </Footer>
          }
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout
