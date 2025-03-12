import "./globals.css";
import Link from "next/link";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="flex flex-wrap items-center justify-evenly text-lg font-bold text-white mb-4">
          {/* Home */}
          <Link href="/api/pages" className="w-1/5">
            <button className="hover:bg-blue-500 py-4 w-full flex-1 rounded">
              Home
            </button>
          </Link>

          {/* All Guides */}
          <Link href="/api/pages/GuideListPage" className="w-1/5">
            <button className="hover:bg-blue-500 py-4 w-full flex-1 rounded">
              All Guides
            </button>
          </Link>

          {/* Resources */}
          <Link href="/api/pages/ResourcesPage" className="w-1/5">
            <button className="hover:bg-blue-500 py-4 w-full flex-1 rounded">
              Resources
            </button>
          </Link>

          {/* Help */}
          <Link href="/api/pages/HelpPage" className="w-1/5">
            <button className="hover:bg-blue-500 py-4 w-full flex-1 rounded">
              Help
            </button>
          </Link>

          {/* Sign In */}
          <Link href="/api/pages/SignInPage" className="w-1/5">
            <button className="hover:bg-blue-500 py-4 w-full flex-1 rounded">
              Sign In
            </button>
          </Link>
          
        </header>
        {children}
      </body>
    </html>
  );
}
