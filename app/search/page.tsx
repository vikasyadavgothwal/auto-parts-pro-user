import { SearchPage } from "@/components/site/search/main-search";
import { bookingVehicles } from "@/lib/data/booking";

export default function Search() {
  return (
    <SearchPage
      heading="Confirmed Fitment"
      description="This part is guaranteed to fit your vehicle"
      buttonLabel="Change Vehicle"
      vehicle={bookingVehicles[0]}
    />
  );
}
