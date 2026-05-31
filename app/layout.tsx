import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#080808',
};

export const metadata: Metadata = {
  title: 'Superbike Focșani - Showroom Digital',
  description:
    'Magazinul de biciclete premium din Focșani, Vrancea. 30 de ani de pasiune. Specialized, Cross, DHS, Devron, Haibike.',
  keywords: ['biciclete', 'Focșani', 'Vrancea', 'Specialized', 'Cross', 'DHS', 'Haibike', 'Superbike'],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Superbike',
  },
  openGraph: {
    title: 'Superbike Focșani - Showroom Digital',
    description: '30 de ani de pasiune pentru biciclete. Vindem calitate, nu compromisuri.',
    type: 'website',
    locale: 'ro_RO',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className="dark">
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
