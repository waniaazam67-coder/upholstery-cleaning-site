/**
 * Business details used across the site.
 * Change contact info, hours or the domain here, never inside components.
 */
export const site = {
  name: "Upholstery Cleaning",
  city: "Dubai",
  country: "AE",
  tagline: "At-home sofa, upholstery, carpet, mattress and curtain cleaning in Dubai.",

  phone: {
    local: "056 894 1900",
    international: "+971 56 894 1900",
    /** Digits only, as WhatsApp links need them. */
    whatsapp: "971568941900",
    e164: "+971568941900",
  },

  // PLACEHOLDER: the client has not confirmed working hours yet (see decisions.md).
  hours: {
    display: "8:00 AM – 9:00 PM",
    note: "Every day, including weekends",
    /** schema.org openingHours format */
    schema: "Mo-Su 08:00-21:00",
  },
} as const;

/** Pre-filled WhatsApp messages, so the customer can send with one tap. */
export const whatsappMessages = {
  general: "Hi, I'd like a cleaning estimate.",
  booking: "Hi, I'd like to book a cleaning. Location:  Item: ",
  custom: "Hi, I need a custom cleaning estimate.",
} as const;

export type WhatsappMessage = keyof typeof whatsappMessages;

/** Builds a wa.me link that opens a chat with the business. */
export function whatsappLink(message?: WhatsappMessage): string {
  const base = `https://wa.me/${site.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(whatsappMessages[message])}` : base;
}

/** In-page navigation. Each `href` must match a section id. */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
