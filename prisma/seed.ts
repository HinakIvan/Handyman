import { PrismaClient, Prisma, AccountUserRole, ChecklistItemKey, ChecklistStatus, CraftClassification, FaqCategory, LogisticsZone, PreferredTimeSlot, QuoteStatus, ServiceCategoryKey, SubmissionLanguage } from "@prisma/client";
import { hashPassword } from "../src/@base/BaseActionFun";

const prisma = new PrismaClient();
type SeedEntity = Record<string, unknown>;
type RelationBinding = { target_entity_key: string; local_fields: readonly string[]; target_fields: readonly string[] };

const accountUserRecords = [
  { entityKey: "AccountUser:admin_user_01", data: {
      id: "fab78b1f-2b7f-426a-a033-423646db2cdd",
      createdAt: new Date("2026-01-15T08:00:00.000Z"),
      email: "admin@vienna-handyman.at",
      fullName: "Markus Gruber",
      passwordHash: hashPassword("ViennaAdmin2026!"),
      phone: "+43 1 512 8900",
      role: AccountUserRole.ADMIN
    }, relations: [] },
  { entityKey: "AccountUser:customer_user_01", data: {
      id: "b0895d6e-162c-41f8-a43d-8bf3aacf4e04",
      createdAt: new Date("2026-03-20T10:30:00.000Z"),
      email: "stefan.weber@gmail.com",
      fullName: "Stefan Weber",
      passwordHash: hashPassword("CustomerPass2026!"),
      phone: "+43 664 123 4567",
      role: AccountUserRole.CUSTOMER
    }, relations: [] },
] as const;

