"use client";

import * as Toast from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={cn(
          "rounded-lg border border-accent/10 bg-secondary p-4 shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[swipe=end]:animate-out data-[state=closed]:fade-out-0",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
        )}
      >
        <Toast.Title className="font-medium text-accent" />
        <Toast.Description className="text-sm text-accent/80" />
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[100] flex max-w-full flex-col gap-2 p-4 outline-none" />
    </Toast.Provider>
  );
}
