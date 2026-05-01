import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";

type BookingActionsProps = {
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  showBackButton: boolean;
};

export function BookingActions({
  canProceed,
  onBack,
  onNext,
  showBackButton,
}: BookingActionsProps) {
  return (
    <div className="mt-12 flex gap-4">
      {showBackButton && (
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2 rounded-xl border border-border bg-card px-8 py-6 text-foreground hover:border-primary hover:bg-card"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Back
        </Button>
      )}

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className={`h-10 flex-1 gap-2 rounded-xl px-8 py-6 font-medium transition-all ${
          canProceed
            ? "bg-primary text-primary-foreground hover:bg-brand-primary-hover"
            : "cursor-not-allowed bg-border text-brand-placeholder hover:bg-border"
        }`}
      >
        Continue
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
