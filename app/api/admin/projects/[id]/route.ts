import { NextResponse } from 'next/server';
import { updateProject, deleteProject } from '@/lib/data';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updatedProject = await updateProject(params.id, updates);
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Proje güncellenemedi:', error);
    return NextResponse.json(
      { error: 'Proje güncellenemedi' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteProject(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Proje silinemedi:', error);
    return NextResponse.json(
      { error: 'Proje silinemedi' },
      { status: 500 }
    );
  }
}
