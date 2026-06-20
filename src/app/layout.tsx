import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import { AppSplash } from '@/components/layout/AppSplash';
import { MotionLazy } from '@/components/motion/motion-lazy';
import { buildRootMetadata } from '@/lib/constants/seo';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = buildRootMetadata();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('antialiased', inter.variable, playfair.variable, 'font-sans')}>
      <body className="flex min-h-screen flex-col overflow-x-hidden font-sans">
        <MotionLazy>
          <AppSplash />
          {children}
        </MotionLazy>
      </body>
    </html>
  );
}
