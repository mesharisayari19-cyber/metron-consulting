/**
 * Client logos — add/remove entries without layout changes.
 */
export interface Client {
  id: string;
  name: { ar: string; en: string };
  logo: string;
}

export const clients: Client[] = [
  { id: "1", name: { ar: "عميل ١", en: "Client One" }, logo: "/assets/clients/client-1.svg" },
  { id: "2", name: { ar: "عميل ٢", en: "Client Two" }, logo: "/assets/clients/client-2.svg" },
  { id: "3", name: { ar: "عميل ٣", en: "Client Three" }, logo: "/assets/clients/client-3.svg" },
  { id: "4", name: { ar: "عميل ٤", en: "Client Four" }, logo: "/assets/clients/client-4.svg" },
  { id: "5", name: { ar: "عميل ٥", en: "Client Five" }, logo: "/assets/clients/client-5.svg" },
  { id: "6", name: { ar: "عميل ٦", en: "Client Six" }, logo: "/assets/clients/client-6.svg" },
];
