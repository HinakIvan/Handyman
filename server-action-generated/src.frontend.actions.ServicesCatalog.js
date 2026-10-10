"use server";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common-redirect:@/tools/prisma
var require_prisma = __commonJS({
  "common-redirect:@/tools/prisma"(exports2, module2) {
    var prisma2 = require("./_common").prisma;
    module2.exports = {
      __esModule: true,
      default: prisma2,
      prisma: prisma2
    };
  }
});

// common-redirect:@/frontend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/frontend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").frontendAuth;
  }
});

// src/frontend/actions/ServicesCatalog.ts
var ServicesCatalog_exports = {};
__export(ServicesCatalog_exports, {
  getServicesCatalogData: () => getServicesCatalogData
});
module.exports = __toCommonJS(ServicesCatalog_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
var GEWO_TASK_MAP = {
  FLOORING: {
    permittedTasks: [
      "Verlegung von schwimmendem Parkett, Laminat und Vinylb\xF6den",
      "Abschleifen, Ausbessern und \xD6len von bestehenden Holzdielen",
      "Montage von Sockelleisten, \xDCbergangsprofilen und Schwellen",
      "Untergrundausgleich mit faserverst\xE4rkter Ausgleichsmasse"
    ],
    restrictedTasks: [
      "Statisch relevante Estrichkonstruktionen im Neubau (Bodenleger-Meister)",
      "Feuchtigkeitsisolierung mit Hei\xDFbitumen"
    ],
    standardTools: ["Festool Bandschleifer", "Tauchkreiss\xE4ge", "Feuchtigkeitsmessger\xE4t"]
  },
  ASSEMBLY: {
    permittedTasks: [
      "Zusammenbau und Justierung aller genormten Kastenm\xF6bel",
      "Einh\xE4ngen von Oberschr\xE4nken mit Schwerlastd\xFCbeln",
      "Zuschnitt von Sockelblenden und Passleisten",
      "Ger\xE4teeinbau in vorbereitete M\xF6belausschnitte"
    ],
    restrictedTasks: [
      "Herstellung von Vollholz-Sonderm\xF6beln nach individuellem Aufriss (Tischler-Meister)",
      "Starkstrom-Herdelektrik ohne steckfertigen Anschluss"
    ],
    standardTools: ["Akku-Schrauber 18V", "Kreuzlinienlaser", "Schwerlastanker-Set"]
  },
  DRYWALL: {
    permittedTasks: [
      "Errichtung nicht-tragender Raumtrennw\xE4nde auf Metallprofilen",
      "Vorsatzschalen zur Verbesserung der Trittschalld\xE4mmung",
      "Revisionsklappen-Einbau und Fugenspachtelung nach \xD6NORM",
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
      "T\xFCren- und Zargen-Lackierung mit Acryllack"
    ],
    restrictedTasks: [
      "Historische Fassadenrestaurierung unter Denkmalschutz (Maler-Meister)",
      "Industrielle Spritzlackierung toxischer Beschichtungen"
    ],
    standardTools: ["Airless-Spritzger\xE4t", "Staubfreier Schleifgiraffe", "Kantenschneider"]
  },
  DEMOLITION: {
    permittedTasks: [
      "Abbruch nicht-tragender Zwischenw\xE4nde und Verkleidungen",
      "Entfernung alter Kleberreste und Fliesenbel\xE4ge",
      "R\xFCckbau von Einbauk\xFCchen und Sanit\xE4robjekten",
      "Getrennte Bauschutt-Logistik nach MA 48 Richtlinien"
    ],
    restrictedTasks: [
      "Durchbr\xFCche in tragenden Ziegel- oder Betonw\xE4nden (Baumeister)",
      "Asbestsanierung nach TRGS 519"
    ],
    standardTools: ["HEPA-Bausauger", "Mei\xDFelhammer 5J", "Schuttrutschen-Modul"]
  },
  PLUMBING_MINOR: {
    permittedTasks: [
      "Tausch von Aufputz-Armaturen an bestehenden Eckventilen",
      "Erneuerung von Geruchsverschl\xFCssen und Ablaufgarnituren",
      "Austausch von WC-Sitzen und Duschstangen",
      "Erneuerung elastischer Fugen im Nassbereich (Sanit\xE4rsilikon)"
    ],
    restrictedTasks: [
      "Verlegung neuer Steigleitungen und Gasleitungen (Installateur-Meister)",
      "Arbeiten an Gas-Kombithermen und Druckbeh\xE4ltern"
    ],
    standardTools: ["Rohrzangen-Set", "Silikon-Abziehlehren", "Gewindedichtfaden"]
  },
  BATHROOM_KITCHEN: {
    permittedTasks: [
      "Fliesen- und Plattenverlegung an Wand und Boden",
      "Montage von Waschtischm\xF6beln, Spiegeln und Beleuchtung",
      "Bauphysikalischer Feuchtigkeitsschutz unter Fliesen (Verbundabdichtung)",
      "Koordination meisterpflichtiger Gas-Wasser-Gewerke aus einer Hand"
    ],
    restrictedTasks: [
      "Eigenst\xE4ndige Gas-Zertifizierung (Erfolgt \xFCber den lizenzierten Meisterpartner)",
      "Verplombung von Hauptwasserz\xE4hlern"
    ],
    standardTools: ["Nass-Fliesenschneider", "Laser-Kreuzpr\xFCfer", "Dichtband-Systeme"]
  },
  DOORS_WINDOWS: {
    permittedTasks: [
      "Nachstellen von Scherenlagern und Eckumlenkungen",
      "Einfr\xE4sen und Erneuern von Silikon-Hohldichtungen",
      "Montage von Zusatzschl\xF6ssern und Sicherheitsriegeln",
      "Ausrichten schleifender T\xFCrbl\xE4tter im Altbaubestand"
    ],
    restrictedTasks: [
      "Herstellung denkmalgesch\xFCtzter Kastenfenster-Rahmen (Tischler-Meister)",
      "Einbau einbruchhemmender RC3/RC4 T\xFCren mit Statiknachweis"
    ],
    standardTools: ["Einstellschl\xFCssel-Set", "Dichtungsfr\xE4se", "Hobelmaschine"]
  },
  OUTDOOR: {
    permittedTasks: [
      "Reinigung von Terrassendielen und Steinplatten ohne Chemikalien",
      "Schleifen und Streichen von Holzpergolensystemen",
      "Aufbau von vorgefertigten Gartenh\xE4usern und Hochbeeten",
      "Montage von Sonnensegeln und Rankgittern"
    ],
    restrictedTasks: [
      "Tiefbauarbeiten und Fundamentgr\xFCndungen (Baumeister / Erdbau)",
      "Baumf\xE4llungen in Schutzzonen ohne Genehmigung"
    ],
    standardTools: ["K\xE4rcher HD-Reiniger", "Rotations-Terrassenw\xE4scher", "B\xFCrstenschleifer"]
  },
  MOVING: {
    permittedTasks: [
      "M\xF6beltransport mit Transporter (Nutzlast < 3.5t)",
      "Demontage am Auszugsort und Remontage am Einzugsort",
      "Tragehilfe in Wiener Altbauten ohne Lift",
      "Verpackungsservice mit Polstervlies und Kantenschonern"
    ],
    restrictedTasks: [
      "Internationaler Schwerlast-G\xFCterkraftverkehr \xFCber 3.5t (Konzessioniert)",
      "Klaviertransport mit Kranlogistik"
    ],
    standardTools: ["Treppen-Sackkarre", "M\xF6belroller 500kg", "Schutzh\xFCllenset"]
  },
  COMMERCIAL: {
    permittedTasks: [
      "Laufende Sichtpr\xFCfungen und Kleinreparaturen im Objektbestand",
      "Austausch genormter Leuchtmittel und Schalterabdeckungen",
      "T\xFCrschlie\xDFer- und Panikbeschlag-Wartung",
      "Zentrales M\xE4ngelprotokoll f\xFCr Hausverwaltungen"
    ],
    restrictedTasks: [
      "Wiederkehrende Pr\xFCfung elektrischer Gro\xDFanlagen nach \xD6VE/\xD6NORM (Elektrotechnik-Meister)",
      "Aufzugswartung und Brandschutzt\xFCr-Zertifizierung"
    ],
    standardTools: ["Pr\xFCfadapter DGUV V3", "Drehmomentschl\xFCssel", "Digitale Inspektions-App"]
  }
};
async function getServicesCatalogData() {
  return (0, import_action_utils.withResult)(async () => {
    const dbCategories = await import_prisma.default.serviceCategory.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "asc" }
      ]
    });
    const dbDistricts = await import_prisma.default.viennaDistrict.findMany({
      orderBy: { districtNumber: "asc" }
    });
    const categories = dbCategories.map((c) => {
      const key = c.key;
      const staticMeta = GEWO_TASK_MAP[key] || {
        permittedTasks: ["Reglementierungsfreie Instandhaltungs- und Montaget\xE4tigkeiten."],
        restrictedTasks: [],
        standardTools: ["Standard Handwerkerausr\xFCstung"]
      };
      return {
        id: c.id,
        // data-from: ServiceCategory-id
        key,
        // data-from: ServiceCategory-key
        titleDe: c.titleDe,
        // data-from: ServiceCategory-titleDe
        titleEn: c.titleEn,
        // data-from: ServiceCategory-titleEn
        titleRu: c.titleRu,
        // data-from: ServiceCategory-titleRu
        baselineHourlyRate: c.baselineHourlyRate.toNumber(),
        // data-from: ServiceCategory-baselineHourlyRate
        typicalRangeEur: c.typicalRangeEur,
        // data-from: ServiceCategory-typicalRangeEur
        craftClassification: c.craftClassification,
        // data-from: ServiceCategory-craftClassification
        leadArtisan: c.leadArtisan,
        // data-from: ServiceCategory-leadArtisan
        isFeatured: c.isFeatured,
        // data-from: ServiceCategory-isFeatured
        descriptionDe: c.descriptionDe,
        // data-from: ServiceCategory-descriptionDe
        descriptionEn: c.descriptionEn,
        // data-from: ServiceCategory-descriptionEn
        descriptionRu: c.descriptionRu,
        // data-from: ServiceCategory-descriptionRu
        imageUrl: c.imageUrl,
        // data-from: ServiceCategory-imageUrl data-role: image_url
        iconName: c.iconName,
        // data-from: ServiceCategory-iconName
        displayOrder: c.displayOrder,
        // data-from: ServiceCategory-displayOrder
        permittedTasksUnderGewO: staticMeta.permittedTasks,
        restrictedMeisterTasks: staticMeta.restrictedTasks,
        standardTools: staticMeta.standardTools
      };
    });
    const districts = dbDistricts.map((d) => ({
      id: d.id,
      // data-from: ViennaDistrict-id
      districtCode: d.districtCode,
      // data-from: ViennaDistrict-districtCode
      districtName: d.districtName,
      // data-from: ViennaDistrict-districtName
      districtNumber: d.districtNumber,
      // data-from: ViennaDistrict-districtNumber
      zone: d.zone,
      // data-from: ViennaDistrict-zone
      leadTimeHours: d.leadTimeHours
      // data-from: ViennaDistrict-leadTimeHours
    }));
    return {
      categories,
      districts
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getServicesCatalogData
});
