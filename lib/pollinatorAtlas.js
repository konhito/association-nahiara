export const ATLAS_SOURCES = [
  { id: "monarch-migration", title: "Overwintering areas and migratory routes of the monarch butterfly", organisation: "The Canadian Entomologist", href: "https://doi.org/10.4039/Ent1091583-12", method: "Twenty-five years of tagging and release-recapture records", status: "Cited route evidence; geometry review pending" },
  { id: "lesser-long-nosed-bat-migration", title: "Leptonycteris yerbabuenae", organisation: "Mammalian Species", href: "https://doi.org/10.1644/797.1", method: "Published synthesis of seasonal occupancy and migration routes", status: "Cited route evidence; geometry review pending" },
  { id: "rufous-hummingbird-migration", title: "Using continental-scale bird banding data to estimate demographic migratory patterns for Rufous Hummingbird", organisation: "Avian Conservation and Ecology", href: "https://doi.org/10.5751/ACE-01612-150202", method: "Continental bird-banding data", status: "Cited route evidence; geometry review pending" },
  { id: "white-winged-dove-migration", title: "Feather isotope analysis reveals differential patterns of habitat and resource use in populations of white-winged doves", organisation: "Journal of Wildlife Management / USGS", href: "https://doi.org/10.1002/jwmg.916", method: "Feather isotope analysis of migratory populations", status: "Cited route evidence; geometry review pending" },
  { id: "painted-lady-migration", title: "Discovery of mass migration and breeding of the painted lady butterfly Vanessa cardui in the Sub-Sahara", organisation: "Biological Journal of the Linnean Society", href: "https://doi.org/10.1111/bij.12873", method: "Field evidence and revised Europe-Africa migration model", status: "Cited route evidence; geometry review pending" },
  { id: "wandering-glider-migration", title: "Transoceanic migration network of dragonfly Pantala flavescens", organisation: "Frontiers in Ecology and Evolution", href: "https://doi.org/10.3389/fevo.2023.1152384", method: "Wind, energetics and observation-informed route model", status: "Cited route evidence; geometry review pending" },
  { id: "straw-coloured-fruit-bat-migration", title: "Pronounced Seasonal Changes in the Movement Ecology of the African Straw-Coloured Fruit Bat", organisation: "PLOS ONE", href: "https://doi.org/10.1371/journal.pone.0138985", method: "GPS and acceleration logger study", status: "Cited movement evidence; continent-scale geometry review pending" },
  { id: "vanessa-cardui-atlantic-2013", title: "Butterflies cross the Atlantic Ocean as evidenced by a transoceanic migration event", organisation: "Nature Communications", href: "https://www.nature.com/articles/s41467-024-49079-2", method: "2013 observation assessed with genomics, isotope, pollen and wind evidence", status: "Cited documented crossing; geometry review pending" },
  { id: "deaths-head-hawkmoth-migration", title: "Understanding insect migration behaviour and pathways using individual tracking and radar", organisation: "European Commission CORDIS", href: "https://cordis.europa.eu/project/id/795568/reporting", method: "Individual radio-telemetry and entomological radar", status: "Cited movement evidence; continent-scale geometry review pending" },
  {
    id: "nasa-firms",
    title: "NASA FIRMS",
    organisation: "NASA Earthdata",
    href: "https://firms.modaps.eosdis.nasa.gov/",
    method: "Satellite active-fire detections",
    status: "Operational data source",
  },
  {
    id: "effis",
    title: "European Forest Fire Information System",
    organisation: "Copernicus Emergency Management Service",
    href: "https://effis.emergency.copernicus.eu/",
    method: "European burned-area records and fire information",
    status: "Operational data source",
  },
  {
    id: "modis-burned-area",
    title: "MODIS Burned Area Monthly Global 500 m",
    organisation: "NASA LP DAAC",
    href: "https://lpdaac.usgs.gov/products/mcd64a1v061/",
    method: "Satellite-derived monthly burned-area product",
    status: "Historical burned-area candidate source; reviewed GeoJSON export required",
  },
  {
    id: "movebank",
    title: "Movebank Data Repository",
    organisation: "Max Planck Institute / University of Konstanz",
    href: "https://www.movebank.org/cms/movebank-content/data-repository",
    method: "Animal tracking datasets; study-specific permissions apply",
    status: "Candidate source; study-by-study review required",
  },
  {
    id: "gbif",
    title: "GBIF Occurrence API",
    organisation: "Global Biodiversity Information Facility",
    href: "https://techdocs.gbif.org/en/openapi/v1/occurrence",
    method: "Species occurrence context, not migration telemetry",
    status: "Context-only source",
  },
  {
    id: "copernicus-projections",
    title: "Copernicus Climate Projections",
    organisation: "Copernicus Climate Change Service",
    href: "https://climate.copernicus.eu/climate-projections",
    method: "Climate projection inputs for reviewed fire-risk scenarios",
    status: "Scenario source; reviewed derived tiles required",
  },
];