const serviceCategoryRecords = [
  { entityKey: "ServiceCategory:assembly", data: {
      id: "73d2bb1d-73c3-4d76-a3a4-f3c517d9246a",
      baselineHourlyRate: new Prisma.Decimal("18"),
      craftClassification: CraftClassification.FREIES_HANDWERK,
      createdAt: new Date("2026-01-10T08:00:00.000Z"),
      descriptionDe: "Fachgerechter Zusammenbau von IKEA-, PAX- und Designermöbeln, TV-Wandhalterungen, Vorhangschienen und Altbau-Wandverankerungen nach Wiener Handwerksstandard.",
      descriptionEn: "Precision flat-pack assembly for IKEA PAX wardrobes, custom shelving, heavy TV wall-mounting, and specialized Altbau wall anchoring with full liability coverage.",
      descriptionRu: "Профессиональная сборка мебели IKEA, шкафов PAX, монтаж настенных полок, ТВ-кронштейнов и анкеровка в кирпичные стены старых венских домов (Altbau).",
      displayOrder: 1,
      iconName: "Hammer",
      imageUrl: "https://www.autocoder.cc/background/zaki_prod/generated/33a817e42dda4cbca4daa47e4e0b452f.png",
      isFeatured: true,
      key: ServiceCategoryKey.ASSEMBLY,
      leadArtisan: "Stefan Gruber & Montage-Team (1070 Wien)",
      titleDe: "Möbelmontage & Einbauten",
      titleEn: "Furniture Assembly & Custom Mounting",
      titleRu: "Сборка мебели и монтаж конструкций",
      typicalRangeEur: "€18 – €32/h"
    }, relations: [] },
  { entityKey: "ServiceCategory:flooring", data: {
      id: "5c1c7f62-8b31-45f9-aed1-0cc8b56b88d5",
      baselineHourlyRate: new Prisma.Decimal("22"),
      craftClassification: CraftClassification.FREIES_HANDWERK,
      createdAt: new Date("2026-01-10T08:15:00.000Z"),
      descriptionDe: "Fachgerechte Verlegung von Klick-Laminat, Vinyl, Fertigparkett sowie Reparatur von historischem Wiener Fischgrätparkett inklusive staubarmer Schleiftechnik.",
      descriptionEn: "Precision installation of click-laminate, luxury vinyl tile (LVT), engineered hardwood, and traditional Viennese herringbone parquet restoration with dust-reduced sanding.",
      descriptionRu: "Укладка ламината, виниловых полов, паркетной доски и бережная реставрация классического венского паркета «елочка» с беспылевой шлифовкой.",
      displayOrder: 2,
      iconName: "Layers",
      imageUrl: "https://www.autocoder.cc/background/zaki_prod/generated/5a5fe8f7055f427481d1d4398b1f6a55.png",
      isFeatured: true,
      key: ServiceCategoryKey.FLOORING,
      leadArtisan: "Johannes Leitner Holzmanufaktur (1060 Wien)",
      titleDe: "Bodenverlegung & Parkettaufbereitung",
      titleEn: "Flooring Installation & Parquet Restoration",
      titleRu: "Укладка полов и реставрация паркета",
      typicalRangeEur: "€22 – €38/h"
    }, relations: [] },
  { entityKey: "ServiceCategory:painting", data: {
      id: "8bc64fe6-f5bb-4715-a9bb-ec882340a1ba",
      baselineHourlyRate: new Prisma.Decimal("19"),
      craftClassification: CraftClassification.FREIES_HANDWERK,
      createdAt: new Date("2026-01-10T08:30:00.000Z"),
      descriptionDe: "Weißeln und Streichen von Altbau-Wänden, Ausbessern von Rissen und Bohrlöchern, Spachtelarbeiten Q2/Q3 sowie Schimmelsanierung mit umweltfreundlichen Silikatfarben.",
      descriptionEn: "Wall and ceiling painting for historic Viennese Altbau, crack patching, Q2/Q3 finish skimming, and eco-friendly silicate anti-mold treatment.",
      descriptionRu: "Покраска стен и потолков в квартирах Altbau, заделка трещин и отверстий, шпаклевка Q2/Q3 и обработка от плесени силикатными красками.",
      displayOrder: 3,
      iconName: "Paintbrush",
      imageUrl: "https://www.autocoder.cc/background/zaki_prod/generated/b756cff9212d4bdd995ddd5482087c0f.png",
      isFeatured: true,
      key: ServiceCategoryKey.PAINTING,
      leadArtisan: "David Novak Meister-Finish (1030 Wien)",
      titleDe: "Maler- & Spachtelarbeiten",
      titleEn: "Painting, Plastering & Surface Finishing",
      titleRu: "Малярные и шпаклевочные работы",
      typicalRangeEur: "€19 – €30/h"
    }, relations: [] },
  { entityKey: "ServiceCategory:drywall", data: {
      id: "87b03541-ce50-42ee-ab2c-193c648d64d3",
      baselineHourlyRate: new Prisma.Decimal("20"),
      craftClassification: CraftClassification.FREIES_HANDWERK,
      createdAt: new Date("2026-01-10T08:45:00.000Z"),
      descriptionDe: "Errichtung von Trennwänden, Vorsatzschalen zur Schalldämmung, Verkleidung von Installationsschächten und Deckenabhängungen mit Knauf- und Rigips-Systemen.",
      descriptionEn: "Construction of non-bearing interior partitions, acoustic wall linings, utility shaft boxing, and suspended ceiling drops utilizing Knauf/Rigips systems.",
      descriptionRu: "Монтаж межкомнатных перегородок, звукоизоляционных панелей, коробов для труб и подвесных потолков из гипсокартона Knauf/Rigips.",
      displayOrder: 4,
      iconName: "Maximize2",
      imageUrl: "https://www.autocoder.cc/background/zaki_prod/generated/003064e62fc34104b0257583364dbf7a.png",
      isFeatured: true,
      key: ServiceCategoryKey.DRYWALL,
      leadArtisan: "Trockenbau Wien Nord (1210 Wien)",
      titleDe: "Trockenbau & Akustikdecken",
      titleEn: "Drywall Partitions & Acoustic Ceilings",
      titleRu: "Гипсокартон и подвесные потолки",
      typicalRangeEur: "€20 – €35/h"
    }, relations: [] },
  { entityKey: "ServiceCategory:plumbing_minor", data: {
      id: "1ff9b495-60d2-4928-ac7d-63fc76b45919",
      baselineHourlyRate: new Prisma.Decimal("24"),
      craftClassification: CraftClassification.MEISTER_KOOPERATION,
      createdAt: new Date("2026-01-10T09:00:00.000Z"),
      descriptionDe: "Austausch von Waschtisch-Armaturen, Siphon-Reinigung, Silikonfugenerneuerung in Duschen und Beseitigung kleinerer Abflussverstopfungen nach GewO-Richtlinien.",
      descriptionEn: "Replacement of sink faucets, siphon clearing, shower silicone joint renewal, and minor drain blockage resolution under Austrian trade regulations.",
      descriptionRu: "Замена смесителей на раковинах, прочистка сифонов, замена силиконовых швов в душевых и устранение мелких засоров в соответствии с нормами GewO.",
      displayOrder: 5,
      iconName: "Wrench",
      imageUrl: "https://www.autocoder.cc/background/zaki_prod/generated/68e79898673b4483a20c7689cb0f243f.png",
      isFeatured: true,
      key: ServiceCategoryKey.PLUMBING_MINOR,
      leadArtisan: "Meisterverbund Sanitär & Heizung Wien (1050 Wien)",
      titleDe: "Sanitär-Kleinreparaturen & Armaturentausch",
      titleEn: "Minor Plumbing Repairs & Tap Replacement",
      titleRu: "Мелкий сантехнический ремонт и замена смесителей",
      typicalRangeEur: "€24 – €40/h"
    }, relations: [] },
  { entityKey: "ServiceCategory:bathroom_kitchen", data: {
      id: "e6c467ff-4a2c-44f5-a6c9-5093c80741e2",
      baselineHourlyRate: new Prisma.Decimal("26"),
      craftClassification: CraftClassification.MEISTER_KOOPERATION,
      createdAt: new Date("2026-01-10T09:15:00.000Z"),
      descriptionDe: "Ganzheitliche Renovierung von Nassräumen: Küchenarbeitsplatten-Zuschnitt, Spüleneinbau, Fliesenlegerarbeiten und koordinierte Meistermontagen.",
      descriptionEn: "Comprehensive wet-room renovation: kitchen worktop cutting, sink integration, wall tiling, and coordinated Austrian Meister trade execution.",
      descriptionRu: "Комплексный ремонт мокрых зон: распил столешниц, врезка моек, укладка плитки и координированные работы с сертифицированными мастерами.",
      displayOrder: 6,
      iconName: "Home",
      imageUrl: "https://www.autocoder.cc/background/zaki_prod/generated/837aa0ee04974951ac273e5801f3f76f.png",
      isFeatured: true,
      key: ServiceCategoryKey.BATHROOM_KITCHEN,
      leadArtisan: "Wien-Altbau Küchen- & Badverbund (1090 Wien)",
      titleDe: "Bad- & Küchenrenovierung",
      titleEn: "Bathroom & Kitchen Remodeling",
      titleRu: "Ремонт ванных комнат и кухонь",
      typicalRangeEur: "€26 – €45/h"
    }, relations: [] },
  { entityKey: "ServiceCategory:doors_windows", data: {
      id: "c8d8b65a-4563-46fd-a96f-c2faeb5cb45a",
      baselineHourlyRate: new Prisma.Decimal("21"),
      craftClassification: CraftClassification.FREIES_HANDWERK,
      createdAt: new Date("2026-01-10T09:30:00.000Z"),
      descriptionDe: "Justierung von Wiener Kastenfenstern, Dichtungstausch zur Zugluftvermeidung, Einbau von Innentüren und Reparatur historischer Beschläge.",
      descriptionEn: "Adjustment of traditional Viennese box-casement windows (Kastenfenster), draft-proofing seal replacement, interior door hanging, and brass hardware servicing.",
      descriptionRu: "Регулировка традиционных венских окон Kastenfenster, замена уплотнителей от сквозняков, навеска межкомнатных дверей и ремонт старинной фурнитуры.",
      displayOrder: 7,
      iconName: "DoorClosed",
      imageUrl: "https://www.autocoder.cc/background/zaki_prod/generated/bdd2b3d868424225b86c2c7ddaccc553.png",
      isFeatured: false,
      key: ServiceCategoryKey.DOORS_WINDOWS,
      leadArtisan: "Wiener Kastenfenster-Spezialisten (1080 Wien)",
      titleDe: "Türen, Fenster & Altbau-Beschläge",
      titleEn: "Doors, Windows & Altbau Fittings",
      titleRu: "Двери, окна и фурнитура Altbau",
      typicalRangeEur: "€21 – €36/h"
    }, relations: [] },
  { entityKey: "ServiceCategory:demolition", data: {
      id: "8672a79c-90ef-41bd-a200-ca725c5ced0d",
      baselineHourlyRate: new Prisma.Decimal("18"),
      craftClassification: CraftClassification.FREIES_HANDWERK,
      createdAt: new Date("2026-01-10T09:45:00.000Z"),
      descriptionDe: "Schonende Entkernung von Altbau-Wohnungen, Entfernen alter Fliesen, Tapeten, Teppichböden und nichttragender Leichtbauwände mit fachgerechter Schuttentsorgung.",
      descriptionEn: "Non-structural interior stripping for Altbau apartments, tile removal, wallpaper peeling, carpet lifting, and authorized rubble disposal according to Vienna environmental codes.",
      descriptionRu: "Аккуратный демонтаж в квартирах Altbau: снятие старой плитки, обоев, напольных покрытий и разборка ненесущих перегородок с вывозом строительного мусора.",
      displayOrder: 8,
      iconName: "Trash2",
      imageUrl: "https://www.autocoder.cc/background/zaki_prod/generated/c3e97edf28dc42a9b1e0f2c0ea48fa9c.png",
      isFeatured: false,
      key: ServiceCategoryKey.DEMOLITION,
      leadArtisan: "Markus Bauer Abbruchteam (1100 Wien)",
      titleDe: "Entkernung & Demontage",
      titleEn: "Demolition & Interior Stripping",
      titleRu: "Демонтаж и подготовка помещений",
      typicalRangeEur: "€18 – €28/h"
    }, relations: [] },
] as const;

