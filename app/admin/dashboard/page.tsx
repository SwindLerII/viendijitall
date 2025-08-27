"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  HiOutlineUsers, 
  HiOutlineDocumentText, 
  HiOutlineChartBar, 
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineHome
} from 'react-icons/hi';
import Link from 'next/link';

interface Stats {
  totalProjects: number;
  completedProjects: number;
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  averageProjectValue: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<Stats>({
    totalProjects: 0,
    completedProjects: 0,
    totalClients: 0,
    activeClients: 0,
    totalRevenue: 0,
    averageProjectValue: 0
  });

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

        // Şimdilik sadece token varlığını kontrol et
        console.log('✅ Token bulundu, dashboard yükleniyor...');
        setIsAuthenticated(true);
        setIsLoading(false);
        fetchStats();
        
      } catch (error) {
        console.error('❌ Authentication error:', error);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setDashboardStats(data);
      }
    } catch (error) {
      console.error('İstatistikler yüklenemedi:', error);
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

  const statsCards = [
    {
      title: 'Toplam Proje',
      value: dashboardStats.totalProjects.toString(),
      change: '+8%',
      icon: HiOutlineDocumentText,
      color: 'bg-blue-500',
    },
    {
      title: 'Tamamlanan Proje',
      value: dashboardStats.completedProjects.toString(),
      change: '+12%',
      icon: HiOutlineDocumentText,
      color: 'bg-green-500',
    },
    {
      title: 'Toplam Gelir',
      value: `₺${dashboardStats.totalRevenue.toLocaleString()}`,
      change: '+23%',
      icon: HiOutlineChartBar,
      color: 'bg-purple-500',
    },
    {
      title: 'Aktif Müşteri',
      value: dashboardStats.activeClients.toString(),
      change: '+5%',
      icon: HiOutlineUsers,
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    {
      action: 'Yeni proje eklendi',
      description: 'E-ticaret sitesi projesi',
      time: '2 saat önce',
    },
    {
      action: 'Müşteri mesajı',
      description: 'Ahmet Yılmaz\'dan yeni mesaj',
      time: '4 saat önce',
    },
    {
      action: 'Ödeme alındı',
      description: '₺5,000 ödeme alındı',
      time: '1 gün önce',
    },
    {
      action: 'Site güncellendi',
      description: 'Ana sayfa içeriği güncellendi',
      time: '2 gün önce',
    },
  ];

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
    return null; // useEffect'te yönlendirme yapılacak
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
              <span className="text-secondary-500">| Admin Paneli</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <HiOutlineHome className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </Link>
              <Link 
                href="/admin/dashboard" 
                className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <HiOutlineChartBar className="w-5 h-5" />
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
        {/* Hoş Geldin Mesajı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-secondary-800 mb-2">
            Hoş Geldiniz! 👋
          </h1>
          <p className="text-secondary-600">
            Vien Dijital admin panelinize hoş geldiniz. İşte güncel durumunuz:
          </p>
        </motion.div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-secondary-800">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ana İçerik Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hızlı İşlemler */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">
                Hızlı İşlemler
              </h2>
              <div className="space-y-3">
                <Link 
                  href="/admin/portfolio"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors text-left"
                >
                  <HiOutlineDocumentText className="w-5 h-5 text-primary-600" />
                  <span className="text-secondary-700">Portfolio Yönetimi</span>
                </Link>
                <Link 
                  href="/admin/clients"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors text-left"
                >
                  <HiOutlineUsers className="w-5 h-5 text-green-600" />
                  <span className="text-secondary-700">Müşteri Yönetimi</span>
                </Link>
                <Link 
                  href="/admin/settings"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors text-left"
                >
                  <HiOutlineCog className="w-5 h-5 text-purple-600" />
                  <span className="text-secondary-700">Site Ayarları</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Son Aktiviteler */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">
                Son Aktiviteler
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-secondary-800">{activity.action}</p>
                      <p className="text-sm text-secondary-600">{activity.description}</p>
                    </div>
                    <span className="text-xs text-secondary-500">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
