import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const ADMIN_FILE_PATH = path.join(process.cwd(), 'data', 'admin.json');

interface AdminUser {
  username: string;
  password: string;
  email: string;
  role: string;
  lastLogin: string | null;
  createdAt: string;
  isActive: boolean;
}

interface AdminData {
  admin: AdminUser;
  settings: {
    maxLoginAttempts: number;
    lockoutDuration: number;
    sessionTimeout: number;
    requireTwoFactor: boolean;
  };
}

// Admin verilerini oku
export function getAdminData(): AdminData {
  try {
    console.log('📁 Admin dosya yolu:', ADMIN_FILE_PATH);
    const data = fs.readFileSync(ADMIN_FILE_PATH, 'utf8');
    console.log('📄 Dosya içeriği okundu');
    const parsedData = JSON.parse(data);
    console.log('✅ JSON parse başarılı');
    return parsedData;
  } catch (error) {
    console.error('❌ Admin verileri okunamadı:', error);
    console.error('❌ Hata detayı:', {
      message: error.message,
      code: error.code,
      path: ADMIN_FILE_PATH
    });
    throw new Error('Admin verileri okunamadı');
  }
}

// Admin verilerini güncelle
export function updateAdminData(data: Partial<AdminData>): void {
  try {
    const currentData = getAdminData();
    const updatedData = { ...currentData, ...data };
    fs.writeFileSync(ADMIN_FILE_PATH, JSON.stringify(updatedData, null, 2));
  } catch (error) {
    console.error('Admin verileri güncellenemedi:', error);
    throw new Error('Admin verileri güncellenemedi');
  }
}

// Şifre hash'le
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Şifre doğrula
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT token oluştur
export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

// JWT token doğrula
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Geçersiz token');
  }
}

// Admin girişi doğrula
export async function authenticateAdmin(username: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    console.log('🔍 Admin verileri okunuyor...');
    const adminData = getAdminData();
    const { admin, settings } = adminData;
    console.log('👤 Admin kullanıcı adı:', admin.username);

    // Kullanıcı adı kontrolü
    if (admin.username !== username) {
      console.log('❌ Kullanıcı adı eşleşmiyor:', { beklenen: admin.username, gelen: username });
      return { success: false, error: 'Geçersiz kullanıcı adı veya şifre' };
    }

    // Hesap aktif mi kontrolü
    if (!admin.isActive) {
      console.log('❌ Hesap devre dışı');
      return { success: false, error: 'Hesap devre dışı' };
    }

    // Şifre doğrulama
    console.log('🔐 Şifre doğrulanıyor...');
    console.log('🔑 Gelen şifre:', password);
    console.log('🔑 Hash\'lenmiş şifre:', admin.password);
    const isValidPassword = await verifyPassword(password, admin.password);
    console.log('🔑 Şifre doğrulama sonucu:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('❌ Şifre yanlış');
      return { success: false, error: 'Geçersiz kullanıcı adı veya şifre' };
    }

    // Token oluştur
    console.log('🎫 Token oluşturuluyor...');
    const token = generateToken({
      username: admin.username,
      email: admin.email,
      role: admin.role,
      iat: Date.now()
    });

    // Son giriş zamanını güncelle
    updateAdminData({
      admin: {
        ...admin,
        lastLogin: new Date().toISOString()
      }
    });

    console.log('✅ Kimlik doğrulama başarılı');
    return { success: true, token };
  } catch (error) {
    console.error('❌ Kimlik doğrulama hatası:', error);
    return { success: false, error: 'Kimlik doğrulama hatası' };
  }
}

// Şifre değiştirme
export async function changePassword(username: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    const adminData = getAdminData();
    const { admin } = adminData;

    // Mevcut şifreyi doğrula
    const isValidPassword = await verifyPassword(currentPassword, admin.password);
    if (!isValidPassword) {
      return { success: false, error: 'Mevcut şifre yanlış' };
    }

    // Yeni şifreyi hash'le
    const hashedNewPassword = await hashPassword(newPassword);

    // Admin verilerini güncelle
    updateAdminData({
      admin: {
        ...admin,
        password: hashedNewPassword
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Şifre değiştirme hatası:', error);
    return { success: false, error: 'Şifre değiştirilemedi' };
  }
}

// Admin bilgilerini güncelle
export function updateAdminInfo(updates: Partial<AdminUser>): { success: boolean; error?: string } {
  try {
    const adminData = getAdminData();
    const { admin } = adminData;

    // Şifre güncelleniyorsa hash'le
    if (updates.password) {
      throw new Error('Şifre bu fonksiyon ile güncellenemez. changePassword fonksiyonunu kullanın.');
    }

    updateAdminData({
      admin: {
        ...admin,
        ...updates
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Admin bilgileri güncellenemedi:', error);
    return { success: false, error: 'Admin bilgileri güncellenemedi' };
  }
}
