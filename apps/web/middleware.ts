export { middleware } from 'nextra/locales'

export const config = {
  // Skip all paths that should not be localized
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest|_pagefind).*)',
  ],
}
