import { NextRequest, NextResponse } from 'next/server';
import data from '../../../public/data.json';

export async function GET(req) {
  return NextResponse.json(data);
}
