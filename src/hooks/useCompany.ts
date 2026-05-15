// ============================================================
// useCompany — Hook to access company configuration
// ============================================================
// Reads from src/config/company.json
// Use this in any component to access contact info, stats, etc.
//
// Example:
//   const company = useCompany();
//   <a href={`tel:${company.contact.phone}`}>{company.contact.phoneDisplay}</a>
// ============================================================

import companyData from "@/config/company.json";

export interface CompanyConfig {
  name: string;
  tagline: string;
  description: string;
  founded: string;
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    email: string;
    website: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    googleMapsEmbed: string;
  };
  hours: Array<{ day: string; hours: string }>;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  coverage: string[];
  stats: Array<{ label: string; value: number; suffix: string }>;
  brands: string[];
  certifications: string[];
}

export function useCompany(): CompanyConfig {
  return companyData as CompanyConfig;
}
