"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineX, HiOutlinePlus, HiOutlineTrash, HiOutlinePhotograph, HiOutlineUpload } from 'react-icons/hi';

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

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  onSave: (project: Partial<Project>) => void;
}

const categories = [
  'E-Ticaret',
  'Kurumsal',
  'Mobil',
  'Blog',
  'Portfolio',
  'Landing Page',
  'Web Uygulama'
];

const statuses = [
  'Planlanıyor',
  'Devam Ediyor',
  'Tamamlandı',
  'Askıya Alındı'
];

export default function ProjectModal({ isOpen, onClose, project, onSave }: ProjectModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    client: '',
    category: '',
    description: '',
    technologies: [],
    image: '',
    status: 'Planlanıyor',
    startDate: '',
    endDate: '',
    budget: 0,
    url: '',
    featured: false
  });
  const [newTechnology, setNewTechnology] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        client: project.client,
        category: project.category,
        description: project.description,
        technologies: project.technologies,
        image: project.image,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        budget: project.budget,
        url: project.url,
        featured: project.featured
      });
    } else {
      setFormData({
        title: '',
        client: '',
        category: '',
        description: '',
        technologies: [],
        image: '',
        status: 'Planlanıyor',
        startDate: '',
        endDate: '',
        budget: 0,
        url: '',
        featured: false
      });
    }
  }, [project]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies?.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter(t => t !== tech) || []
    }));
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError('');

    try {
      console.log('📤 Dosya yükleniyor:', file.name, file.size, file.type);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('📡 Upload response:', data);

             if (response.ok && data.success) {
         console.log('✅ Dosya başarıyla yüklendi:', data.url);
         setFormData(prev => ({
           ...prev,
           image: data.url
         }));
         // URL input alanını temizle
         setUploadError('');
       } else {
        console.log('❌ Upload hatası:', data.error);
        setUploadError(data.error || 'Dosya yüklenemedi');
      }
    } catch (error) {
      console.error('❌ Dosya yükleme exception:', error);
      setUploadError('Dosya yüklenirken hata oluştu');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // URL validation'ı kaldır - relative path'ler de kabul et
      const submitData = { ...formData };
      
      console.log('📝 Form gönderiliyor:', submitData);
      await onSave(submitData);
      onClose();
    } catch (error) {
      console.error('Proje kaydedilemedi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-secondary-800">
              {project ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Temel Bilgiler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Proje Adı *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Proje adını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Müşteri *
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Müşteri adını girin"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Kategori *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Kategori seçin</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Durum *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Bütçe (₺)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Açıklama */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Açıklama *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Proje açıklamasını girin"
              />
            </div>

            {/* Teknolojiler */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Teknolojiler
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Teknoloji adı"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <HiOutlineTrash className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tarihler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Başlangıç Tarihi
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Bitiş Tarihi
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* URL ve Görsel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                 <label className="block text-sm font-medium text-secondary-700 mb-2">
                   Proje URL
                 </label>
                 <input
                   type="text"
                   name="url"
                   value={formData.url}
                   onChange={handleInputChange}
                   className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                   placeholder="https://example.com"
                 />
               </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Proje Görseli
                </label>
                
                {/* Dosya Yükleme Alanı */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-secondary-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {formData.image ? (
                    <div className="space-y-2">
                      <img
                        src={formData.image}
                        alt="Proje görseli"
                        className="w-full h-32 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-secondary-600">
                        Görsel yüklendi ✓
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, image: '' }));
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Görseli Kaldır
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <HiOutlinePhotograph className="w-8 h-8 text-secondary-400 mx-auto" />
                      <p className="text-sm text-secondary-600">
                        {isUploading ? 'Yükleniyor...' : 'Görsel yüklemek için tıklayın veya sürükleyin'}
                      </p>
                      <p className="text-xs text-secondary-500">
                        JPEG, PNG, WebP (max 5MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Hata Mesajı */}
                {uploadError && (
                  <p className="text-sm text-red-600 mt-1">{uploadError}</p>
                )}

                                 {/* Manuel URL Girişi */}
                 <div className="mt-2">
                   <label className="block text-xs text-secondary-600 mb-1">
                     Veya URL girin:
                   </label>
                   <input
                     type="text"
                     name="image"
                     value={formData.image}
                     onChange={handleInputChange}
                     className="w-full px-2 py-1 text-xs border border-secondary-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                     placeholder="/uploads/image.jpg veya https://example.com/image.jpg"
                   />
                 </div>
              </div>
            </div>

            {/* Öne Çıkan */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <label className="ml-2 text-sm text-secondary-700">
                Öne çıkan proje olarak göster
              </label>
            </div>

            {/* Butonlar */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-secondary-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-secondary-600 hover:text-secondary-800 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Kaydediliyor...' : (project ? 'Güncelle' : 'Ekle')}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