const viennaDistrictRecords = [
  { entityKey: "ViennaDistrict:district_1010", data: {
      id: "39ae5d04-e929-4744-a2bd-b9040b9977cb",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1010",
      districtName: "Innere Stadt",
      districtNumber: 1,
      leadTimeHours: 2,
      zone: LogisticsZone.INNER_CITY
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1020", data: {
      id: "9ba423c9-059f-474d-ab1e-d7fad74a6690",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1020",
      districtName: "Leopoldstadt",
      districtNumber: 2,
      leadTimeHours: 3,
      zone: LogisticsZone.CENTRAL
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1030", data: {
      id: "c76b00d7-bbc8-4b24-a450-14ac676ee9f2",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1030",
      districtName: "Landstraße",
      districtNumber: 3,
      leadTimeHours: 3,
      zone: LogisticsZone.CENTRAL
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1040", data: {
      id: "c60df1be-dbb0-43a1-a52d-09303150ecc6",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1040",
      districtName: "Wieden",
      districtNumber: 4,
      leadTimeHours: 3,
      zone: LogisticsZone.CENTRAL
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1050", data: {
      id: "1c90b91c-f3a9-4e6d-adc8-554f048502a1",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1050",
      districtName: "Margareten",
      districtNumber: 5,
      leadTimeHours: 3,
      zone: LogisticsZone.CENTRAL
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1060", data: {
      id: "e368f1d3-a551-4d15-abc4-1e059f9dd609",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1060",
      districtName: "Mariahilf",
      districtNumber: 6,
      leadTimeHours: 3,
      zone: LogisticsZone.CENTRAL
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1070", data: {
      id: "e0adb16f-39fc-4b73-aaa1-e497ea24ab86",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1070",
      districtName: "Neubau",
      districtNumber: 7,
      leadTimeHours: 3,
      zone: LogisticsZone.CENTRAL
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1080", data: {
      id: "3b7bc2ea-19f6-45ac-a4ac-27ddb400bb05",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1080",
      districtName: "Josefstadt",
      districtNumber: 8,
      leadTimeHours: 3,
      zone: LogisticsZone.CENTRAL
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1090", data: {
      id: "2120f5b6-ea7f-4f6d-a7b7-969ebdce346c",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1090",
      districtName: "Alsergrund",
      districtNumber: 9,
      leadTimeHours: 3,
      zone: LogisticsZone.CENTRAL
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1100", data: {
      id: "97bd5e60-e898-450b-a9ec-32396140ad2a",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1100",
      districtName: "Favoriten",
      districtNumber: 10,
      leadTimeHours: 4,
      zone: LogisticsZone.OUTER_RING
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1110", data: {
      id: "fd7754d9-efe5-4d3c-af0d-666e3de48a5d",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1110",
      districtName: "Simmering",
      districtNumber: 11,
      leadTimeHours: 4,
      zone: LogisticsZone.OUTER_RING
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1120", data: {
      id: "49c5dc53-de61-4d84-a1f2-38593e6e4f18",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1120",
      districtName: "Meidling",
      districtNumber: 12,
      leadTimeHours: 4,
      zone: LogisticsZone.OUTER_RING
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1130", data: {
      id: "8d503d02-680c-4a24-a252-f7271b45e268",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1130",
      districtName: "Hietzing",
      districtNumber: 13,
      leadTimeHours: 5,
      zone: LogisticsZone.GREATER_SUBURB
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1140", data: {
      id: "4c9ffe74-dc48-4f4e-ac55-29ac445cdf63",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1140",
      districtName: "Penzing",
      districtNumber: 14,
      leadTimeHours: 5,
      zone: LogisticsZone.GREATER_SUBURB
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1150", data: {
      id: "fb764f0a-271f-4219-ad72-c3002dc8f778",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1150",
      districtName: "Rudolfsheim-Fünfhaus",
      districtNumber: 15,
      leadTimeHours: 4,
      zone: LogisticsZone.OUTER_RING
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1160", data: {
      id: "c583a4b5-75fc-4024-aaeb-1fd4d11985b5",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1160",
      districtName: "Ottakring",
      districtNumber: 16,
      leadTimeHours: 4,
      zone: LogisticsZone.OUTER_RING
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1170", data: {
      id: "242a4e41-3040-4984-ac6b-0599be1eb278",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1170",
      districtName: "Hernals",
      districtNumber: 17,
      leadTimeHours: 4,
      zone: LogisticsZone.OUTER_RING
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1180", data: {
      id: "243d66d6-56e0-4669-a311-67ad76064a1f",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1180",
      districtName: "Währing",
      districtNumber: 18,
      leadTimeHours: 4,
      zone: LogisticsZone.OUTER_RING
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1190", data: {
      id: "e94030d7-5aa6-4535-a3de-76149d10cc7d",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1190",
      districtName: "Döbling",
      districtNumber: 19,
      leadTimeHours: 5,
      zone: LogisticsZone.GREATER_SUBURB
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1200", data: {
      id: "d0c226b9-189e-4d3a-a318-73e0ff323a52",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1200",
      districtName: "Brigittenau",
      districtNumber: 20,
      leadTimeHours: 4,
      zone: LogisticsZone.OUTER_RING
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1210", data: {
      id: "55813913-03e6-4bc1-afc3-6ad77ecdcbe6",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1210",
      districtName: "Floridsdorf",
      districtNumber: 21,
      leadTimeHours: 5,
      zone: LogisticsZone.GREATER_SUBURB
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1220", data: {
      id: "fff5329c-dcae-4aa5-ac96-7c794d279bbe",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1220",
      districtName: "Donaustadt",
      districtNumber: 22,
      leadTimeHours: 5,
      zone: LogisticsZone.GREATER_SUBURB
    }, relations: [] },
  { entityKey: "ViennaDistrict:district_1230", data: {
      id: "4d589f7c-3ab9-4951-aee5-6ee17ff5c625",
      createdAt: new Date("2026-01-01T08:00:00.000Z"),
      districtCode: "1230",
      districtName: "Liesing",
      districtNumber: 23,
      leadTimeHours: 5,
      zone: LogisticsZone.GREATER_SUBURB
    }, relations: [] },
] as const;

