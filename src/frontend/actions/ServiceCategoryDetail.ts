'use server';

import prisma from '@/tools/prisma';
import { withResult } from '@/frontend/action_utils';
import {
  ServiceCategoryKey,
  CraftClassification,
  LogisticsZone,
  ServiceCategoryDetailDTO,
  ViennaDistrictDTO,
  ServiceCategoryPageData,
} from '@/frontend/types/ServiceCategoryDetail';

// Statutory domain trade activity matrices under Austrian Trade Licensing Act (GewO 1994)
const CATEGORY_ACTIVITY_REGISTRY: Record<
  ServiceCategoryKey,
  {
    gewoParagraph: string;
    minBookingHours: number;
    travelFeeInnerVienna: number;
    travelFeeOuterVienna: number;
    permittedDe: string[];
    permittedEn: string[];
    permittedRu: string[];
    partnerDe: string[];
    partnerEn: string[];
    partnerRu: string[];
  }
> = {
  ASSEMBLY: {
    gewoParagraph: 'GewO 1994 § 5 (Freies Gewerbe)',
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      'Zusammenbau und Aufstellen von serienmäßig hergestellten Fertigmöbeln (IKEA, Mömax, XXLutz)',
      'Bohren und Dübeln in Mauerwerk, Beton und Gipskarton (Spiegel, Bilder, Regale, Garderoben)',
      'Montage von TV-Wandhalterungen, Vorhangstangen und Deckenleuchten (an bestehende Lüsterklemmen)',
      'Anpassung von Sockelleisten, Zierleisten und standardisierten Abdeckplatten',
    ],
    permittedEn: [
      'Assembly and alignment of standardized flat-pack furniture (IKEA, designer sets)',
      'Secure masonry, concrete, and drywall drilling for mirrors, shelving, and heavy artwork',
      'TV wall bracket installations and ceiling fixtures into pre-existing terminal blocks',
      'Skirting board trimming, door stop fittings, and decorative molding alignment',
    ],
    permittedRu: [
      'Сборка и регулировка корпусной и модульной мебели фабричного производства',
      'Сверление и дюбельный монтаж полок, зеркал, карнизов и тяжелых элементов декора',
      'Установка настенных кронштейнов для телевизоров и подвесных светильников',
      'Подгонка напольных плинтусов и декоративных нащельников',
    ],
    partnerDe: [
      'Statischer Eingriff in tragende Wände oder Betonträger (Maurermeister)',
      'Neuverlegung von Starkstrom- oder Elektroleitungen (Elektrotechnik-Meister)',
      'Änderung von Gasanschlüssen bei Küchenmontagen (Installateurmeister)',
    ],
    partnerEn: [
      'Structural modifications to load-bearing walls or reinforced concrete (Master Builder)',
      'Electrical main line re-routing and high-voltage circuit creation (Master Electrician)',
      'Gas line alterations during kitchen appliance installations (Master Gas & Plumber)',
    ],
    partnerRu: [
      'Изменение несущих стен и резка железобетонных балок (Мастер-строитель)',
      'Прокладка силовых кабелей и монтаж электрощитов (Мастер-электрик)',
      'Подключение и перенос газовых плит и колонок (Мастер-газовщик)',
    ],
  },
  DEMOLITION: {
    gewoParagraph: 'GewO 1994 § 5 (Freies Gewerbe)',
    minBookingHours: 3,
    travelFeeInnerVienna: 25.0,
    travelFeeOuterVienna: 35.0,
    permittedDe: [
      'Entfernen von Tapeten, Fliesenbelägen und Altputzen bis auf das Rohmauerwerk',
      'Rückbau von nichttragenden Gipskarton- und Leichtbau-Trennwänden',
      'Herausreißen von alten Teppichen, Laminaten und schwimmend verlegten Böden',
      'Bauschutt-Sackabtransport (MA 48 konform) zur behördlichen Wertstoffsammelstelle',
    ],
    permittedEn: [
      'Wallpaper peeling, ceramic tile stripping, and loose plaster scraping',
      'Demolition of non-load-bearing drywall partitions and decorative studs',
      'Removal of old carpeting, laminate layers, and subfloor underlays',
      'Rubble bagging and certified MA 48 waste logistics dispatch',
    ],
    permittedRu: [
      'Удаление обоев, плитки и старой штукатурки до базового основания',
      'Демонтаж ненесущих перегородок из гипсокартона и пеноблоков',
      'Снятие старого ковролина, ламината и подложки',
      'Упаковка и вывоз строительного мусора на полигоны MA 48',
    ],
    partnerDe: [
      'Abbruch tragender Pfeiler, Decken und Kaminzüge (Baumeister)',
      'Entfernung asbesthaltiger Baustoffe nach TRGS 519 (Zertifizierter Fachbetrieb)',
    ],
    partnerEn: [
      'Demolition of load-bearing columns, ceilings, or chimney flues (Certified Master Builder)',
      'Removal of asbestos-containing insulation or specialized hazardous substances',
    ],
    partnerRu: [
      'Снос несущих колонн, перекрытий и вентиляционных каналов (Мастер-строитель)',
      'Утилизация асбеста и токсичных материалов сертифицированной службой',
    ],
  },
  FLOORING: {
    gewoParagraph: 'GewO 1994 § 5 (Freies Gewerbe)',
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      'Schwimmende Verlegung von Klick-Laminat, Vinyl- und Fertigparkettböden',
      'Ausbesserung einzelner schadhafter Parkettstäbe im Wiener Fischgrät-Verband',
      'Schleifen, Versiegeln und Ölen von Holzdielen mit staubreduzierten Absauganlagen',
      'Montage von passgenauen Übergangs- und Sockelleisten',
    ],
    permittedEn: [
      'Floating installation of click-laminate, LVT, and engineered hardwood flooring',
      'Spot repair of damaged solid wood staves in Viennese herringbone layouts',
      'Surface sanding, sealing, and hardwax-oiling with HEPA-filtered dust extraction',
      'Installation of perimeter skirting boards and matching expansion joint profiles',
    ],
    permittedRu: [
      'Плавающая укладка ламината, виниловой плитки и паркетной доски',
      'Локальный ремонт поврежденных плашек паркета «венская елочка»',
      'Шлифовка, покрытие лаком и маслом с использованием HEPA-пылесосов',
      'Монтаж плинтусов и стыковочных порожков',
    ],
    partnerDe: [
      'Gussasphalt- und Estrichneukonstruktionen im Nassverfahren (Bodenlegermeister)',
      'Verlegung von Fußbodenheizungssystemen unter Estrich (Installateurmeister)',
    ],
    partnerEn: [
      'Wet-pour concrete screed and mastic asphalt subfloor restructuring (Master Floor Layer)',
      'Hydronic underfloor heating coil installations beneath screed (Master Heating Engineer)',
    ],
    partnerRu: [
      'Заливка мокрой стяжки и устройство литого асфальта (Мастер-стяжечник)',
      'Монтаж водяных теплых полов под стяжку (Мастер-сантехник)',
    ],
  },
  PAINTING: {
    gewoParagraph: 'GewO 1994 § 5 (Freies Gewerbe)',
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      'Vollflächiges Streichen von Wänden und Decken mit Dispersion- und Silikatfarben',
      'Spachteln von Rissen, Setzfugen und Dübellöchern bis Oberflächengüte Q3',
      'Abkleben von Fenstern, Türen und hochwertigen Böden mit Schutzvlies',
      'Lokale Schimmelbehandlung und vorbeugende Grundierung im Wohnbereich',
    ],
    permittedEn: [
      'Full surface wall and ceiling roller painting with premium breathable emulsion',
      'Crack filling, joint skimming, and drill hole patching up to Q3 level',
      'Professional masking of heritage windows, ornate doors, and hardwood floors',
      'Targeted mold spot disinfection and breathable antimicrobial priming',
    ],
    permittedRu: [
      'Покраска стен и потолков дышащими водоэмульсионными и силикатными красками',
      'Шпаклевка трещин, стыков и отверстий до категории качества Q3',
      'Укрытие окон, дверей и паркета защитной пленкой и флизелином',
      'Антисептическая обработка от плесени и укрепляющая грунтовка',
    ],
    partnerDe: [
      'Fassadenarbeiten im Außenbereich mit Gerüststellung (Malermeister)',
      'Denkmalgeschützte Stuckrestaurierung an historischen Decken (Stuckateurmeister)',
    ],
    partnerEn: [
      'Exterior building facade scaffolding and weatherproofing (Master Painter)',
      'Heritage-protected stucco and historic plaster relief restoration (Master Stuccoworker)',
    ],
    partnerRu: [
      'Фасадные высотные работы с установкой лесов (Мастер-маляр)',
      'Реставрация исторической гипсовой лепнины под охраной памятников (Мастер-лепщик)',
    ],
  },
  DRYWALL: {
    gewoParagraph: 'GewO 1994 § 5 (Freies Gewerbe)',
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      'Ständerwerk-Montage (CW/UW-Profile) für nichttragende Raumteiler',
      'Beplankung mit Standard-, Feuchtraum- (Grün) oder Schallschutzplatten',
      'Einbringen von Mineralwoll-Dämmstoffen zur thermischen und akustischen Isolation',
      'Verkleidung von Rohrleitungen und Spülkästen im Trockenbauverfahren',
    ],
    permittedEn: [
      'Metal stud framework assembly (CW/UW metal profiles) for interior room dividers',
      'Single and double-layer boarding with standard, moisture-resistant, or acoustic drywall',
      'Installation of mineral wool insulation batts for thermal and sound baffling',
      'Concealment boxing around plumbing risers and recessed cistern units',
    ],
    permittedRu: [
      'Монтаж металлического каркаса (профили CW/UW) для перегородок',
      'Обшивка влагостойким, звукоизоляционным и стандартным гипсокартоном',
      'Укладка минеральной ваты для тепло- и шумоизоляции',
      'Устройство коробов для стояков коммуникаций и инсталляций',
    ],
    partnerDe: [
      'Brandabschnittswände mit behördlichem Prüfzeugnis F90/EI90 (Trockenbaumeister)',
      'Statische Deckenertüchtigungen in Holzbalkendecken (Zimmermeister)',
    ],
    partnerEn: [
      'Fire-rated compartmentalization walls certified F90/EI90 (Master Drywall Contractor)',
      'Structural timber ceiling reinforcement and joist Sistering (Master Carpenter)',
    ],
    partnerRu: [
      'Монтаж сертифицированных противопожарных стен F90/EI90 (Мастер-строитель)',
      'Усиление несущих деревянных балок перекрытий (Мастер-плотник)',
    ],
  },
  PLUMBING_MINOR: {
    gewoParagraph: 'GewO 1994 § 94 (Reguliertes Gewerbe / Meisterpartner)',
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      'Austausch von Aufputz-Armaturen an bestehenden Eckventilen (ohne Leitungsumbau)',
      'Erneuerung elastischer Silikonfugen an Badewannen, Duschtassen und Waschbecken',
      'Reinigung und mechanischer Tausch von Standard-Geruchsverschlüssen (Siphons)',
      'Anschluss von Waschmaschinen und Geschirrspülern an vorbereitete Anschlüsse',
    ],
    permittedEn: [
      'Surface-mounted mixer tap replacement connecting to existing angle stop valves',
      'Re-caulking sanitary silicone joints around bathtubs, shower trays, and vanities',
      'Mechanical cleaning and replacement of standard P-traps / drain siphons',
      'Connecting washing machines and dishwashers to ready-made supply/drain valves',
    ],
    permittedRu: [
      'Замена накладных смесителей при наличии исправных угловых кранов',
      'Замена силиконового герметика вокруг ванн, душевых поддонов и умывальников',
      'Механическая прочистка и замена стандартных пластиковых сифонов',
      'Подключение стиральных и посудомоечных машин к готовым выводам',
    ],
    partnerDe: [
      'Verlegung von Trinkwasser- und Steigleitungen im Mauerwerk (Installateurmeister)',
      'Reparaturen und Wartungen an Gasthermen und Heizkesseln (Gas- und Sanitärtechnikmeister)',
      'Befundung von Abwasserkanälen mit Dichtheitsprüfung (Konzessionierter Betrieb)',
    ],
    partnerEn: [
      'Concealed in-wall potable water pipe rerouting and main riser work (Master Plumber)',
      'Gas boiler, combi-heater servicing, and gas pipe pressure testing (Licensed Gas Meister)',
      'Drainage pipe pressure testing and official municipal certifications (Certified Firm)',
    ],
    partnerRu: [
      'Скрытая разводка водопроводных труб и стояков в стенах (Мастер-сантехник)',
      'Обслуживание и ремонт газовых колонок и котлов (Сертифицированный мастер-газовщик)',
      'Официальная опрессовка и экспертиза канализационных систем',
    ],
  },
  BATHROOM_KITCHEN: {
    gewoParagraph: 'GewO 1994 § 94 (Reguliertes Gewerbe / Meisterpartner)',
    minBookingHours: 3,
    travelFeeInnerVienna: 25.0,
    travelFeeOuterVienna: 35.0,
    permittedDe: [
      'Zuschnitt und Montage von Küchenarbeitsplatten aus Holzwerkstoff (inkl. Beckenausschnitt)',
      'Verlegung von Wand- und Bodenfliesen im Dünnbettverfahren',
      'Montage von Badmöbeln, Spiegelschränken und Duschabtrennungen aus Glas',
      'Erneuerung von Verbundabdichtungen unter Fliesenbelägen',
    ],
    permittedEn: [
      'Precision kitchen worktop cutting and sink basin routering for laminate/timber',
      'Wall and floor ceramic tile installation with thin-bed waterproof adhesives',
      'Mounting of vanity units, illuminated mirror cabinets, and glass shower enclosures',
      'Application of liquid waterproof membranes under tiled surfaces',
    ],
    permittedRu: [
      'Распил и установка кухонных столешниц с вырезами под мойку и варочную панель',
      'Укладка настенной и напольной плитки на тонкослойный клей',
      'Монтаж мебели для ванных комнат, зеркальных шкафов и душевых перегородок',
      'Нанесение гидроизоляционной мастики под плитку',
    ],
    partnerDe: [
      'Elektrischer Starkstromanschluss für Induktions- und Elektroherde (Elektromeister)',
      'Gasleitungsanschluss für Kochfelder mit Abnahmeprotokoll (Installateurmeister)',
    ],
    partnerEn: [
      'High-voltage electrical circuit commissioning for induction cooktops (Master Electrician)',
      'Certified gas cooktop connection and official Austrian pressure report (Master Gas Fitter)',
    ],
    partnerRu: [
      'Подключение варочных панелей к трехфазной электросети (Мастер-электрик)',
      'Подключение газовых панелей с выдачей официального акта (Мастер-газовщик)',
    ],
  },
  DOORS_WINDOWS: {
    gewoParagraph: 'GewO 1994 § 5 (Freies Gewerbe)',
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      'Hobeln und Einstellen von schleifenden Türblättern und Kastenfensterflügeln',
      'Einfräsen oder Aufkleben von Silikon-Hohldichtungen zur thermischen Isolierung',
      'Tausch von Einsteckschlössern, Türdrückern und historischen Messingbeschlägen',
      'Montage von standardisierten Innentürzargen und Blendrahmen',
    ],
    permittedEn: [
      'Planing and rebating sticking timber doors and heritage box casement sashes',
      'Installation of silicone draft-excluder gaskets for enhanced thermal insulation',
      'Replacement of mortise locks, door handles, and authentic brass latch fittings',
      'Installation of standard interior door frame casing kits',
    ],
    permittedRu: [
      'Подстрожка и регулировка просевших деревянных дверей и створок окон',
      'Установка силиконовых уплотнителей для устранения продувания',
      'Замена врезных замков, дверных ручек и латунной фурнитуры',
      'Монтаж стандартных межкомнатных дверных коробок и наличников',
    ],
    partnerDe: [
      'Maßanfertigung kompletter Außentüren und Brandschutztüren (Tischlermeister)',
      'Austausch von Isolierglasscheiben in Großformaten (Glaser- und Fenstermeister)',
    ],
    partnerEn: [
      'Bespoke fabrication of certified external security and fire doors (Master Joiner)',
      'Large-format double-glazed thermal insulated pane glazing (Master Glazier)',
    ],
    partnerRu: [
      'Изготовление на заказ входных и противопожарных дверей (Мастер-столяр)',
      'Замена крупногабаритных стеклопакетов и фасадного остекления (Мастер-стекольщик)',
    ],
  },
  OUTDOOR: {
    gewoParagraph: 'GewO 1994 § 5 (Freies Gewerbe)',
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      'Kärcher-Hochdruckreinigung von Stein-, Waschbeton- und Holzböden',
      'Abschleifen und Einölen von WPC- und Hartholz-Terrassendielen',
      'Aufbau und Verankerung von Gartenhäusern, Geräteschuppen und Hochbeeten',
      'Montage von Sichtschutz- und Sonnensegelverankerungen',
    ],
    permittedEn: [
      'Pressure washing of patio stone tiles, exposed aggregate concrete, and wood decks',
      'Surface sanding and protective weather-oiling of composite and hardwood decking',
      'Assembly and anchoring of prefabricated garden sheds and raised planter beds',
      'Mounting privacy fabric screens and tensioned shade sail brackets',
    ],
    permittedRu: [
      'Мойка высокого давления для каменных и деревянных покрытий террас',
      'Шлифовка и нанесение защитного масла на террасную доску из ДПК и дерева',
      'Сборка и фиксация сборных садовых домиков, сараев и клумб',
      'Монтаж солнцезащитных парусов и ветрозащитных экранов',
    ],
    partnerDe: [
      'Fällung von Großbäumen mit Seilklettertechnik (Garten- und Landschaftsbaumeister)',
      'Errichtung tragender Stützmauern im Hangbereich (Baumeister)',
    ],
    partnerEn: [
      'Large tree felling with arboricultural climbing certification (Master Arborist)',
      'Structural retaining wall construction on inclined terrain (Master Mason)',
    ],
    partnerRu: [
      'Валка крупномерных деревьев методом промышленного альпинизма (Мастер-арборист)',
      'Возведение капитальных подпорных стен на склонах (Мастер-строитель)',
    ],
  },
  MOVING: {
    gewoParagraph: 'GewO 1994 § 5 (Freies Gewerbe)',
    minBookingHours: 2,
    travelFeeInnerVienna: 19.5,
    travelFeeOuterVienna: 29.5,
    permittedDe: [
      'Tragen von Mobiliar und Kartons über Treppenhäuser ohne Aufzug',
      'Einwickeln empfindlicher Möbelstücke mit Decken, Stretchfolie und Kantenschutz',
      'Demontage sperriger Betten und Tische vor dem Transport',
      'Beladen und Ladungssicherung im kundeneigenen oder angemieteten Transporter',
    ],
    permittedEn: [
      'Staircase porting of heavy furniture and boxes in walk-up Altbau buildings',
      'Protective wrapping with moving blankets, stretch film, and corner guards',
      'Disassembly of oversized bed frames, dining tables, and sectional sofas',
      'Vehicle loading and ratchet-strap cargo securing in client vans',
    ],
    permittedRu: [
      'Подъем и спуск мебели и коробок по лестницам в домах без лифта',
      'Упаковка мебели в защитные одеяла, стрейч-пленку и защитные уголки',
      'Разборка крупногабаритных кроватей и столов перед транспортировкой',
      'Погрузка и надежное крепление груза ремнями в транспорте',
    ],
    partnerDe: [
      'Gewerblicher Güterkraftverkehr über 3,5t Gesamtgewicht (Konzessionierter Frächter)',
      'Klavier- und Safe-Spezialtransporte mit Treppenraupe (Spezialtransporteur)',
    ],
    partnerEn: [
      'Commercial heavy transport exceeding 3.5 tons vehicle gross weight (Licensed Freight Carrier)',
      'Specialized grand piano and vault relocation utilizing motorized stair-climbers',
    ],
    partnerRu: [
      'Коммерческие грузоперевозки на транспорте свыше 3,5 тонн (Лицензированный перевозчик)',
      'Такелажная транспортировка роялей и сейфов с гусеничными подъемниками',
    ],
  },
  COMMERCIAL: {
    gewoParagraph: 'GewO 1994 § 94 (Koordiniertes Gewerbe)',
    minBookingHours: 3,
    travelFeeInnerVienna: 25.0,
    travelFeeOuterVienna: 35.0,
    permittedDe: [
      'Montage von Ladeneinrichtungen, Gondelregalen und Warenträgern',
      'Anbringung von Werbebannern, Acrylschildern und Beschilderungen',
      'Austausch von Leuchtmitteln und standardisierten LED-Panels',
      'Laufende Kleinreparaturen an Türen, Griffen und Personalräumen',
    ],
    permittedEn: [
      'Installation of retail fixtures, modular gondola shelving, and product displays',
      'Mounting acrylic corporate signage, window graphics, and directional boards',
      'Standard LED panel and ceiling spotlight bulb replacements',
      'Routine repair of staff locker room doors, latches, and office cabinetry',
    ],
    permittedRu: [
      'Монтаж торгового оборудования, модульных стеллажей и витрин',
      'Крепление рекламных вывесок, акриловых табличек и баннеров',
      'Замена ламп и стандартных светодиодных панелей',
      'Текущий ремонт офисной мебели, замков и фурнитуры',
    ],
    partnerDe: [
      'Prüfung elektrischer Betriebsmittel nach ÖVE/ÖNORM E 8701 (Elektromeister)',
      'Wartung von gewerblichen Dunstabzugsanlagen und Fettabscheidern (Lüftungsmeister)',
    ],
    partnerEn: [
      'Statutory electrical appliance safety audits conforming to ÖVE/ÖNORM E 8701',
      'Commercial kitchen extraction hood and grease separator certification',
    ],
    partnerRu: [
      'Официальная поверка электрооборудования по стандартам ÖVE/ÖNORM E 8701',
      'Обслуживание и чистка коммерческих вытяжек и жироуловителей ресторанов',
    ],
  },
};

