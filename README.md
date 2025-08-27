# Vien Dijital - Modern Web Ajans Landing Page

Bu proje, Vien Dijital internet hizmetleri web ajansı için geliştirilmiş modern, responsive ve SEO dostu bir landing page içerir. Ankara merkezli dijital ajans için profesyonel web sitesi.

## ✨ Özellikler

- **🎨 Modern Tasarım**: Çağdaş web trendlerine uygun, etkileyici kullanıcı arayüzü
- **📱 Tam Responsive**: Tüm cihazlarda (mobil, tablet, masaüstü) mükemmel görüntüleme
- **🔍 SEO Optimizasyonu**: Meta etiketleri, semantik HTML ve hızlı yükleme süreleriyle arama motorları için optimize edilmiş
- **⚡ Next.js Framework**: Hızlı yükleme, server-side rendering ve gelişmiş performans için Next.js kullanımı
- **🔧 Admin Paneli**: Tam özellikli admin paneli ile içerik yönetimi
- **📧 İletişim Formu**: Fonksiyonel iletişim formu ve mesaj yönetimi
- **🗺️ Harita Entegrasyonu**: Google Maps ile Ankara ofis konumu
- **📊 İstatistikler**: Dashboard'da proje ve gelir istatistikleri

## 🛠️ Teknolojiler

- **⚛️ Next.js 14** - React framework
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🎭 Framer Motion** - Animasyon kütüphanesi
- **🎯 React Icons** - İkon kütüphanesi
- **📊 JSON** - Veri depolama (dosya tabanlı)
- **🔐 JWT** - Kimlik doğrulama
- **📧 Nodemailer** - E-posta gönderimi

## 🚀 Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Depoyu klonlayın
git clone https://github.com/kullaniciadi/vienajans.git

# Proje dizinine gidin
cd vienajans

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açarak projeyi görüntüleyebilirsiniz.

## 🔧 Admin Panel Kurulumu

```bash
# Admin hesabı oluşturun
npm run setup-admin
```

## 🔐 Admin Panel Güvenliği

### İlk Kurulum
Admin hesabı oluşturmak için:

```bash
npm run setup-admin
```

Bu komut size kullanıcı adı, şifre ve e-posta soracak.

### Güvenlik Önlemleri
- ✅ JWT token tabanlı kimlik doğrulama
- ✅ Bcrypt ile şifre hash'leme
- ✅ HTTP-only cookies
- ✅ Middleware ile route koruması
- ✅ Session timeout (24 saat)
- ✅ Güvenli çıkış işlemi

### Production Güvenliği
1. `.env.local` dosyasında `JWT_SECRET` değiştirin
2. Güçlü şifre kullanın
3. HTTPS kullanın
4. Düzenli şifre değiştirin

## 📁 Proje Yapısı

```
vienajans/
├── app/                    # Next.js 13+ App Router
│   ├── admin/             # Admin panel sayfaları
│   ├── api/               # API routes
│   └── globals.css        # Global stiller
├── components/            # React bileşenleri
│   ├── admin/            # Admin panel bileşenleri
│   ├── layout/           # Layout bileşenleri
│   └── sections/         # Ana sayfa bölümleri
├── data/                 # JSON veri dosyaları
├── lib/                  # Yardımcı fonksiyonlar
├── public/               # Statik dosyalar
└── scripts/              # Kurulum scriptleri
```

## 🌐 Canlı Demo

🚀 **Vercel'de Canlı**: [https://vienajans.vercel.app](https://vienajans.vercel.app)

## 📸 Ekran Görüntüleri

- **Ana Sayfa**: Modern ve responsive tasarım
- **Admin Panel**: Tam özellikli yönetim paneli
- **İletişim**: Google Maps entegrasyonu ile Ankara ofis

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
