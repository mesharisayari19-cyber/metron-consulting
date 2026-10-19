"use client";

import { ICON_STROKE } from "@branding/icons";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { CountryCode } from "libphonenumber-js";
import {
  isAllowedPhoneTyping,
  listDialCountries,
  normalizePastedPhone,
  type DialCountry,
} from "@/lib/contact-form";

interface PhoneFieldProps {
  id: string;
  locale: "ar" | "en";
  country: CountryCode;
  nationalNumber: string;
  onCountryChange: (country: CountryCode) => void;
  onNationalNumberChange: (value: string) => void;
  invalidMessage: string;
  labels: {
    country: string;
    search: string;
    empty: string;
  };
  error?: string;
  onInvalid: () => void;
  onClearError: () => void;
}

export function PhoneField({
  id,
  locale,
  country,
  nationalNumber,
  onCountryChange,
  onNationalNumberChange,
  invalidMessage,
  labels,
  error,
  onInvalid,
  onClearError,
}: PhoneFieldProps) {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const countries = useMemo(() => listDialCountries(locale), [locale]);
  const selected = countries.find((item) => item.iso === country) ?? countries[0];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase().replace(/^\+/, "");
    if (!term) return countries;
    return countries.filter((item) => {
      const dial = item.dial.toLowerCase();
      return (
        item.name.toLowerCase().includes(term) ||
        dial.includes(term) ||
        `+${dial}`.includes(term) ||
        item.iso.toLowerCase().includes(term)
      );
    });
  }, [countries, query]);

  useEffect(() => {
    if (!open) return;
    const selectedIndex = countries.findIndex((item) => item.iso === country);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    searchRef.current?.focus();
  }, [open, country, countries]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId, open]);

  const selectCountry = (item: DialCountry) => {
    onCountryChange(item.iso);
    setOpen(false);
    setQuery("");
    if (nationalNumber.trim()) {
      const normalized = normalizePastedPhone(nationalNumber, item.iso);
      if (!normalized) onInvalid();
      else onClearError();
    }
  };

  const applyNormalized = (raw: string, fallbackCountry: CountryCode) => {
    const normalized = normalizePastedPhone(raw, fallbackCountry);
    if (!normalized) {
      onInvalid();
      return false;
    }
    onCountryChange(normalized.country);
    onNationalNumberChange(normalized.national);
    onClearError();
    return true;
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(filtered.length - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[activeIndex];
      if (item) selectCountry(item);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-stretch overflow-hidden rounded-md border bg-white transition-all ${
          error
            ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/15"
            : "border-surface-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15"
        }`}
        dir="ltr"
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          data-phone-control="country"
          aria-label={selected ? `${labels.country}: ${selected.name} +${selected.dial}` : labels.country}
          onClick={() => {
            setOpen((current) => !current);
            setQuery("");
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(true);
              setQuery("");
            }
          }}
          className="inline-flex shrink-0 items-center gap-1 border-e border-surface-300 px-3 text-sm font-semibold text-brand-900 outline-none hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
        >
          <span>+{selected?.dial ?? "966"}</span>
          <ChevronDown className="h-4 w-4 text-brand-600" strokeWidth={ICON_STROKE} aria-hidden />
        </button>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          dir="ltr"
          value={nationalNumber}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => {
            const next = event.target.value;
            if (!isAllowedPhoneTyping(next)) {
              onInvalid();
              return;
            }
            if (next.trim().startsWith("+")) {
              const normalized = normalizePastedPhone(next, country);
              if (normalized) {
                onCountryChange(normalized.country);
                onNationalNumberChange(normalized.national);
                onClearError();
                return;
              }
            }
            onNationalNumberChange(next);
            if (error) onClearError();
          }}
          onBlur={(event) => {
            const nextFocus = event.relatedTarget;
            if (nextFocus instanceof HTMLElement && nextFocus.dataset.phoneControl === "country") return;
            const trimmed = event.currentTarget.value.trim();
            if (!trimmed) {
              onClearError();
              return;
            }
            applyNormalized(trimmed, country);
          }}
          onPaste={(event) => {
            event.preventDefault();
            const pasted = event.clipboardData.getData("text");
            const input = event.currentTarget;
            const start = input.selectionStart ?? nationalNumber.length;
            const end = input.selectionEnd ?? nationalNumber.length;
            const combined = `${nationalNumber.slice(0, start)}${pasted}${nationalNumber.slice(end)}`;
            applyNormalized(combined, country);
          }}
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-start outline-none"
        />
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-600" role="alert">
          {error || invalidMessage}
        </p>
      ) : null}

      {open ? (
        <div
          className="absolute z-30 mt-1 w-full min-w-[18rem] overflow-hidden rounded-md border border-surface-300 bg-white shadow-[0_12px_28px_-12px_rgba(27,61,92,0.18)]"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="border-b border-surface-200 p-2">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onSearchKeyDown}
              placeholder={labels.search}
              aria-label={labels.search}
              aria-autocomplete="list"
              aria-controls={listId}
              aria-activedescendant={filtered.length > 0 ? `${listId}-option-${activeIndex}` : undefined}
              className="w-full rounded-md border border-surface-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>
          <ul id={listId} role="listbox" aria-label={labels.country} className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-surface-500">{labels.empty}</li>
            ) : (
              filtered.map((item, index) => {
                const isSelected = item.iso === country;
                const isActive = index === activeIndex;
                return (
                  <li key={item.iso} role="presentation">
                    <button
                      id={`${listId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectCountry(item)}
                      className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-sm outline-none ${
                        isActive ? "bg-brand-50 text-brand-900" : "text-brand-800"
                      } ${isSelected ? "font-semibold" : "font-medium"}`}
                    >
                      <span className="truncate">{item.name}</span>
                      <span dir="ltr" className="shrink-0 text-surface-500">
                        +{item.dial}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
