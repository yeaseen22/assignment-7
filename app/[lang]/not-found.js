// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <head>
        <title>Page Not Found</title>
        {/* You might want to include global CSS here if needed, or link it */}
        {/* Example: <link rel="stylesheet" href="/globals.css" /> */}
      </head>
      <body className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl mt-4">Page Not Found</h2>
        <p className="mt-2 text-lg">Could not find the requested resource</p>
        <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-lg hover:bg-blue-700 transition-colors">
          Return Home
        </Link>
      </body>
    </html>
  );
}