const setupChecklistItemRecords = [
  { entityKey: "SetupChecklistItem:chk_vat_uid", data: {
      id: "54608145-8811-4495-a9e5-3391cdababe4",
      createdAt: new Date("2026-01-10T08:00:00.000Z"),
      fieldValue: "ATU78923412",
      itemKey: ChecklistItemKey.VAT_UID,
      lastUpdated: "2026-05-14 09:30:15 CET",
      legalRef: "Section 27 UStG 1994",
      status: ChecklistStatus.COMPLETED,
      subtitle: "Verification of valid Austrian Federal Ministry of Finance VAT number for trade operations and invoicing.",
      title: "Austrian Value Added Tax Identification (UID)"
    }, relations: [] },
  { entityKey: "SetupChecklistItem:chk_official_contact", data: {
      id: "4741b40a-9eae-4956-a64f-509aca7d47ba",
      createdAt: new Date("2026-01-10T08:00:00.000Z"),
      fieldValue: "+43 1 512 3456 / dispo@wien-handwerk.at",
      itemKey: ChecklistItemKey.OFFICIAL_CONTACT,
      lastUpdated: "2026-06-20 14:12:00 CET",
      legalRef: "Section 63 GewO 1994 & Section 5 ECG",
      status: ChecklistStatus.COMPLETED,
      subtitle: "24/7 designated dispatch supervisor line and central regulatory compliance inquiry email address.",
      title: "Official Commercial Operations & Emergency Contact"
    }, relations: [] },
  { entityKey: "SetupChecklistItem:chk_registered_address", data: {
      id: "52ff010d-a18e-4b09-a28d-aecc1fdcb5e1",
      createdAt: new Date("2026-01-10T08:00:00.000Z"),
      fieldValue: "Kärntner Ring 12/Top 4, 1010 Wien, Austria (Commercial Court Vienna FN 543210x)",
      itemKey: ChecklistItemKey.REGISTERED_ADDRESS,
      lastUpdated: "2026-07-15 11:45:22 CET",
      legalRef: "Section 63 GewO 1994 (Standortverlegung)",
      status: ChecklistStatus.COMPLETED,
      subtitle: "Official physical workshop address registered at Handelsgericht Wien (Commercial Court Vienna).",
      title: "Commercial Court Registered Seat & Workplace"
    }, relations: [] },
  { entityKey: "SetupChecklistItem:chk_operating_hours", data: {
      id: "353374f1-c324-4be8-ae1e-cf0b9becac2e",
      createdAt: new Date("2026-01-10T08:00:00.000Z"),
      fieldValue: "Mon–Fri 07:00–19:00, Sat 08:00–14:00 (Emergency on-call 24/7)",
      itemKey: ChecklistItemKey.OPERATING_HOURS,
      lastUpdated: "2026-09-01 08:00:00 CET",
      legalRef: "Section 9 AZG & Opening Hours Act",
      status: ChecklistStatus.IN_REVIEW,
      subtitle: "Published customer service availability and on-call emergency response scheduling regulations.",
      title: "Standard Operating & Emergency Dispatch Hours"
    }, relations: [] },
] as const;

