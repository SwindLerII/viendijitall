"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineExternalLink, HiOutlineEye, HiOutlineRefresh } from 'react-icons/hi';

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

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Hepsi');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
    
    // Proje eklendiğinde/güncellendiğinde yenile
    const handleProjectUpdate = () => {
      fetchProjects();
    };
    
    window.addEventListener('projectUpdated', handleProjectUpdate);
    
    return () => {
      window.removeEventListener('projectUpdated', handleProjectUpdate);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      console.log('🔄 Projeler yeniden yükleniyor...'); // Debug log
      // Cache busting için timestamp ekle
      const response = await fetch(`/api/admin/projects?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('📊 Gelen projeler:', data); // Debug log
        // Sadece tamamlanan projeleri göster (öne çıkan olması şart değil)
        const filteredProjects = data.filter((project: Project) => 
          project.status === 'Tamamlandı'
        );
        console.log('✅ Filtrelenmiş projeler:', filteredProjects); // Debug log
        setProjects(filteredProjects);
      }
    } catch (error) {
      console.error('❌ Projeler yüklenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Kategorileri dinamik olarak oluştur
  const categories = ['Hepsi', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeCategory === 'Hepsi' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Gradient renkleri için yardımcı fonksiyon
  const getGradientColors = (category: string) => {
    switch (category) {
      case 'E-Ticaret':
        return 'from-blue-600 to-indigo-600';
      case 'Mobil':
        return 'from-orange-500 to-red-500';
      case 'Blog':
        return 'from-green-600 to-teal-600';
      case 'Kurumsal':
        return 'from-gray-700 to-gray-900';
      default:
        return 'from-purple-600 to-pink-600';
    }
  };

  // Mockup stilini belirle
  const getMockupStyle = (category: string) => {
    switch (category) {
      case 'Mobil':
        return 'mobile';
      case 'E-Ticaret':
      case 'Blog':
        return 'laptop';
      case 'Kurumsal':
        return 'tablet';
      default:
        return 'desktop';
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Open project modal
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <section id="portfolio" className="section py-4 sm:py-6 md:py-8 lg:py-12 bg-secondary-50 relative overflow-hidden">
        <div className="container">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-secondary-600">Projeler yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="section py-4 sm:py-6 md:py-8 lg:py-12 bg-secondary-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-primary-100/50 to-transparent rounded-tl-full opacity-70 -z-10" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-3 sm:mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium text-xs sm:text-sm">PORTFÖLYÜMÜZ</span>
            <button
              onClick={fetchProjects}
              className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-colors"
              title="Projeleri yenile"
            >
              <HiOutlineRefresh className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Başarılı</span> Projelerimiz
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary-600">
            Farklı sektörlerde gerçekleştirdiğimiz projelerimizden örnekler.
            Her proje, müşterilerimizin ihtiyaçlarına göre özelleştirilmiş dijital çözümlerdir.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-white text-secondary-600 hover:bg-secondary-100 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-secondary-200/20 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                onClick={() => openProjectModal(project)}
              >
                <div className={`bg-gradient-to-br ${getGradientColors(project.category)} aspect-[16/9] p-4 sm:p-6 relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                      <HiOutlineEye className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-800" />
                    </div>
                  </div>
                  
                  {/* Proje Görseli */}
                  {project.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                  ) : (
                    /* Mockup illustration - görsel yoksa */
                    <div className="relative w-3/4 h-full flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className={`w-full max-w-xs mx-auto ${
                          getMockupStyle(project.category) === 'mobile' 
                            ? 'h-32 sm:h-40 md:h-48 bg-secondary-900 rounded-lg sm:rounded-xl border-2 sm:border-4 border-secondary-800'
                            : getMockupStyle(project.category) === 'tablet'
                              ? 'h-28 sm:h-32 md:h-40 bg-secondary-900 rounded-md sm:rounded-lg border-4 sm:border-8 border-secondary-800'
                              : 'h-24 sm:h-28 md:h-32 bg-secondary-900 rounded-md border-t-4 sm:border-t-8 border-x-4 sm:border-x-8 border-secondary-800'
                        }`}>
                          <div className="w-full h-full flex items-center justify-center">
                            <h4 className="text-white text-center font-bold px-2 text-xs sm:text-sm">
                              {project.title}
                              <div className="text-xs opacity-70 mt-1 font-normal">Proje Görseli</div>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-secondary-900">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-primary-600 font-medium">{project.category}</p>
                    </div>
                    <div className="bg-secondary-100 p-1 rounded-full">
                      <HiOutlineArrowRight className="w-5 h-5 text-secondary-500 group-hover:text-primary-600 transition-colors" />
                    </div>
                  </div>
                  <p className="text-secondary-600 line-clamp-2 text-xs sm:text-sm mb-3 sm:mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-secondary-50 text-secondary-600 text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-secondary-50 text-secondary-600 text-xs rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              Proje Bulunamadı
            </h3>
            <p className="text-secondary-600">
              Seçilen kategoriye uygun proje bulunmuyor.
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-secondary-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-br ${getGradientColors(selectedProject.category)} aspect-[21/9] p-4 sm:p-6 md:p-8 relative flex items-center justify-center`}>
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                    aria-label="Kapat"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Proje Görseli */}
                {selectedProject.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 75vw"
                    />
                  </div>
                ) : (
                  /* Project mockup visualization - görsel yoksa */
                  <div className="relative w-3/4 h-full flex items-center justify-center">
                    <div className={`w-full max-w-md mx-auto ${
                      getMockupStyle(selectedProject.category) === 'mobile' 
                        ? 'h-48 sm:h-56 md:h-72 bg-secondary-900 rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-secondary-800'
                        : getMockupStyle(selectedProject.category) === 'tablet'
                          ? 'h-40 sm:h-48 md:h-64 bg-secondary-900 rounded-lg sm:rounded-xl border-6 sm:border-12 border-secondary-800'
                          : 'h-32 sm:h-40 md:h-56 bg-secondary-900 rounded-md border-t-6 sm:border-t-12 border-x-6 sm:border-x-12 border-secondary-800'
                    }`}>
                      <div className="w-full h-full flex items-center justify-center">
                        <h3 className="text-white text-center text-lg sm:text-xl font-bold px-2 sm:px-4">
                          {selectedProject.title}
                          <div className="text-xs sm:text-sm opacity-70 mt-1 font-normal">Proje Görseli</div>
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-secondary-900 mb-2">{selectedProject.title}</h2>
                <p className="text-sm sm:text-base text-primary-600 font-medium mb-4 sm:mb-6">{selectedProject.category}</p>
                
                <p className="text-sm sm:text-base md:text-lg text-secondary-700 mb-6 sm:mb-8">{selectedProject.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Proje Detayları</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base"><strong>Müşteri:</strong> {selectedProject.client}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base"><strong>Bütçe:</strong> ₺{selectedProject.budget.toLocaleString()}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base"><strong>Tamamlanma:</strong> {new Date(selectedProject.endDate).toLocaleDateString('tr-TR')}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Teknolojiler</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary-100 text-secondary-700 text-xs sm:text-sm rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-secondary-100">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="btn px-6 py-2 bg-secondary-100 text-secondary-700 hover:bg-secondary-200 rounded-lg mr-3"
                  >
                    Kapat
                  </button>
                  {selectedProject.url && (
                    <Link 
                      href={selectedProject.url}
                      target="_blank"
                      className="btn px-6 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg inline-flex items-center"
                    >
                      <span>Canlı İncele</span>
                      <HiOutlineExternalLink className="ml-2 w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
