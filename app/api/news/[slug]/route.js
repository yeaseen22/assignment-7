import fsPromises from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public/data.json');

export async function GET(request, { params }) {
  const { slug } = params;
  try {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    const newsItem = objectData.news.find(item => item.slug === slug);

    if (newsItem) {
      return NextResponse.json(newsItem);
    } else {
      return NextResponse.json({ message: `This News with ${slug} id was not found!` }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error reading news data' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { slug } = params;
  try {
    const requestBody = await request.json();
    const { title, description } = requestBody;

    // Check if any invalid fields are being updated
    const validFields = ['title', 'description'];
    const requestedFields = Object.keys(requestBody);
    const invalidFields = requestedFields.filter(field => !validFields.includes(field));

    if (invalidFields.length > 0) {
      return NextResponse.json(
        { message: `Error: Cannot update field(s): ${invalidFields.join(', ')}. Only "title" and "description" can be updated.` },
        { status: 400 }
      );
    }

    if (!title && !description) {
      return NextResponse.json({ message: 'Error: No valid fields provided for update. Only "title" and "description" can be updated.' }, { status: 400 });
    }

    const jsonData = await fsPromises.readFile(dataFilePath);
    let objectData = JSON.parse(jsonData);
    const newsIndex = objectData.news.findIndex(item => item.slug === slug);

    if (newsIndex > -1) {
      if (title !== undefined) {
        objectData.news[newsIndex].title = title;
      }
      if (description !== undefined) {
        objectData.news[newsIndex].description = description;
      }

      await fsPromises.writeFile(dataFilePath, JSON.stringify(objectData, null, 2));
      return NextResponse.json(objectData.news[newsIndex]);
    } else {
      return NextResponse.json({ message: `This News with ${slug} id was not found!` }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating news data' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = params;
  try {
    const jsonData = await fsPromises.readFile(dataFilePath);
    let objectData = JSON.parse(jsonData);
    const initialLength = objectData.news.length;
    objectData.news = objectData.news.filter(item => item.slug !== slug);

    if (objectData.news.length < initialLength) {
      await fsPromises.writeFile(dataFilePath, JSON.stringify(objectData, null, 2));
      return NextResponse.json({ message: `News with slug "${slug}" deleted successfully.` });
    } else {
      return NextResponse.json({ message: `This News with ${slug} id was not found!` }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting news data' }, { status: 500 });
  }
}