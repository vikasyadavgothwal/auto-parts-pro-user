import { RequestQuoteForm } from "./request-quote-form";

export function RequestQuotePage() {
  return (
    <div className="min-h-full bg-brand-surface">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16">
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-3 text-3xl font-bold text-white sm:mb-4 sm:text-4xl lg:text-5xl">
            Request a Quote
          </h1>
          <p className="mx-auto max-w-2xl text-base text-brand-muted sm:text-lg lg:text-xl">
            Get personalized offers from multiple verified suppliers
          </p>
        </div>

        <RequestQuoteForm />
      </div>
    </div>
  );
}
