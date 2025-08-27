"use client";

import { useEffect, useState } from 'react';

interface FaviconProps {
  defaultFavicon?: string;
}

export default function Favicon({ defaultFavicon = "/favicon.ico" }: FaviconProps) {
  const [favicon, setFavicon] = useState<string>(defaultFavicon);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings');
        if (response.ok) {
          const settings = await response.json();
          if (settings.favicon) {
            setFavicon(settings.favicon);
          }
        }
      } catch (error) {
        console.error('Favicon yüklenemedi:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      <link rel="icon" type="image/x-icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
    </>
  );
}
