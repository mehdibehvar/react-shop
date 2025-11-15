import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppProviders } from '@/components/providers/app-providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'React Shop',
    template: '%s | React Shop',
  },
  description: 'A modern e-commerce experience built with Next.js and Firebase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <AppProviders>
          <div className="relative flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
