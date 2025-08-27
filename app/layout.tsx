import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/data';
import Favicon from '@/components/layout/Favicon';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    
    return {
      title: {
        default: settings.siteName || 'Vien Dijital - Web Ajans & İnternet Hizmetleri',
        template: `%s | ${settings.siteName || 'Vien Dijital'}`
      },
      description: settings.metaDescription || 'Vien Dijital ile modern, responsive web siteleri, SEO optimizasyonu, dijital pazarlama çözümleri ve e-ticaret hizmetleri. İstanbul\'da profesyonel web ajans hizmetleri.',
      keywords: [
        'web ajans istanbul',
        'dijital pazarlama',
        'web tasarım',
        'seo optimizasyonu',
        'sosyal medya yönetimi',
        'internet hizmetleri',
        'web geliştirme',
        'e-ticaret sitesi',
        'responsive tasarım',
        'dijital dönüşüm',
        'web ajansı',
        'dijital ajans'
      ].join(', '),
      authors: [{ name: settings.siteName || 'Vien Dijital', url: 'https://viendigital.com' }],
      creator: settings.siteName || 'Vien Dijital',
      publisher: settings.siteName || 'Vien Dijital',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://viendigital.com'),
      alternates: {
        canonical: '/',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
      },
      openGraph: {
        type: 'website',
        locale: 'tr_TR',
        url: 'https://viendigital.com',
        siteName: settings.siteName || 'Vien Dijital',
        title: `${settings.siteName || 'Vien Dijital'} - Web Ajans & İnternet Hizmetleri`,
        description: settings.metaDescription || 'Vien Dijital ile modern, responsive web siteleri, SEO optimizasyonu, dijital pazarlama çözümleri ve e-ticaret hizmetleri.',
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: `${settings.siteName || 'Vien Dijital'} - Web Ajans & İnternet Hizmetleri`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${settings.siteName || 'Vien Dijital'} - Web Ajans & İnternet Hizmetleri`,
        description: settings.metaDescription || 'Vien Dijital ile modern, responsive web siteleri, SEO optimizasyonu, dijital pazarlama çözümleri ve e-ticaret hizmetleri.',
        images: ['/og-image.jpg'],
        creator: '@viendigital',
      },
      category: 'technology',
      classification: 'Web Design & Development',
      other: {
        'geo.region': 'TR-34',
        'geo.placename': 'İstanbul',
        'geo.position': '41.0082;28.9784',
        'ICBM': '41.0082, 28.9784',
      },
    };
  } catch (error) {
    console.error('Metadata oluşturulamadı:', error);
    // Fallback metadata
    return {
      title: 'Vien Dijital - Web Ajans & İnternet Hizmetleri',
      description: 'Vien Dijital ile modern, responsive web siteleri, SEO optimizasyonu, dijital pazarlama çözümleri ve e-ticaret hizmetleri.',
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <Favicon />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-sans bg-secondary-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
