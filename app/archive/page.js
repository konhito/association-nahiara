"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Manrope, Prata } from "next/font/google";
import { useTranslation } from "../../lib/useTranslation";
import { Component as HorizonHero } from "@/components/ui/horizon-hero-section";

const displayFace = Prata({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const bodyFace = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const metaFace = Manrope({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const codeFace = metaFace;

const LAUNCH_COUNTRIES = [
  {
    slug: "spain",
    assetKey: "Espana",
    san: "SAN·00034",
    continent: "Europe",
    name: { es: "Espana", en: "Spain", de: "Spanien" },
    flower: { es: "Clavel", en: "Carnation", de: "Nelke" },
    scientific: "Dianthus caryophyllus",
    conservation: "good",
    tagline: {
      en: "The flower of Andalusian fiestas.",
      es: "La flor de las fiestas andaluzas.",
      de: "Die Blume der andalusischen Fiestas.",
    },
  },
  {
    slug: "germany",
    assetKey: "Alemania",
    san: "SAN·00049",
    continent: "Europe",
    name: { es: "Alemania", en: "Germany", de: "Deutschland" },
    flower: { es: "Aciano", en: "Cornflower", de: "Kornblume" },
    scientific: "Centaurea cyanus",
    conservation: "good",
    tagline: {
      en: "Symbol of the Prussian crown.",
      es: "Simbolo de la corona prusiana.",
      de: "Symbol der preussischen Krone.",
    },
  },
  {
    slug: "peru",
    assetKey: "Peru",
    san: "SAN·00051",
    continent: "South America",
    name: { es: "Peru", en: "Peru", de: "Peru" },
    flower: { es: "Cantuta", en: "Cantuta", de: "Kantuta" },
    scientific: "Cantua buxifolia",
    conservation: "vulnerable",
    tagline: {
      en: "Sacred flower of the Incas.",
      es: "Flor sagrada de los Incas.",
      de: "Heilige Blume der Inkas.",
    },
  },
  {
    slug: "scotland",
    assetKey: "Escocia",
    san: "SAN·00826",
    continent: "Europe",
    name: { es: "Escocia", en: "Scotland", de: "Schottland" },
    flower: { es: "Cardo", en: "Thistle", de: "Distel" },
    scientific: "Onopordum acanthium",
    conservation: "good",
    tagline: {
      en: "Guardian of the Highland night.",
      es: "Guardian de la noche escocesa.",
      de: "Waechter der schottischen Nacht.",
    },
  },
  {
    slug: "pakistan",
    assetKey: "Pakistan",
    san: "SAN·00586",
    continent: "Asia",
    name: { es: "Pakistan", en: "Pakistan", de: "Pakistan" },
    flower: { es: "Jazmin", en: "Jasmine", de: "Jasmin" },
    scientific: "Jasminum officinale",
    conservation: "good",
    tagline: {
      en: "Three thousand years of fragrance.",
      es: "Tres mil anos de fragancia.",
      de: "Dreitausend Jahre Duft.",
    },
  },
  {
    slug: "jamaica",
    assetKey: "Jamaica",
    san: "SAN·00388",
    continent: "Caribbean",
    name: { es: "Jamaica", en: "Jamaica", de: "Jamaika" },
    flower: { es: "Palo Santo", en: "Lignum Vitae", de: "Guajakholz" },
    scientific: "Guaiacum officinale",
    conservation: "endangered",
    tagline: {
      en: "The wood of life, now endangered.",
      es: "El arbol de la vida, ahora amenazado.",
      de: "Das Holz des Lebens, heute bedroht.",
    },
  },
  {
    slug: "tanzania",
    assetKey: "Tanzania",
    san: "SAN·00834",
    continent: "Africa",
    name: { es: "Tanzania", en: "Tanzania", de: "Tansania" },
    flower: {
      es: "Gloriosa Superba",
      en: "Gloriosa Superba",
      de: "Gloriosa",
    },
    scientific: "Gloriosa superba",
    conservation: "vulnerable",
    tagline: {
      en: "Flames born from the forest floor.",
      es: "Llamas nacidas del suelo del bosque.",
      de: "Flammen aus dem Waldboden.",
    },
  },
  {
    slug: "nicaragua",
    assetKey: "Nicaragua",
    san: "SAN·00558",
    continent: "Central America",
    name: { es: "Nicaragua", en: "Nicaragua", de: "Nicaragua" },
    flower: { es: "Sacuanjoche", en: "Sacuanjoche", de: "Sacuanjoche" },
    scientific: "Plumeria rubra",
    conservation: "good",
    tagline: {
      en: "The Nahuatl word for yellow flower.",
      es: "La palabra nahuatl para flor amarilla.",
      de: "Das Nahuatl-Wort fuer gelbe Blume.",
    },
  },
];

const PENDING_NAMES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const TARGET_COUNTRY_COUNT = 195;

const ALL_INDEX = [
  ...LAUNCH_COUNTRIES.map((country) => ({ ...country, complete: true })),
  ...PENDING_NAMES.slice(0, TARGET_COUNTRY_COUNT - LAUNCH_COUNTRIES.length).map(
    (name) => ({
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, ""),
      name: { en: name, es: name, de: name },
      flower: { en: "-", es: "-", de: "-" },
      scientific: null,
      conservation: null,
      complete: false,
      continent: null,
    }),
  ),
].sort((a, b) => (a.name.en > b.name.en ? 1 : -1));

const SERIES_BLOCKS = [
  {
    id: "I",
    esTitle: "El origen simbolico",
    enTitle: "The symbolic origin",
    esSummary:
      "Las flores representaban naciones mucho antes de los estados modernos.",
    enSummary:
      "Flowers represented nations long before modern states were formed.",
  },
  {
    id: "II",
    esTitle: "El silencio tambien habla",
    enTitle: "The silence also speaks",
    esSummary:
      "Los paises sin flor oficial revelan fracturas historicas y politicas.",
    enSummary:
      "Countries without an official flower reveal historical and political fractures.",
  },
  {
    id: "III",
    esTitle: "El archivo de papel",
    enTitle: "The paper archive",
    esSummary:
      "La filatelia construyo el archivo visual mas amplio de identidad floral.",
    enSummary:
      "Philately built the broadest visual archive of floral identity.",
  },
  {
    id: "IV",
    esTitle: "Cuando el simbolo se enfrenta a la extincion",
    enTitle: "When the symbol faces extinction",
    esSummary:
      "La crisis de biodiversidad amenaza flores nacionales y polinizadores.",
    enSummary:
      "The biodiversity crisis threatens national flowers and pollinators.",
  },
  {
    id: "V",
    esTitle: "El jardin que aun podemos salvar",
    enTitle: "The garden we can still save",
    esSummary:
      "Gobiernos, ciencia y ciudadania definen el futuro vivo de este simbolo.",
    enSummary:
      "Governments, science, and citizens define the living future of this symbol.",
  },
];

const CONSERVATION_ORDER = ["all", "good", "vulnerable", "endangered"];

function ArchiveContent() {
  const { t, locale } = useTranslation();

  const lang = ["en", "es", "de"].includes(locale) ? locale : "en";
  const tr = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };
  const [query, setQuery] = useState("");
  const [continentFilter, setContinentFilter] = useState("Europe");
  const [conservationFilter, setConservationFilter] = useState("all");

  const publishedCount = LAUNCH_COUNTRIES.length;
  const totalCount = ALL_INDEX.length;
  const pendingCount = totalCount - publishedCount;
  const completionRate = Math.round((publishedCount / totalCount) * 100);
  const launchByContinent = useMemo(() => {
    const map = new Map();
    LAUNCH_COUNTRIES.forEach((country) => {
      const key = country.continent || "Global";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return [...map.entries()]
      .map(([continent, count]) => ({ continent, count }))
      .sort(
        (a, b) => b.count - a.count || a.continent.localeCompare(b.continent),
      );
  }, []);
  const alphabetBands = useMemo(() => {
    const bands = [
      { id: "a-e", label: "A-E", from: "A", to: "E" },
      { id: "f-j", label: "F-J", from: "F", to: "J" },
      { id: "k-o", label: "K-O", from: "K", to: "O" },
      { id: "p-t", label: "P-T", from: "P", to: "T" },
      { id: "u-z", label: "U-Z", from: "U", to: "Z" },
    ];
    return bands.map((band) => {
      const entries = ALL_INDEX.filter((country) => {
        const firstLetter = (country.name.en || "")
          .trim()
          .charAt(0)
          .toUpperCase();
        return firstLetter >= band.from && firstLetter <= band.to;
      });
      const published = entries.filter((country) => country.complete).length;
      const pending = entries.length - published;
      return {
        ...band,
        total: entries.length,
        published,
        pending,
        preview: entries.slice(0, 6),
      };
    });
  }, []);
  const pendingPreview = ALL_INDEX.filter((country) => !country.complete).slice(
    0,
    12,
  );
  const seriesBlocks = SERIES_BLOCKS.map((block) => ({
    ...block,
    title: tr(`archivePage.series.blocks.${block.id}.title`, block.enTitle),
    altTitle: tr(
      `archivePage.series.blocks.${block.id}.altTitle`,
      block.esTitle,
    ),
    summary: tr(
      `archivePage.series.blocks.${block.id}.summary`,
      block.enSummary,
    ),
  }));
  const continentOptions = useMemo(() => {
    return [
      "all",
      ...new Set(LAUNCH_COUNTRIES.map((country) => country.continent)),
    ];
  }, []);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCountries = useMemo(() => {
    return LAUNCH_COUNTRIES.filter((country) => {
      if (continentFilter !== "all" && country.continent !== continentFilter) {
        return false;
      }
      if (
        conservationFilter !== "all" &&
        country.conservation !== conservationFilter
      ) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const searchable = [
        country.name.en,
        country.name.es,
        country.name.de,
        country.flower.en,
        country.flower.es,
        country.flower.de,
        country.scientific || "",
        country.san,
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(normalizedQuery);
    }).sort((a, b) =>
      (a.name[lang] || a.name.en).localeCompare(b.name[lang] || b.name.en),
    );
  }, [continentFilter, conservationFilter, lang, normalizedQuery]);

  return (
    <main className={`archive-root ${bodyFace.className}`}>
      <div className="atmosphere" aria-hidden />

      <HorizonHero
        institution="ASOCIACION INTERNACIONAL EN DEFENSA DE LAS FLORES"
        domain="www.asociacionnahiara.org"
        briefingLabel="Living Archive Charter"
        title="The Nahiara Flower Archive"
        versionLabel="Edition 1.1 | May 2026"
        summary="The Nahiara Flower Archive is the association's living register of national flowers, shaped as a long-horizon cultural and botanical record."
        narrative="Each country dossier links declaration history, plant identity, pollinator ecology, and present conservation condition. This launch opens with the 8 countries from Card Game Series 001 while the full 195-country ledger is already structured for weekly publication."
        pillars={[
          "One global ledger designed to index all 195 countries.",
          "Country dossiers presented as published profiles or in-preparation markers.",
          "Launch publication in Spanish, English, and German.",
          "A progressive release model that expands with weekly dossiers.",
        ]}
        checkpoints={[
          "Integrated into the primary website navigation as an autonomous archive section.",
          "Editorial language aligned with the association's documentary mission.",
          "Search-ready structure for country, flower, and scientific taxonomy.",
          "Series 001 launch dossiers are complete and directly navigable.",
        ]}
        stats={[
          { label: "Countries mapped", value: String(totalCount) },
          { label: "Published at launch", value: String(publishedCount) },
          { label: "In preparation", value: String(pendingCount) },
          { label: "Launch completion", value: `${completionRate}%` },
        ]}
      />

      <section className="archive-overview" id="archive-overview">
        <div className="overview-main fade-1">
          <p className={`${codeFace.className} overview-kicker`}>
            {tr("archivePage.overview.kicker", "Archive Desk")}
          </p>
          <h2 className={`${displayFace.className}`}>
            {tr(
              "archivePage.overview.title",
              "A publication that tracks living floral heritage country by country.",
            )}
          </h2>
          <p>
            {tr(
              "archivePage.overview.description",
              "This archive is a working editorial desk. Dossiers are released only after botanical verification, source review, and rights clearance.",
            )}
          </p>
          <div className="overview-stats" aria-label="Archive pulse">
            <article>
              <span>
                {tr("archivePage.overview.stats.mapped", "Mapped ledger")}
              </span>
              <strong>{totalCount}</strong>
            </article>
            <article>
              <span>
                {tr(
                  "archivePage.overview.stats.published",
                  "Published dossiers",
                )}
              </span>
              <strong>{publishedCount}</strong>
            </article>
            <article>
              <span>
                {tr("archivePage.overview.stats.prep", "In preparation")}
              </span>
              <strong>{pendingCount}</strong>
            </article>
            <article>
              <span>
                {tr(
                  "archivePage.overview.stats.completion",
                  "Launch completion",
                )}
              </span>
              <strong>{completionRate}%</strong>
            </article>
          </div>
        </div>

        <aside className="overview-rail fade-2" aria-label="Series launch rail">
          <p className={`${codeFace.className} rail-kicker`}>
            {tr("archivePage.overview.rail.kicker", "Series 001")}
          </p>
          <h3>
            {tr(
              "archivePage.overview.rail.title",
              "Launch coverage by continent",
            )}
          </h3>
          <div className="rail-list">
            {launchByContinent.map((entry) => (
              <p key={entry.continent}>
                <span>{entry.continent}</span>
                <strong>{entry.count}</strong>
              </p>
            ))}
          </div>
          <Link href="#archive-index" className="rail-link">
            {tr("archivePage.overview.rail.link", "Open publication navigator")}
            <ArrowUpRight size={13} strokeWidth={2.2} />
          </Link>
        </aside>
      </section>

      <section className="series-shell" id="series-edition">
        <div className="series-head fade-1">
          <p className={`${codeFace.className} series-kicker`}>
            {tr("archivePage.series.kicker", "Complete documentary series")}
          </p>
          <h2 className={`${displayFace.className}`}>
            {tr("archivePage.series.title", "Flowers That Changed the World")}
          </h2>
          <p>
            {tr(
              "archivePage.series.description",
              "Blocks I to V present a verified bilingual documentary path from symbolic origins to current conservation urgency.",
            )}
          </p>
        </div>

        <div className="series-context fade-2">
          <p className={`${codeFace.className} context-line`}>
            {tr(
              "archivePage.series.contextLine",
              "Blocks I - V · Bilingual edition ES / EN",
            )}
          </p>
        </div>

        <div className="block-grid">
          {seriesBlocks.map((block, index) => (
            <article
              key={block.id}
              className={`block-card fade-${(index % 4) + 1}`}
            >
              <p className={`${codeFace.className} block-index`}>
                {tr("archivePage.series.blockLabel", "Block")} {block.id}
              </p>
              <h3>{block.title}</h3>
              <p className="block-alt-title">{block.altTitle}</p>
              <p className="block-summary">{block.summary}</p>
            </article>
          ))}
        </div>

        <div className="series-signoff fade-3">
          <p className={`${codeFace.className} signoff-org`}>
            ASOCIACION INTERNACIONAL EN DEFENSA DE LAS FLORES
          </p>
          <p className="signoff-domain">www.asociacionnahiara.org</p>
          <Link href="#archive-index" className="signoff-link">
            {tr(
              "archivePage.series.signoffLink",
              "Continue to country archive navigator",
            )}
            <ArrowUpRight size={13} strokeWidth={2.2} />
          </Link>
        </div>

        <p className="series-footnote fade-4">
          {tr(
            "archivePage.series.footnote",
            "Documentary research by the International Association in Defence of Flowers.",
          )}
        </p>
      </section>

      <section className="features-strip" id="archive-features">
        <article className="feature-tile fade-1">
          <p className={`${codeFace.className} feature-kicker`}>
            {tr("archivePage.features.one.kicker", "Search-ready index")}
          </p>
          <h3>
            {tr(
              "archivePage.features.one.title",
              "Find by country, flower, or SAN code",
            )}
          </h3>
          <p>
            {tr(
              "archivePage.features.one.description",
              "The launch explorer accepts historical names, scientific names, and coded identifiers from the same field.",
            )}
          </p>
        </article>
        <article className="feature-tile fade-2">
          <p className={`${codeFace.className} feature-kicker`}>
            {tr("archivePage.features.two.kicker", "Visual dossier cards")}
          </p>
          <h3>
            {tr(
              "archivePage.features.two.title",
              "Every launch country has a visual profile",
            )}
          </h3>
          <p>
            {tr(
              "archivePage.features.two.description",
              "The initial eight dossiers include flower imagery, conservation signal, and editorial metadata for direct review.",
            )}
          </p>
        </article>
        <article className="feature-tile fade-3">
          <p className={`${codeFace.className} feature-kicker`}>
            {tr(
              "archivePage.features.three.kicker",
              "Cross-archive continuity",
            )}
          </p>
          <h3>
            {tr(
              "archivePage.features.three.title",
              "Built to scale to all 195 countries",
            )}
          </h3>
          <p>
            {tr(
              "archivePage.features.three.description",
              "The same card system used for launch countries is aligned with the full publication queue and weekly release cycle.",
            )}
          </p>
        </article>
      </section>

      <section className="country-explorer" id="country-explorer">
        <div className="explorer-head fade-1">
          <p className={`${codeFace.className} explorer-kicker`}>
            {tr("archivePage.explorer.kicker", "Series 001 Explorer")}
          </p>
          <h2 className={`${displayFace.className}`}>
            {tr(
              "archivePage.explorer.title",
              "Launch countries with searchable floral dossiers",
            )}
          </h2>
          <p>
            {tr(
              "archivePage.explorer.description",
              "Browse the first eight countries through a cleaner mobile-first explorer with text search, continent filter, and conservation filter.",
            )}
          </p>
        </div>

        <div className="explorer-controls fade-2">
          <label className="control-block">
            <span>
              {tr(
                "archivePage.explorer.searchLabel",
                "Search country, flower, scientific name, or SAN",
              )}
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={tr(
                "archivePage.explorer.searchPlaceholder",
                "Try: Peru, Cantuta, Gloriosa, SAN-00834",
              )}
            />
          </label>
          <label className="control-block">
            <span>
              {tr("archivePage.explorer.continentLabel", "Continent")}
            </span>
            <select
              value={continentFilter}
              onChange={(event) => setContinentFilter(event.target.value)}
            >
              {continentOptions.map((continent) => (
                <option key={continent} value={continent}>
                  {continent === "all"
                    ? tr("archivePage.explorer.allContinents", "All continents")
                    : continent}
                </option>
              ))}
            </select>
          </label>
          <label className="control-block">
            <span>
              {tr("archivePage.explorer.conservationLabel", "Conservation")}
            </span>
            <select
              value={conservationFilter}
              onChange={(event) => setConservationFilter(event.target.value)}
            >
              {CONSERVATION_ORDER.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? tr("archivePage.explorer.allConservation", "All levels")
                    : tr(
                        `archivePage.explorer.status.${status}`,
                        status.charAt(0).toUpperCase() + status.slice(1),
                      )}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="explorer-count fade-3">
          {visibleCountries.length}{" "}
          {tr("archivePage.explorer.resultCount", "launch dossiers shown")}
        </p>

        <div className="country-grid">
          {visibleCountries.map((country, index) => (
            <article
              key={country.slug}
              className={`country-card fade-${(index % 4) + 1}`}
            >
              <Link
                href={`/archive/${country.slug}`}
                className="country-image-wrap"
              >
                <Image
                  src={`/complete-flowers/${country.assetKey}.png`}
                  alt={`${country.flower[lang] || country.flower.en} - ${country.name[lang] || country.name.en}`}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1140px) 50vw, 320px"
                  loading="lazy"
                />
              </Link>
              <div className="country-meta">
                <p className={`${codeFace.className} country-san`}>
                  {country.san}
                </p>
                <h3>{country.name[lang] || country.name.en}</h3>
                <p className="country-flower">
                  {country.flower[lang] || country.flower.en}
                  <span>{country.scientific}</span>
                </p>
                <p className="country-tagline">
                  {country.tagline[lang] || country.tagline.en}
                </p>
                <div className="country-footer">
                  <span
                    className={`conservation-pill conservation-${country.conservation}`}
                  >
                    {tr(
                      `archivePage.explorer.status.${country.conservation}`,
                      country.conservation,
                    )}
                  </span>
                  <Link
                    href={`/archive/${country.slug}`}
                    className="country-link"
                  >
                    {tr("archivePage.explorer.viewDossier", "View dossier")}
                    <ArrowUpRight size={13} strokeWidth={2.2} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="atlas-shell" id="archive-index">
        <div className="atlas-head fade-1">
          <p className={`${codeFace.className} atlas-kicker`}>
            {tr("archivePage.navigator.kicker", "Navigator")}
          </p>
          <h2 className={`${displayFace.className}`}>
            {tr(
              "archivePage.navigator.title",
              "195 countries, grouped for browsing",
            )}
          </h2>
          <p>
            {tr(
              "archivePage.navigator.description",
              "The full ledger is structured from day one. Published profiles are live links, while pending countries remain visible as part of the publication queue.",
            )}
          </p>
        </div>

        <div className="band-grid">
          {alphabetBands.map((band, index) => (
            <article
              key={band.id}
              className={`band-card fade-${(index % 4) + 1}`}
            >
              <div className="band-topline">
                <h3>{band.label}</h3>
                <p>{band.total} total</p>
              </div>
              <p className="band-status">
                {band.published} published, {band.pending} pending
              </p>
              <div className="band-tags">
                {band.preview.map((country) => {
                  const label = country.name[lang] || country.name.en;
                  if (country.complete) {
                    return (
                      <Link
                        key={country.slug}
                        href={`/archive/${country.slug}`}
                        className="band-tag band-tag-live"
                      >
                        {label}
                      </Link>
                    );
                  }
                  return (
                    <span key={country.slug} className="band-tag">
                      {label}
                    </span>
                  );
                })}
                {band.total > band.preview.length && (
                  <span className="band-tag band-tag-more">
                    +{band.total - band.preview.length} more
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="protocol-shell" id="protocol-cycle">
        <div className="protocol-head fade-1">
          <p className={`${codeFace.className} protocol-kicker`}>
            {tr("archivePage.protocol.kicker", "Publication Protocol")}
          </p>
          <h2 className={`${displayFace.className}`}>
            {tr("archivePage.protocol.title", "Verified release cycle")}
          </h2>
          <p>
            {tr(
              "archivePage.protocol.description",
              "Every dossier follows a fixed editorial sequence before publication. The queue below shows countries currently staged for upcoming cycles.",
            )}
          </p>
        </div>

        <div className="protocol-grid fade-2">
          <article>
            <span>1</span>
            <h3>
              {tr("archivePage.protocol.steps.one.title", "Source capture")}
            </h3>
            <p>
              {tr(
                "archivePage.protocol.steps.one.description",
                "National designation sources, stamp records, and botanical notes are gathered into one working sheet.",
              )}
            </p>
          </article>
          <article>
            <span>2</span>
            <h3>
              {tr("archivePage.protocol.steps.two.title", "Scientific review")}
            </h3>
            <p>
              {tr(
                "archivePage.protocol.steps.two.description",
                "Scientific naming and taxonomic consistency are verified before a profile can move to production.",
              )}
            </p>
          </article>
          <article>
            <span>3</span>
            <h3>
              {tr("archivePage.protocol.steps.three.title", "Rights check")}
            </h3>
            <p>
              {tr(
                "archivePage.protocol.steps.three.description",
                "Image and stamp assets are released only when licensing and source rights are clear.",
              )}
            </p>
          </article>
          <article>
            <span>4</span>
            <h3>
              {tr("archivePage.protocol.steps.four.title", "Multilingual edit")}
            </h3>
            <p>
              {tr(
                "archivePage.protocol.steps.four.description",
                "ES, EN, and DE copy is edited and aligned so each dossier ships as one coherent publication.",
              )}
            </p>
          </article>
        </div>

        <div className="pending-shelf fade-3">
          <h3>
            {tr("archivePage.protocol.queueTitle", "Upcoming queue preview")}
          </h3>
          <div className="pending-tags">
            {pendingPreview.map((country) => (
              <span key={country.slug}>{country.name.en}</span>
            ))}
          </div>
        </div>
      </section>

      <footer className="archive-footer">
        <p>
          {tr(
            "archivePage.footerNote",
            "The Flower Archive is maintained as a long-horizon publication of the International Association for the Defense of Flowers.",
          )}
        </p>
      </footer>

      <style jsx>{`
        .archive-root {
          --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
          --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
          --paper: oklch(0.972 0.016 108);
          --paper-soft: oklch(0.989 0.007 110);
          --line: oklch(0.83 0.02 121 / 0.9);
          --ink: oklch(0.29 0.03 147);
          --ink-soft: oklch(0.45 0.02 140);
          --signal: oklch(0.43 0.11 149);
          min-height: 100dvh;
          background:
            radial-gradient(
              120% 70% at 16% -8%,
              oklch(0.92 0.05 130 / 0.42),
              transparent 54%
            ),
            radial-gradient(
              86% 56% at 88% 7%,
              oklch(0.95 0.03 96 / 0.32),
              transparent 56%
            ),
            var(--paper);
          color: var(--ink);
          padding-bottom: clamp(2.5rem, 6vw, 5rem);
        }

        .atmosphere {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(
              to bottom,
              transparent 0,
              transparent 48%,
              oklch(0.96 0.015 116 / 0.35) 100%
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0,
              transparent 15px,
              oklch(0.9 0.008 120 / 0.16) 15px,
              oklch(0.9 0.008 120 / 0.16) 16px
            );
          z-index: 0;
        }

        .archive-nav,
        .archive-overview,
        .series-shell,
        .features-strip,
        .country-explorer,
        .atlas-shell,
        .protocol-shell,
        .archive-footer {
          position: relative;
          z-index: 1;
          width: min(1140px, 94vw);
          margin-inline: auto;
        }

        .archive-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 0;
          border-bottom-color: oklch(0.84 0.015 120 / 0.85);
          border-bottom: 1px solid oklch(0.84 0.015 120 / 0.85);
        }

        .nav-primary {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .nav-brand {
          min-width: 0;
          display: grid;
          gap: 0.2rem;
        }

        .home-link {
          min-height: 2.1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.28rem;
          padding: 0 0.62rem;
          border-radius: 999px;
          color: oklch(0.34 0.05 148);
          border: 1px solid oklch(0.78 0.03 123 / 0.8);
          background: oklch(0.99 0.007 110 / 0.9);
          transition:
            transform 220ms var(--ease-out-quart),
            border-color 220ms var(--ease-out-quart);
        }

        .home-link:hover {
          transform: translateX(-2px);
          border-color: oklch(0.56 0.08 149 / 0.88);
        }

        .nav-title-simple {
          margin: 0;
          font-size: 0.82rem;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: oklch(0.37 0.04 148);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .archive-overview {
          margin-top: clamp(1.8rem, 4vw, 3.2rem);
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.9fr);
          gap: 1rem;
        }

        .overview-main,
        .overview-rail,
        .series-head,
        .feature-tile,
        .explorer-head,
        .explorer-controls,
        .country-card,
        .atlas-head,
        .band-card,
        .protocol-head,
        .protocol-grid article,
        .pending-shelf {
          border: 1px solid var(--line);
          border-radius: 1rem;
          background: var(--paper-soft);
        }

        .overview-main {
          padding: clamp(1rem, 2vw, 1.5rem);
          display: grid;
          gap: 0.85rem;
        }

        .overview-kicker,
        .rail-kicker,
        .series-kicker,
        .atlas-kicker,
        .protocol-kicker {
          margin: 0;
          font-size: 0.58rem;
          letter-spacing: 0.11em;
          font-weight: 700;
          text-transform: uppercase;
          color: oklch(0.37 0.09 149);
        }

        .overview-main h2,
        .series-head h2,
        .atlas-head h2,
        .protocol-head h2 {
          margin: 0;
          line-height: 1.08;
          font-size: clamp(1.7rem, 3.3vw, 2.7rem);
          color: oklch(0.27 0.03 147);
        }

        .overview-main p,
        .series-head p,
        .atlas-head p,
        .protocol-head p {
          margin: 0;
          max-width: 69ch;
          line-height: 1.68;
          color: var(--ink-soft);
          font-size: 0.96rem;
        }

        .overview-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.62rem;
        }

        .overview-stats article {
          border: 1px solid oklch(0.82 0.02 121 / 0.85);
          border-radius: 0.8rem;
          padding: 0.65rem;
          background: oklch(0.994 0.005 108 / 0.98);
          display: grid;
          gap: 0.26rem;
        }

        .overview-stats span {
          font-size: 0.66rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: oklch(0.49 0.02 139);
        }

        .overview-stats strong {
          font-size: 1.36rem;
          line-height: 1;
          color: oklch(0.31 0.05 148);
        }

        .overview-rail {
          padding: 1rem;
          display: grid;
          align-content: start;
          gap: 0.8rem;
        }

        .overview-rail h3,
        .pending-shelf h3,
        .protocol-grid h3,
        .band-topline h3 {
          margin: 0;
          color: oklch(0.28 0.03 146);
          font-weight: 600;
        }

        .overview-rail h3 {
          font-size: 1.1rem;
        }

        .rail-list {
          display: grid;
          gap: 0.44rem;
        }

        .rail-list p {
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-top: 1px dashed oklch(0.82 0.02 121 / 0.72);
          padding-top: 0.38rem;
          font-size: 0.86rem;
          color: var(--ink-soft);
        }

        .rail-list strong {
          color: var(--signal);
          font-size: 0.98rem;
        }

        .rail-link {
          margin-top: 0.15rem;
          display: inline-flex;
          align-items: center;
          gap: 0.38rem;
          text-decoration: none;
          color: oklch(0.33 0.08 149);
          font-size: 0.81rem;
          letter-spacing: 0.03em;
        }

        .series-shell,
        .features-strip,
        .country-explorer,
        .atlas-shell,
        .protocol-shell {
          margin-top: clamp(2rem, 4vw, 3.8rem);
          display: grid;
          gap: 1rem;
        }

        .series-head,
        .atlas-head,
        .protocol-head {
          padding: clamp(1rem, 2vw, 1.45rem);
        }

        .series-context {
          border: 1px solid var(--line);
          border-radius: 1rem;
          background:
            radial-gradient(
              140% 90% at 100% 0%,
              oklch(0.95 0.04 102 / 0.45),
              transparent 60%
            ),
            var(--paper-soft);
          padding: 0.9rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.7rem;
          flex-wrap: wrap;
        }

        .context-line,
        .context-line-secondary {
          margin: 0;
          font-size: 0.66rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: oklch(0.38 0.07 149);
        }

        .context-line-secondary {
          color: oklch(0.47 0.02 140);
        }

        .block-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.72rem;
        }

        .block-card {
          border: 1px solid var(--line);
          border-radius: 1rem;
          background: var(--paper-soft);
          padding: 0.9rem;
          display: grid;
          gap: 0.45rem;
          min-height: 13.8rem;
        }

        .block-index {
          margin: 0;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: oklch(0.36 0.08 149);
        }

        .block-card h3 {
          margin: 0;
          font-size: 1.26rem;
          line-height: 1.08;
          color: oklch(0.27 0.03 147);
        }

        .block-alt-title {
          margin: 0;
          font-size: 0.78rem;
          color: oklch(0.41 0.03 143);
          line-height: 1.4;
          padding-top: 0.15rem;
          border-top: 1px dashed oklch(0.82 0.02 121 / 0.74);
        }

        .block-summary {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.58;
          color: var(--ink-soft);
        }

        .series-signoff {
          border: 1px solid var(--line);
          border-radius: 1rem;
          background: var(--paper-soft);
          padding: 0.9rem 1rem;
          display: grid;
          gap: 0.35rem;
        }

        .signoff-org,
        .signoff-domain {
          margin: 0;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: oklch(0.36 0.07 149);
        }

        .signoff-domain {
          color: oklch(0.49 0.02 140);
        }

        .signoff-link {
          margin-top: 0.2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.38rem;
          width: fit-content;
          text-decoration: none;
          color: oklch(0.33 0.08 149);
          font-size: 0.79rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .series-footnote {
          margin: 0;
          border-top: 1px dashed oklch(0.81 0.02 120 / 0.86);
          padding-top: 0.75rem;
          font-size: 0.84rem;
          letter-spacing: 0.01em;
          color: oklch(0.44 0.02 140);
        }

        .features-strip {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.72rem;
        }

        .feature-tile {
          padding: 0.9rem;
          display: grid;
          gap: 0.5rem;
        }

        .feature-kicker {
          margin: 0;
          font-size: 0.6rem;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: oklch(0.36 0.08 149);
        }

        .feature-tile h3,
        .explorer-head h2 {
          margin: 0;
          color: oklch(0.27 0.03 147);
        }

        .feature-tile h3 {
          font-size: 1.1rem;
          line-height: 1.2;
        }

        .feature-tile p,
        .explorer-head p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.62;
          color: var(--ink-soft);
        }

        .country-explorer {
          gap: 0.72rem;
        }

        .explorer-head {
          padding: clamp(1rem, 2vw, 1.45rem);
          display: grid;
          gap: 0.72rem;
        }

        .explorer-kicker {
          margin: 0;
          font-size: 0.58rem;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: oklch(0.37 0.09 149);
        }

        .explorer-head h2 {
          line-height: 1.08;
          font-size: clamp(1.7rem, 3.3vw, 2.7rem);
          max-width: 21ch;
        }

        .explorer-controls {
          padding: 0.86rem;
          display: grid;
          grid-template-columns: 1.3fr repeat(2, minmax(150px, 1fr));
          gap: 0.62rem;
        }

        .control-block {
          display: grid;
          gap: 0.36rem;
        }

        .control-block span {
          font-size: 0.64rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: oklch(0.38 0.07 149);
        }

        .control-block input,
        .control-block select {
          width: 100%;
          min-height: 2.28rem;
          border-radius: 0.65rem;
          border: 1px solid oklch(0.8 0.02 121 / 0.84);
          background: oklch(0.994 0.005 108 / 0.98);
          padding: 0 0.72rem;
          color: var(--ink);
          font-size: 0.89rem;
          outline: none;
        }

        .control-block input:focus,
        .control-block select:focus {
          border-color: oklch(0.58 0.08 149 / 0.85);
          box-shadow: 0 0 0 3px oklch(0.8 0.06 142 / 0.22);
        }

        .explorer-count {
          margin: 0;
          font-size: 0.76rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: oklch(0.39 0.06 149);
          padding: 0 0.2rem;
        }

        .country-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.72rem;
        }

        .country-card {
          overflow: hidden;
          display: grid;
          grid-template-rows: 180px 1fr;
        }

        .country-image-wrap {
          position: relative;
          display: block;
          border-bottom: 1px solid var(--line);
          background:
            radial-gradient(
              120% 80% at 14% 0%,
              oklch(0.94 0.04 118 / 0.55),
              transparent 65%
            ),
            oklch(0.985 0.007 109 / 0.98);
        }

        .country-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .country-meta {
          padding: 0.85rem;
          display: grid;
          gap: 0.42rem;
        }

        .country-san {
          margin: 0;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: oklch(0.37 0.08 149);
        }

        .country-meta h3 {
          margin: 0;
          color: oklch(0.28 0.03 146);
          font-size: 1.2rem;
          line-height: 1.05;
        }

        .country-flower {
          margin: 0;
          color: oklch(0.31 0.05 147);
          font-size: 0.9rem;
          display: grid;
          gap: 0.14rem;
        }

        .country-flower span {
          color: oklch(0.43 0.02 140);
          font-size: 0.78rem;
          letter-spacing: 0.03em;
        }

        .country-tagline {
          margin: 0;
          color: var(--ink-soft);
          font-size: 0.85rem;
          line-height: 1.56;
        }

        .country-footer {
          margin-top: 0.2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 0.48rem;
        }

        .conservation-pill {
          border-radius: 999px;
          padding: 0.23rem 0.55rem;
          border: 1px solid oklch(0.78 0.03 122 / 0.85);
          background: oklch(0.994 0.005 109 / 0.96);
          font-size: 0.67rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .conservation-good {
          color: oklch(0.36 0.08 149);
        }

        .conservation-vulnerable {
          color: oklch(0.52 0.1 84);
        }

        .conservation-endangered {
          color: oklch(0.52 0.16 30);
        }

        .country-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          text-decoration: none;
          color: oklch(0.34 0.08 149);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .band-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.72rem;
        }

        .band-card {
          padding: 0.82rem;
        }

        .band-topline {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.4rem;
        }

        .band-topline h3 {
          font-size: 1.02rem;
          line-height: 1;
        }

        .band-topline p {
          margin: 0;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ink-soft);
        }

        .band-status {
          margin: 0.45rem 0 0;
          font-size: 0.8rem;
          color: oklch(0.35 0.05 149);
          line-height: 1.5;
        }

        .band-tags {
          margin-top: 0.56rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.34rem;
        }

        .band-tag {
          display: inline-flex;
          align-items: center;
          border: 1px solid oklch(0.81 0.02 120 / 0.72);
          border-radius: 999px;
          padding: 0.2rem 0.52rem;
          font-size: 0.69rem;
          line-height: 1.2;
          color: oklch(0.34 0.02 146);
          background: oklch(0.991 0.009 108 / 0.95);
          text-decoration: none;
        }

        .band-tag-live {
          color: oklch(0.32 0.07 149);
          border-color: oklch(0.71 0.045 149 / 0.75);
        }

        .band-tag-more {
          color: oklch(0.46 0.02 139);
        }

        .protocol-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.72rem;
        }

        .protocol-grid article {
          padding: 0.95rem;
          display: grid;
          gap: 0.46rem;
        }

        .protocol-grid span {
          width: 1.85rem;
          height: 1.85rem;
          border-radius: 999px;
          display: inline-grid;
          place-items: center;
          font-size: 0.73rem;
          font-weight: 700;
          color: oklch(0.32 0.07 149);
          border: 1px solid oklch(0.74 0.05 149 / 0.8);
          background: oklch(0.988 0.01 109 / 0.95);
        }

        .protocol-grid h3 {
          font-size: 1rem;
          line-height: 1.2;
        }

        .protocol-grid p {
          margin: 0;
          line-height: 1.6;
          color: var(--ink-soft);
          font-size: 0.88rem;
        }

        .pending-shelf {
          padding: 0.9rem;
          display: grid;
          gap: 0.65rem;
          background: oklch(0.98 0.015 108 / 0.9);
        }

        .pending-shelf h3 {
          font-size: 1rem;
        }

        .pending-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .pending-tags span {
          display: inline-flex;
          align-items: center;
          border: 1px solid oklch(0.81 0.02 120 / 0.75);
          border-radius: 999px;
          padding: 0.29rem 0.58rem;
          font-size: 0.75rem;
          color: oklch(0.35 0.03 146);
          background: oklch(0.993 0.007 109 / 0.95);
        }

        .archive-footer {
          margin-top: clamp(2rem, 5vw, 4rem);
          border-top: 1px solid oklch(0.84 0.012 118);
          padding-top: 1.1rem;
        }

        .archive-footer p {
          margin: 0;
          max-width: 70ch;
          line-height: 1.62;
          font-size: 0.86rem;
          color: oklch(0.48 0.02 140);
        }

        .fade-1,
        .fade-2,
        .fade-3,
        .fade-4 {
          opacity: 0;
          transform: translateY(14px);
          animation: rise 760ms var(--ease-out-quint) forwards;
        }

        .fade-2 {
          animation-delay: 90ms;
        }

        .fade-3 {
          animation-delay: 160ms;
        }

        .fade-4 {
          animation-delay: 220ms;
        }

        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1040px) {
          .archive-overview {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .archive-nav {
            padding: 0.72rem 0;
          }

          .nav-primary {
            align-items: flex-start;
          }

          .nav-brand {
            flex: 1;
          }

          .nav-title-simple {
            font-size: 0.75rem;
            letter-spacing: 0.08em;
          }

          .overview-main h2,
          .series-head h2,
          .explorer-head h2,
          .atlas-head h2,
          .protocol-head h2 {
            font-size: clamp(1.45rem, 8vw, 2rem);
          }

          .explorer-controls {
            grid-template-columns: 1fr;
          }

          .block-card {
            min-height: auto;
          }

          .block-card h3 {
            font-size: 1.14rem;
          }

          .block-summary {
            font-size: 0.86rem;
          }
        }

        @media (max-width: 540px) {
          .home-link {
            min-height: 2rem;
            padding-inline: 0.52rem;
          }

          .nav-title-simple {
            font-size: 0.7rem;
          }

          .series-signoff,
          .series-context,
          .overview-main,
          .overview-rail,
          .explorer-head,
          .explorer-controls,
          .feature-tile,
          .country-meta,
          .atlas-head,
          .protocol-head,
          .pending-shelf,
          .band-card,
          .protocol-grid article {
            padding: 0.78rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-1,
          .fade-2,
          .fade-3,
          .fade-4 {
            animation: none !important;
            opacity: 1;
            transform: none;
          }

          .home-link,
          .signoff-link {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}

export default function ArchivePage() {
  return (
    <Suspense
      fallback={
        <div className={`archive-loading ${bodyFace.className}`}>
          <div className="spinner" />
          <style jsx>{`
            .archive-loading {
              min-height: 100vh;
              display: grid;
              place-items: center;
              background: oklch(0.98 0.015 108);
            }

            .spinner {
              width: 2rem;
              aspect-ratio: 1;
              border-radius: 50%;
              border: 2px solid oklch(0.84 0.02 120);
              border-top-color: oklch(0.47 0.11 152);
              animation: spin 0.8s linear infinite;
            }

            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      }
    >
      <ArchiveContent />
    </Suspense>
  );
}
