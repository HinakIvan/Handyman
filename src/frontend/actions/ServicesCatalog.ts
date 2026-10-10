"use server";

import prisma from "@/tools/prisma";
import { withResult } from "@/frontend/action_utils";
import {
  ServicesCatalogDataOutput,
  ServiceCategoryItem,
  ViennaDistrictCoverage,
  CraftClassification,
  ServiceCategoryKey,
  LogisticsZone
} from "@/frontend/types/ServicesCatalog";

// Static Austrian GewO 1994 statutory task reference mappings per key
const GEWO_TASK_MAP: Record<
  ServiceCategoryKey,
  {
    permittedTasks: string[];
    restrictedTasks: string[];
    standardTools: string[];
  }
> = {
  FLOORING: {
    permittedTasks: [
      "Verlegung von schwimmendem Parkett, Laminat und Vinylböden",
      "Abschleifen, Ausbessern und Ölen von bestehenden Holzdielen",
      "Montage von Sockelleisten, Übergangsprofilen und Schwellen",
      "Untergrundausgleich mit faserverstärkter Ausgleichsmasse"
    ],
    restrictedTasks: [
      "Statisch relevante Estrichkonstruktionen im Neubau (Bodenleger-Meister)",
      "Feuchtigkeitsisolierung mit Heißbitumen"
    ],
    standardTools: ["Festool Bandschleifer", "Tauchkreissäge", "Feuchtigkeitsmessgerät"]
  },
  ASSEMBLY: {
    permittedTasks: [
      "Zusammenbau und Justierung aller genormten Kastenmöbel",
      "Einhängen von Oberschränken mit Schwerlastdübeln",
      "Zuschnitt von Sockelblenden und Passleisten",
      "Geräteeinbau in vorbereitete Möbelausschnitte"
    ],
    restrictedTasks: [
      "Herstellung von Vollholz-Sondermöbeln nach individuellem Aufriss (Tischler-Meister)",
      "Starkstrom-Herdelektrik ohne steckfertigen Anschluss"
    ],
    standardTools: ["Akku-Schrauber 18V", "Kreuzlinienlaser", "Schwerlastanker-Set"]
  },
  DRYWALL: {
    permittedTasks: [
      "Errichtung nicht-tragender Raumtrennwände auf Metallprofilen",
      "Vorsatzschalen zur Verbesserung der Trittschalldämmung",
      "Revisionsklappen-Einbau und Fugenspachtelung nach ÖNORM",
      "Montage von Akustik-Holzlamellenpaneelen"
    ],
    restrictedTasks: [
      "Eingriffe in tragende Mauerwerksstrukturen (Baumeister)",
      "F90 Brandschutzdecken mit Bauphysik-Zertifizierung"
    ],
    standardTools: ["Rigips-Schrauber", "Laser-Lot", "Spachtelkellen Q3/Q4"]
  },
  PAINTING: {
    permittedTasks: [
      "Dispersions- und Silikatanstriche im Innenbereich",
      "Lokale Rissarmierung mit Glasfaservlies",
      "Abklebe- und Staubschutzarbeiten nach Wiener Standard",
      "Türen- und Zargen-Lackierung mit Acryllack"
    ],
    restrictedTasks: [
      "Historische Fassadenrestaurierung unter Denkmalschutz (Maler-Meister)",
      "Industrielle Spritzlackierung toxischer Beschichtungen"
    ],
    standardTools: ["Airless-Spritzgerät", "Staubfreier Schleifgiraffe", "Kantenschneider"]
  },
  DEMOLITION: {
    permittedTasks: [
      "Abbruch nicht-tragender Zwischenwände und Verkleidungen",
      "Entfernung alter Kleberreste und Fliesenbeläge",
      "Rückbau von Einbauküchen und Sanitärobjekten",
      "Getrennte Bauschutt-Logistik nach MA 48 Richtlinien"
    ],
    restrictedTasks: [
      "Durchbrüche in tragenden Ziegel- oder Betonwänden (Baumeister)",
      "Asbestsanierung nach TRGS 519"
    ],
    standardTools: ["HEPA-Bausauger", "Meißelhammer 5J", "Schuttrutschen-Modul"]
  },
  PLUMBING_MINOR: {
    permittedTasks: [
      "Tausch von Aufputz-Armaturen an bestehenden Eckventilen",
      "Erneuerung von Geruchsverschlüssen und Ablaufgarnituren",
      "Austausch von WC-Sitzen und Duschstangen",
      "Erneuerung elastischer Fugen im Nassbereich (Sanitärsilikon)"
    ],
    restrictedTasks: [
      "Verlegung neuer Steigleitungen und Gasleitungen (Installateur-Meister)",
      "Arbeiten an Gas-Kombithermen und Druckbehältern"
    ],
    standardTools: ["Rohrzangen-Set", "Silikon-Abziehlehren", "Gewindedichtfaden"]
  },
  BATHROOM_KITCHEN: {
    permittedTasks: [
      "Fliesen- und Plattenverlegung an Wand und Boden",
      "Montage von Waschtischmöbeln, Spiegeln und Beleuchtung",
      "Bauphysikalischer Feuchtigkeitsschutz unter Fliesen (Verbundabdichtung)",
      "Koordination meisterpflichtiger Gas-Wasser-Gewerke aus einer Hand"
    ],
    restrictedTasks: [
      "Eigenständige Gas-Zertifizierung (Erfolgt über den lizenzierten Meisterpartner)",
      "Verplombung von Hauptwasserzählern"
    ],
    standardTools: ["Nass-Fliesenschneider", "Laser-Kreuzprüfer", "Dichtband-Systeme"]
  },
  DOORS_WINDOWS: {
    permittedTasks: [
      "Nachstellen von Scherenlagern und Eckumlenkungen",
      "Einfräsen und Erneuern von Silikon-Hohldichtungen",
      "Montage von Zusatzschlössern und Sicherheitsriegeln",
      "Ausrichten schleifender Türblätter im Altbaubestand"
    ],
    restrictedTasks: [
      "Herstellung denkmalgeschützter Kastenfenster-Rahmen (Tischler-Meister)",
      "Einbau einbruchhemmender RC3/RC4 Türen mit Statiknachweis"
    ],
    standardTools: ["Einstellschlüssel-Set", "Dichtungsfräse", "Hobelmaschine"]
  },
  OUTDOOR: {
    permittedTasks: [
      "Reinigung von Terrassendielen und Steinplatten ohne Chemikalien",
      "Schleifen und Streichen von Holzpergolensystemen",
      "Aufbau von vorgefertigten Gartenhäusern und Hochbeeten",
      "Montage von Sonnensegeln und Rankgittern"
    ],
    restrictedTasks: [
      "Tiefbauarbeiten und Fundamentgründungen (Baumeister / Erdbau)",
      "Baumfällungen in Schutzzonen ohne Genehmigung"
    ],
    standardTools: ["Kärcher HD-Reiniger", "Rotations-Terrassenwäscher", "Bürstenschleifer"]
  },
  MOVING: {
    permittedTasks: [
      "Möbeltransport mit Transporter (Nutzlast < 3.5t)",
      "Demontage am Auszugsort und Remontage am Einzugsort",
      "Tragehilfe in Wiener Altbauten ohne Lift",
      "Verpackungsservice mit Polstervlies und Kantenschonern"
    ],
    restrictedTasks: [
      "Internationaler Schwerlast-Güterkraftverkehr über 3.5t (Konzessioniert)",
      "Klaviertransport mit Kranlogistik"
    ],
    standardTools: ["Treppen-Sackkarre", "Möbelroller 500kg", "Schutzhüllenset"]
  },
  COMMERCIAL: {
    permittedTasks: [
      "Laufende Sichtprüfungen und Kleinreparaturen im Objektbestand",
      "Austausch genormter Leuchtmittel und Schalterabdeckungen",
      "Türschließer- und Panikbeschlag-Wartung",
      "Zentrales Mängelprotokoll für Hausverwaltungen"
    ],
    restrictedTasks: [
      "Wiederkehrende Prüfung elektrischer Großanlagen nach ÖVE/ÖNORM (Elektrotechnik-Meister)",
      "Aufzugswartung und Brandschutztür-Zertifizierung"
    ],
    standardTools: ["Prüfadapter DGUV V3", "Drehmomentschlüssel", "Digitale Inspektions-App"]
  }
};

