"use client";

import React, { useState, useEffect, useMemo } from "react";
import OverviewHero from "@/frontend/components/ServiceAreas/OverviewHero";
import DistrictDirectory from "@/frontend/components/ServiceAreas/DistrictDirectory";
import LogisticsPolicies from "@/frontend/components/ServiceAreas/LogisticsPolicies";
import { getServiceAreasPageData } from "@/frontend/actions/ServiceAreas";
import { UrbanLogisticsZone, ViennaDistrictDto, ZoneSpecificationDto, LogisticsPolicyRuleDto } from "@/frontend/types/ServiceAreas";
export default function ServiceAreasPage() {
  const [districts, setDistricts] = useState<ViennaDistrictDto[]>([]);
  const [zones, setZones] = useState<ZoneSpecificationDto[]>([]);
  const [policies, setPolicies] = useState<LogisticsPolicyRuleDto[]>([]);
  const [selectedZone, setSelectedZone] = useState<UrbanLogisticsZone>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getServiceAreasPageData().then(data => {
      if (!isMounted) return;
      setDistricts(data?.districts ?? []);
      setZones(data?.zones ?? []);
      setPolicies(data?.policies ?? []);
    }).catch(err => {
      console.error("Failed to load service areas data:", err);
      if (isMounted) {
        setDistricts([]);
        setZones([]);
        setPolicies([]);
      }
    }).finally(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter 23 districts based on zone and query
  const filteredDistricts = useMemo(() => {
    return (districts || []).filter(district => {
      // 1. Zone filter
      const matchesZone = selectedZone === "ALL" || district.zone === selectedZone;

      // 2. Search query filter (matches code, name, number, or subtitle)
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesZone;
      const matchesSearch = district.districtCode.toLowerCase().includes(query) || district.districtName.toLowerCase().includes(query) || district.districtNumber.toString().includes(query) || (district.boroughSubtitle?.toLowerCase() ?? "").includes(query);
      return matchesZone && matchesSearch;
    });
  }, [districts, selectedZone, searchQuery]);
  const handleZoneSelect = (zoneKey: "ALL" | "INNER_CITY" | "CENTRAL" | "OUTER_RING" | "GREATER_SUBURB") => {
    setSelectedZone(zoneKey);
  };
  const handleResetFilters = () => {
    setSelectedZone("ALL");
    setSearchQuery("");
  };
  return <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
      {isLoading && <div className="w-full py-2 bg-muted/40 text-center text-xs text-muted-foreground">
          Loading service areas...
        </div>}

      {/* 1. Overview Section: Four urban logistics zones, response standards, visual facade */}
      <OverviewHero zones={zones} selectedZone={selectedZone} onSelectZone={handleZoneSelect} />

      {/* 2. Core Narrative: 23 Municipal Districts Directory with integrated filter & search */}
      <DistrictDirectory districts={filteredDistricts} allDistrictsCount={districts.length} selectedZone={selectedZone} searchQuery={searchQuery} onSelectZone={setSelectedZone} onSearchChange={setSearchQuery} onResetFilters={handleResetFilters} />

      {/* 3. Logistics & Regional Policies: Kurzparkzone, Altbau freight, Lower Austria commuter belt */}
      <LogisticsPolicies policies={policies} />
    </div>;
}
