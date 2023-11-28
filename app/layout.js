import Link from "next/link";
import "../app/globals.css";
import NavBar from "./components/NavBar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="flex">
          <div>
            <NavBar />
          </div>
          <main className="flex-1 pt-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
