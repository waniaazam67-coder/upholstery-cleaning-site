import type { ImageMetadata } from "astro";

import sofa from "../assets/images/sofa.webp";
import upholstery from "../assets/images/upholstery.webp";
import carpet from "../assets/images/carpet.webp";
import mattress from "../assets/images/mattress.webp";
import curtains from "../assets/images/curtains.webp";
import stain from "../assets/images/stain.webp";

export interface Service {
  title: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
}

/** Shown in this order in the services row. The "Custom Cleaning" card is added after these. */
export const services: Service[] = [
  {
    title: "Sofa Cleaning",
    description: "Deep cleaning for everyday spills, dust and dirt.",
    image: sofa,
    imageAlt: "Upholstery vacuum cleaning a fabric sofa cushion",
  },
  {
    title: "Upholstery Cleaning",
    description: "Care for dining chairs, armchairs and fabric furniture.",
    image: upholstery,
    imageAlt: "Technician cleaning a fabric dining chair",
  },
  {
    title: "Carpet & Rug Cleaning",
    description: "Refresh rugs and fitted carpets around your home.",
    image: carpet,
    imageAlt: "Carpet extraction machine cleaning a rug at home",
  },
  {
    title: "Mattress Cleaning",
    description: "Help keep your sleeping space clean and fresh.",
    image: mattress,
    imageAlt: "Technician vacuuming a mattress in a bedroom",
  },
  {
    title: "Curtain Cleaning",
    description: "Curtain vacuuming and cleaning to remove dust from your curtains.",
    image: curtains,
    imageAlt: "Technician vacuuming fabric curtains in a living room",
  },
  {
    title: "Stain & Odour Treatment",
    description: "Ask us about the right treatment for your item.",
    image: stain,
    imageAlt: "Spot treatment of a stain on a sofa cushion",
  },
];
