import Link from "next/link";

export const Footer_Suppllier = () => {
  return (
    <footer className="mt-auto border-t border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1440px] px-8 py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-5">
          
          {/* Logo + Description */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="mb-4 block text-2xl font-bold text-white"
            >
              AutoParts<span className="text-[#DC2626]">Pro</span>
            </Link>

            <p className="mb-6 leading-relaxed text-[#9CA3AF]">
              Your premium B2B marketplace for automotive parts, services, and
              fleet management solutions.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-[#DC2626]"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                </svg>
                <span>Verified Sellers</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-[#DC2626]"
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="17" cy="18" r="2" />
                  <circle cx="7" cy="18" r="2" />
                </svg>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/search" className="text-[#9CA3AF] hover:text-white">
                  Browse Parts
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#9CA3AF] hover:text-white">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/rfq" className="text-[#9CA3AF] hover:text-white">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-[#9CA3AF] hover:text-white">
                  Business Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Businesses */}
          <div>
            <h3 className="mb-4 font-semibold text-white">For Businesses</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/supplier/dashboard"
                  className="text-[#9CA3AF] hover:text-white"
                >
                  Supplier Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/fleet/dashboard"
                  className="text-[#9CA3AF] hover:text-white"
                >
                  Fleet Management
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#9CA3AF] hover:text-white">
                  Garage Network
                </Link>
              </li>
              <li>
                <a href="#" className="text-[#9CA3AF] hover:text-white">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#9CA3AF] hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9CA3AF] hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9CA3AF] hover:text-white">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9CA3AF] hover:text-white">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mb-8 grid gap-6 border-t border-[#2A2A2A] pt-8 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-[#9CA3AF]">Call Us</div>
              <a
                href="tel:+1-555-123-4567"
                className="text-white hover:text-[#DC2626]"
              >
                +1 (555) 123-4567
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-[#9CA3AF]">Email</div>
              <a
                href="mailto:support@autopartspro.com"
                className="text-white hover:text-[#DC2626]"
              >
                support@autopartspro.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-[#9CA3AF]">Location</div>
              <div className="text-white">San Francisco, CA</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#2A2A2A] pt-8 md:flex-row">
          <p className="text-sm text-[#9CA3AF]">
            © 2026 AutoPartsPro. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-[#9CA3AF] hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-[#9CA3AF] hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-[#9CA3AF] hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
