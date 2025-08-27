const fs = require('fs');
const path = require('path');

// Vercel build script
console.log('🚀 Vercel build başlatılıyor...');

// Data klasörünü oluştur
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ Data klasörü oluşturuldu');
}

// Admin dosyasını kontrol et ve oluştur
const adminFile = path.join(dataDir, 'admin.json');
if (!fs.existsSync(adminFile)) {
  console.log('⚠️ Admin dosyası bulunamadı, oluşturuluyor...');
  
  const defaultAdmin = {
    admin: {
      username: "admin",
      password: "$2b$12$VHtEhANo848OCYy0P15qSewB8a75cnD6qPewgO9ly8SJkQmtQriWa", // admin123
      email: "admin@viendijital.com",
      role: "admin",
      lastLogin: null,
      createdAt: new Date().toISOString(),
      isActive: true
    },
    settings: {
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      sessionTimeout: 3600,
      requireTwoFactor: false
    }
  };
  
  fs.writeFileSync(adminFile, JSON.stringify(defaultAdmin, null, 2));
  console.log('✅ Admin dosyası oluşturuldu');
}

// Diğer gerekli dosyaları kontrol et
const requiredFiles = [
  'projects.json',
  'clients.json', 
  'messages.json',
  'settings.json'
];

requiredFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ ${file} bulunamadı, oluşturuluyor...`);
    
    let defaultData = {};
    switch (file) {
      case 'projects.json':
        defaultData = { projects: [] };
        break;
      case 'clients.json':
        defaultData = { clients: [] };
        break;
      case 'messages.json':
        defaultData = { messages: [] };
        break;
      case 'settings.json':
        defaultData = {
          siteName: "Vien Dijital",
          metaDescription: "Vien Dijital - Modern web tasarım ve geliştirme hizmetleri",
          favicon: "",
          updatedAt: new Date().toISOString()
        };
        break;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    console.log(`✅ ${file} oluşturuldu`);
  }
});

console.log('✅ Vercel build hazırlığı tamamlandı');
