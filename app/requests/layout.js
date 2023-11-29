import Link from "next/link";
import "../../app/globals.css";
import NavBar from "../components/NavBar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div>
          <main>
            <NavBar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
