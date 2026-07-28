"use client";

import { ICON_STROKE, brandIcons } from "@branding/icons";
import { useRef, useState, type KeyboardEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";

const tabKeys = ["vision", "mission", "values", "whyMetron"] as const;
type TabKey = (typeof tabKeys)[number];

const tabIcons = brandIcons.about.tabs;

const valueKeys = [
  "professionalQuality",
  "integrity",
  "sustainableImpact",
  "clientFocus",
] as const;

const valueIcons = brandIcons.about.values;

export function About() {
  const { t } = useLocale();
  const [active, setActive] = useState<TabKey>("vision");
  const tabButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const about = t.about;
  if (!about?.cards) return null;

  const ActiveIcon = tabIcons[active];

  const tabLabel = (key: TabKey) => {
    if (key === "whyMetron") return about.whyMetronTab.title;
    return about.cards[key].title;
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = tabKeys.length;
    const isRtl = document?.documentElement?.dir === "rtl";
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        nextIndex = isRtl ? (index - 1 + total) % total : (index + 1) % total;
        break;
      case "ArrowLeft":
        event.preventDefault();
        nextIndex = isRtl ? (index + 1) % total : (index - 1 + total) % total;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = total - 1;
        break;
      default:
        return;
    }

    const targetKey = tabKeys[nextIndex];
    setActive(targetKey);
    tabButtonRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="about" className="section-executive bg-surface-50">
      <div id="why-metron" className="scroll-mt-24 h-0" aria-hidden="true" />
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={about.title} subtitle={about.subtitle} />

        <div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-10 max-w-full"
          role="tablist"
          aria-label={about.title}
        >
          {tabKeys.map((key, index) => {
            const Icon = tabIcons[key];
            const isActive = active === key;

            return (
              <button
                key={key}
                ref={(element) => {
                  tabButtonRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`about-panel-${key}`}
                id={`about-tab-${key}`}
                onClick={() => setActive(key)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  isActive
                    ? "bg-brand-900 text-white border-brand-900 shadow-[0_4px_14px_rgba(27,61,92,0.2)]"
                    : "bg-white text-brand-800 border-surface-200 hover:border-brand-200 hover:bg-brand-50/50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-brand-600"}`}
                  strokeWidth={ICON_STROKE}
                />
                <span className="whitespace-nowrap">{tabLabel(key)}</span>
              </button>
            );
          })}
        </div>

        <div
          key={active}
          id={`about-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`about-tab-${active}`}
          className="card-premium p-8 md:p-10 lg:p-12 transition-opacity duration-300"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
              <ActiveIcon className="w-6 h-6 text-brand-700" strokeWidth={ICON_STROKE} />
            </div>
            <div className="flex items-center gap-3 min-w-0 pt-1">
              <span
                className="w-1 self-stretch min-h-[1.75rem] rounded-full bg-brand-600 shrink-0"
                aria-hidden
              />
              <h3 className="text-xl md:text-2xl font-semibold text-brand-900">
                {tabLabel(active)}
              </h3>
            </div>
          </div>

          {active === "vision" && (
            <p className="text-surface-700 leading-relaxed text-base md:text-lg max-w-3xl">
              {about.cards.vision.text}
            </p>
          )}

          {active === "mission" && (
            <p className="text-surface-700 leading-relaxed text-base md:text-lg max-w-3xl">
              {about.cards.mission.text}
            </p>
          )}

          {active === "values" && about.valueItems && (
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {valueKeys.map((key) => {
                const item = about.valueItems?.[key];
                if (!item) return null;
                const ValueIcon = valueIcons[key];
                return (
                  <article
                    key={key}
                    className="rounded-lg border border-surface-200/80 bg-surface-50/50 p-4 md:p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_-18px_rgba(27,61,92,0.35)]"
                  >
                    <div className="w-10 h-10 mx-auto rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mb-3">
                      <ValueIcon
                        className="w-[1.125rem] h-[1.125rem] text-brand-700"
                        strokeWidth={ICON_STROKE}
                      />
                    </div>
                    <h4 className="text-base font-semibold text-brand-900 mb-1.5">{item.title}</h4>
                    <p className="text-sm text-surface-600 leading-relaxed">{item.statement}</p>
                  </article>
                );
              })}
            </div>
          )}

          {active === "whyMetron" && about.whyMetronTab?.points && (
            <ul className="space-y-4 max-w-3xl">
              {about.whyMetronTab.points.map((point) => (
                <li key={point} className="flex gap-3 text-surface-700 leading-relaxed text-base md:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
