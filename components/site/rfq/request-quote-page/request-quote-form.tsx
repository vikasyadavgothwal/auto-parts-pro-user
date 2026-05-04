import { Button } from "@/components/ui/button";
import {
  CompanyInformationSection,
  PartsNeededSection,
  VehicleInformationSection,
} from "./form-sections";

export function RequestQuoteForm() {
  return (
    <form className="space-y-6 sm:space-y-8">
      <CompanyInformationSection />
      <VehicleInformationSection />
      <PartsNeededSection />
      <div className="flex justify-center">
        <Button
          type="submit"
          className="h-12 w-full rounded-full px-6 text-base font-medium hover:bg-brand-primary-hover sm:h-auto sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
        >
          Submit Quote Request
        </Button>
      </div>
    </form>
  );
}
