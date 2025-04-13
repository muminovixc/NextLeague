import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NextLeague - Sports League Management',
  description: 'Create and manage your sports leagues and clubs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
