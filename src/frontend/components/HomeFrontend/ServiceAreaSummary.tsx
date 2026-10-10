"use client";

import type { Language, ViennaDistrictDTO } from "@/frontend/types/HomeFrontend";

interface ServiceAreaSummaryProps {
  lang: Language;
  districts?: ViennaDistrictDTO[];
}

/** Temporarily hidden: service-area section is disabled on the homepage. */
export default function ServiceAreaSummary(_props: ServiceAreaSummaryProps) {
  return null;
}
