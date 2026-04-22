"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import GlobeStage from "@/components/GlobeStage";
import { COMMODITIES, type CommoditySlug } from "@/data";

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const params = useMemo(() => parseAtlasPath(pathname), [pathname]);

  return (
    <GlobeStage
      focusIso={params.focusIso}
      filterCommodity={params.filterCommodity}
      filterFromIso={params.filterFromIso}
      filterToIso={params.filterToIso}
    >
      {children}
    </GlobeStage>
  );
}

function parseAtlasPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const result = {
    focusIso: null as string | null,
    filterCommodity: null as CommoditySlug | null,
    filterFromIso: null as string | null,
    filterToIso: null as string | null,
  };

  if (parts[0] === "countries" && parts[1]) {
    result.focusIso = parts[1].toUpperCase();
    result.filterFromIso = result.focusIso;
  } else if (parts[0] === "commodities" && parts[1]) {
    const slug = parts[1] as CommoditySlug;
    if (COMMODITIES[slug]) result.filterCommodity = slug;
  } else if (parts[0] === "corridors" && parts[1]) {
    const [from, to] = parts[1].split("-").map((s) => s.toUpperCase());
    if (from) { result.focusIso = from; result.filterFromIso = from; }
    if (to) result.filterToIso = to;
  }

  return result;
}
