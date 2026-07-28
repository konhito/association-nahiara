-- Run against the new PostgreSQL database:
-- psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/setup-atlas-db.sql

CREATE TABLE IF NOT EXISTS atlas_sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  organisation TEXT NOT NULL,
  href TEXT NOT NULL,
  method TEXT NOT NULL,
  status TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pollinator_routes (
  id TEXT PRIMARY KEY,
  colour TEXT NOT NULL,
  name JSONB NOT NULL,
  scientific_name TEXT NOT NULL,
  source_id TEXT NOT NULL REFERENCES atlas_sources(id),
  method JSONB NOT NULL,
  geometry JSONB NOT NULL,
  dashed BOOLEAN NOT NULL DEFAULT FALSE,
  geometry_status TEXT NOT NULL DEFAULT 'preliminary',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS atlas_fire_snapshots (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL,
  payload JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS atlas_fire_snapshots_created_at_idx
  ON atlas_fire_snapshots (created_at DESC);

INSERT INTO atlas_sources (id, title, organisation, href, method, status) VALUES
  ('monarch-migration', 'Overwintering areas and migratory routes of the monarch butterfly', 'The Canadian Entomologist', 'https://doi.org/10.4039/Ent1091583-12', 'Twenty-five years of tagging and release-recapture records', 'Cited route evidence; geometry review pending'),
  ('lesser-long-nosed-bat-migration', 'Leptonycteris yerbabuenae', 'Mammalian Species', 'https://doi.org/10.1644/797.1', 'Published synthesis of seasonal occupancy and migration routes', 'Cited route evidence; geometry review pending'),
  ('rufous-hummingbird-migration', 'Using continental-scale bird banding data to estimate demographic migratory patterns for Rufous Hummingbird', 'Avian Conservation and Ecology', 'https://doi.org/10.5751/ACE-01612-150202', 'Continental bird-banding data', 'Cited route evidence; geometry review pending'),
  ('white-winged-dove-migration', 'Feather isotope analysis reveals differential patterns of habitat and resource use in populations of white-winged doves', 'Journal of Wildlife Management / USGS', 'https://doi.org/10.1002/jwmg.916', 'Feather isotope analysis of migratory populations', 'Cited route evidence; geometry review pending'),
  ('painted-lady-migration', 'Discovery of mass migration and breeding of the painted lady butterfly Vanessa cardui in the Sub-Sahara', 'Biological Journal of the Linnean Society', 'https://doi.org/10.1111/bij.12873', 'Field evidence and revised Europe-Africa migration model', 'Cited route evidence; geometry review pending'),
  ('wandering-glider-migration', 'Transoceanic migration network of dragonfly Pantala flavescens', 'Frontiers in Ecology and Evolution', 'https://doi.org/10.3389/fevo.2023.1152384', 'Wind, energetics and observation-informed route model', 'Cited route evidence; geometry review pending'),
  ('straw-coloured-fruit-bat-migration', 'Pronounced Seasonal Changes in the Movement Ecology of the African Straw-Coloured Fruit Bat', 'PLOS ONE', 'https://doi.org/10.1371/journal.pone.0138985', 'GPS and acceleration logger study', 'Cited movement evidence; continent-scale geometry review pending'),
  ('vanessa-cardui-atlantic-2013', 'Butterflies cross the Atlantic Ocean as evidenced by a transoceanic migration event', 'Nature Communications', 'https://www.nature.com/articles/s41467-024-49079-2', '2013 observation assessed with genomics, isotope, pollen and wind evidence', 'Cited documented crossing; geometry review pending'),
  ('deaths-head-hawkmoth-migration', 'Understanding insect migration behaviour and pathways using individual tracking and radar', 'European Commission CORDIS', 'https://cordis.europa.eu/project/id/795568/reporting', 'Individual radio-telemetry and entomological radar', 'Cited movement evidence; continent-scale geometry review pending'),
  ('nasa-firms', 'NASA FIRMS', 'NASA Earthdata', 'https://firms.modaps.eosdis.nasa.gov/', 'Satellite active-fire detections', 'Operational data source'),
  ('effis', 'European Forest Fire Information System', 'Copernicus Emergency Management Service', 'https://effis.emergency.copernicus.eu/', 'European burned-area records and fire information', 'Operational data source'),
  ('modis-burned-area', 'MODIS Burned Area Monthly Global 500 m', 'NASA LP DAAC', 'https://lpdaac.usgs.gov/products/mcd64a1v061/', 'Satellite-derived monthly burned-area product', 'Historical burned-area candidate source; reviewed GeoJSON export required'),
  ('movebank', 'Movebank Data Repository', 'Max Planck Institute / University of Konstanz', 'https://www.movebank.org/cms/movebank-content/data-repository', 'Animal tracking datasets; study-specific permissions apply', 'Candidate source; study-by-study review required'),
  ('gbif', 'GBIF Occurrence API', 'Global Biodiversity Information Facility', 'https://techdocs.gbif.org/en/openapi/v1/occurrence', 'Species occurrence context, not migration telemetry', 'Context-only source'),
  ('copernicus-projections', 'Copernicus Climate Projections', 'Copernicus Climate Change Service', 'https://climate.copernicus.eu/climate-projections', 'Climate projection inputs for reviewed fire-risk scenarios', 'Scenario source; reviewed derived tiles required')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, organisation = EXCLUDED.organisation, href = EXCLUDED.href,
  method = EXCLUDED.method, status = EXCLUDED.status, updated_at = NOW();

INSERT INTO pollinator_routes (id, colour, name, scientific_name, source_id, method, geometry, dashed) VALUES
  ('eastern-monarch', '#f7c948', '{"en":"Eastern monarch","es":"Monarca oriental"}', 'Danaus plexippus', 'monarch-migration', '{"en":"Published tagging and release-recapture synthesis","es":"Síntesis publicada de marcaje y recaptura"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-100,19],[-96,29],[-89,39],[-78,45]]}}', FALSE),
  ('western-monarch', '#f59e0b', '{"en":"Western monarch","es":"Monarca occidental"}', 'Danaus plexippus', 'monarch-migration', '{"en":"Published tagging and release-recapture synthesis","es":"Síntesis publicada de marcaje y recaptura"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-110,23],[-117,33],[-121,40],[-122,47]]}}', FALSE),
  ('lesser-long-nosed-bat', '#fb923c', '{"en":"Lesser long-nosed bat","es":"Murciélago hocicudo menor"}', 'Leptonycteris yerbabuenae', 'lesser-long-nosed-bat-migration', '{"en":"Published seasonal migration synthesis","es":"Síntesis publicada de migración estacional"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-103,17],[-107,25],[-111,31]]}}', FALSE),
  ('rufous-hummingbird', '#fb7185', '{"en":"Rufous hummingbird","es":"Colibrí rufo"}', 'Selasphorus rufus', 'rufous-hummingbird-migration', '{"en":"Continental banding-data migration model","es":"Modelo migratorio con datos continentales de anillamiento"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-100,15],[-109,29],[-117,41],[-123,56]]}}', FALSE),
  ('white-winged-dove', '#2dd4bf', '{"en":"White-winged dove","es":"Paloma aliblanca"}', 'Zenaida asiatica', 'white-winged-dove-migration', '{"en":"Feather-isotope migration evidence","es":"Evidencia migratoria mediante isótopos de plumas"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-101,18],[-99,27],[-97,37]]}}', FALSE),
  ('painted-lady', '#86efac', '{"en":"Painted lady","es":"Mariposa cardera"}', 'Vanessa cardui', 'painted-lady-migration', '{"en":"Published Europe-Africa migration synthesis","es":"Síntesis publicada de la migración Europa-África"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-7,31],[5,40],[20,48],[35,53]]}}', FALSE),
  ('wandering-glider', '#60a5fa', '{"en":"Wandering glider","es":"Libélula migratoria"}', 'Pantala flavescens', 'wandering-glider-migration', '{"en":"Wind and energetics route model","es":"Modelo de ruta basado en viento y energía"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[52,-8],[78,-4],[105,7],[118,23]]}}', FALSE),
  ('deaths-head-hawkmoth', '#c084fc', '{"en":"Death''s-head hawkmoth","es":"Esfinge de la calavera"}', 'Acherontia atropos', 'deaths-head-hawkmoth-migration', '{"en":"Individual radio-telemetry and radar evidence","es":"Evidencia mediante radiotelemetría individual y radar"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[29,-5],[31,14],[27,30],[35,42]]}}', FALSE),
  ('straw-coloured-fruit-bat', '#fdba74', '{"en":"Straw-coloured fruit bat","es":"Murciélago frugívoro pajizo"}', 'Eidolon helvum', 'straw-coloured-fruit-bat-migration', '{"en":"GPS and acceleration logger study","es":"Estudio con GPS y registradores de aceleración"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[17,-12],[22,1],[16,16]]}}', FALSE),
  ('vanessa-cardui-2013', '#f8fafc', '{"en":"Vanessa cardui transatlantic crossing (2013)","es":"Cruce transatlántico de Vanessa cardui (2013)"}', 'Vanessa cardui', 'vanessa-cardui-atlantic-2013', '{"en":"Documented crossing assessed with multi-method evidence","es":"Cruce documentado evaluado con evidencia multimétodo"}', '{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-57,7],[-42,12],[-28,17],[-16,25]]}}', TRUE)
ON CONFLICT (id) DO UPDATE SET
  colour = EXCLUDED.colour, name = EXCLUDED.name, scientific_name = EXCLUDED.scientific_name,
  source_id = EXCLUDED.source_id, method = EXCLUDED.method, geometry = EXCLUDED.geometry,
  dashed = EXCLUDED.dashed, updated_at = NOW();
