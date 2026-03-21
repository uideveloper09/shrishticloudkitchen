"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

export type ToastPayload = {
  title: string;
  description?: string;
  variant?: "default" | "success" | "error";
};

type ToastItem = ToastPayload & { id: string };

const ToastContext = createContext<((p: ToastPayload) => void) | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((payload: ToastPayload) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());
    setToasts((prev) => [...prev, { ...payload, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="fixed bottom-0 right-0 z-[200] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-md pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg animate-in slide-in-from-right fade-in duration-300 ${
              t.variant === "error"
                ? "border-red-200 bg-red-50 text-red-900"
                : t.variant === "success"
                  ? "border-green-200 bg-green-50 text-green-900"
                  : "border-[#5c3a21]/15 bg-[#f5efe6] text-accent"
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">{t.title}</p>
              {t.description && (
                <p className="mt-1 text-sm opacity-90">{t.description}</p>
              )}
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toast: (_p: ToastPayload) => {
        if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
          console.warn("useToast used outside ToastProvider");
        }
      },
    };
  }
  return { toast: ctx };
}
