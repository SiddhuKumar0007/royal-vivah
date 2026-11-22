import type { Metadata, Viewport } from 'next';
import { wedding } from '@/lib/wedding';
import '@fontsource/tiro-devanagari-hindi/devanagari-400.css';
import '@fontsource/tiro-devanagari-hindi/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4173'),
  title: `${wedding.couple} | ${wedding.title}`,
  description: `${wedding.invitation} ${wedding.groom} एवं ${wedding.bride} · ${wedding.dateHindi} · ${wedding.time} · ${wedding.venue.join(' ')}`,
  openGraph: { type: 'website', locale: 'hi_IN', title: `${wedding.couple} · ${wedding.title}`, description: `${wedding.subtitle} · ${wedding.dateEnglish} · ${wedding.venueShortEnglish}`, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${wedding.title} — ${wedding.groomEnglish} & ${wedding.brideEnglish} — ${wedding.dateEnglish}` }] },
  twitter: { card: 'summary_large_image', title: `${wedding.title} · ${wedding.groomEnglish} & ${wedding.brideEnglish}`, images: ['/og-image.png'] },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#3A0713', viewportFit: 'cover' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="hi"><body>{children}</body></html>; }