const faqItemRecords = [
  { entityKey: "FaqItem:faq-pricing-1", data: {
      id: "0c820920-7960-4e2c-a940-f1125e0de5d4",
      answerDe: "Unser Basissatz von 15 €/Stunde gilt für standardmäßige handwerkliche Hilfstätigkeiten des freien Gewerbes. Es gibt keinerlei versteckte Pauschalen für Werkzeugnutzung, Schmiermittel oder Kleinteilezuschläge. Die Abrechnung erfolgt nach der Mindestdauer von 1,5 Stunden im fairen 15-Minuten-Takt.",
      answerEn: "Our €15/hour baseline applies to standard assembly and non-regulated artisan tasks. There are zero hidden surcharge lines for tool wear, consumables, or administrative fees. Following the initial 1.5-hour minimum window, time is billed transparently in exact 15-minute increments.",
      answerRu: "Базовая ставка 15 €/час распространяется на стандартные свободные монтажные и подготовительные работы. Мы не берем доплат за амортизацию инструмента, мелкие расходники или оформление. После минимального заказа 1.5 часа расчет ведется с точностью до 15 минут.",
      category: FaqCategory.PRICING,
      createdAt: new Date("2026-10-01T08:00:00.000Z"),
      displayOrder: 1,
      questionDe: "Wie setzt sich der Stundensatz von 15 € zusammen und gibt es versteckte Gebühren?",
      questionEn: "How is the €15/hour baseline calculated and are there any hidden fees?",
      questionRu: "Как формируется базовый тариф 15 €/час и есть ли скрытые комиссии?"
    }, relations: [] },
  { entityKey: "FaqItem:faq-pricing-2", data: {
      id: "f6abaf21-dc7c-460c-a0e0-1be9f389427c",
      answerDe: "Privatkunden erhalten transparente Rechnungen mit separat ausgewiesener 20% österreichischer Mehrwertsteuer. Gewerbliche B2B-Kunden in Österreich erhalten ordnungsgemäße Vorsteuer-abzugsfähige Rechnungen mit gültiger UID-Nummer.",
      answerEn: "Private residential clients receive full transparent invoices with statutory 20% Austrian VAT clearly broken down. Commercial B2B entities receive compliant tax invoices featuring our Austrian VAT identification number (UID: ATU79482103) for input tax deductions.",
      answerRu: "Физические лица получают официальный счет с выделенным налогом 20% USt. Корпоративные клиенты B2B получают налоговый счет с номером UID ATU79482103 для зачета входящего налога.",
      category: FaqCategory.PRICING,
      createdAt: new Date("2026-10-01T08:15:00.000Z"),
      displayOrder: 2,
      questionDe: "Wie erfolgt die Verrechnung der österreichischen Umsatzsteuer (20% USt.)?",
      questionEn: "How is Austrian Value Added Tax (20% VAT) invoiced?",
      questionRu: "Как оформляется австрийский налог на добавленную стоимость (20% USt.)?"
    }, relations: [] },
  { entityKey: "FaqItem:faq-scope-1", data: {
      id: "49b2eac9-8f12-4292-aa1c-fd177a7e7633",
      answerDe: "Nach GewO § 94 sind Eingriffe in stromführende Starkstromleitungen, Gasrohre, tragende Wände und Hauptwasserstränge konzessionierten Meisterbetrieben vorbehalten. Vienna Handwerk führt alle Möbelmontagen, Trockenbau, Malerarbeiten und Kleinreparaturen direkt aus; meisterpflichtige Tätigkeiten vergeben wir nahtlos an zertifizierte Wiener Partner-Meisterbetriebe.",
      answerEn: "Under Austrian GewO § 94, work involving electrical distribution boards, pressurized gas lines, structural masonry alterations, and main water risers requires master craftsman concession. Vienna Handwerk executes all assembly, finishing, and surface repairs in-house, routing regulated works exclusively through vetted Viennese partner Meisterbetriebe.",
      answerRu: "Согласно статье GewO § 94 работы с электрощитами, газовыми трубами, несущими конструкциями и главными стояками требуют лицензии мастера. Сборку, покраску и мелкий ремонт мы выполняем штатными мастерами, а лицензируемые задачи передаем сертифицированным мастерам-партнерам.",
      category: FaqCategory.SCOPE,
      createdAt: new Date("2026-10-01T08:30:00.000Z"),
      displayOrder: 3,
      questionDe: "Wo liegt die genaue rechtliche Grenze zwischen freiem Handwerk und Meisterbetrieb?",
      questionEn: "Where is the exact statutory boundary between Freies Handwerk and Meisterbetrieb?",
      questionRu: "Где проходит точная юридическая граница между свободным ремеслом и Meisterbetrieb?"
    }, relations: [] },
  { entityKey: "FaqItem:faq-materials-1", data: {
      id: "4600f819-257d-40b1-a994-77b69abace4b",
      answerDe: "Sie haben die Wahl: Sie können eigene Materialien bereitstellen oder der Handwerker nutzt hochwertige Standarddübel (z.B. Fischer Altbaudübel) und Schrauben aus dem Servicefahrzeug. Spezielles Material kaufen wir gerne bei Hornbach oder Obi zum Original-Belegpreis für Sie ein.",
      answerEn: "You have full flexibility: you can provide your own materials, or our craftsmen can supply standard dowels (Fischer Altbau dowels), screws, and mounting brackets directly from the service vehicle. For specific paint, flooring, or boards, we can purchase them at Obi or Hornbach and invoice at exact receipt cost.",
      answerRu: "Вы можете предоставить всё сами, либо мастер привезёт стандартный крепёж (дюбели Fischer для старого фонда, саморезы). Необходимые стройматериалы мы можем закупить в Obi или Hornbach по магазинному чеку.",
      category: FaqCategory.MATERIALS,
      createdAt: new Date("2026-10-01T08:45:00.000Z"),
      displayOrder: 4,
      questionDe: "Muss ich Schrauben, Dübel und Materialien selbst besorgen?",
      questionEn: "Do I have to buy screws, dowels, and materials myself?",
      questionRu: "Нужно ли мне самому покупать дюбели, саморезы и материалы?"
    }, relations: [] },
  { entityKey: "FaqItem:faq-scheduling-1", data: {
      id: "ab90aab5-47f9-4d15-aa8b-368e9011db6c",
      answerDe: "Standardtermine in den inneren Wiener Bezirken (1010–1090) können in der Regel innerhalb von 24 bis 48 Stunden vergeben werden. Bei dringenden Reparaturen bieten wir je nach Handwerker-Kapazität auch Termine am selben Tag an.",
      answerEn: "Standard appointments in inner Vienna districts (1010–1090) are typically dispatched within 24 to 48 hours. For urgent repair requests, same-day scheduling is available based on artisan capacity across central districts.",
      answerRu: "Стандартный выезд в центральные районы Вены (1010–1090) организуется в течение 24–48 часов. При срочных заявках возможен выезд в тот же день при наличии свободных мастеров.",
      category: FaqCategory.SCHEDULING,
      createdAt: new Date("2026-10-01T09:00:00.000Z"),
      displayOrder: 5,
      questionDe: "Wie kurzfristig kann ein Handwerkertermin in Wien vereinbart werden?",
      questionEn: "How quickly can a craftsman be scheduled for an appointment in Vienna?",
      questionRu: "Как быстро можно согласовать выезд мастера в Вене?"
    }, relations: [] },
  { entityKey: "FaqItem:faq-scheduling-2", data: {
      id: "f8648d2c-281c-4b72-a5b0-63b836d28bc8",
      answerDe: "Termine können bis zu 24 Stunden vor dem vereinbarten Zeitfenster kostenfrei verschoben oder storniert werden. Bei Absagen unter 24 Stunden oder Nichterscheinen vor Ort berechnen wir eine Anfahrtspauschale in Höhe einer Arbeitsstunde.",
      answerEn: "Appointments can be rescheduled or cancelled free of charge up to 24 hours prior to the booked time slot. Cancellations under 24 hours or unannounced access failures incur a standard one-hour dispatch fee to cover artisan travel.",
      answerRu: "Перенос или отмена визита бесплатны при уведомлении не менее чем за 24 часа. При более поздней отмене или отсутствии доступа на объекте взимается компенсация выезда в размере одного часа работы.",
      category: FaqCategory.SCHEDULING,
      createdAt: new Date("2026-10-01T09:15:00.000Z"),
      displayOrder: 6,
      questionDe: "Welche Stornierungsbedingungen gelten bei kurzfristigen Terminänderungen?",
      questionEn: "What is your cancellation policy if my schedule changes?",
      questionRu: "Каковы условия отмены или переноса назначенного визита?"
    }, relations: [] },
] as const;