/**
 * Fetch all ServiceCategories and ViennaDistricts for the All Services Catalog page.
 * Austrian craft classification (FREIES_HANDWERK vs MEISTER_KOOPERATION) under GewO 1994.
 * Baseline hourly rate >= 15 EUR/h.
 */
export async function getServicesCatalogData(): Promise<ServicesCatalogDataOutput> {
  return withResult(async () => {
    // 1. Query all service categories ordered by displayOrder asc
    const dbCategories = await prisma.serviceCategory.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "asc" }
      ]
    });

    // 2. Query Vienna districts ordered by districtNumber asc
    const dbDistricts = await prisma.viennaDistrict.findMany({
      orderBy: { districtNumber: "asc" }
    });

    // Map Prisma models to canonical output types
    const categories: ServiceCategoryItem[] = dbCategories.map((c) => {
      const key = c.key as ServiceCategoryKey;
      const staticMeta = GEWO_TASK_MAP[key] || {
        permittedTasks: ["Reglementierungsfreie Instandhaltungs- und Montagetätigkeiten."],
        restrictedTasks: [],
        standardTools: ["Standard Handwerkerausrüstung"]
      };

      return {
        id: c.id, // data-from: ServiceCategory-id
        key: key, // data-from: ServiceCategory-key
        titleDe: c.titleDe, // data-from: ServiceCategory-titleDe
        titleEn: c.titleEn, // data-from: ServiceCategory-titleEn
        titleRu: c.titleRu, // data-from: ServiceCategory-titleRu
        baselineHourlyRate: c.baselineHourlyRate.toNumber(), // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: c.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
        craftClassification: c.craftClassification as CraftClassification, // data-from: ServiceCategory-craftClassification
        leadArtisan: c.leadArtisan, // data-from: ServiceCategory-leadArtisan
        isFeatured: c.isFeatured, // data-from: ServiceCategory-isFeatured
        descriptionDe: c.descriptionDe, // data-from: ServiceCategory-descriptionDe
        descriptionEn: c.descriptionEn, // data-from: ServiceCategory-descriptionEn
        descriptionRu: c.descriptionRu, // data-from: ServiceCategory-descriptionRu
        imageUrl: c.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: c.iconName, // data-from: ServiceCategory-iconName
        displayOrder: c.displayOrder, // data-from: ServiceCategory-displayOrder
        permittedTasksUnderGewO: staticMeta.permittedTasks,
        restrictedMeisterTasks: staticMeta.restrictedTasks,
        standardTools: staticMeta.standardTools
      };
    });

    const districts: ViennaDistrictCoverage[] = dbDistricts.map((d) => ({
      id: d.id, // data-from: ViennaDistrict-id
      districtCode: d.districtCode, // data-from: ViennaDistrict-districtCode
      districtName: d.districtName, // data-from: ViennaDistrict-districtName
      districtNumber: d.districtNumber, // data-from: ViennaDistrict-districtNumber
      zone: d.zone as LogisticsZone, // data-from: ViennaDistrict-zone
      leadTimeHours: d.leadTimeHours // data-from: ViennaDistrict-leadTimeHours
    }));

    return {
      categories,
      districts
    };
  })();
}