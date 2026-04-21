"use client";

import {
  useId,
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BusinessDemoDialogButtonProps = {
  children: ReactNode;
  className?: string;
  source?: string;
  variant?: ComponentProps<typeof Button>["variant"];
};

const inputClassName =
  "h-11 rounded-sm border-border bg-brand-surface px-3 text-white placeholder:text-brand-placeholder";

export function BusinessDemoDialogButton({
  children,
  className,
  source = "Business CTA",
  variant,
}: BusinessDemoDialogButtonProps) {
  const [open, setOpen] = useState(false);
  const formId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={variant} className={className}>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto border border-border bg-brand-panel p-5 sm:max-w-lg sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white">
            Schedule a Demo
          </DialogTitle>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input type="hidden" name="source" value={source} />

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-name`} className="text-white">
              Name
            </Label>
            <Input
              id={`${formId}-name`}
              name="name"
              required
              className={inputClassName}
              autoComplete="name"
              
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-email`} className="text-white">
              Email
            </Label>
            <Input
              id={`${formId}-email`}
              name="email"
              type="email"
              required
              className={inputClassName}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-phone`} className="text-white">
              Phone
            </Label>
            <Input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              className={inputClassName}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-company`} className="text-white">
              Company
            </Label>
            <Input
              id={`${formId}-company`}
              name="company"
              required
              className={inputClassName}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-message`} className="text-white">
              Message
            </Label>
            <Textarea
              id={`${formId}-message`}
              name="message"
              rows={4}
              className="resize-none rounded-sm border-border bg-brand-surface px-3 py-2 text-white placeholder:text-brand-placeholder"
            />
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full rounded-sm font-medium hover:bg-brand-primary-hover"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
