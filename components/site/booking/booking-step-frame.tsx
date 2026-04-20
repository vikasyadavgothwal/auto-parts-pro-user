import type { ReactNode } from "react";
import { motion } from "motion/react";
import { BOOKING_STEP_MOTION } from "@/components/site/booking/config";

type BookingStepFrameProps = {
  stepId: string;
  children: ReactNode;
};

export function BookingStepFrame({
  stepId,
  children,
}: BookingStepFrameProps) {
  return (
    <motion.div key={stepId} {...BOOKING_STEP_MOTION}>
      {children}
    </motion.div>
  );
}
