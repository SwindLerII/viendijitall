import fs from 'fs';
import path from 'path';

// JSON dosyalarının yolu
const dataDir = path.join(process.cwd(), 'data');

// Projeleri oku
export async function getProjects() {
  try {
    const filePath = path.join(dataDir, 'projects.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.projects || [];
  } catch (error) {
    console.error('Projeler okunamadı:', error);
    return [];
  }
}

// Proje ekle
export async function addProject(project: any) {
  try {
    const projects = await getProjects();
    const newProject = {
      ...project,
      id: (projects.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    
    const filePath = path.join(dataDir, 'projects.json');
    fs.writeFileSync(filePath, JSON.stringify({ projects }, null, 2));
    
    return newProject;
  } catch (error) {
    console.error('Proje eklenemedi:', error);
    throw error;
  }
}

// Proje güncelle
export async function updateProject(id: string, updates: any) {
  try {
    const projects = await getProjects();
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      throw new Error('Proje bulunamadı');
    }
    
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    const filePath = path.join(dataDir, 'projects.json');
    fs.writeFileSync(filePath, JSON.stringify({ projects }, null, 2));
    
    return projects[projectIndex];
  } catch (error) {
    console.error('Proje güncellenemedi:', error);
    throw error;
  }
}

// Proje sil
export async function deleteProject(id: string) {
  try {
    const projects = await getProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    
    const filePath = path.join(dataDir, 'projects.json');
    fs.writeFileSync(filePath, JSON.stringify({ projects: filteredProjects }, null, 2));
    
    return true;
  } catch (error) {
    console.error('Proje silinemedi:', error);
    throw error;
  }
}

// Müşterileri oku
export async function getClients() {
  try {
    const filePath = path.join(dataDir, 'clients.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.clients || [];
  } catch (error) {
    console.error('Müşteriler okunamadı:', error);
    return [];
  }
}

// Müşteri ekle
export async function addClient(client: any) {
  try {
    const clients = await getClients();
    const newClient = {
      ...client,
      id: (clients.length + 1).toString(),
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      totalProjects: 0,
      totalRevenue: 0
    };
    
    clients.push(newClient);
    
    const filePath = path.join(dataDir, 'clients.json');
    fs.writeFileSync(filePath, JSON.stringify({ clients }, null, 2));
    
    return newClient;
  } catch (error) {
    console.error('Müşteri eklenemedi:', error);
    throw error;
  }
}

// Müşteri güncelle
export async function updateClient(id: string, updates: any) {
  try {
    const clients = await getClients();
    const clientIndex = clients.findIndex(c => c.id === id);
    
    if (clientIndex === -1) {
      throw new Error('Müşteri bulunamadı');
    }
    
    clients[clientIndex] = {
      ...clients[clientIndex],
      ...updates,
      lastContact: new Date().toISOString()
    };
    
    const filePath = path.join(dataDir, 'clients.json');
    fs.writeFileSync(filePath, JSON.stringify({ clients }, null, 2));
    
    return clients[clientIndex];
  } catch (error) {
    console.error('Müşteri güncellenemedi:', error);
    throw error;
  }
}

// Müşteri sil
export async function deleteClient(id: string) {
  try {
    const clients = await getClients();
    const filteredClients = clients.filter(c => c.id !== id);
    
    const filePath = path.join(dataDir, 'clients.json');
    fs.writeFileSync(filePath, JSON.stringify({ clients: filteredClients }, null, 2));
    
    return true;
  } catch (error) {
    console.error('Müşteri silinemedi:', error);
    throw error;
  }
}

// Site ayarlarını oku
export async function getSettings() {
  try {
    const filePath = path.join(dataDir, 'settings.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Site ayarları okunamadı:', error);
    return {};
  }
}

// Site ayarlarını güncelle
export async function updateSettings(updates: any) {
  try {
    const settings = await getSettings();
    const updatedSettings = { ...settings, ...updates };
    
    const filePath = path.join(dataDir, 'settings.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedSettings, null, 2));
    
    return updatedSettings;
  } catch (error) {
    console.error('Site ayarları güncellenemedi:', error);
    throw error;
  }
}

// İstatistikleri hesapla
export async function getStats() {
  try {
    const [projects, clients] = await Promise.all([
      getProjects(),
      getClients()
    ]);
    
    // Budget değerlerini sayıya çevir ve toplam geliri hesapla
    const totalRevenue = projects.reduce((sum, project) => {
      const budget = parseFloat(project.budget) || 0;
      return sum + budget;
    }, 0);
    
    const completedProjects = projects.filter(p => p.status === 'Tamamlandı').length;
    const activeClients = clients.filter(c => c.status === 'Aktif').length;
    
    return {
      totalProjects: projects.length,
      completedProjects,
      totalClients: clients.length,
      activeClients,
      totalRevenue,
      averageProjectValue: projects.length > 0 ? totalRevenue / projects.length : 0
    };
  } catch (error) {
    console.error('İstatistikler hesaplanamadı:', error);
    return {
      totalProjects: 0,
      completedProjects: 0,
      totalClients: 0,
      activeClients: 0,
      totalRevenue: 0,
      averageProjectValue: 0
    };
  }
}

// Mesajları oku
export async function getMessages() {
  try {
    const filePath = path.join(dataDir, 'messages.json');
    if (!fs.existsSync(filePath)) {
      // Dosya yoksa boş array oluştur
      fs.writeFileSync(filePath, JSON.stringify({ messages: [] }, null, 2));
      return [];
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.messages || [];
  } catch (error) {
    console.error('Mesajlar okunamadı:', error);
    return [];
  }
}

// Mesaj ekle
export async function addMessage(message: any) {
  try {
    const messages = await getMessages();
    const newMessage = {
      ...message,
      id: (messages.length + 1).toString(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    const filePath = path.join(dataDir, 'messages.json');
    fs.writeFileSync(filePath, JSON.stringify({ messages }, null, 2));
    
    return newMessage;
  } catch (error) {
    console.error('Mesaj eklenemedi:', error);
    throw error;
  }
}

// Mesaj güncelle
export async function updateMessage(id: string, updates: any) {
  try {
    const messages = await getMessages();
    const messageIndex = messages.findIndex(m => m.id === id);
    
    if (messageIndex === -1) {
      throw new Error('Mesaj bulunamadı');
    }
    
    messages[messageIndex] = {
      ...messages[messageIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    const filePath = path.join(dataDir, 'messages.json');
    fs.writeFileSync(filePath, JSON.stringify({ messages }, null, 2));
    
    return messages[messageIndex];
  } catch (error) {
    console.error('Mesaj güncellenemedi:', error);
    throw error;
  }
}

// Mesaja yanıt ver
export async function replyToMessage(id: string, reply: string) {
  try {
    const messages = await getMessages();
    const messageIndex = messages.findIndex(m => m.id === id);
    
    if (messageIndex === -1) {
      throw new Error('Mesaj bulunamadı');
    }
    
    messages[messageIndex] = {
      ...messages[messageIndex],
      status: 'replied',
      reply,
      repliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const filePath = path.join(dataDir, 'messages.json');
    fs.writeFileSync(filePath, JSON.stringify({ messages }, null, 2));
    
    // Burada gerçek bir e-posta gönderme işlemi yapılabilir
    console.log(`📧 E-posta gönderildi: ${messages[messageIndex].clientEmail}`);
    console.log(`📝 Yanıt: ${reply}`);
    
    return messages[messageIndex];
  } catch (error) {
    console.error('Yanıt gönderilemedi:', error);
    throw error;
  }
}
