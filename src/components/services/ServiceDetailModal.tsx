"use client";

import { brandIcons } from "@branding/icons";
import type { Service } from "@/data/services";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useLocale } from "@/context/LocaleContext";

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { t, isArabic, dir } = useLocale();
  const CloseIcon = brandIcons.ui.close;

  useEffect(() => {
    if (!service) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [service, onClose]);

  const Icon = service?.icon;

  return (
    <AnimatePresence>
      {service && Icon && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center" dir={dir}>
          <motion.button
            type="button"
            aria-label={t.services.close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-2xl sm:rounded-lg shadow-elevated overflow-hidden flex flex-col mx-0 sm:mx-4"
          >
            <div className="flex items-start justify-between gap-4 p-6 md:p-8 border-b border-surface-200 shrink-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-brand-700" strokeWidth={1.25} />
                </div>
                <h2
                  id="service-modal-title"
                  className="text-xl md:text-2xl font-semibold text-brand-900 leading-snug"
                >
                  {isArabic ? service.title.ar : service.title.en}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-md text-brand-700 hover:bg-brand-50 transition-colors shrink-0"
                aria-label={t.services.close}
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-8 space-y-8">
              <p className="text-surface-700 leading-relaxed text-base md:text-lg">
                {isArabic ? service.description.ar : service.description.en}
              </p>

              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-brand-600 mb-4">
                  {t.services.subServicesHeading}
                </h3>
                <ul className="space-y-3">
                  {(isArabic ? service.subServices.ar : service.subServices.en).map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-surface-700 leading-relaxed text-sm md:text-base"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-surface-200 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-md bg-brand-700 text-white font-medium hover:bg-brand-800 transition-colors"
              >
                {t.services.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
