import { Button } from "@/components/ui/button";
import {
  CompanyInformationSection,
  PartsNeededSection,
  VehicleInformationSection,
} from "./form-sections";

export function RequestQuoteForm() {
  return (
    <form className="space-y-8">
      <CompanyInformationSection />
      <VehicleInformationSection />
      <PartsNeededSection />

      <div className="flex justify-center">
        <Button
          type="submit"
          className="rounded-xl px-10 py-8 rounded-md text-lg font-medium hover:bg-brand-primary-hover"
        >
          Submit Quote Request
        </Button>
      </div>
    </form>
  );
}