const quoteRequestRecords = [
  { entityKey: "QuoteRequest:quote_request_01", data: {
      id: "b16e5b50-b1b2-46b4-ad51-6e82086b8fe2",
      addressSnippet: "Kirchengasse 24/8, 1070 Wien",
      agreedToTerms: true,
      clientEmail: "stefan.weber@gmail.com",
      clientName: "Stefan Weber",
      clientPhone: "+43 664 123 4567",
      createdAt: new Date("2026-10-10T06:42:00.000Z"),
      createdAtFormatted: "10 Oct 2026, 08:42 CEST",
      estimatedBudgetEur: new Prisma.Decimal("420"),
      estimatedHours: 14,
      hasMaterials: false,
      isUrgent: true,
      preferredDate: "2026-10-16",
      preferredTimeSlot: PreferredTimeSlot.MORNING,
      scopeNotes: "Parkettabschliff inkl. Randfräsung und MA48-gerechter Staubabsaugung im 3. Stock ohne Lift.",
      status: QuoteStatus.NEW,
      submissionLang: SubmissionLanguage.DE,
      taskDescription: "Klassischer Wiener Altbau, 42 m² Eichenparkett, Dreifachversiegelung mit Mattlack, Kantenbearbeitung an historischen Sockeln.",
      taskTitle: "Altbau Fischgrätparkett Abschleifen & Sockelleisten Neumontage",
      trackingCode: "VIE-2026-0841"
    }, relations: [{"target_entity_key": "AccountUser:customer_user_01", "local_fields": ["customerId"], "target_fields": ["id"]}, {"target_entity_key": "ServiceCategory:flooring", "local_fields": ["serviceCategoryId"], "target_fields": ["id"]}, {"target_entity_key": "ViennaDistrict:district_1070", "local_fields": ["districtId"], "target_fields": ["id"]}] },
  { entityKey: "QuoteRequest:quote_request_02", data: {
      id: "e7644aba-ed7b-44ee-a4aa-1df28a5d0365",
      addressSnippet: "Herrengasse 14/3, 1010 Wien",
      agreedToTerms: true,
      clientEmail: "elena.rostova@vienna-expats.org",
      clientName: "Elena V. Rostova",
      clientPhone: "+43 660 812 9043",
      createdAt: new Date("2026-10-09T09:15:00.000Z"),
      createdAtFormatted: "09 Oct 2026, 11:15 CEST",
      estimatedBudgetEur: new Prisma.Decimal("195"),
      estimatedHours: 7,
      hasMaterials: true,
      isUrgent: false,
      preferredDate: "2026-10-18",
      preferredTimeSlot: PreferredTimeSlot.AFTERNOON,
      scopeNotes: "Dübelverankerung in historischem Ziegelmauerwerk mit Fischer DuoPower erforderlich.",
      status: QuoteStatus.CONTACTED,
      submissionLang: SubmissionLanguage.RU,
      taskDescription: "Montage 3 Meter Kleiderschranksystem, Wandaussteifung und integrierte LED-Sensorleisten in Altbau-Wohnung mit 3,6 m Raumhöhe.",
      taskTitle: "Pax-Schrankwand 3m Montage inkl. Eckelemente & LED-Beleuchtung",
      trackingCode: "VIE-2026-0840"
    }, relations: [{"target_entity_key": "ServiceCategory:assembly", "local_fields": ["serviceCategoryId"], "target_fields": ["id"]}, {"target_entity_key": "ViennaDistrict:district_1010", "local_fields": ["districtId"], "target_fields": ["id"]}] },
  { entityKey: "QuoteRequest:quote_request_03", data: {
      id: "dc305ad9-52a3-4ebb-ad44-831419dbbd37",
      addressSnippet: "Taborstraße 55/12, 1020 Wien",
      agreedToTerms: true,
      clientEmail: "d.sterling@unodc-vienna.org",
      clientName: "David Sterling",
      clientPhone: "+43 699 173 5501",
      createdAt: new Date("2026-10-08T14:30:00.000Z"),
      createdAtFormatted: "08 Oct 2026, 16:30 CEST",
      estimatedBudgetEur: new Prisma.Decimal("490"),
      estimatedHours: 18,
      hasMaterials: false,
      isUrgent: false,
      preferredDate: "2026-10-22",
      preferredTimeSlot: PreferredTimeSlot.FLEXIBLE,
      scopeNotes: "Abklebearbeiten an Stuckkanten und historischen Doppelkastenfenstern.",
      status: QuoteStatus.ESTIMATE_SENT,
      submissionLang: SubmissionLanguage.EN,
      taskDescription: "Komplettrenovierung nach Mietende, 75 m² Wandfläche, Dispersionsfarbe Deckkraftklasse 1, Ausbessern von Rissen und Dübellöchern.",
      taskTitle: "3-Zimmer-Wohnung Weißanstrich vor Wohnungsübergabe inkl. Spachteln",
      trackingCode: "VIE-2026-0839"
    }, relations: [{"target_entity_key": "ServiceCategory:painting", "local_fields": ["serviceCategoryId"], "target_fields": ["id"]}, {"target_entity_key": "ViennaDistrict:district_1020", "local_fields": ["districtId"], "target_fields": ["id"]}] },
  { entityKey: "QuoteRequest:quote_request_04", data: {
      id: "8b3d29bd-08b2-49df-a552-7ec7eb7f1ad5",
      addressSnippet: "Neubaugasse 31/15, 1070 Wien",
      agreedToTerms: true,
      clientEmail: "stefan.weber@gmail.com",
      clientName: "Stefan Weber",
      clientPhone: "+43 664 123 4567",
      createdAt: new Date("2026-10-06T12:20:00.000Z"),
      createdAtFormatted: "06 Oct 2026, 14:20 CEST",
      estimatedBudgetEur: new Prisma.Decimal("380"),
      estimatedHours: 12,
      hasMaterials: false,
      isUrgent: false,
      preferredDate: "2026-10-24",
      preferredTimeSlot: PreferredTimeSlot.MORNING,
      scopeNotes: "Rigips CW-Profile entkoppelt mit Akustik-Dichtband an Boden und Decke.",
      status: QuoteStatus.QUOTED,
      submissionLang: SubmissionLanguage.DE,
      taskDescription: "Errichtung einer freistehenden Knauf Silentboard Akustik-Trennwand zur Schalldämmung gegen Nachbarwohnung im Altbau, inklusive Q3-Oberflächenfinish.",
      taskTitle: "Trockenbau-Akustikwand & Vorsatzschale im Homeoffice",
      trackingCode: "VIE-2026-0838"
    }, relations: [{"target_entity_key": "AccountUser:customer_user_01", "local_fields": ["customerId"], "target_fields": ["id"]}, {"target_entity_key": "ServiceCategory:drywall", "local_fields": ["serviceCategoryId"], "target_fields": ["id"]}, {"target_entity_key": "ViennaDistrict:district_1070", "local_fields": ["districtId"], "target_fields": ["id"]}] },
  { entityKey: "QuoteRequest:quote_request_05", data: {
      id: "fba4bc12-733d-4e9d-a8ec-95905f70cea9",
      addressSnippet: "Reisnerstraße 18/6, 1030 Wien",
      agreedToTerms: true,
      clientEmail: "sophie.schoeneck@wien-kultur.at",
      clientName: "Sophie von Schöneck",
      clientPhone: "+43 676 555 7821",
      createdAt: new Date("2026-10-05T08:05:00.000Z"),
      createdAtFormatted: "05 Oct 2026, 10:05 CEST",
      estimatedBudgetEur: new Prisma.Decimal("310"),
      estimatedHours: 10,
      hasMaterials: true,
      isUrgent: false,
      preferredDate: "2026-10-25",
      preferredTimeSlot: PreferredTimeSlot.MORNING,
      scopeNotes: "Denkmalschutzauflagen im Botschaftsviertel; Original-Messingoliven müssen erhalten bleiben.",
      status: QuoteStatus.SCHEDULED,
      submissionLang: SubmissionLanguage.DE,
      taskDescription: "Überholung von 6 zweiflügeligen Altbau-Kastenfenstern: Gängigmachen verzogener Holzrahmen, Einfräsen von Silikon-Hohldichtungen gegen Zugluft, Politur der Messingbeschläge.",
      taskTitle: "Historische Kastenfenster Justierung & Dichtungstausch",
      trackingCode: "VIE-2026-0835"
    }, relations: [{"target_entity_key": "ServiceCategory:doors_windows", "local_fields": ["serviceCategoryId"], "target_fields": ["id"]}, {"target_entity_key": "ViennaDistrict:district_1030", "local_fields": ["districtId"], "target_fields": ["id"]}] },
  { entityKey: "QuoteRequest:quote_request_06", data: {
      id: "1482d3de-252f-4e75-a22b-8abc67ce66d1",
      addressSnippet: "Währinger Straße 48/10, 1090 Wien",
      agreedToTerms: true,
      clientEmail: "a.lindner@meduniwien.ac.at",
      clientName: "Alexander Lindner",
      clientPhone: "+43 650 334 9122",
      createdAt: new Date("2026-10-02T07:30:00.000Z"),
      createdAtFormatted: "02 Oct 2026, 09:30 CEST",
      estimatedBudgetEur: new Prisma.Decimal("175"),
      estimatedHours: 5,
      hasMaterials: true,
      isUrgent: true,
      preferredDate: "2026-10-12",
      preferredTimeSlot: PreferredTimeSlot.AFTERNOON,
      scopeNotes: "Hauptabsperrhahn im Badezimmer bereits vorab geprüft und gangbar gemacht.",
      status: QuoteStatus.COMPLETED,
      submissionLang: SubmissionLanguage.DE,
      taskDescription: "Austausch zweier Unterputz-Mischbatterien durch Grohe Einhebelmischer, Neuziehen sämtlicher Silikonfugen rund um Badewanne und Duschtasse mit schimmelresistentem Sanitärsilikon.",
      taskTitle: "Waschtisch-Armaturentausch & Silikonfugensanierung im Altbaubad",
      trackingCode: "VIE-2026-0836"
    }, relations: [{"target_entity_key": "ServiceCategory:plumbing_minor", "local_fields": ["serviceCategoryId"], "target_fields": ["id"]}, {"target_entity_key": "ViennaDistrict:district_1090", "local_fields": ["districtId"], "target_fields": ["id"]}] },
  { entityKey: "QuoteRequest:quote_request_07", data: {
      id: "6a619fa9-2f62-4080-a498-7b89ecc92ac1",
      addressSnippet: "Favoritenstraße 89/14, 1100 Wien",
      agreedToTerms: true,
      clientEmail: "mikhail.voronin@vienna-tech.io",
      clientName: "Mikhail Voronin",
      clientPhone: "+43 660 741 2980",
      createdAt: new Date("2026-10-10T09:50:00.000Z"),
      createdAtFormatted: "10 Oct 2026, 11:50 CEST",
      estimatedBudgetEur: new Prisma.Decimal("390"),
      estimatedHours: 15,
      hasMaterials: false,
      isUrgent: false,
      preferredDate: "2026-10-28",
      preferredTimeSlot: PreferredTimeSlot.FLEXIBLE,
      scopeNotes: "Bauschutt wird in reißfeste Gewebesäcke à 25 kg abgefüllt für MA48 Abtransport.",
      status: QuoteStatus.NEW,
      submissionLang: SubmissionLanguage.EN,
      taskDescription: "Rückbau von 22 m² Wandfliesen in Küche und WC sowie Entfernen alter geklebter Linoleumbeläge im Vorzimmer inklusive verpackter Schuttbereitstellung.",
      taskTitle: "Wohnungsentkernung: Fliesenabschlagen & Linoleumentfernung",
      trackingCode: "VIE-2026-0837"
    }, relations: [{"target_entity_key": "ServiceCategory:demolition", "local_fields": ["serviceCategoryId"], "target_fields": ["id"]}, {"target_entity_key": "ViennaDistrict:district_1100", "local_fields": ["districtId"], "target_fields": ["id"]}] },
] as const;

