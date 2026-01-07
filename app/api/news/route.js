import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public/data.json');

export async function GET() {
  try {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    return NextResponse.json(objectData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error reading news data' }, { status: 500 });
  }
}