"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type GlobalMessageDialogProps = {
  open: boolean
  title: string
  message: string
  onClose: () => void
  actionLabel?: string
}

export function GlobalMessageDialog({
  open,
  title,
  message,
  onClose,
  actionLabel = "Close",
}: GlobalMessageDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose()
        }
      }}
    >
      <DialogContent className="border border-border bg-brand-surface text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">{title}</DialogTitle>
          <DialogDescription className="text-brand-muted">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-transparent">
          <Button
            type="button"
            onClick={onClose}
            className="hover:bg-brand-primary-hover"
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
