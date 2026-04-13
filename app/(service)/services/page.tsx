import {ServicesSearchHero} from "@/components/site/service/main/Service_section";
import {ServicesListingSection} from "@/components/site/service/main/Services";

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <ServicesSearchHero />
      <ServicesListingSection />

    </div>
  );
}