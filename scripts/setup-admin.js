const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const ADMIN_FILE_PATH = path.join(process.cwd(), 'data', 'admin.json');

async function setupAdmin() {
  try {
    // Kullanıcıdan şifre al
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    console.log('🔐 Admin Hesabı Kurulumu\n');
    
    const username = await question('Kullanıcı adı (varsayılan: admin): ') || 'admin';
    const password = await question('Şifre: ');
    const email = await question('E-posta: ') || 'admin@viendigital.com';

    if (!password) {
      console.error('❌ Şifre gerekli!');
      rl.close();
      return;
    }

    // Şifreyi hash'le
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Admin verilerini oluştur
    const adminData = {
      admin: {
        username,
        password: hashedPassword,
        email,
        role: 'admin',
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

    // Dosyayı yaz
    fs.writeFileSync(ADMIN_FILE_PATH, JSON.stringify(adminData, null, 2));

    console.log('\n✅ Admin hesabı başarıyla oluşturuldu!');
    console.log(`👤 Kullanıcı adı: ${username}`);
    console.log(`📧 E-posta: ${email}`);
    console.log(`🔐 Şifre: ${'*'.repeat(password.length)}`);
    console.log('\n🚀 Artık admin paneline giriş yapabilirsiniz!');

    rl.close();
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

// Scripti çalıştır
if (require.main === module) {
  setupAdmin();
}

module.exports = { setupAdmin };
