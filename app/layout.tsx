import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Superbike Focșani — Showroom Digital',
  description:
    'Magazinul de biciclete premium din Focșani, Vrancea. 30 de ani de pasiune. Specialized, Cross, DHS, Devron, Haibike.',
  keywords: ['biciclete', 'Focșani', 'Vrancea', 'Specialized', 'Cross', 'DHS', 'Haibike', 'Superbike'],
  openGraph: {
    title: 'Superbike Focșani — Showroom Digital',
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
