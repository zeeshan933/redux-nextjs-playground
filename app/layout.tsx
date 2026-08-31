import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '../lib/redux/StoreProvider';
import Alert from '../components/Alert';

export const metadata: Metadata = {
  title: 'Redux Mastery in Next.js | Complete Guide & Interactive Alert System',
  description: 'Interactive Next.js Redux guide covering The Gist of Redux, Store Creation, Alert Reducer, Actions & Types, and Alert Component Calling.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans">
        <StoreProvider>
          {/* Global Alert Notification Toast Layer */}
          <Alert />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
