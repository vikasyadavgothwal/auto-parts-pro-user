"use client";

import type { ReactNode } from "react";
import { CloseIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type MobileFilterDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
  className?: string;
};

export function MobileFilterDrawer({
  open,
  onOpenChange,
  title,
  children,
  headerAction,
  className,
}: MobileFilterDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "left-0 top-0 flex h-dvh w-[min(90vw,24rem)] max-w-none flex-col overflow-hidden translate-x-0 translate-y-0 gap-0 rounded-none rounded-r-md border-[#2A2A2A] bg-[#111111] p-0 text-white shadow-2xl ring-0 sm:max-w-none data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full transition-transform duration-300",
          className,
        )}
      >
        <DialogHeader className="gap-0 border-b border-[#2A2A2A] p-5">
          <div className="flex items-center justify-between gap-3">
            <DialogTitle className="text-lg font-semibold text-white">
              {title}
            </DialogTitle>

            <div className="flex items-center gap-2">
              {headerAction}

              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-xl text-white hover:bg-white/5 hover:text-white"
                >
                  <CloseIcon className="h-5 w-5" />
                  <span className="sr-only">Close filters</span>
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
