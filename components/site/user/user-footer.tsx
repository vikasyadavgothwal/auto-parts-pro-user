import Link from "next/link";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-brand-surface py-16 text-white">
      <div className="site-container">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Products */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Products</h4>
            <ul className="space-y-2 text-brand-muted">
              <li>
                <Link
                  href="/search"
                  className="transition-colors hover:text-white"
                >
                  Browse Parts
                </Link>
              </li>
              <li>
                <Link
                  href="/rfq"
                  className="transition-colors hover:text-white"
                >
                  Request Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-white"
                >
                  Find Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-brand-muted">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-brand-muted">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-brand-muted">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-brand-muted">
            © 2026 AutoPartsPro. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-brand-muted transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-brand-muted transition-colors hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
};