const line = (coordinates) => ({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates } });

// Schematic footprints are deliberately labelled preliminary until a cited study geometry is approved.
export const POLLINATOR_ROUTES = [
  { id: "eastern-monarch", color: "#f7c948", name: { en: "Eastern monarch", es: "Monarca oriental" }, scientificName: "Danaus plexippus", sourceId: "monarch-migration", method: { en: "Published tagging and release-recapture synthesis", es: "Síntesis publicada de marcaje y recaptura" }, geometry: line([[-100, 19], [-96, 29], [-89, 39], [-78, 45]]) },
  { id: "western-monarch", color: "#f59e0b", name: { en: "Western monarch", es: "Monarca occidental" }, scientificName: "Danaus plexippus", sourceId: "monarch-migration", method: { en: "Published tagging and release-recapture synthesis", es: "Síntesis publicada de marcaje y recaptura" }, geometry: line([[-110, 23], [-117, 33], [-121, 40], [-122, 47]]) },
  { id: "lesser-long-nosed-bat", color: "#fb923c", name: { en: "Lesser long-nosed bat", es: "Murciélago hocicudo menor" }, scientificName: "Leptonycteris yerbabuenae", sourceId: "lesser-long-nosed-bat-migration", method: { en: "Published seasonal migration synthesis", es: "Síntesis publicada de migración estacional" }, geometry: line([[-103, 17], [-107, 25], [-111, 31]]) },
  { id: "rufous-hummingbird", color: "#fb7185", name: { en: "Rufous hummingbird", es: "Colibrí rufo" }, scientificName: "Selasphorus rufus", sourceId: "rufous-hummingbird-migration", method: { en: "Continental banding-data migration model", es: "Modelo migratorio con datos continentales de anillamiento" }, geometry: line([[-100, 15], [-109, 29], [-117, 41], [-123, 56]]) },
  { id: "white-winged-dove", color: "#2dd4bf", name: { en: "White-winged dove", es: "Paloma aliblanca" }, scientificName: "Zenaida asiatica", sourceId: "white-winged-dove-migration", method: { en: "Feather-isotope migration evidence", es: "Evidencia migratoria mediante isótopos de plumas" }, geometry: line([[-101, 18], [-99, 27], [-97, 37]]) },
  { id: "painted-lady", color: "#86efac", name: { en: "Painted lady", es: "Mariposa cardera" }, scientificName: "Vanessa cardui", sourceId: "painted-lady-migration", method: { en: "Published Europe-Africa migration synthesis", es: "Síntesis publicada de la migración Europa-África" }, geometry: line([[-7, 31], [5, 40], [20, 48], [35, 53]]) },
  { id: "wandering-glider", color: "#60a5fa", name: { en: "Wandering glider", es: "Libélula migratoria" }, scientificName: "Pantala flavescens", sourceId: "wandering-glider-migration", method: { en: "Wind and energetics route model", es: "Modelo de ruta basado en viento y energía" }, geometry: line([[52, -8], [78, -4], [105, 7], [118, 23]]) },
  { id: "deaths-head-hawkmoth", color: "#c084fc", name: { en: "Death's-head hawkmoth", es: "Esfinge de la calavera" }, scientificName: "Acherontia atropos", sourceId: "deaths-head-hawkmoth-migration", method: { en: "Individual radio-telemetry and radar evidence", es: "Evidencia mediante radiotelemetría individual y radar" }, geometry: line([[29, -5], [31, 14], [27, 30], [35, 42]]) },
  { id: "straw-coloured-fruit-bat", color: "#fdba74", name: { en: "Straw-coloured fruit bat", es: "Murciélago frugívoro pajizo" }, scientificName: "Eidolon helvum", sourceId: "straw-coloured-fruit-bat-migration", method: { en: "GPS and acceleration logger study", es: "Estudio con GPS y registradores de aceleración" }, geometry: line([[17, -12], [22, 1], [16, 16]]) },
  { id: "vanessa-cardui-2013", color: "#f8fafc", dashed: true, name: { en: "Vanessa cardui transatlantic crossing (2013)", es: "Cruce transatlántico de Vanessa cardui (2013)" }, scientificName: "Vanessa cardui", sourceId: "vanessa-cardui-atlantic-2013", method: { en: "Documented crossing assessed with multi-method evidence", es: "Cruce documentado evaluado con evidencia multimétodo" }, geometry: line([[-57, 7], [-42, 12], [-28, 17], [-16, 25]]) },
];

export const getAtlasSource = (id) => ATLAS_SOURCES.find((source) => source.id === id);
