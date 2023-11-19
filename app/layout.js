import Link from 'next/link';
import '../app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
