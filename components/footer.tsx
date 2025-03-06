import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-violet-950 text-violet-200 py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold text-white">Brainwave AI</h2>
            <p className="mt-2 text-sm text-violet-300">
              Organize, automate, and optimize your workflow efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="hover:text-violet-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-violet-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-violet-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-violet-400 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/blog" className="hover:text-violet-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-violet-400 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-violet-400 transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex mt-3 space-x-4">
              <Link href="https://twitter.com" className="hover:text-violet-400 transition">
                Twitter
              </Link>
              <Link href="https://github.com" className="hover:text-violet-400 transition">
                GitHub
              </Link>
              <Link href="https://linkedin.com" className="hover:text-violet-400 transition">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-violet-800 pt-4 text-center text-sm text-violet-400">
          © {new Date().getFullYear()} Brainwave AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
