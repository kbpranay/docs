import nextra from 'nextra'

const withNextra = nextra({})

export default withNextra({
  reactStrictMode: true,
  // Nextra reads this to populate NEXTRA_LOCALES; it then unsets
  // the i18n key before Next.js sees it (App Router handles locale
  // routing via our middleware.ts instead of Next.js's Pages Router i18n).
  i18n: {
    locales: ['en', 'de', 'fr', 'es'],
    defaultLocale: 'en',
  },
})
