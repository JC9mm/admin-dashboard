import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || 'Next.js App Router + NextAuth + Tailwind CSS',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </html>
  );
}
