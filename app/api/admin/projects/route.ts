import { NextResponse } from 'next/server';
import { getProjects, addProject } from '@/lib/data';

export async function GET() {
  try {
    console.log('📡 API: Projeler isteniyor...'); // Debug log
    const projects = await getProjects();
    console.log('📊 API: Projeler döndürülüyor:', projects); // Debug log
    
    const response = NextResponse.json(projects);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('❌ API: Projeler alınamadı:', error);
    return NextResponse.json(
      { error: 'Projeler alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const project = await request.json();
    const newProject = await addProject(project);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Proje eklenemedi:', error);
    return NextResponse.json(
      { error: 'Proje eklenemedi' },
      { status: 500 }
    );
  }
}
