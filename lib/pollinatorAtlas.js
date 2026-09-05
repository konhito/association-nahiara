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
  { id: "mexican-long-nosed-bat-nectar-corridor", title: "Endangered Nectar-Feeding Bat Detected by Environmental DNA on Flowers", organisation: "Molecular Ecology Resources", href: "https://pubmed.ncbi.nlm.nih.gov/36428303/", method: "Flower eDNA sampled along the Mexico-US agave nectar corridor", status: "Documented nectar-corridor evidence; atlas line is a regional pathway, not an individual track" },
  { id: "ruby-throated-hummingbird-gulf", title: "Temporal migration patterns between natal locations of ruby-throated hummingbirds and their Gulf Coast stopover site", organisation: "Movement Ecology", href: "https://pubmed.ncbi.nlm.nih.gov/29340153/", method: "Stable-hydrogen isotope assignments from autumn migrants", status: "Documented Gulf stopover evidence; atlas line summarizes the seasonal flyway" },
  { id: "giant-hummingbird-elevation", title: "Extreme elevational migration spurred cryptic speciation in giant hummingbirds", organisation: "Proceedings of the National Academy of Sciences", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11126955/", method: "Tracking, genomics, physiology and museum specimens", status: "Documented elevational circuit; atlas line is schematic" },
  { id: "silver-y-moth-migration", title: "Seasonal migration to high latitudes results in major reproductive benefits in an insect", organisation: "Proceedings of the National Academy of Sciences", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3443120/", method: "Entomological radar, light traps and trajectory modelling", status: "Documented seasonal migration axis; atlas line is schematic" },
  { id: "migrant-hoverfly-bioflow", title: "Mass Seasonal Migrations of Hoverflies Provide Extensive Pollination and Crop Protection Services", organisation: "Current Biology", href: "https://pubmed.ncbi.nlm.nih.gov/31204159/", method: "Ten years of insect-monitoring radar over southern Britain", status: "Documented Britain-Europe bioflow; route represents a multi-species migration corridor" },
  { id: "convolvulus-hawkmoth-migration", title: "Millions of insects migrate across the Pyrenees: heavy transit and conflicting ecological roles", organisation: "Proceedings of the Royal Society B", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11732392/", method: "Mountain-pass migration observations, with documented hawkmoth passage", status: "Documented passage zone; atlas line is a seasonal axis, not a measured individual route" },
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
  {
    id: "nearctic-hoverfly-migration",
    title: "Do Nearctic hover flies engage in long-distance migration?",
    organisation: "Ecological Monographs",
    href: "https://doi.org/10.1002/ecm.1542",
    method: "Stable isotopes, abundance estimates and cold-tolerance assays",
    status: "Cited migration evidence; corridor geometry is a regional synthesis",
  },
  {
    id: "west-coast-hoverfly-migration",
    title: "Quantification of migrant hoverfly movements on the West Coast of North America",
    organisation: "Royal Society Open Science",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6502382/",
    method: "Long-term trapping and movement observations",
    status: "Cited movement evidence; route represents a seasonal axis",
  },
  {
    id: "east-asia-hoverfly-migration",
    title: "Windborne migration amplifies insect-mediated pollination services",
    organisation: "Current Biology",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9042232/",
    method: "Sixteen-year trapping, trajectory analysis and pollen/genetic markers",
    status: "Cited migration and pollen-transfer evidence; geometry review pending",
  },
  {
    id: "north-sea-hoverfly-pollen",
    title: "Long-range pollen transport across the North Sea",
    organisation: "Current Biology",
    href: "https://pubmed.ncbi.nlm.nih.gov/40963187/",
    method: "Pollen metabarcoding from migratory hoverflies on an offshore platform",
    status: "Cited long-range pollen transport; route is a modeled crossing",
  },
  {
    id: "canary-endemic-pollinators",
    title: "Canarian Islands endemic pollinators of the laurel forest zone",
    organisation: "European Commission Pollinators Initiative",
    href: "https://op.europa.eu/en/publication-detail/-/publication/81542e9b-f9e8-11ed-a05c-01aa75ed71a1/language-en",
    method: "Conservation action plan and endemic pollinator habitat assessment",
    status: "Cited conservation evidence; island network geometry is a modeled synthesis",
  },
  {
    id: "canary-echium-bees",
    title: "Bees visiting endemic Echium species in the Canary Islands",
    organisation: "International Journal of Plant Sciences",
    href: "https://doi.org/10.1086/382806",
    method: "Island-wide bee and floral-trait comparisons across endemic Echium",
    status: "Cited island pollination evidence; route represents linked floral habitat",
  },
  {
    id: "pyrenees-insect-passage",
    title: "Millions of insects migrate across the Pyrenees",
    organisation: "Proceedings of the Royal Society B",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11732392/",
    method: "Mountain-pass observations and entomological radar",
    status: "Cited passage-zone evidence; route is a seasonal mountain axis",
  },
  {
    id: "gibraltar-monarch",
    title: "Monarch butterfly occupancy and movement near the Strait of Gibraltar",
    organisation: "Mediterranean butterfly movement study",
    href: "https://www.researchgate.net/publication/236591564_Ocupacion_de_fragmentos_persistencia_y_movimientos_de_la_mariposa_monarca_Danaus_plexippus_en_la_zona_del_Estrecho_de_Gibraltar",
    method: "Coastal patch occupancy and movement observations",
    status: "Cited regional evidence; route is a coastal habitat network",
  },
];

// Turn evidence-informed anchor points into a smooth path so the atlas reads as a
// landscape-following corridor instead of a set of ruler-straight segments. This
// is still a modeled footprint until a cited GIS track or telemetry geometry is
// approved for the route.
const smoothPath = (anchors, steps = 8) => {
  if (anchors.length < 3) return anchors;

  const points = [];
  for (let index = 0; index < anchors.length - 1; index += 1) {
    const previous = anchors[index - 1] || anchors[index];
    const current = anchors[index];
    const next = anchors[index + 1];
    const following = anchors[index + 2] || next;

    for (let step = 0; step < steps; step += 1) {
      const t = step / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const interpolate = (axis) => 0.5 * (
        (2 * current[axis])
        + (-previous[axis] + next[axis]) * t
        + (2 * previous[axis] - 5 * current[axis] + 4 * next[axis] - following[axis]) * t2
        + (-previous[axis] + 3 * current[axis] - 3 * next[axis] + following[axis]) * t3
      );
      points.push([interpolate(0), interpolate(1)]);
    }
  }

  points.push(anchors[anchors.length - 1]);
  return points;
};

const line = (coordinates) => ({
  type: "Feature",
  properties: {},
  geometry: { type: "LineString", coordinates: smoothPath(coordinates) },
});

// Anchor points are evidence-informed route footprints; geometry remains
// preliminary until a cited study geometry is approved.
export const POLLINATOR_ROUTES = [
  { id: "eastern-monarch", color: "#f7c948", name: { en: "Eastern monarch", es: "Monarca oriental" }, scientificName: "Danaus plexippus", sourceId: "monarch-migration", method: { en: "Published tagging and release-recapture synthesis", es: "Síntesis publicada de marcaje y recaptura" }, season: { en: "Multigenerational spring and autumn migration", es: "Migración multigeneracional de primavera y otoño" }, summary: { en: "A continental pathway linking central Mexican overwintering sites with breeding habitat across eastern North America.", es: "Una vía continental que conecta los sitios de invernada del centro de México con hábitats de cría del este de Norteamérica." }, geometry: line([[-100, 19], [-96, 29], [-89, 39], [-78, 45]]) },
  { id: "western-monarch", color: "#f59e0b", name: { en: "Western monarch", es: "Monarca occidental" }, scientificName: "Danaus plexippus", sourceId: "monarch-migration", method: { en: "Published tagging and release-recapture synthesis", es: "Síntesis publicada de marcaje y recaptura" }, season: { en: "Seasonal Pacific flyway movement", es: "Movimiento estacional de la ruta del Pacífico" }, summary: { en: "A west-coast migration axis connecting Mexican winter range with Pacific Northwest breeding landscapes.", es: "Un eje migratorio de la costa oeste que conecta el área invernal de México con los paisajes de cría del noroeste del Pacífico." }, geometry: line([[-110, 23], [-117, 33], [-121, 40], [-122, 47]]) },
  { id: "lesser-long-nosed-bat", color: "#fb923c", name: { en: "Lesser long-nosed bat", es: "Murciélago longirostro menor" }, scientificName: "Leptonycteris yerbabuenae", sourceId: "lesser-long-nosed-bat-migration", method: { en: "Published seasonal migration synthesis", es: "Síntesis publicada de migración estacional" }, season: { en: "Seasonal northward movement following flowering resources", es: "Movimiento estacional hacia el norte siguiendo los recursos florales" }, summary: { en: "A nectar-feeding bat pathway through western Mexico and the Sonoran region, closely tied to flowering agaves and cacti.", es: "Una ruta de murciélago nectarívoro por el oeste de México y la región sonorense, estrechamente ligada a agaves y cactus en flor." }, geometry: line([[-103, 17], [-107, 25], [-111, 31]]) },
  { id: "rufous-hummingbird", color: "#fb7185", name: { en: "Rufous hummingbird", es: "Colibrí rufo" }, scientificName: "Selasphorus rufus", sourceId: "rufous-hummingbird-migration", method: { en: "Continental banding-data migration model", es: "Modelo migratorio con datos continentales de anillamiento" }, season: { en: "Spring northbound and autumn southbound movement", es: "Movimiento primaveral hacia el norte y otoñal hacia el sur" }, summary: { en: "A long Pacific-side flyway from Mexico to Alaska; flowering schedules along the route are part of its fuel network.", es: "Una larga ruta por el lado del Pacífico desde México hasta Alaska; los calendarios de floración son parte de su red de energía." }, geometry: line([[-100, 15], [-109, 29], [-117, 41], [-123, 56]]) },
  { id: "white-winged-dove", color: "#2dd4bf", name: { en: "White-winged dove", es: "Paloma aliblanca" }, scientificName: "Zenaida asiatica", sourceId: "white-winged-dove-migration", method: { en: "Feather-isotope migration evidence", es: "Evidencia migratoria mediante isótopos de plumas" }, season: { en: "Seasonal north-south movement", es: "Movimiento estacional norte-sur" }, summary: { en: "An isotope-supported migration axis across Mexico and the southern United States for a major cactus-flower visitor.", es: "Un eje migratorio respaldado por isótopos entre México y el sur de Estados Unidos para un importante visitante de flores de cactus." }, geometry: line([[-101, 18], [-99, 27], [-97, 37]]) },
  { id: "painted-lady", color: "#86efac", name: { en: "Painted lady", es: "Mariposa cardera" }, scientificName: "Vanessa cardui", sourceId: "painted-lady-migration", method: { en: "Published Europe-Africa migration synthesis", es: "Síntesis publicada de la migración Europa-África" }, season: { en: "Multigenerational, seasonal Europe-Africa circuit", es: "Circuito estacional y multigeneracional Europa-África" }, summary: { en: "A multigenerational corridor across the Sahara and Europe, tracking suitable breeding and flowering conditions.", es: "Un corredor multigeneracional a través del Sáhara y Europa que sigue condiciones adecuadas de cría y floración." }, geometry: line([[-7, 31], [5, 40], [20, 48], [35, 53]]) },
  { id: "wandering-glider", color: "#60a5fa", name: { en: "Wandering glider", es: "Libélula migratoria" }, scientificName: "Pantala flavescens", sourceId: "wandering-glider-migration", method: { en: "Wind and energetics route model", es: "Modelo de ruta basado en viento y energía" }, season: { en: "Monsoon-linked migration", es: "Migración ligada al monzón" }, summary: { en: "An Indian Ocean migration network inferred from wind, energetics and observation data; included as a long-distance insect movement comparison.", es: "Una red migratoria del océano Índico inferida mediante viento, energía y observaciones; incluida como comparación de movimiento de insectos a larga distancia." }, geometry: line([[52, -8], [78, -4], [105, 7], [118, 23]]) },
  { id: "deaths-head-hawkmoth", color: "#c084fc", name: { en: "Death's-head hawkmoth", es: "Esfinge de la calavera" }, scientificName: "Acherontia atropos", sourceId: "deaths-head-hawkmoth-migration", method: { en: "Individual radio-telemetry and radar evidence", es: "Evidencia mediante radiotelemetría individual y radar" }, season: { en: "Seasonal Afro-Palearctic movement", es: "Movimiento estacional afropaleártico" }, summary: { en: "A hawkmoth migration axis assembled from individual tracking and radar work across Africa and southern Europe.", es: "Un eje migratorio de esfinge reunido a partir de seguimiento individual y radar entre África y el sur de Europa." }, geometry: line([[29, -5], [31, 14], [27, 30], [35, 42]]) },
  { id: "straw-coloured-fruit-bat", color: "#fdba74", name: { en: "Straw-coloured fruit bat", es: "Murciélago frugívoro pajizo" }, scientificName: "Eidolon helvum", sourceId: "straw-coloured-fruit-bat-migration", method: { en: "GPS and acceleration logger study", es: "Estudio con GPS y registradores de aceleración" }, season: { en: "Seasonal movement across African landscapes", es: "Movimiento estacional por paisajes africanos" }, summary: { en: "A continent-scale fruit-bat movement axis supported by logger research, visualizing how mobile flower and fruit visitors connect habitats.", es: "Un eje de movimiento continental de murciélago frugívoro respaldado por registradores, que visualiza cómo los visitantes móviles de flores y frutos conectan hábitats." }, geometry: line([[17, -12], [22, 1], [16, 16]]) },
  { id: "vanessa-cardui-2013", color: "#f8fafc", dashed: true, name: { en: "Vanessa cardui transatlantic crossing (2013)", es: "Cruce transatlántico de Vanessa cardui (2013)" }, scientificName: "Vanessa cardui", sourceId: "vanessa-cardui-atlantic-2013", method: { en: "Documented crossing assessed with multi-method evidence", es: "Cruce documentado evaluado con evidencia multimétodo" }, season: { en: "Observed in October 2013", es: "Observado en octubre de 2013" }, summary: { en: "A documented exceptional dispersal from West Africa to French Guiana: at least 4,200 km over 5–8 days, assisted by winds.", es: "Una dispersión excepcional documentada desde África occidental hasta la Guayana Francesa: al menos 4.200 km en 5–8 días, ayudada por el viento." }, geometry: line([[-57, 7], [-42, 12], [-28, 17], [-16, 25]]) },
  { id: "mexican-long-nosed-bat", color: "#f97316", name: { en: "Mexican long-nosed bat nectar corridor", es: "Corredor de néctar del murciélago magueyero mayor" }, scientificName: "Leptonycteris nivalis", sourceId: "mexican-long-nosed-bat-nectar-corridor", method: { en: "Flower eDNA from the agave nectar corridor", es: "ADN ambiental de flores del corredor de néctar de agave" }, season: { en: "Seasonal Mexico-US migration", es: "Migración estacional México-EE. UU." }, summary: { en: "An endangered nectar bat follows agave flowering from central and northern Mexico toward the US Southwest; flower swabs can now detect its passage.", es: "Un murciélago nectarívoro amenazado sigue la floración del agave desde el centro y norte de México hacia el suroeste de EE. UU.; los hisopos de flores ya pueden detectar su paso." }, geometry: line([[-99.2, 20], [-100.2, 24.5], [-103.5, 28.5], [-104.8, 30.8]]) },
  { id: "ruby-throated-hummingbird", color: "#ef4444", name: { en: "Ruby-throated hummingbird Gulf flyway", es: "Ruta del colibrí garganta rubí por el golfo" }, scientificName: "Archilochus colubris", sourceId: "ruby-throated-hummingbird-gulf", method: { en: "Stable-isotope migration assignments", es: "Asignaciones migratorias mediante isótopos estables" }, season: { en: "Autumn chain migration through the Gulf Coast", es: "Migración escalonada de otoño por la costa del golfo" }, summary: { en: "Individuals from across the 30–50°N breeding range converge at Gulf Coast stopovers before continuing toward wintering habitat.", es: "Individuos de toda el área de cría entre 30–50°N convergen en escalas de la costa del golfo antes de continuar hacia el hábitat invernal." }, geometry: line([[-80, 47], [-86, 39], [-88, 30], [-89, 21], [-85, 11]]) },
  { id: "southern-giant-hummingbird", color: "#a855f7", name: { en: "Southern giant hummingbird elevational circuit", es: "Circuito altitudinal del picaflor gigante del sur" }, scientificName: "Patagona gigas", sourceId: "giant-hummingbird-elevation", method: { en: "Tracking, genomics and physiological evidence", es: "Evidencia de seguimiento, genómica y fisiología" }, season: { en: "Seasonal descent and return through the Andes", es: "Descenso y retorno estacional por los Andes" }, summary: { en: "The southern giant hummingbird makes an extraordinary loop between high Andean breeding ground and lower winter habitat, with major elevational change.", es: "El picaflor gigante del sur realiza un extraordinario circuito entre zonas de cría altoandinas y hábitat invernal más bajo, con gran cambio de altitud." }, geometry: line([[-69.5, -34], [-70.3, -30], [-69.2, -25], [-68.2, -21]]) },
  { id: "silver-y-moth", color: "#eab308", name: { en: "Silver Y moth seasonal axis", es: "Eje estacional de la polilla gamma" }, scientificName: "Autographa gamma", sourceId: "silver-y-moth-migration", method: { en: "Radar, light-trap and trajectory model", es: "Radar, trampas de luz y modelo de trayectorias" }, season: { en: "Northward spring and southward autumn migration", es: "Migración primaveral hacia el norte y otoñal hacia el sur" }, summary: { en: "A high-altitude moth migration from Mediterranean winter-breeding regions toward northern Europe; adults also visit nectar-rich flowers.", es: "Una migración de polilla a gran altitud desde regiones mediterráneas de cría invernal hacia el norte de Europa; los adultos también visitan flores ricas en néctar." }, geometry: line([[12, 37], [6, 43], [1, 49], [-1, 52]]) },
  { id: "migrant-hoverflies", color: "#38bdf8", name: { en: "Migrant hoverfly Britain-Europe bioflow", es: "Bioflujo de sírfidos migratorios entre Gran Bretaña y Europa" }, scientificName: "Syrphini assemblage", sourceId: "migrant-hoverfly-bioflow", method: { en: "Insect-monitoring radar over ten years", es: "Radar de seguimiento de insectos durante diez años" }, season: { en: "Seasonally adaptive high-altitude migration", es: "Migración estacional adaptativa a gran altitud" }, summary: { en: "Radar evidence shows up to billions of hoverflies moving between southern Britain and continental Europe, redistributing pollen as they migrate.", es: "La evidencia de radar muestra hasta miles de millones de sírfidos moviéndose entre el sur de Gran Bretaña y Europa continental, redistribuyendo polen durante la migración." }, geometry: line([[-5, 51], [-2, 51], [1, 50], [3, 48], [5, 45]]) },
  { id: "convolvulus-hawkmoth", color: "#d946ef", name: { en: "Convolvulus hawkmoth mountain-pass axis", es: "Eje de pasos montañosos de la esfinge de la correhuela" }, scientificName: "Agrius convolvuli", sourceId: "convolvulus-hawkmoth-migration", method: { en: "Observed mountain-pass migration and pollination studies", es: "Migración observada en pasos montañosos y estudios de polinización" }, season: { en: "Seasonal Europe-Africa passage", es: "Paso estacional Europa-África" }, summary: { en: "A long-tongued hawkmoth recorded using European mountain passes; it is also a key pollinator of very long-tubed flowers across African grasslands and savannas.", es: "Una esfinge de lengua larga registrada en pasos montañosos europeos; también es un polinizador clave de flores de tubo muy largo en praderas y sabanas africanas." }, geometry: line([[15, 39], [10, 43], [7, 47], [3, 50]]) },
  { id: "nearctic-hoverflies", color: "#22d3ee", name: { en: "Nearctic hoverfly spring corridor", es: "Corredor primaveral de sírfidos neárticos" }, scientificName: "Allograpta, Eupeodes and Syrphus", sourceId: "nearctic-hoverfly-migration", method: { en: "Stable-isotope and cold-tolerance evidence", es: "Evidencia de isótopos estables y tolerancia al frío" }, season: { en: "Spring northbound movement", es: "Movimiento primaveral hacia el norte" }, summary: { en: "A regional spring movement axis from the Gulf Coast into eastern North America, representing a multi-species pollen and pest-control service.", es: "Un eje regional de movimiento primaveral desde la costa del golfo hacia el este de Norteamérica, representando un servicio multi-especie de polinización y control de plagas." }, geometry: line([[-91, 29], [-87, 33], [-83, 38], [-77, 43], [-70, 48]]) },
  { id: "west-coast-hoverflies", color: "#14b8a6", name: { en: "West Coast hoverfly corridor", es: "Corredor de sírfidos de la costa oeste" }, scientificName: "Syrphidae assemblage", sourceId: "west-coast-hoverfly-migration", method: { en: "Long-term trapping and movement observations", es: "Capturas de largo plazo y observaciones de movimiento" }, season: { en: "Seasonal Pacific-side movement", es: "Movimiento estacional por el lado del Pacífico" }, summary: { en: "A Pacific-side corridor linking flowering landscapes from northern Mexico through California and the Pacific Northwest.", es: "Un corredor del Pacífico que conecta paisajes florales desde el norte de México a través de California y el noroeste del Pacífico." }, geometry: line([[-116, 31], [-123, 36], [-122, 42], [-124, 47], [-121, 52]]) },
  { id: "east-asia-hoverflies", color: "#0ea5e9", name: { en: "East Asia windborne hoverfly corridor", es: "Corredor eólico de sírfidos del este de Asia" }, scientificName: "Episyrphus balteatus", sourceId: "east-asia-hoverfly-migration", method: { en: "Long-term trapping, trajectories and pollen markers", es: "Capturas de largo plazo, trayectorias y marcadores de polen" }, season: { en: "Monsoon-linked seasonal movement", es: "Movimiento estacional ligado al monzón" }, summary: { en: "A wind-assisted corridor across eastern China where migratory hoverflies redistribute pollen between agricultural and natural flowering areas.", es: "Un corredor asistido por el viento a través del este de China donde los sírfidos migratorios redistribuyen polen entre zonas agrícolas y naturales en floración." }, geometry: line([[105, 20], [110, 25], [115, 31], [120, 36], [124, 41]]) },
  { id: "north-sea-hoverfly-crossing", color: "#38bdf8", dashed: true, name: { en: "North Sea hoverfly pollen crossing", es: "Cruce de sírfidos y polen del mar del Norte" }, scientificName: "Migratory Syrphidae", sourceId: "north-sea-hoverfly-pollen", method: { en: "Pollen metabarcoding from offshore migrants", es: "Metabarcódigo de polen de migrantes marinos" }, season: { en: "Seasonal Britain-Europe crossing", es: "Cruce estacional entre Gran Bretaña y Europa" }, summary: { en: "A modeled sea crossing showing how migratory hoverflies can carry pollen between continental Europe and Britain.", es: "Un cruce marítimo modelado que muestra cómo los sírfidos migratorios pueden transportar polen entre Europa continental y Gran Bretaña." }, geometry: line([[1, 51], [0, 52], [-1, 53], [-2, 54], [-3, 55]]) },
  { id: "canary-laurel-forest", color: "#84cc16", name: { en: "Canary laurel-forest pollinator network", es: "Red de polinizadores del bosque de laurisilva canario" }, scientificName: "Canarian endemic pollinator guild", sourceId: "canary-endemic-pollinators", method: { en: "Endemic-pollinator conservation assessment", es: "Evaluación de conservación de polinizadores endémicos" }, season: { en: "Year-round island flowering pulses", es: "Pulsos de floración insulares durante todo el año" }, summary: { en: "A modeled island-to-island network linking laurel-forest refuges on La Palma, La Gomera, Tenerife and Gran Canaria.", es: "Una red insular modelada que conecta refugios de laurisilva en La Palma, La Gomera, Tenerife y Gran Canaria." }, geometry: line([[-18.05, 28.75], [-17.2, 28.1], [-16.65, 28.3], [-16.25, 28.55], [-15.6, 28.2]]) },
  { id: "canary-echium-bee-chain", color: "#facc15", name: { en: "Canary Echium bee-flower chain", es: "Cadena abeja-flor de Echium canario" }, scientificName: "Anthophila visiting Echium", sourceId: "canary-echium-bees", method: { en: "Island bee and floral-trait study", es: "Estudio insular de abejas y rasgos florales" }, season: { en: "Spring and early-summer bloom sequence", es: "Secuencia de floración de primavera y principios de verano" }, summary: { en: "A floral-resource chain across Tenerife, Gran Canaria and the eastern islands, linking endemic Echium patches used by native bees.", es: "Una cadena de recursos florales entre Tenerife, Gran Canaria y las islas orientales que conecta manchas de Echium endémico usadas por abejas nativas." }, geometry: line([[-16.9, 28.35], [-15.7, 28.1], [-14.2, 28.45], [-13.9, 28.5], [-13.5, 28.3]]) },
  { id: "pyrenees-pollinator-pass", color: "#fb923c", name: { en: "Pyrenees pollinator pass", es: "Paso de polinizadores de los Pirineos" }, scientificName: "Migratory moths and hoverflies", sourceId: "pyrenees-insect-passage", method: { en: "Mountain-pass observations and radar", es: "Observaciones de pasos montañosos y radar" }, season: { en: "Late-summer and autumn passage", es: "Paso de finales de verano y otoño" }, summary: { en: "A Spain-France mountain corridor following documented insect transit through Pyrenean passes, with hoverflies contributing pollination and pest control.", es: "Un corredor montañoso España-Francia que sigue el tránsito documentado de insectos por pasos pirenaicos, con sírfidos que contribuyen a la polinización y al control de plagas." }, geometry: line([[-3.3, 42.5], [-1.7, 42.7], [0.1, 42.6], [1.5, 42.8], [2.7, 42.9]]) },
  { id: "gibraltar-monarch-coast", color: "#f472b6", name: { en: "Strait of Gibraltar monarch coast", es: "Costa monarca del estrecho de Gibraltar" }, scientificName: "Danaus plexippus", sourceId: "gibraltar-monarch", method: { en: "Coastal patch occupancy and movement observations", es: "Observaciones de ocupación y movimiento en parches costeros" }, season: { en: "Autumn coastal movement and overwintering", es: "Movimiento costero otoñal e invernada" }, summary: { en: "A southern Iberian coastal network around Cádiz, Málaga and the Strait of Gibraltar where milkweed patches can support monarch movement.", es: "Una red costera del sur ibérico alrededor de Cádiz, Málaga y el estrecho de Gibraltar donde los parches de algodoncillo pueden sostener el movimiento de la monarca." }, geometry: line([[-6.4, 36.5], [-5.7, 36.3], [-5.1, 36.1], [-4.4, 36.5], [-3.6, 36.7]]) },
];

export const getAtlasSource = (id) => ATLAS_SOURCES.find((source) => source.id === id);

const CORRIDOR_RISK_WINDOWS = {
  "mexican-long-nosed-bat": "2030–2045",
  "lesser-long-nosed-bat": "2035–2050",
  "southern-giant-hummingbird": "2035–2050",
  "straw-coloured-fruit-bat": "2035–2055",
  "nearctic-hoverflies": "2040–2060",
  "west-coast-hoverflies": "2040–2060",
  "east-asia-hoverflies": "2035–2055",
  "north-sea-hoverfly-crossing": "2040–2060",
};

const MONTH_LABELS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
};

const CORRIDOR_MONTHS = {
  "eastern-monarch": { active: [2, 3, 4, 5, 8, 9], peak: [3, 8] },
  "western-monarch": { active: [2, 3, 4, 5, 8, 9], peak: [3, 8] },
  "lesser-long-nosed-bat": { active: [2, 3, 4, 5, 6, 7, 8], peak: [5, 6] },
  "rufous-hummingbird": { active: [2, 3, 4, 8, 9, 10], peak: [3, 8] },
  "white-winged-dove": { active: [2, 3, 4, 5, 8, 9], peak: [3, 8] },
  "painted-lady": { active: [2, 3, 4, 5, 8, 9, 10], peak: [3, 8] },
  "wandering-glider": { active: [4, 5, 6, 7, 8, 9], peak: [6, 7] },
  "deaths-head-hawkmoth": { active: [4, 5, 6, 7, 8, 9], peak: [6, 7] },
  "straw-coloured-fruit-bat": { active: [0, 1, 2, 3, 8, 9, 10, 11], peak: [1, 9] },
  "vanessa-cardui-2013": { active: [9], peak: [9] },
  "mexican-long-nosed-bat": { active: [2, 3, 4, 5, 6, 7, 8], peak: [4, 5] },
  "ruby-throated-hummingbird": { active: [8, 9, 10], peak: [8, 9] },
  "southern-giant-hummingbird": { active: [0, 1, 2, 3, 8, 9, 10, 11], peak: [1, 9] },
  "silver-y-moth": { active: [2, 3, 4, 5, 8, 9, 10], peak: [4, 8] },
  "migrant-hoverflies": { active: [3, 4, 5, 8, 9, 10], peak: [4, 8] },
  "convolvulus-hawkmoth": { active: [4, 5, 6, 7, 8, 9], peak: [7, 8] },
  "nearctic-hoverflies": { active: [2, 3, 4, 5, 6, 7, 8], peak: [3, 4] },
  "west-coast-hoverflies": { active: [2, 3, 4, 5, 6, 7, 8], peak: [4, 5] },
  "east-asia-hoverflies": { active: [3, 4, 5, 6, 7, 8], peak: [5, 6] },
  "north-sea-hoverfly-crossing": { active: [4, 5, 6, 7, 8], peak: [5, 6] },
  "canary-laurel-forest": { active: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], peak: [2, 3, 9, 10] },
  "canary-echium-bee-chain": { active: [1, 2, 3, 4, 5], peak: [2, 3] },
  "pyrenees-pollinator-pass": { active: [6, 7, 8, 9], peak: [7, 8] },
  "gibraltar-monarch-coast": { active: [8, 9, 10, 11], peak: [9, 10] },
};

export const getCorridorTimeline = (routeId, language = "en") => {
  const months = CORRIDOR_MONTHS[routeId] || { active: [2, 3, 4, 5, 6, 7, 8], peak: [4, 5] };
  const labels = MONTH_LABELS[language] || MONTH_LABELS.en;
  const ranges = [];
  months.active.forEach((month) => {
    const range = ranges[ranges.length - 1];
    if (!range || month !== range[range.length - 1] + 1) ranges.push([month]);
    else range.push(month);
  });
  const monthRange = months.active.length === 12
    ? (language === "es" ? "Todo el año" : "Year-round")
    : ranges.map((range) => `${labels[range[0]]}–${labels[range[range.length - 1]]}`).join(" · ");
  const peakLabel = months.peak.map((month) => labels[month]).join(" · ");
  return {
  window: CORRIDOR_RISK_WINDOWS[routeId] || "2040–2060",
  confidence: "Exploratory / low",
  basis: "Scenario window for serious fragmentation, not a predicted extinction date",
    activeMonths: months.active,
    peakMonths: months.peak,
    monthLabels: labels,
    monthRange,
    peakLabel,
  };
};
