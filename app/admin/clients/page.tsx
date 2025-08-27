"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  HiOutlineUsers, 
  HiOutlineChat, 
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineReply,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineArrowLeft,
  HiOutlineRefresh
} from 'react-icons/hi';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'active' | 'inactive' | 'potential';
  createdAt: string;
  lastContact?: string;
  totalProjects: number;
  totalRevenue: number;
}

interface Message {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  createdAt: string;
  category: 'general' | 'support' | 'quote' | 'complaint';
  priority: 'low' | 'medium' | 'high';
}

export default function ClientsManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'clients' | 'messages'>('messages');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'general' | 'support' | 'quote' | 'complaint'>('all');

  const fetchClients = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Müşteriler yüklenemedi:', error);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Mesajlar yüklenemedi:', error);
    }
  }, []);

  const fetchData = useCallback(async () => {
    await Promise.all([
      fetchClients(),
      fetchMessages()
    ]);
  }, [fetchClients, fetchMessages]);

  useEffect(() => {
    // Authentication kontrolü
    const checkAuth = async () => {
      try {
        const cookies = document.cookie.split(';');
        const adminTokenCookie = cookies.find(cookie => 
          cookie.trim().startsWith('adminToken=')
        );
        
        if (!adminTokenCookie) {
          router.push('/admin/login');
          return;
        }

        setIsAuthenticated(true);
        setIsLoading(false);
        fetchData();
        
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/admin/login');
      }
    };

    checkAuth();

    // Real-time güncelleme için interval
    const interval = setInterval(() => {
      if (isAuthenticated) {
        fetchMessages();
      }
    }, 5000); // Her 5 saniyede bir kontrol et

    return () => clearInterval(interval);
  }, [router, isAuthenticated, fetchData, fetchMessages]);

  const handleMessageStatus = async (messageId: string, status: Message['status']) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Mesaj durumu güncellenemedi:', error);
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      const response = await fetch(`/api/admin/messages/${selectedMessage.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyText })
      });

      if (response.ok) {
        setShowMessageModal(false);
        setSelectedMessage(null);
        setReplyText('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Yanıt gönderilemedi:', error);
    }
  };

  const filteredMessages = messages.filter(message => {
    const statusMatch = filterStatus === 'all' || message.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || message.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Message['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: Message['category']) => {
    switch (category) {
      case 'support': return '🛠️';
      case 'quote': return '💰';
      case 'complaint': return '⚠️';
      default: return '💬';
    }
  };

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
              <Link 
                href="/admin/dashboard"
                className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <HiOutlineArrowLeft className="w-5 h-5" />
                <span>Geri</span>
              </Link>
              <div className="text-2xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                  Müşteri
                </span>
                <span className="text-secondary-800"> Yönetimi</span>
              </div>
            </div>
            
                         <div className="flex items-center space-x-4">
               <button 
                 onClick={fetchMessages}
                 className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
               >
                 <HiOutlineRefresh className="w-5 h-5" />
                 <span>Mesajları Yenile</span>
               </button>
               <button 
                 onClick={fetchData}
                 className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
               >
                 <HiOutlineRefresh className="w-5 h-5" />
                 <span>Tümünü Yenile</span>
               </button>

             </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
                     <button
             onClick={() => setActiveTab('messages')}
             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
               activeTab === 'messages'
                 ? 'bg-primary-600 text-white'
                 : 'text-secondary-600 hover:text-secondary-800'
             }`}
           >
             <div className="flex items-center justify-center space-x-2">
               <HiOutlineChat className="w-4 h-4" />
               <span>Forum Mesajları</span>
               {messages.filter(m => m.status === 'new').length > 0 && (
                 <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                   {messages.filter(m => m.status === 'new').length}
                 </span>
               )}
             </div>
           </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'clients'
                ? 'bg-primary-600 text-white'
                : 'text-secondary-600 hover:text-secondary-800'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <HiOutlineUsers className="w-4 h-4" />
              <span>Müşteriler ({clients.length})</span>
            </div>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                <h3 className="text-lg font-semibold text-secondary-800 mb-4">Filtreler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Durum</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">Tümü</option>
                      <option value="new">Yeni</option>
                      <option value="read">Okundu</option>
                      <option value="replied">Yanıtlandı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Kategori</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">Tümü</option>
                      <option value="general">Genel</option>
                      <option value="support">Destek</option>
                      <option value="quote">Teklif</option>
                      <option value="complaint">Şikayet</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Messages List */}
              <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
                <div className="p-6 border-b border-secondary-200">
                  <h3 className="text-lg font-semibold text-secondary-800">
                    Forum Mesajları ({filteredMessages.length})
                  </h3>
                </div>
                
                <div className="divide-y divide-secondary-200">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-4xl mb-4">📭</div>
                      <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                        Mesaj Bulunamadı
                      </h3>
                      <p className="text-secondary-600">
                        Seçilen filtrelere uygun mesaj bulunmuyor.
                      </p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 hover:bg-secondary-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-2xl">{getCategoryIcon(message.category)}</span>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-secondary-800">{message.subject}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                                  {message.status === 'new' ? 'Yeni' : 
                                   message.status === 'read' ? 'Okundu' : 
                                   message.status === 'replied' ? 'Yanıtlandı' : 'Kapalı'}
                                </span>
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`}></div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-secondary-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <HiOutlineMail className="w-4 h-4" />
                                <span>{message.clientName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <HiOutlineCalendar className="w-4 h-4" />
                                <span>{new Date(message.createdAt).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                            
                            <p className="text-secondary-700 line-clamp-2">{message.message}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => {
                                setSelectedMessage(message);
                                setShowMessageModal(true);
                              }}
                              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              title="Mesajı görüntüle"
                            >
                              <HiOutlineEye className="w-5 h-5" />
                            </button>
                            
                            {message.status === 'new' && (
                              <>
                                <button
                                  onClick={() => handleMessageStatus(message.id, 'read')}
                                  className="p-2 text-secondary-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                  title="Okundu olarak işaretle"
                                >
                                  <HiOutlineCheck className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleMessageStatus(message.id, 'closed')}
                                  className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Kapat"
                                >
                                  <HiOutlineX className="w-5 h-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'clients' && (
            <motion.div
              key="clients"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
                <div className="p-6 border-b border-secondary-200">
                  <h3 className="text-lg font-semibold text-secondary-800">
                    Müşteri Listesi ({clients.length})
                  </h3>
                </div>
                
                <div className="divide-y divide-secondary-200">
                  {clients.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-4xl mb-4">👥</div>
                      <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                        Müşteri Bulunamadı
                      </h3>
                      <p className="text-secondary-600">
                        Henüz müşteri kaydı bulunmuyor.
                      </p>
                    </div>
                  ) : (
                    clients.map((client) => (
                      <motion.div
                        key={client.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 hover:bg-secondary-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-secondary-800">{client.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                client.status === 'active' ? 'bg-green-100 text-green-800' :
                                client.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {client.status === 'active' ? 'Aktif' : 
                                 client.status === 'inactive' ? 'Pasif' : 'Potansiyel'}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-secondary-600 mb-2">
                              <div className="flex items-center space-x-1">
                                <HiOutlineMail className="w-4 h-4" />
                                <span>{client.email}</span>
                              </div>
                              {client.phone && (
                                <div className="flex items-center space-x-1">
                                  <HiOutlinePhone className="w-4 h-4" />
                                  <span>{client.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-1">
                                <HiOutlineCalendar className="w-4 h-4" />
                                <span>{new Date(client.createdAt).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                            
                            {client.company && (
                              <p className="text-secondary-600 text-sm mb-2">
                                Şirket: {client.company}
                              </p>
                            )}
                            
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-secondary-600">
                                Projeler: {client.totalProjects}
                              </span>
                              <span className="text-secondary-600">
                                Toplam Gelir: ₺{client.totalRevenue.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-secondary-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-secondary-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-secondary-800">
                    {selectedMessage.subject}
                  </h3>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    <HiOutlineX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getCategoryIcon(selectedMessage.category)}</span>
                      <span className="font-medium text-secondary-800">{selectedMessage.clientName}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status === 'new' ? 'Yeni' : 
                       selectedMessage.status === 'read' ? 'Okundu' : 
                       selectedMessage.status === 'replied' ? 'Yanıtlandı' : 'Kapalı'}
                    </span>
                  </div>
                  <p className="text-secondary-600 text-sm mb-2">{selectedMessage.clientEmail}</p>
                  <p className="text-secondary-700">{selectedMessage.message}</p>
                </div>

                {selectedMessage.status !== 'replied' && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Yanıtınız
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Müşteriye yanıtınızı yazın..."
                    />
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-secondary-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 text-secondary-600 hover:text-secondary-800 transition-colors"
                >
                  İptal
                </button>
                {selectedMessage.status !== 'replied' && (
                  <button
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Yanıtla
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
