import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request, { params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'public', 'data.json');

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    const newsItem = data.find(item => item.slug === slug);

    if (newsItem) {
      return NextResponse.json(newsItem);
    } else {
      return NextResponse.json({ message: `News with slug "${slug}" not found` }, { status: 404 });
    }
  } catch (error) {
    console.error(`Error processing request for slug ${slug}:`, error);
    return NextResponse.json({ message: 'Error loading news data' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'public', 'data.json');

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    let data = JSON.parse(fileContents);
    const newsIndex = data.findIndex(item => item.slug === slug);

    if (newsIndex === -1) {
      return NextResponse.json({ message: `News with slug "${slug}" not found` }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, ...otherFields } = body;

    if (Object.keys(otherFields).length > 0) {
      return NextResponse.json({ message: 'Only "title" and "description" can be updated.' }, { status: 400 });
    }

    if (title !== undefined) {
      data[newsIndex].title = title;
    }
    if (description !== undefined) {
      data[newsIndex].description = description;
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json(data[newsIndex]);
  } catch (error) {
    console.error(`Error updating news item with slug ${slug}:`, error);
    return NextResponse.json({ message: 'Error updating news data' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'public', 'data.json');

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    let data = JSON.parse(fileContents);
    const initialLength = data.length;
    data = data.filter(item => item.slug !== slug);

    if (data.length === initialLength) {
      return NextResponse.json({ message: `News with slug "${slug}" not found` }, { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ message: `News with slug "${slug}" deleted successfully` });
  } catch (error) {
    console.error(`Error deleting news item with slug ${slug}:`, error);
    return NextResponse.json({ message: 'Error deleting news data' }, { status: 500 });
  }
}