/**
 * Fetch detailed trade category information, statutory trade compliance parameters,
 * and Vienna 23-district logistics data.
 */
export async function getServiceCategoryDetail(
  categoryKey?: string
): Promise<ServiceCategoryPageData> {
  return withResult(async () => {
    // 1. Resolve normalized category key if valid
    const validKey =
      categoryKey && Object.prototype.hasOwnProperty.call(CATEGORY_ACTIVITY_REGISTRY, categoryKey.toUpperCase())
        ? (categoryKey.toUpperCase() as ServiceCategoryKey)
        : null;

    // 2. Fetch specific category or fallback to first available
    let categoryRecord = validKey
      ? await prisma.serviceCategory.findFirst({
          where: { key: validKey },
        })
      : null;

    if (!categoryRecord) {
      categoryRecord = await prisma.serviceCategory.findFirst({
        orderBy: { displayOrder: 'asc' },
      });
    }

    if (!categoryRecord) {
      throw new Error('Service category not found');
    }

    const effectiveKey: ServiceCategoryKey = categoryRecord.key;

    const registrySpec =
      CATEGORY_ACTIVITY_REGISTRY[effectiveKey] || CATEGORY_ACTIVITY_REGISTRY.ASSEMBLY;

    const categoryDTO: ServiceCategoryDetailDTO = {
      id: categoryRecord.id, // data-from: ServiceCategory-id
      key: effectiveKey, // data-from: ServiceCategory-key
      titleDe: categoryRecord.titleDe, // data-from: ServiceCategory-titleDe
      titleEn: categoryRecord.titleEn, // data-from: ServiceCategory-titleEn
      titleRu: categoryRecord.titleRu, // data-from: ServiceCategory-titleRu
      baselineHourlyRate: categoryRecord.baselineHourlyRate.toNumber(), // data-from: ServiceCategory-baselineHourlyRate
      typicalRangeEur: categoryRecord.typicalRangeEur, // data-from: ServiceCategory-typicalRangeEur
      craftClassification: categoryRecord.craftClassification, // data-from: ServiceCategory-craftClassification
      leadArtisan: categoryRecord.leadArtisan, // data-from: ServiceCategory-leadArtisan
      isFeatured: categoryRecord.isFeatured, // data-from: ServiceCategory-isFeatured
      descriptionDe: categoryRecord.descriptionDe, // data-from: ServiceCategory-descriptionDe
      descriptionEn: categoryRecord.descriptionEn, // data-from: ServiceCategory-descriptionEn
      descriptionRu: categoryRecord.descriptionRu, // data-from: ServiceCategory-descriptionRu
      imageUrl: categoryRecord.imageUrl, // data-from: ServiceCategory-imageUrl data-role: image_url
      iconName: categoryRecord.iconName, // data-from: ServiceCategory-iconName
      displayOrder: categoryRecord.displayOrder, // data-from: ServiceCategory-displayOrder
      gewoParagraph: registrySpec.gewoParagraph,
      minBookingHours: registrySpec.minBookingHours,
      travelFeeInnerVienna: registrySpec.travelFeeInnerVienna,
      travelFeeOuterVienna: registrySpec.travelFeeOuterVienna,
      permittedActivitiesDe: registrySpec.permittedDe,
      permittedActivitiesEn: registrySpec.permittedEn,
      permittedActivitiesRu: registrySpec.permittedRu,
      licensedPartnerActivitiesDe: registrySpec.partnerDe,
      licensedPartnerActivitiesEn: registrySpec.partnerEn,
      licensedPartnerActivitiesRu: registrySpec.partnerRu,
    };

    // 3. Fetch all 23 Vienna Districts for logistics schedule
    const districtRecords = await prisma.viennaDistrict.findMany({
      orderBy: { districtNumber: 'asc' },
    });

    const districtsDTO: ViennaDistrictDTO[] = districtRecords.map((d) => {
      // Calculate realistic travel surcharge based on district zone
      let surcharge = 19.5;
      if (d.zone === 'OUTER_RING') surcharge = 24.5;
      if (d.zone === 'GREATER_SUBURB') surcharge = 29.5;

      return {
        id: d.id, // data-from: ViennaDistrict-id
        districtCode: d.districtCode, // data-from: ViennaDistrict-districtCode
        districtName: d.districtName, // data-from: ViennaDistrict-districtName
        districtNumber: d.districtNumber, // data-from: ViennaDistrict-districtNumber
        zone: d.zone, // data-from: ViennaDistrict-zone
        leadTimeHours: d.leadTimeHours, // data-from: ViennaDistrict-leadTimeHours
        travelSurchargeEur: surcharge,
      };
    });

    // 4. Fetch catalog of all available service categories for quick navigation
    const allCategories = await prisma.serviceCategory.findMany({
      select: {
        key: true,
        titleEn: true,
        titleDe: true,
        titleRu: true,
      },
      orderBy: { displayOrder: 'asc' },
    });

    return {
      category: categoryDTO,
      districts: districtsDTO,
      availableCategories: allCategories.map((c) => ({
        key: c.key, // data-from: ServiceCategory-key
        titleEn: c.titleEn, // data-from: ServiceCategory-titleEn
        titleDe: c.titleDe, // data-from: ServiceCategory-titleDe
        titleRu: c.titleRu, // data-from: ServiceCategory-titleRu
      })),
    };
  })();
}