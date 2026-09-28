"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ToastType = "success" | "error" | "info";
type ToastItem = { id: number; message: string; type: ToastType };

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="no-print pointer-events-none fixed bottom-6 left-1/2 z-[200] flex w-full max-w-sm -translate-x-1/2 flex-col gap-3 px-4">
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto animate-fade-up border-l-2 px-5 py-4 text-sm shadow-luxe ${
              t.type === "error"
                ? "border-red-600 bg-espresso text-ivory"
                : t.type === "success"
                  ? "border-gold-light bg-espresso text-ivory"
                  : "border-ivory-400 bg-ivory-50 text-espresso"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
