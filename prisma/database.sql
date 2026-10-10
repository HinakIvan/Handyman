-- Database snapshot: PROJ_b23df7b6_snap_20261010_124454_705
-- Created at: 2026-10-10 13:06:51.372587
-- Include structure: True
-- Include data: True

SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for `_prisma_migrations`
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `_prisma_migrations`
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('64d48e1c-9e9a-4d95-bd0e-d8b22196e879', 'c2ab97393264ece228f136f8571ddd564408294a33ef2aa550ec0e3f84595792', '2026-10-10 12:45:07', '20261010124505_init', '', NULL, '2026-10-10 12:45:07', 0);

-- Table structure for `accountuser`
DROP TABLE IF EXISTS `accountuser`;
CREATE TABLE `accountuser` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('CUSTOMER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CUSTOMER',
  `fullName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AccountUser_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `accountuser`
INSERT INTO `accountuser` (`id`, `email`, `passwordHash`, `role`, `fullName`, `phone`, `createdAt`, `updatedAt`) VALUES
('b0895d6e-162c-41f8-a43d-8bf3aacf4e04', 'stefan.weber@gmail.com', '181ae828c2292b4c650b6263dd2fe0a975b433742de949e6550e04b1c3db1a68', 'CUSTOMER', 'Stefan Weber', '+43 664 123 4567', '2026-03-20 10:30:00', '2026-10-10 12:52:50'),
('fab78b1f-2b7f-426a-a033-423646db2cdd', 'admin@vienna-handyman.at', '6f96a3566ac09098a46c1dfa11426616ffd9f5905fede6c84713cb4db5080d08', 'ADMIN', 'Markus Gruber', '+43 1 512 8900', '2026-01-15 08:00:00', '2026-10-10 12:52:50');

-- Table structure for `faqitem`
DROP TABLE IF EXISTS `faqitem`;
CREATE TABLE `faqitem` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('PRICING','SCOPE','SCHEDULING','MATERIALS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `questionDe` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `questionEn` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `questionRu` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answerDe` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answerEn` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answerRu` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `displayOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `faqitem`
INSERT INTO `faqitem` (`id`, `category`, `questionDe`, `questionEn`, `questionRu`, `answerDe`, `answerEn`, `answerRu`, `displayOrder`, `createdAt`, `updatedAt`) VALUES
('0c820920-7960-4e2c-a940-f1125e0de5d4', 'PRICING', 'Wie setzt sich der Stundensatz von 15 € zusammen und gibt es versteckte Gebühren?', 'How is the €15/hour baseline calculated and are there any hidden fees?', 'Как формируется базовый тариф 15 €/час и есть ли скрытые комиссии?', 'Unser Basissatz von 15 €/Stunde gilt für standardmäßige handwerkliche Hilfstätigkeiten des freien Gewerbes. Es gibt keinerlei versteckte Pauschalen für Werkzeugnutzung, Schmiermittel oder Kleinteilezuschläge. Die Abrechnung erfolgt nach der Mindestdauer von 1,5 Stunden im fairen 15-Minuten-Takt.', 'Our €15/hour baseline applies to standard assembly and non-regulated artisan tasks. There are zero hidden surcharge lines for tool wear, consumables, or administrative fees. Following the initial 1.5-hour minimum window, time is billed transparently in exact 15-minute increments.', 'Базовая ставка 15 €/час распространяется на стандартные свободные монтажные и подготовительные работы. Мы не берем доплат за амортизацию инструмента, мелкие расходники или оформление. После минимального заказа 1.5 часа расчет ведется с точностью до 15 минут.', 1, '2026-10-01 08:00:00', '2026-10-10 12:52:50'),
('4600f819-257d-40b1-a994-77b69abace4b', 'MATERIALS', 'Muss ich Schrauben, Dübel und Materialien selbst besorgen?', 'Do I have to buy screws, dowels, and materials myself?', 'Нужно ли мне самому покупать дюбели, саморезы и материалы?', 'Sie haben die Wahl: Sie können eigene Materialien bereitstellen oder der Handwerker nutzt hochwertige Standarddübel (z.B. Fischer Altbaudübel) und Schrauben aus dem Servicefahrzeug. Spezielles Material kaufen wir gerne bei Hornbach oder Obi zum Original-Belegpreis für Sie ein.', 'You have full flexibility: you can provide your own materials, or our craftsmen can supply standard dowels (Fischer Altbau dowels), screws, and mounting brackets directly from the service vehicle. For specific paint, flooring, or boards, we can purchase them at Obi or Hornbach and invoice at exact receipt cost.', 'Вы можете предоставить всё сами, либо мастер привезёт стандартный крепёж (дюбели Fischer для старого фонда, саморезы). Необходимые стройматериалы мы можем закупить в Obi или Hornbach по магазинному чеку.', 4, '2026-10-01 08:45:00', '2026-10-10 12:52:50'),
('49b2eac9-8f12-4292-aa1c-fd177a7e7633', 'SCOPE', 'Wo liegt die genaue rechtliche Grenze zwischen freiem Handwerk und Meisterbetrieb?', 'Where is the exact statutory boundary between Freies Handwerk and Meisterbetrieb?', 'Где проходит точная юридическая граница между свободным ремеслом и Meisterbetrieb?', 'Nach GewO § 94 sind Eingriffe in stromführende Starkstromleitungen, Gasrohre, tragende Wände und Hauptwasserstränge konzessionierten Meisterbetrieben vorbehalten. Vienna Handwerk führt alle Möbelmontagen, Trockenbau, Malerarbeiten und Kleinreparaturen direkt aus; meisterpflichtige Tätigkeiten vergeben wir nahtlos an zertifizierte Wiener Partner-Meisterbetriebe.', 'Under Austrian GewO § 94, work involving electrical distribution boards, pressurized gas lines, structural masonry alterations, and main water risers requires master craftsman concession. Vienna Handwerk executes all assembly, finishing, and surface repairs in-house, routing regulated works exclusively through vetted Viennese partner Meisterbetriebe.', 'Согласно статье GewO § 94 работы с электрощитами, газовыми трубами, несущими конструкциями и главными стояками требуют лицензии мастера. Сборку, покраску и мелкий ремонт мы выполняем штатными мастерами, а лицензируемые задачи передаем сертифицированным мастерам-партнерам.', 3, '2026-10-01 08:30:00', '2026-10-10 12:52:50'),
('ab90aab5-47f9-4d15-aa8b-368e9011db6c', 'SCHEDULING', 'Wie kurzfristig kann ein Handwerkertermin in Wien vereinbart werden?', 'How quickly can a craftsman be scheduled for an appointment in Vienna?', 'Как быстро можно согласовать выезд мастера в Вене?', 'Standardtermine in den inneren Wiener Bezirken (1010–1090) können in der Regel innerhalb von 24 bis 48 Stunden vergeben werden. Bei dringenden Reparaturen bieten wir je nach Handwerker-Kapazität auch Termine am selben Tag an.', 'Standard appointments in inner Vienna districts (1010–1090) are typically dispatched within 24 to 48 hours. For urgent repair requests, same-day scheduling is available based on artisan capacity across central districts.', 'Стандартный выезд в центральные районы Вены (1010–1090) организуется в течение 24–48 часов. При срочных заявках возможен выезд в тот же день при наличии свободных мастеров.', 5, '2026-10-01 09:00:00', '2026-10-10 12:52:50'),
('f6abaf21-dc7c-460c-a0e0-1be9f389427c', 'PRICING', 'Wie erfolgt die Verrechnung der österreichischen Umsatzsteuer (20% USt.)?', 'How is Austrian Value Added Tax (20% VAT) invoiced?', 'Как оформляется австрийский налог на добавленную стоимость (20% USt.)?', 'Privatkunden erhalten transparente Rechnungen mit separat ausgewiesener 20% österreichischer Mehrwertsteuer. Gewerbliche B2B-Kunden in Österreich erhalten ordnungsgemäße Vorsteuer-abzugsfähige Rechnungen mit gültiger UID-Nummer.', 'Private residential clients receive full transparent invoices with statutory 20% Austrian VAT clearly broken down. Commercial B2B entities receive compliant tax invoices featuring our Austrian VAT identification number (UID: ATU79482103) for input tax deductions.', 'Физические лица получают официальный счет с выделенным налогом 20% USt. Корпоративные клиенты B2B получают налоговый счет с номером UID ATU79482103 для зачета входящего налога.', 2, '2026-10-01 08:15:00', '2026-10-10 12:52:50'),
('f8648d2c-281c-4b72-a5b0-63b836d28bc8', 'SCHEDULING', 'Welche Stornierungsbedingungen gelten bei kurzfristigen Terminänderungen?', 'What is your cancellation policy if my schedule changes?', 'Каковы условия отмены или переноса назначенного визита?', 'Termine können bis zu 24 Stunden vor dem vereinbarten Zeitfenster kostenfrei verschoben oder storniert werden. Bei Absagen unter 24 Stunden oder Nichterscheinen vor Ort berechnen wir eine Anfahrtspauschale in Höhe einer Arbeitsstunde.', 'Appointments can be rescheduled or cancelled free of charge up to 24 hours prior to the booked time slot. Cancellations under 24 hours or unannounced access failures incur a standard one-hour dispatch fee to cover artisan travel.', 'Перенос или отмена визита бесплатны при уведомлении не менее чем за 24 часа. При более поздней отмене или отсутствии доступа на объекте взимается компенсация выезда в размере одного часа работы.', 6, '2026-10-01 09:15:00', '2026-10-10 12:52:50');

-- Table structure for `quoterequest`
DROP TABLE IF EXISTS `quoterequest`;
CREATE TABLE `quoterequest` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trackingCode` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(72) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clientPhone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clientEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serviceCategoryId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `districtId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressSnippet` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taskTitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taskDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimatedHours` int NOT NULL,
  `estimatedBudgetEur` decimal(10,2) NOT NULL,
  `preferredDate` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preferredTimeSlot` enum('MORNING','AFTERNOON','FLEXIBLE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FLEXIBLE',
  `hasMaterials` tinyint(1) NOT NULL DEFAULT '0',
  `agreedToTerms` tinyint(1) NOT NULL DEFAULT '0',
  `submissionLang` enum('DE','EN','RU') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DE',
  `isUrgent` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('NEW','CONTACTED','ESTIMATE_SENT','QUOTED','SCHEDULED','COMPLETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NEW',
  `createdAtFormatted` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopeNotes` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `QuoteRequest_trackingCode_key` (`trackingCode`),
  KEY `QuoteRequest_customerId_idx` (`customerId`),
  KEY `QuoteRequest_serviceCategoryId_idx` (`serviceCategoryId`),
  KEY `QuoteRequest_districtId_idx` (`districtId`),
  KEY `QuoteRequest_status_idx` (`status`),
  CONSTRAINT `QuoteRequest_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `accountuser` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `QuoteRequest_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `viennadistrict` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `QuoteRequest_serviceCategoryId_fkey` FOREIGN KEY (`serviceCategoryId`) REFERENCES `servicecategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `quoterequest`
INSERT INTO `quoterequest` (`id`, `trackingCode`, `customerId`, `clientName`, `clientPhone`, `clientEmail`, `serviceCategoryId`, `districtId`, `addressSnippet`, `taskTitle`, `taskDescription`, `estimatedHours`, `estimatedBudgetEur`, `preferredDate`, `preferredTimeSlot`, `hasMaterials`, `agreedToTerms`, `submissionLang`, `isUrgent`, `status`, `createdAtFormatted`, `scopeNotes`, `createdAt`, `updatedAt`) VALUES
('1482d3de-252f-4e75-a22b-8abc67ce66d1', 'VIE-2026-0836', NULL, 'Alexander Lindner', '+43 650 334 9122', 'a.lindner@meduniwien.ac.at', '1ff9b495-60d2-4928-ac7d-63fc76b45919', '2120f5b6-ea7f-4f6d-a7b7-969ebdce346c', 'Währinger Straße 48/10, 1090 Wien', 'Waschtisch-Armaturentausch & Silikonfugensanierung im Altbaubad', 'Austausch zweier Unterputz-Mischbatterien durch Grohe Einhebelmischer, Neuziehen sämtlicher Silikonfugen rund um Badewanne und Duschtasse mit schimmelresistentem Sanitärsilikon.', 5, '175.00', '2026-10-12', 'AFTERNOON', 1, 1, 'DE', 1, 'COMPLETED', '02 Oct 2026, 09:30 CEST', 'Hauptabsperrhahn im Badezimmer bereits vorab geprüft und gangbar gemacht.', '2026-10-02 07:30:00', '2026-10-10 12:52:50'),
('6a619fa9-2f62-4080-a498-7b89ecc92ac1', 'VIE-2026-0837', NULL, 'Mikhail Voronin', '+43 660 741 2980', 'mikhail.voronin@vienna-tech.io', '8672a79c-90ef-41bd-a200-ca725c5ced0d', '97bd5e60-e898-450b-a9ec-32396140ad2a', 'Favoritenstraße 89/14, 1100 Wien', 'Wohnungsentkernung: Fliesenabschlagen & Linoleumentfernung', 'Rückbau von 22 m² Wandfliesen in Küche und WC sowie Entfernen alter geklebter Linoleumbeläge im Vorzimmer inklusive verpackter Schuttbereitstellung.', 15, '390.00', '2026-10-28', 'FLEXIBLE', 0, 1, 'EN', 0, 'NEW', '10 Oct 2026, 11:50 CEST', 'Bauschutt wird in reißfeste Gewebesäcke à 25 kg abgefüllt für MA48 Abtransport.', '2026-10-10 09:50:00', '2026-10-10 12:52:50'),
('8b3d29bd-08b2-49df-a552-7ec7eb7f1ad5', 'VIE-2026-0838', 'b0895d6e-162c-41f8-a43d-8bf3aacf4e04', 'Stefan Weber', '+43 664 123 4567', 'stefan.weber@gmail.com', '87b03541-ce50-42ee-ab2c-193c648d64d3', 'e0adb16f-39fc-4b73-aaa1-e497ea24ab86', 'Neubaugasse 31/15, 1070 Wien', 'Trockenbau-Akustikwand & Vorsatzschale im Homeoffice', 'Errichtung einer freistehenden Knauf Silentboard Akustik-Trennwand zur Schalldämmung gegen Nachbarwohnung im Altbau, inklusive Q3-Oberflächenfinish.', 12, '380.00', '2026-10-24', 'MORNING', 0, 1, 'DE', 0, 'QUOTED', '06 Oct 2026, 14:20 CEST', 'Rigips CW-Profile entkoppelt mit Akustik-Dichtband an Boden und Decke.', '2026-10-06 12:20:00', '2026-10-10 12:52:50'),
('b16e5b50-b1b2-46b4-ad51-6e82086b8fe2', 'VIE-2026-0841', 'b0895d6e-162c-41f8-a43d-8bf3aacf4e04', 'Stefan Weber', '+43 664 123 4567', 'stefan.weber@gmail.com', '5c1c7f62-8b31-45f9-aed1-0cc8b56b88d5', 'e0adb16f-39fc-4b73-aaa1-e497ea24ab86', 'Kirchengasse 24/8, 1070 Wien', 'Altbau Fischgrätparkett Abschleifen & Sockelleisten Neumontage', 'Klassischer Wiener Altbau, 42 m² Eichenparkett, Dreifachversiegelung mit Mattlack, Kantenbearbeitung an historischen Sockeln.', 14, '420.00', '2026-10-16', 'MORNING', 0, 1, 'DE', 1, 'NEW', '10 Oct 2026, 08:42 CEST', 'Parkettabschliff inkl. Randfräsung und MA48-gerechter Staubabsaugung im 3. Stock ohne Lift.', '2026-10-10 06:42:00', '2026-10-10 12:52:50'),
('dc305ad9-52a3-4ebb-ad44-831419dbbd37', 'VIE-2026-0839', NULL, 'David Sterling', '+43 699 173 5501', 'd.sterling@unodc-vienna.org', '8bc64fe6-f5bb-4715-a9bb-ec882340a1ba', '9ba423c9-059f-474d-ab1e-d7fad74a6690', 'Taborstraße 55/12, 1020 Wien', '3-Zimmer-Wohnung Weißanstrich vor Wohnungsübergabe inkl. Spachteln', 'Komplettrenovierung nach Mietende, 75 m² Wandfläche, Dispersionsfarbe Deckkraftklasse 1, Ausbessern von Rissen und Dübellöchern.', 18, '490.00', '2026-10-22', 'FLEXIBLE', 0, 1, 'EN', 0, 'ESTIMATE_SENT', '08 Oct 2026, 16:30 CEST', 'Abklebearbeiten an Stuckkanten und historischen Doppelkastenfenstern.', '2026-10-08 14:30:00', '2026-10-10 12:52:50'),
('e7644aba-ed7b-44ee-a4aa-1df28a5d0365', 'VIE-2026-0840', NULL, 'Elena V. Rostova', '+43 660 812 9043', 'elena.rostova@vienna-expats.org', '73d2bb1d-73c3-4d76-a3a4-f3c517d9246a', '39ae5d04-e929-4744-a2bd-b9040b9977cb', 'Herrengasse 14/3, 1010 Wien', 'Pax-Schrankwand 3m Montage inkl. Eckelemente & LED-Beleuchtung', 'Montage 3 Meter Kleiderschranksystem, Wandaussteifung und integrierte LED-Sensorleisten in Altbau-Wohnung mit 3,6 m Raumhöhe.', 7, '195.00', '2026-10-18', 'AFTERNOON', 1, 1, 'RU', 0, 'CONTACTED', '09 Oct 2026, 11:15 CEST', 'Dübelverankerung in historischem Ziegelmauerwerk mit Fischer DuoPower erforderlich.', '2026-10-09 09:15:00', '2026-10-10 12:52:50'),
('fba4bc12-733d-4e9d-a8ec-95905f70cea9', 'VIE-2026-0835', NULL, 'Sophie von Schöneck', '+43 676 555 7821', 'sophie.schoeneck@wien-kultur.at', 'c8d8b65a-4563-46fd-a96f-c2faeb5cb45a', 'c76b00d7-bbc8-4b24-a450-14ac676ee9f2', 'Reisnerstraße 18/6, 1030 Wien', 'Historische Kastenfenster Justierung & Dichtungstausch', 'Überholung von 6 zweiflügeligen Altbau-Kastenfenstern: Gängigmachen verzogener Holzrahmen, Einfräsen von Silikon-Hohldichtungen gegen Zugluft, Politur der Messingbeschläge.', 10, '310.00', '2026-10-25', 'MORNING', 1, 1, 'DE', 0, 'SCHEDULED', '05 Oct 2026, 10:05 CEST', 'Denkmalschutzauflagen im Botschaftsviertel; Original-Messingoliven müssen erhalten bleiben.', '2026-10-05 08:05:00', '2026-10-10 12:52:50');

-- Table structure for `servicecategory`
DROP TABLE IF EXISTS `servicecategory`;
CREATE TABLE `servicecategory` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` enum('ASSEMBLY','DEMOLITION','FLOORING','PAINTING','DRYWALL','PLUMBING_MINOR','BATHROOM_KITCHEN','DOORS_WINDOWS','OUTDOOR','MOVING','COMMERCIAL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `titleDe` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titleEn` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titleRu` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `baselineHourlyRate` decimal(10,2) NOT NULL,
  `typicalRangeEur` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `craftClassification` enum('FREIES_HANDWERK','MEISTER_KOOPERATION') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FREIES_HANDWERK',
  `leadArtisan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `descriptionDe` text COLLATE utf8mb4_unicode_ci,
  `descriptionEn` text COLLATE utf8mb4_unicode_ci,
  `descriptionRu` text COLLATE utf8mb4_unicode_ci,
  `imageUrl` varchar(700) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iconName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `displayOrder` int DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ServiceCategory_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `servicecategory`
INSERT INTO `servicecategory` (`id`, `key`, `titleDe`, `titleEn`, `titleRu`, `baselineHourlyRate`, `typicalRangeEur`, `craftClassification`, `leadArtisan`, `isFeatured`, `descriptionDe`, `descriptionEn`, `descriptionRu`, `imageUrl`, `iconName`, `displayOrder`, `createdAt`, `updatedAt`) VALUES
('1ff9b495-60d2-4928-ac7d-63fc76b45919', 'PLUMBING_MINOR', 'Sanitär-Kleinreparaturen & Armaturentausch', 'Minor Plumbing Repairs & Tap Replacement', 'Мелкий сантехнический ремонт и замена смесителей', '24.00', '€24 – €40/h', 'MEISTER_KOOPERATION', 'Meisterverbund Sanitär & Heizung Wien (1050 Wien)', 1, 'Austausch von Waschtisch-Armaturen, Siphon-Reinigung, Silikonfugenerneuerung in Duschen und Beseitigung kleinerer Abflussverstopfungen nach GewO-Richtlinien.', 'Replacement of sink faucets, siphon clearing, shower silicone joint renewal, and minor drain blockage resolution under Austrian trade regulations.', 'Замена смесителей на раковинах, прочистка сифонов, замена силиконовых швов в душевых и устранение мелких засоров в соответствии с нормами GewO.', 'https://www.autocoder.cc/background/zaki_prod/generated/68e79898673b4483a20c7689cb0f243f.png', 'Wrench', 5, '2026-01-10 09:00:00', '2026-10-10 12:52:50'),
('5c1c7f62-8b31-45f9-aed1-0cc8b56b88d5', 'FLOORING', 'Bodenverlegung & Parkettaufbereitung', 'Flooring Installation & Parquet Restoration', 'Укладка полов и реставрация паркета', '22.00', '€22 – €38/h', 'FREIES_HANDWERK', 'Johannes Leitner Holzmanufaktur (1060 Wien)', 1, 'Fachgerechte Verlegung von Klick-Laminat, Vinyl, Fertigparkett sowie Reparatur von historischem Wiener Fischgrätparkett inklusive staubarmer Schleiftechnik.', 'Precision installation of click-laminate, luxury vinyl tile (LVT), engineered hardwood, and traditional Viennese herringbone parquet restoration with dust-reduced sanding.', 'Укладка ламината, виниловых полов, паркетной доски и бережная реставрация классического венского паркета «елочка» с беспылевой шлифовкой.', 'https://www.autocoder.cc/background/zaki_prod/generated/5a5fe8f7055f427481d1d4398b1f6a55.png', 'Layers', 2, '2026-01-10 08:15:00', '2026-10-10 12:52:50'),
('73d2bb1d-73c3-4d76-a3a4-f3c517d9246a', 'ASSEMBLY', 'Möbelmontage & Einbauten', 'Furniture Assembly & Custom Mounting', 'Сборка мебели и монтаж конструкций', '18.00', '€18 – €32/h', 'FREIES_HANDWERK', 'Stefan Gruber & Montage-Team (1070 Wien)', 1, 'Fachgerechter Zusammenbau von IKEA-, PAX- und Designermöbeln, TV-Wandhalterungen, Vorhangschienen und Altbau-Wandverankerungen nach Wiener Handwerksstandard.', 'Precision flat-pack assembly for IKEA PAX wardrobes, custom shelving, heavy TV wall-mounting, and specialized Altbau wall anchoring with full liability coverage.', 'Профессиональная сборка мебели IKEA, шкафов PAX, монтаж настенных полок, ТВ-кронштейнов и анкеровка в кирпичные стены старых венских домов (Altbau).', 'https://www.autocoder.cc/background/zaki_prod/generated/33a817e42dda4cbca4daa47e4e0b452f.png', 'Hammer', 1, '2026-01-10 08:00:00', '2026-10-10 12:52:50'),
('8672a79c-90ef-41bd-a200-ca725c5ced0d', 'DEMOLITION', 'Entkernung & Demontage', 'Demolition & Interior Stripping', 'Демонтаж и подготовка помещений', '18.00', '€18 – €28/h', 'FREIES_HANDWERK', 'Markus Bauer Abbruchteam (1100 Wien)', 0, 'Schonende Entkernung von Altbau-Wohnungen, Entfernen alter Fliesen, Tapeten, Teppichböden und nichttragender Leichtbauwände mit fachgerechter Schuttentsorgung.', 'Non-structural interior stripping for Altbau apartments, tile removal, wallpaper peeling, carpet lifting, and authorized rubble disposal according to Vienna environmental codes.', 'Аккуратный демонтаж в квартирах Altbau: снятие старой плитки, обоев, напольных покрытий и разборка ненесущих перегородок с вывозом строительного мусора.', 'https://www.autocoder.cc/background/zaki_prod/generated/c3e97edf28dc42a9b1e0f2c0ea48fa9c.png', 'Trash2', 8, '2026-01-10 09:45:00', '2026-10-10 12:52:50'),
('87b03541-ce50-42ee-ab2c-193c648d64d3', 'DRYWALL', 'Trockenbau & Akustikdecken', 'Drywall Partitions & Acoustic Ceilings', 'Гипсокартон и подвесные потолки', '20.00', '€20 – €35/h', 'FREIES_HANDWERK', 'Trockenbau Wien Nord (1210 Wien)', 1, 'Errichtung von Trennwänden, Vorsatzschalen zur Schalldämmung, Verkleidung von Installationsschächten und Deckenabhängungen mit Knauf- und Rigips-Systemen.', 'Construction of non-bearing interior partitions, acoustic wall linings, utility shaft boxing, and suspended ceiling drops utilizing Knauf/Rigips systems.', 'Монтаж межкомнатных перегородок, звукоизоляционных панелей, коробов для труб и подвесных потолков из гипсокартона Knauf/Rigips.', 'https://www.autocoder.cc/background/zaki_prod/generated/003064e62fc34104b0257583364dbf7a.png', 'Maximize2', 4, '2026-01-10 08:45:00', '2026-10-10 12:52:50'),
('8bc64fe6-f5bb-4715-a9bb-ec882340a1ba', 'PAINTING', 'Maler- & Spachtelarbeiten', 'Painting, Plastering & Surface Finishing', 'Малярные и шпаклевочные работы', '19.00', '€19 – €30/h', 'FREIES_HANDWERK', 'David Novak Meister-Finish (1030 Wien)', 1, 'Weißeln und Streichen von Altbau-Wänden, Ausbessern von Rissen und Bohrlöchern, Spachtelarbeiten Q2/Q3 sowie Schimmelsanierung mit umweltfreundlichen Silikatfarben.', 'Wall and ceiling painting for historic Viennese Altbau, crack patching, Q2/Q3 finish skimming, and eco-friendly silicate anti-mold treatment.', 'Покраска стен и потолков в квартирах Altbau, заделка трещин и отверстий, шпаклевка Q2/Q3 и обработка от плесени силикатными красками.', 'https://www.autocoder.cc/background/zaki_prod/generated/b756cff9212d4bdd995ddd5482087c0f.png', 'Paintbrush', 3, '2026-01-10 08:30:00', '2026-10-10 12:52:50'),
('c8d8b65a-4563-46fd-a96f-c2faeb5cb45a', 'DOORS_WINDOWS', 'Türen, Fenster & Altbau-Beschläge', 'Doors, Windows & Altbau Fittings', 'Двери, окна и фурнитура Altbau', '21.00', '€21 – €36/h', 'FREIES_HANDWERK', 'Wiener Kastenfenster-Spezialisten (1080 Wien)', 0, 'Justierung von Wiener Kastenfenstern, Dichtungstausch zur Zugluftvermeidung, Einbau von Innentüren und Reparatur historischer Beschläge.', 'Adjustment of traditional Viennese box-casement windows (Kastenfenster), draft-proofing seal replacement, interior door hanging, and brass hardware servicing.', 'Регулировка традиционных венских окон Kastenfenster, замена уплотнителей от сквозняков, навеска межкомнатных дверей и ремонт старинной фурнитуры.', 'https://www.autocoder.cc/background/zaki_prod/generated/bdd2b3d868424225b86c2c7ddaccc553.png', 'DoorClosed', 7, '2026-01-10 09:30:00', '2026-10-10 12:52:50'),
('e6c467ff-4a2c-44f5-a6c9-5093c80741e2', 'BATHROOM_KITCHEN', 'Bad- & Küchenrenovierung', 'Bathroom & Kitchen Remodeling', 'Ремонт ванных комнат и кухонь', '26.00', '€26 – €45/h', 'MEISTER_KOOPERATION', 'Wien-Altbau Küchen- & Badverbund (1090 Wien)', 1, 'Ganzheitliche Renovierung von Nassräumen: Küchenarbeitsplatten-Zuschnitt, Spüleneinbau, Fliesenlegerarbeiten und koordinierte Meistermontagen.', 'Comprehensive wet-room renovation: kitchen worktop cutting, sink integration, wall tiling, and coordinated Austrian Meister trade execution.', 'Комплексный ремонт мокрых зон: распил столешниц, врезка моек, укладка плитки и координированные работы с сертифицированными мастерами.', 'https://www.autocoder.cc/background/zaki_prod/generated/837aa0ee04974951ac273e5801f3f76f.png', 'Home', 6, '2026-01-10 09:15:00', '2026-10-10 12:52:50');

-- Table structure for `setupchecklistitem`
DROP TABLE IF EXISTS `setupchecklistitem`;
CREATE TABLE `setupchecklistitem` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemKey` enum('VAT_UID','OFFICIAL_CONTACT','REGISTERED_ADDRESS','OPERATING_HOURS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','IN_REVIEW','COMPLETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `fieldValue` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `legalRef` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastUpdated` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SetupChecklistItem_itemKey_key` (`itemKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `setupchecklistitem`
INSERT INTO `setupchecklistitem` (`id`, `itemKey`, `title`, `subtitle`, `status`, `fieldValue`, `legalRef`, `lastUpdated`, `createdAt`, `updatedAt`) VALUES
('353374f1-c324-4be8-ae1e-cf0b9becac2e', 'OPERATING_HOURS', 'Standard Operating & Emergency Dispatch Hours', 'Published customer service availability and on-call emergency response scheduling regulations.', 'IN_REVIEW', 'Mon–Fri 07:00–19:00, Sat 08:00–14:00 (Emergency on-call 24/7)', 'Section 9 AZG & Opening Hours Act', '2026-09-01 08:00:00 CET', '2026-01-10 08:00:00', '2026-10-10 12:52:50'),
('4741b40a-9eae-4956-a64f-509aca7d47ba', 'OFFICIAL_CONTACT', 'Official Commercial Operations & Emergency Contact', '24/7 designated dispatch supervisor line and central regulatory compliance inquiry email address.', 'COMPLETED', '+43 1 512 3456 / dispo@wien-handwerk.at', 'Section 63 GewO 1994 & Section 5 ECG', '2026-06-20 14:12:00 CET', '2026-01-10 08:00:00', '2026-10-10 12:52:50'),
('52ff010d-a18e-4b09-a28d-aecc1fdcb5e1', 'REGISTERED_ADDRESS', 'Commercial Court Registered Seat & Workplace', 'Official physical workshop address registered at Handelsgericht Wien (Commercial Court Vienna).', 'COMPLETED', 'Kärntner Ring 12/Top 4, 1010 Wien, Austria (Commercial Court Vienna FN 543210x)', 'Section 63 GewO 1994 (Standortverlegung)', '2026-07-15 11:45:22 CET', '2026-01-10 08:00:00', '2026-10-10 12:52:50'),
('54608145-8811-4495-a9e5-3391cdababe4', 'VAT_UID', 'Austrian Value Added Tax Identification (UID)', 'Verification of valid Austrian Federal Ministry of Finance VAT number for trade operations and invoicing.', 'COMPLETED', 'ATU78923412', 'Section 27 UStG 1994', '2026-05-14 09:30:15 CET', '2026-01-10 08:00:00', '2026-10-10 12:52:50');

-- Table structure for `viennadistrict`
DROP TABLE IF EXISTS `viennadistrict`;
CREATE TABLE `viennadistrict` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `districtCode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `districtName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `districtNumber` int NOT NULL,
  `zone` enum('INNER_CITY','CENTRAL','OUTER_RING','GREATER_SUBURB') COLLATE utf8mb4_unicode_ci NOT NULL,
  `leadTimeHours` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ViennaDistrict_districtCode_key` (`districtCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `viennadistrict`
INSERT INTO `viennadistrict` (`id`, `districtCode`, `districtName`, `districtNumber`, `zone`, `leadTimeHours`, `createdAt`, `updatedAt`) VALUES
('1c90b91c-f3a9-4e6d-adc8-554f048502a1', '1050', 'Margareten', 5, 'CENTRAL', 3, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('2120f5b6-ea7f-4f6d-a7b7-969ebdce346c', '1090', 'Alsergrund', 9, 'CENTRAL', 3, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('242a4e41-3040-4984-ac6b-0599be1eb278', '1170', 'Hernals', 17, 'OUTER_RING', 4, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('243d66d6-56e0-4669-a311-67ad76064a1f', '1180', 'Währing', 18, 'OUTER_RING', 4, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('39ae5d04-e929-4744-a2bd-b9040b9977cb', '1010', 'Innere Stadt', 1, 'INNER_CITY', 2, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('3b7bc2ea-19f6-45ac-a4ac-27ddb400bb05', '1080', 'Josefstadt', 8, 'CENTRAL', 3, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('49c5dc53-de61-4d84-a1f2-38593e6e4f18', '1120', 'Meidling', 12, 'OUTER_RING', 4, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('4c9ffe74-dc48-4f4e-ac55-29ac445cdf63', '1140', 'Penzing', 14, 'GREATER_SUBURB', 5, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('4d589f7c-3ab9-4951-aee5-6ee17ff5c625', '1230', 'Liesing', 23, 'GREATER_SUBURB', 5, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('55813913-03e6-4bc1-afc3-6ad77ecdcbe6', '1210', 'Floridsdorf', 21, 'GREATER_SUBURB', 5, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('8d503d02-680c-4a24-a252-f7271b45e268', '1130', 'Hietzing', 13, 'GREATER_SUBURB', 5, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('97bd5e60-e898-450b-a9ec-32396140ad2a', '1100', 'Favoriten', 10, 'OUTER_RING', 4, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('9ba423c9-059f-474d-ab1e-d7fad74a6690', '1020', 'Leopoldstadt', 2, 'CENTRAL', 3, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('c583a4b5-75fc-4024-aaeb-1fd4d11985b5', '1160', 'Ottakring', 16, 'OUTER_RING', 4, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('c60df1be-dbb0-43a1-a52d-09303150ecc6', '1040', 'Wieden', 4, 'CENTRAL', 3, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('c76b00d7-bbc8-4b24-a450-14ac676ee9f2', '1030', 'Landstraße', 3, 'CENTRAL', 3, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('d0c226b9-189e-4d3a-a318-73e0ff323a52', '1200', 'Brigittenau', 20, 'OUTER_RING', 4, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('e0adb16f-39fc-4b73-aaa1-e497ea24ab86', '1070', 'Neubau', 7, 'CENTRAL', 3, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('e368f1d3-a551-4d15-abc4-1e059f9dd609', '1060', 'Mariahilf', 6, 'CENTRAL', 3, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('e94030d7-5aa6-4535-a3de-76149d10cc7d', '1190', 'Döbling', 19, 'GREATER_SUBURB', 5, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('fb764f0a-271f-4219-ad72-c3002dc8f778', '1150', 'Rudolfsheim-Fünfhaus', 15, 'OUTER_RING', 4, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('fd7754d9-efe5-4d3c-af0d-666e3de48a5d', '1110', 'Simmering', 11, 'OUTER_RING', 4, '2026-01-01 08:00:00', '2026-10-10 12:52:50'),
('fff5329c-dcae-4aa5-ac96-7c794d279bbe', '1220', 'Donaustadt', 22, 'GREATER_SUBURB', 5, '2026-01-01 08:00:00', '2026-10-10 12:52:50');

SET FOREIGN_KEY_CHECKS = 1;
