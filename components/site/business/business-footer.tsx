

import Link from "next/link";

export const Business_Footer = () => {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] py-16 text-white">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Products */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Products</h4>
            <ul className="space-y-2 text-[#9CA3AF]">
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
            <ul className="space-y-2 text-[#9CA3AF]">
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
            <ul className="space-y-2 text-[#9CA3AF]">
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
            <ul className="space-y-2 text-[#9CA3AF]">
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
        <div className="flex flex-col items-center justify-center gap-4 border-t border-[#2A2A2A] pt-8 md:flex-row">
          <p className="text-[#9CA3AF]">
            © 2026 AutoPartsPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};