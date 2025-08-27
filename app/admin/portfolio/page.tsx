"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlinePlus, 
  HiOutlinePencil, 
  HiOutlineTrash, 
  HiOutlineEye,
  HiOutlineArrowLeft,
  HiOutlineGlobe,
  HiOutlineDeviceMobile,
  HiOutlineShoppingCart,
  HiOutlineDocumentText
} from 'react-icons/hi';
import Link from 'next/link';
import ProjectModal from '@/components/admin/ProjectModal';

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  url: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PortfolioManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Projeler yüklenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/projects/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Proje silinemedi:', error);
      }
    }
  };

  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      const url = editingProject 
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects';
      
      const method = editingProject ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        fetchProjects();
        setShowModal(false);
        setEditingProject(null);
        
        // Anasayfayı yenilemek için event tetikle
        window.dispatchEvent(new Event('projectUpdated'));
      }
    } catch (error) {
      console.error('Proje kaydedilemedi:', error);
      throw error;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'E-Ticaret':
        return <HiOutlineShoppingCart className="w-5 h-5" />;
      case 'Mobil':
        return <HiOutlineDeviceMobile className="w-5 h-5" />;
      case 'Blog':
        return <HiOutlineDocumentText className="w-5 h-5" />;
      default:
        return <HiOutlineGlobe className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800';
      case 'Devam Ediyor':
        return 'bg-blue-100 text-blue-800';
      case 'Planlanıyor':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.status === filter;
  });

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

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <HiOutlineArrowLeft className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <div className="text-2xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                  Vien
                </span>
                <span className="text-secondary-800">
                  Dijital
                </span>
              </div>
              <span className="text-secondary-500">| Portfolio Yönetimi</span>
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <HiOutlinePlus className="w-5 h-5" />
              <span>Yeni Proje</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filtreler */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-secondary-600 hover:bg-secondary-50'
              }`}
            >
              Tümü ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'featured' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-secondary-600 hover:bg-secondary-50'
              }`}
            >
              Öne Çıkanlar ({projects.filter(p => p.featured).length})
            </button>
            <button
              onClick={() => setFilter('Tamamlandı')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'Tamamlandı' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-secondary-600 hover:bg-secondary-50'
              }`}
            >
              Tamamlanan ({projects.filter(p => p.status === 'Tamamlandı').length})
            </button>
            <button
              onClick={() => setFilter('Devam Ediyor')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'Devam Ediyor' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-secondary-600 hover:bg-secondary-50'
              }`}
            >
              Devam Eden ({projects.filter(p => p.status === 'Devam Ediyor').length})
            </button>
          </div>
        </div>

        {/* Projeler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Proje Görseli */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  {getCategoryIcon(project.category)}
                </div>
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Öne Çıkan
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Proje Bilgileri */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-secondary-600 mb-3">
                  {project.client}
                </p>
                <p className="text-sm text-secondary-700 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Teknolojiler */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Bütçe ve Tarihler */}
                <div className="flex justify-between items-center mb-4 text-sm text-secondary-600">
                  <span>₺{project.budget.toLocaleString()}</span>
                  <span>{new Date(project.startDate).getFullYear()}</span>
                </div>

                {/* Aksiyonlar */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(project.url, '_blank')}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                  >
                    <HiOutlineEye className="w-4 h-4" />
                    <span>Görüntüle</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setShowModal(true);
                    }}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <HiOutlinePencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              Proje Bulunamadı
            </h3>
            <p className="text-secondary-600">
              Seçilen filtrelere uygun proje bulunmuyor.
            </p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSave={handleSaveProject}
      />
    </div>
  );
}