function requireEntity(entities: Map<string, SeedEntity>, entityKey: string): SeedEntity {
  const entity = entities.get(entityKey);
  if (!entity) throw new Error(`seed relation target was not created: ${entityKey}`);
  return entity;
}

async function main() {
  await prisma.$transaction(async (tx) => {
    const entities = new Map<string, SeedEntity>();
    await tx.quoteRequest.updateMany({ data: { customerId: null } });

    await tx.quoteRequest.deleteMany({});
    await tx.faqItem.deleteMany({});
    await tx.setupChecklistItem.deleteMany({});
    await tx.viennaDistrict.deleteMany({});
    await tx.serviceCategory.deleteMany({});
    await tx.accountUser.deleteMany({});

    for (const record of accountUserRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.accountUser.create({ data: data as unknown as Prisma.AccountUserUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of serviceCategoryRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.serviceCategory.create({ data: data as unknown as Prisma.ServiceCategoryUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of viennaDistrictRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.viennaDistrict.create({ data: data as unknown as Prisma.ViennaDistrictUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of setupChecklistItemRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.setupChecklistItem.create({ data: data as unknown as Prisma.SetupChecklistItemUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of faqItemRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.faqItem.create({ data: data as unknown as Prisma.FaqItemUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of quoteRequestRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.quoteRequest.create({ data: data as unknown as Prisma.QuoteRequestUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
  }, { maxWait: 30_000, timeout: 300_000 });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
