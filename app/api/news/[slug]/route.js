import { NextRequest, NextResponse } from 'next/server';
import data from '../../../../public/data.json';

let newsData = [...data]; // Create a mutable copy of the data

export async function GET(req, { params }) {
  const { slug } = params;
  const newsItem = newsData.find((item) => item.slug === slug);

  if (newsItem) {
    return NextResponse.json(newsItem);
  } else {
    return new NextResponse(
      JSON.stringify({ message: `This News with ${slug} id was not found!` }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function PATCH(req, { params }) {
  const { slug } = params;
  const body = await req.json();

  const newsIndex = newsData.findIndex((item) => item.slug === slug);

  if (newsIndex !== -1) {
    const allowedFields = ['title', 'description'];
    const updates = {};

    for (const key in body) {
      if (allowedFields.includes(key)) {
        updates[key] = body[key];
      } else {
        return new NextResponse(
          JSON.stringify({
            message: `Field '${key}' cannot be updated. Only 'title' and 'description' are allowed.`,
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    newsData[newsIndex] = { ...newsData[newsIndex], ...updates };
    return NextResponse.json(newsData[newsIndex]);
  } else {
    return new NextResponse(
      JSON.stringify({ message: `This News with ${slug} id was not found!` }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function DELETE(req, { params }) {
  const { slug } = params;
  const initialLength = newsData.length;
  newsData = newsData.filter((item) => item.slug !== slug);

  if (newsData.length < initialLength) {
    return new NextResponse(null, { status: 204 }); // No Content
  } else {
    return new NextResponse(
      JSON.stringify({ message: `This News with ${slug} id was not found!` }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
