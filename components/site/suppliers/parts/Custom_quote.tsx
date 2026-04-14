import Link from "next/link";
import { FileText, MessageSquare } from "lucide-react";

export const SupplierCustomQuoteSection = () => {
  return (
    <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:mb-16">
            <div className="rounded-2xl border border-[#DC2626]/30 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] p-6 text-center sm:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DC2626]/10">
          <FileText className="h-8 w-8 text-[#DC2626]" />
        </div>

        <h3 className="mb-2 text-2xl font-bold text-white">
          Can&apos;t find the right part?
        </h3>

        <p className="mb-6 text-[#9CA3AF]">
          Submit a Request for Quote and get personalized offers directly from
          Premium Auto Parts Inc.
        </p>

        <Link
          href="rfq"
          className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] px-8 py-3 font-medium text-white transition-all hover:bg-[#B91C1C]"
        >
          <MessageSquare className="h-5 w-5" />
          Request Custom Quote
        </Link>
      </div>
    </div>
    </div>
  );
};