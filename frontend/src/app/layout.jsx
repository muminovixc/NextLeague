// OVO NIJE "use client" jer je server component
import './globals.css';
import ClientLayout from './client-layout';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}