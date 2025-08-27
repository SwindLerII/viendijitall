import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Admin Paneli | Vien Dijital',
    template: '%s | Admin Paneli | Vien Dijital'
  },
  description: 'Vien Dijital Admin Paneli - Web sitesi yönetimi ve içerik kontrolü',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans bg-secondary-50">
        {children}
      </body>
    </html>
  );
}
