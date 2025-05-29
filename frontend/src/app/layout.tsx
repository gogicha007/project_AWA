import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import LayoutClient from './layoutClient';
import Header from '../components/layout/header/header';
import { AuthProvider } from '@/context/auth';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IG Project',
  description: 'Project AWA',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale = 'en';
  let messages = {};

  try {
    locale = await getLocale();
    messages = await getMessages({ locale });
  } catch {
    locale = 'en';
    messages = {};
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LayoutClient>
              <header>
                <Header />
              </header>
              <main>{children}</main>
            </LayoutClient>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
