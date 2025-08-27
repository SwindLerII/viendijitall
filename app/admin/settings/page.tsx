"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  HiOutlineCog,
  HiOutlineSave,
  HiOutlineUpload,
  HiOutlineHome,
  HiOutlineLogout
} from 'react-icons/hi';
import Link from 'next/link';

interface Settings {
  siteName: string;
  metaDescription: string;
  favicon: string;
}

export default function AdminSettings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    metaDescription: '',
    favicon: ''
  });
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    // Basit authentication kontrolü
    const checkAuth = async () => {
      try {
        console.log('🔍 Authentication kontrolü başlatılıyor...');
        
        // Cookie'den token'ı al
        const cookies = document.cookie.split(';');
        const adminTokenCookie = cookies.find(cookie => 
          cookie.trim().startsWith('adminToken=')
        );
        
        console.log('🔑 Admin token cookie:', adminTokenCookie);
        
        if (!adminTokenCookie) {
          console.log('❌ Admin token bulunamadı, login\'e yönlendiriliyor...');
          router.push('/admin/login');
          return;
        }

        console.log('✅ Token bulundu, ayarlar yükleniyor...');
        setIsAuthenticated(true);
        setIsLoading(false);
        fetchSettings();
        
      } catch (error) {
        console.error('❌ Authentication error:', error);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        if (data.favicon) {
          setPreviewUrl(data.favicon);
        }
      }
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let faviconUrl = settings.favicon;

      // Favicon yükleme işlemi
      if (faviconFile) {
        const formData = new FormData();
        formData.append('file', faviconFile);
        formData.append('type', 'favicon');

        const uploadResponse = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          faviconUrl = uploadData.url;
        }
      }

      // Ayarları güncelle
      const updateResponse = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          favicon: faviconUrl,
        }),
      });

      if (updateResponse.ok) {
        alert('Ayarlar başarıyla güncellendi!');
        setFaviconFile(null);
      } else {
        alert('Ayarlar güncellenirken hata oluştu!');
      }
    } catch (error) {
      console.error('Ayarlar güncellenemedi:', error);
      alert('Ayarlar güncellenirken hata oluştu!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Çıkış hatası:', error);
    } finally {
      localStorage.removeItem('adminUser');
      router.push('/admin/login');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Authentication kontrolü
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                  Vien
                </span>
                <span className="text-secondary-800">
                  Dijital
                </span>
              </div>
              <span className="text-secondary-500">| Site Ayarları</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard" 
                className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <HiOutlineHome className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-secondary-600 hover:text-red-600 transition-colors"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-secondary-800 mb-2">
            Site Ayarları ⚙️
          </h1>
          <p className="text-secondary-600">
            Sitenizin genel ayarlarını buradan yönetebilirsiniz.
          </p>
        </motion.div>

                 {/* Ayarlar Formu */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="w-full"
         >
                     <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Sol Sütun */}
               <div>
                 {/* Site Adı */}
                 <div className="mb-6">
                   <label htmlFor="siteName" className="block text-sm font-medium text-secondary-700 mb-2">
                     Site Adı
                   </label>
                   <input
                     type="text"
                     id="siteName"
                     value={settings.siteName}
                     onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                     className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                     placeholder="Vien Dijital"
                     required
                   />
                   <p className="text-sm text-secondary-500 mt-1">
                     Bu isim sitenizin başlığında ve meta etiketlerinde kullanılacak.
                   </p>
                 </div>

                 {/* Meta Açıklaması */}
                 <div className="mb-6">
                   <label htmlFor="metaDescription" className="block text-sm font-medium text-secondary-700 mb-2">
                     Meta Açıklaması
                   </label>
                   <textarea
                     id="metaDescription"
                     value={settings.metaDescription}
                     onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                     rows={4}
                     className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                     placeholder="Sitenizin SEO için kullanılacak açıklaması..."
                     required
                   />
                   <p className="text-sm text-secondary-500 mt-1">
                     Arama motorlarında görünecek açıklama (150-160 karakter önerilir).
                   </p>
                 </div>
               </div>

               {/* Sağ Sütun */}
               <div>
                 {/* Favicon */}
                 <div className="mb-6">
                   <label className="block text-sm font-medium text-secondary-700 mb-2">
                     Site Favicon
                   </label>
                   
                   {/* Mevcut Favicon */}
                   {previewUrl && (
                     <div className="mb-4">
                       <p className="text-sm text-secondary-600 mb-2">Mevcut Favicon:</p>
                       <div className="flex items-center space-x-3">
                         <img 
                           src={previewUrl} 
                           alt="Favicon" 
                           className="w-8 h-8 rounded border border-secondary-200"
                         />
                         <span className="text-sm text-secondary-600">{previewUrl}</span>
                       </div>
                     </div>
                   )}

                   {/* Favicon Yükleme */}
                   <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                     <input
                       type="file"
                       id="favicon"
                       accept="image/*"
                       onChange={handleFaviconChange}
                       className="hidden"
                     />
                     <label htmlFor="favicon" className="cursor-pointer">
                       <HiOutlineUpload className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                       <p className="text-sm text-secondary-600">
                         Favicon yüklemek için tıklayın
                       </p>
                       <p className="text-xs text-secondary-500 mt-1">
                         PNG, JPG, ICO formatları desteklenir (32x32px önerilir)
                       </p>
                     </label>
                   </div>
                 </div>
               </div>
             </div>

             {/* Kaydet Butonu */}
             <div className="flex justify-end mt-8 pt-6 border-t border-secondary-200">
               <button
                 type="submit"
                 disabled={isSaving}
                 className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <HiOutlineSave className="w-5 h-5" />
                 <span>{isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}</span>
               </button>
             </div>
           </form>
        </motion.div>
      </div>
    </div>
  );
}
