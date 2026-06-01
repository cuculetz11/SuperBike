import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#080808',
};

export const metadata: Metadata = {
  title: 'SuperBike Focșani - Biciclete Vrancea',
  description:
    'Magazin și service de biciclete în Focșani, Vrancea. Peste 30 de ani de experiență. Biciclete noi și second-hand, electrice, piese și accesorii. Mărci: Specialized, Cross, DHS, Devron, Haibike.',
  keywords: [
    'biciclete Focșani',
    'biciclete Vrancea',
    'service biciclete Focșani',
    'biciclete electrice Vrancea',
    'biciclete second hand',
    'magazin biciclete',
    'Specialized Focșani',
    'Cross',
    'DHS',
    'Devron',
    'Haibike',
    'SuperBike'
  ],
  icons: {
    icon: '/logos/superbike-logo.png',
    apple: '/logos/superbike-logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SuperBike',
  },
  openGraph: {
    title: 'SuperBike Focșani - Biciclete Vrancea',
    description: 'Magazin și service de biciclete în Focșani. Peste 30 de ani de experiență. Vindem calitate, biciclete electrice și second-hand, piese și accesorii.',
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
