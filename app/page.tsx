import React from 'react';
import Navbar from '@/components/header/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vien Dijital",
    "url": "https://viendigital.com",
    "logo": "https://viendigital.com/logo.png",
    "description": "Vien Dijital ile modern, responsive web siteleri, SEO optimizasyonu, dijital pazarlama çözümleri ve e-ticaret hizmetleri.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Levent, Büyükdere Cad. No:123",
      "addressLocality": "Şişli",
      "addressRegion": "İstanbul",
      "postalCode": "34394",
      "addressCountry": "TR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-212-555-1234",
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": "Turkish"
    },
    "sameAs": [
      "https://www.facebook.com/viendigital",
      "https://www.twitter.com/viendigital",
      "https://www.instagram.com/viendigital",
      "https://www.linkedin.com/company/viendigital"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 41.0082,
        "longitude": 28.9784
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dijital Hizmetler",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Tasarım & Geliştirme",
            "description": "Modern, responsive web siteleri tasarlıyor ve geliştiriyoruz."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO & Dijital Pazarlama",
            "description": "Arama motoru optimizasyonu ve etkili dijital pazarlama stratejileri."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-Ticaret Çözümleri",
            "description": "Online satış yapmanızı sağlayacak özelleştirilmiş e-ticaret çözümleri."
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
