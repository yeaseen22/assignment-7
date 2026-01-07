import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  // Define the path to the data.json file in the public directory
  const filePath = path.join(process.cwd(), 'public', 'data.json');

  try {
    // Read the data.json file
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data.json:', error);
    return NextResponse.json({ message: 'Error loading news data' }, { status: 500 });
  }
}
