import Link from "next/link";
import "../app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
