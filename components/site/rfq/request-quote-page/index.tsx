import { RequestQuoteForm } from "./request-quote-form";

export function RequestQuotePage() {
  return (
    <div className="min-h-full bg-brand-surface">
      <div className="mx-auto max-w-[1440px] md:px-8 px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">Request a Quote</h1>
          <p className="text-xl text-brand-muted">
            Get personalized offers from multiple verified suppliers
          </p>
        </div>

        <RequestQuoteForm />
      </div>
    </div>
  );
}
