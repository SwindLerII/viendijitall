import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('📁 Dosya yükleme isteği başladı');
    const formData = await request.formData();
    console.log('📄 FormData alındı');
    
    const file = formData.get('file') as File;
    console.log('📋 Dosya bilgileri:', {
      name: file?.name,
      size: file?.size,
      type: file?.type
    });

    if (!file) {
      console.log('❌ Dosya bulunamadı');
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      );
    }

    // Dosya türü kontrolü
    const type = formData.get('type') as string;
    let allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    // Favicon için ICO formatını da kabul et
    if (type === 'favicon') {
      allowedTypes.push('image/x-icon', 'image/vnd.microsoft.icon');
    }
    
    console.log('🔍 Dosya türü kontrolü:', file.type, 'İzin verilen:', allowedTypes);
    if (!allowedTypes.includes(file.type)) {
      console.log('❌ Dosya türü uygun değil:', file.type);
      return NextResponse.json(
        { error: 'Sadece JPEG, PNG, WebP ve ICO dosyaları kabul edilir' },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    console.log('📏 Dosya boyutu kontrolü:', file.size, 'Max:', maxSize);
    if (file.size > maxSize) {
      console.log('❌ Dosya boyutu çok büyük:', file.size);
      return NextResponse.json(
        { error: 'Dosya boyutu 5MB\'dan küçük olmalıdır' },
        { status: 400 }
      );
    }

    // Dosya adını oluştur
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const prefix = type === 'favicon' ? 'favicon' : 'project';
    const fileName = `${prefix}-${timestamp}${fileExtension}`;
    console.log('📝 Dosya adı oluşturuldu:', fileName);

    // Uploads klasörünü oluştur
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    console.log('📁 Uploads klasörü yolu:', uploadsDir);
    await mkdir(uploadsDir, { recursive: true });
    console.log('✅ Uploads klasörü oluşturuldu');

    // Dosyayı kaydet
    const filePath = path.join(uploadsDir, fileName);
    console.log('💾 Dosya kaydediliyor:', filePath);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    console.log('✅ Dosya başarıyla kaydedildi');

    // Dosya URL'ini döndür
    const fileUrl = `/uploads/${fileName}`;
    console.log('🔗 Dosya URL\'i:', fileUrl);

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: fileName
    });

  } catch (error) {
    console.error('❌ Dosya yükleme hatası:', error);
    console.error('❌ Hata detayı:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Dosya yüklenemedi' },
      { status: 500 }
    );
  }
}
