"use client";
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../../lib/useTranslation';
import { useParams } from 'next/navigation';

const COUNTRIES = [
  {
    slug: 'spain', san: 'SAN·00034', continent: 'Europe',
    name: { es: 'España', en: 'Spain', de: 'Spanien' },
    flower: { es: 'Clavel', en: 'Carnation', de: 'Nelke' },
    scientific: 'Dianthus caryophyllus',
    status: 'declared', conservation: 'good',
    declaration: { en: 'Declared by royal decree', es: 'Declarada por decreto real', de: 'Per Königlichem Dekret erklärt' },
    history: {
      en: 'The carnation, a symbol of passion and pride in Spanish culture, has been the national flower since time immemorial. Its presence is ubiquitous in popular festivities, from the April Fair in Seville to the corridas. The most cultivated variety in Spain, the Mediterranean carnation, grows on the sunny slopes of the south and is exported worldwide. Its name derives from the Latin caro, flesh, a reference to its original pink-flesh colour before centuries of selective cultivation produced the full spectrum now available.',
      es: 'El clavel, símbolo de pasión y orgullo en la cultura española, ha sido la flor nacional desde tiempos inmemoriales. Su presencia es omnipresente en las festividades populares, desde la Feria de Abril de Sevilla hasta las corridas de toros. La variedad más cultivada en España, el clavel mediterráneo, crece en las laderas soleadas del sur y es exportada a todo el mundo.',
      de: 'Die Nelke, Symbol der Leidenschaft und des Stolzes in der spanischen Kultur, ist seit jeher die Nationalblume. Ihre Präsenz ist allgegenwärtig bei Volksfesten, von der Aprilmesse in Sevilla bis zu den Stierkämpfen. Die am häufigsten angebaute Sorte, die Mittelmeer-Nelke, wächst an den sonnigen Hängen des Südens.',
    },
    series: '001', volume: 'I',
  },
  {
    slug: 'germany', san: 'SAN·00049', continent: 'Europe',
    name: { es: 'Alemania', en: 'Germany', de: 'Deutschland' },
    flower: { es: 'Aciano', en: 'Cornflower', de: 'Kornblume' },
    scientific: 'Centaurea cyanus',
    status: 'declared', conservation: 'good',
    declaration: { en: 'Declared by federal law', es: 'Declarada por ley federal', de: 'Per Bundesgesetz erklärt' },
    history: {
      en: 'The blue cornflower was adopted as a national symbol during the 19th century, linked to the Prussian monarchy. Queen Louise of Prussia wove cornflowers into her crowns during the Napoleonic retreat. Today it is an emblem of the German conservation movement. Once common in wheat fields, intensive farming drove it to near-extinction — its resurgence is now tracked as an indicator of agricultural biodiversity health.',
      es: 'El aciano azul fue adoptado como símbolo nacional durante el siglo XIX, vinculado a la monarquía prusiana. La reina Luisa de Prusia tejía acianos en sus coronas durante la retirada napoleónica. Hoy es emblema del movimiento conservacionista alemán.',
      de: 'Die blaue Kornblume wurde im 19. Jahrhundert als nationales Symbol angenommen, verbunden mit der preußischen Monarchie. Königin Luise von Preußen flocht Kornblumen in ihre Kränze. Heute ist sie ein Emblem der deutschen Naturschutzbewegung.',
    },
    series: '001', volume: 'I',
  },
  {
    slug: 'peru', san: 'SAN·00051', continent: 'South America',
    name: { es: 'Perú', en: 'Peru', de: 'Peru' },
    flower: { es: 'Cantuta', en: 'Cantuta', de: 'Kantuta' },
    scientific: 'Cantua buxifolia',
    status: 'declared', conservation: 'vulnerable',
    declaration: { en: 'Declared national flower by Law No. 16687', es: 'Declarada flor nacional por Ley N.° 16687', de: 'Per Gesetz Nr. 16687 zur Nationalblume erklärt' },
    history: {
      en: 'The cantuta, called "the sacred flower of the Incas," was considered divine by the Tahuantinsuyo. Its tubular red, yellow, and white flowers represent the colours of the wiphala, the Andean flag. It grows in inter-Andean valleys between 2,500 and 3,800 metres altitude. Due to habitat loss and agricultural encroachment, it is now classified as vulnerable by the IUCN.',
      es: 'La cantuta, llamada "la flor sagrada de los Incas", era considerada divina por el Tahuantinsuyo. Sus flores tubulares de colores rojo, amarillo y blanco representan los colores de la wiphala. Crece en los valles interandinos entre 2.500 y 3.800 metros de altitud.',
      de: 'Die Kantuta, die "heilige Blume der Inkas", galt im Tahuantinsuyo als göttlich. Ihre röhrenförmigen Blüten in Rot, Gelb und Weiß symbolisieren die Farben der Wiphala, der Andenfahne.',
    },
    series: '001', volume: 'I',
  },
  {
    slug: 'scotland', san: 'SAN·00826', continent: 'Europe',
    name: { es: 'Escocia', en: 'Scotland', de: 'Schottland' },
    flower: { es: 'Cardo', en: 'Thistle', de: 'Distel' },
    scientific: 'Onopordum acanthium',
    status: 'declared', conservation: 'good',
    declaration: { en: 'National heraldic emblem since the 15th century', es: 'Emblema heráldico nacional desde el siglo XV', de: 'Nationales Wappenzeichen seit dem 15. Jahrhundert' },
    history: {
      en: 'According to legend, Norse invaders attempting a night attack on a Scottish camp stepped barefoot on thistles; their cries woke the defenders. The thistle became a symbol of resilience. It appears on Scottish currency and in the Order of the Thistle, Scotland\'s highest honour. The species recorded in heraldry is Onopordum acanthium, though some historians argue the original was Cirsium vulgare.',
      es: 'Según la leyenda, invasores nórdicos que atacaban un campamento escocés pisaron cardos descalzos y sus gritos despertaron a los defensores. El cardo pasó a ser símbolo de resistencia. Aparece en la moneda escocesa y en la Orden del Cardo.',
      de: 'Der Legende nach traten nordische Invasoren bei einem nächtlichen Angriff auf schottisches Lager barfuß auf Disteln, und ihre Schreie weckten die Verteidiger. Die Distel wurde zum Symbol der Widerstandskraft.',
    },
    series: '001', volume: 'I',
  },
  {
    slug: 'pakistan', san: 'SAN·00586', continent: 'Asia',
    name: { es: 'Pakistán', en: 'Pakistan', de: 'Pakistan' },
    flower: { es: 'Jazmín', en: 'Jasmine', de: 'Jasmin' },
    scientific: 'Jasminum officinale',
    status: 'declared', conservation: 'good',
    declaration: { en: 'Declared official national flower', es: 'Declarado flor nacional oficial', de: 'Zur offiziellen Nationalblume erklärt' },
    history: {
      en: 'White jasmine is inseparable from Pakistani culture: its garlands adorn weddings, receptions, and shrines. Its fragrance, more intense at nightfall, symbolises hospitality and purity. In the Indian subcontinent, it has been cultivated for more than three thousand years. The plant is also central to the attars — traditional concentrated perfumes — produced in cities like Kannauj.',
      es: 'El jazmín blanco es inseparable de la cultura paquistaní: sus guirnaldas adornan bodas, recepciones y templos. Su fragancia, más intensa al caer la noche, simboliza la hospitalidad y la pureza. En el subcontinente indio, ha sido cultivado durante más de tres mil años.',
      de: 'Der weiße Jasmin ist untrennbar mit der pakistanischen Kultur verbunden: Girlanden schmücken Hochzeiten, Empfänge und Schreine. Sein Duft, der bei Einbruch der Nacht intensiver wird, symbolisiert Gastfreundschaft und Reinheit.',
    },
    series: '001', volume: 'I',
  },
  {
    slug: 'jamaica', san: 'SAN·00388', continent: 'Caribbean',
    name: { es: 'Jamaica', en: 'Jamaica', de: 'Jamaika' },
    flower: { es: 'Palo Santo', en: 'Lignum Vitae', de: 'Guajakholz' },
    scientific: 'Guaiacum officinale',
    status: 'declared', conservation: 'endangered',
    declaration: { en: 'National emblem since independence in 1962', es: 'Emblema nacional desde la independencia de 1962', de: 'Nationales Emblem seit der Unabhängigkeit 1962' },
    history: {
      en: 'Lignum Vitae — "wood of life" — produces one of the hardest, densest woods in the world. Its blue-violet flowers bloom for centuries; the tree can live more than 1,000 years. Its resin was historically used as a treatment for syphilis. Today it is endangered due to over-logging across the Caribbean. Jamaica\'s coat of arms depicts the tree, making its conservation a matter of national identity.',
      es: 'El Palo Santo produce una de las maderas más duras del mundo. Sus flores azul-violeta pueden florecer durante siglos; el árbol puede vivir más de 1.000 años. Su resina fue históricamente utilizada como remedio. Hoy está en peligro de extinción por la sobrexplotación maderera.',
      de: 'Guajakholz liefert eines der härtesten Hölzer der Welt. Seine blauvioletten Blüten können jahrhundertelang blühen; der Baum kann über 1.000 Jahre alt werden. Heute ist er durch übermäßigen Holzeinschlag gefährdet.',
    },
    series: '001', volume: 'I',
  },
  {
    slug: 'tanzania', san: 'SAN·00834', continent: 'Africa',
    name: { es: 'Tanzania', en: 'Tanzania', de: 'Tansania' },
    flower: { es: 'Gloriosa Superba', en: 'Gloriosa Superba', de: 'Gloriosa' },
    scientific: 'Gloriosa superba',
    status: 'declared', conservation: 'vulnerable',
    declaration: { en: 'Declared official national flower of Tanzania', es: 'Declarada flor nacional oficial de Tanzania', de: 'Zur offiziellen Nationalblume Tansanias erklärt' },
    history: {
      en: 'Gloriosa superba is one of the most extraordinary flowers in the world: its wavy red and yellow petals curve backwards like flames. A climbing plant, the entire plant contains colchicine — a compound used in modern medicine for gout — making it highly toxic if ingested. In Tanzania it grows wild in coastal forests and has been used in traditional medicine for centuries.',
      es: 'La Gloriosa superba es una de las flores más extraordinarias del mundo: sus pétalos ondulados de color rojo y amarillo se curvan hacia atrás como llamas. Toda la planta contiene colchicina. En Tanzania crece silvestre en los bosques costeros.',
      de: 'Gloriosa superba ist eine der außergewöhnlichsten Blumen der Welt: ihre welligen rot-gelben Blütenblätter wölben sich wie Flammen nach hinten. Die gesamte Pflanze enthält Colchicin. In Tansania wächst sie wild in Küstenwäldern.',
    },
    series: '001', volume: 'I',
  },
  {
    slug: 'nicaragua', san: 'SAN·00558', continent: 'Central America',
    name: { es: 'Nicaragua', en: 'Nicaragua', de: 'Nicaragua' },
    flower: { es: 'Sacuanjoche', en: 'Sacuanjoche', de: 'Sacuanjoche' },
    scientific: 'Plumeria rubra',
    status: 'declared', conservation: 'good',
    declaration: { en: 'Declared national flower by legislative decree', es: 'Declarada flor nacional por decreto legislativo', de: 'Per Legislativdekret zur Nationalblume erklärt' },
    history: {
      en: 'The sacuanjoche takes its name from the Nahuatl sacuan-xochitl, meaning yellow flower. Its five white petals with a yellow centre emit a sweet, persistent fragrance. It blooms in the dry season — December to April — and adorns gardens, parks, and cemeteries equally. Plumeria rubra is also called frangipani, a name it shares with the Italian nobleman who first compounded a perfume to match its scent.',
      es: 'El sacuanjoche toma su nombre del náhuatl sacuan-xochitl, flor amarilla. Sus cinco pétalos blancos con centro amarillo desprenden una fragancia dulce y persistente. Florece en la estación seca, de diciembre a abril.',
      de: 'Die Sacuanjoche nimmt ihren Namen vom Nahuatl sacuan-xochitl, gelbe Blume. Ihre fünf weißen Blütenblätter mit gelbem Zentrum verströmen einen süßen, anhaltenden Duft.',
    },
    series: '001', volume: 'I',
  },
];

const conservationStyle = {
  good:        { color: '#166534', label: 'Good Standing' },
  vulnerable:  { color: '#92400e', label: 'Vulnerable' },
  endangered:  { color: '#991b1b', label: 'Endangered' },
};

const S3_GLB_BASE = "https://aquamundi-glb-models.s3.ap-south-1.amazonaws.com";

const MODEL_BY_SLUG = {
  spain: ["Espana_Carnation.glb", "Flower_America_Web.glb"],
  germany: ["Alemania_Cornflower.glb", "Onopordum_Acanthium.glb"],
  peru: ["Peru_Cantuta.glb", "Dalia.glb"],
  scotland: ["Onopordum_Acanthium.glb", "Espana_Carnation.glb"],
  pakistan: ["Pakistani_Jasmine.glb", "Indonesia_Jazmine.glb"],
  jamaica: ["Lignum_Vitae_Textured.glb", "King_Protea.glb"],
  tanzania: ["Tanzania_Clove.glb", "King_Protea.glb"],
  nicaragua: ["Nicaragua_Sacuanjoche.glb", "National_music/Argentina_Ceibo.glb"],
};

function createGLBProxyPath(fileName) {
  return `/api/glb-proxy?url=${encodeURIComponent(`${S3_GLB_BASE}/${fileName}`)}`;
}

function CountryModelViewer({ modelUrls, title }) {
  const mountRef = useRef(null);
  const [modelState, setModelState] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    let renderer = null;
    let controls = null;
    let scene = null;
    let camera = null;
    let frameId = null;
    const cleanupFns = [];
    const mount = mountRef.current;

    async function init() {
      const urls = Array.isArray(modelUrls) ? modelUrls.filter(Boolean) : [];
      if (!mount || urls.length === 0) return;
      setModelState("loading");
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        if (cancelled || !mount) return;
        mount.innerHTML = "";

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f8f5);

        camera = new THREE.PerspectiveCamera(
          42,
          mount.clientWidth / mount.clientHeight,
          0.1,
          100,
        );
        camera.position.set(0, 1.2, 3.4);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.shadowMap.enabled = true;
        mount.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        controls.minDistance = 1.8;
        controls.maxDistance = 6;
        controls.minPolarAngle = Math.PI / 4.4;
        controls.maxPolarAngle = Math.PI / 1.8;

        const key = new THREE.DirectionalLight(0xffffff, 1.12);
        key.position.set(4, 6, 4);
        key.castShadow = true;
        scene.add(key);
        scene.add(new THREE.AmbientLight(0xffffff, 0.45));
        const fill = new THREE.DirectionalLight(0xe7f2ff, 0.35);
        fill.position.set(-3, 2, -3);
        scene.add(fill);

        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(20, 20),
          new THREE.ShadowMaterial({ opacity: 0.16 }),
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        scene.add(ground);

        const draco = new DRACOLoader();
        draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
        const loader = new GLTFLoader();
        loader.setDRACOLoader(draco);
        loader.setCrossOrigin("anonymous");

        cleanupFns.push(() => draco.dispose());

        const loadByIndex = (index) => {
          if (cancelled) return;
          if (index >= urls.length) {
            setModelState("error");
            return;
          }

          loader.load(
            urls[index],
            (gltf) => {
              if (cancelled) return;
              const model = gltf.scene;
              model.traverse((node) => {
                if (node.isMesh) {
                  node.castShadow = true;
                  node.receiveShadow = true;
                  if (node.material) {
                    node.material.needsUpdate = true;
                  }
                }
              });

              const box = new THREE.Box3().setFromObject(model);
              const size = box.getSize(new THREE.Vector3());
              const center = box.getCenter(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z) || 1;
              const scale = 1.75 / maxDim;

              model.scale.setScalar(scale);
              model.position.sub(center.multiplyScalar(scale));
              scene.add(model);
              controls.target.set(0, 0, 0);
              setModelState("ready");
            },
            undefined,
            () => {
              loadByIndex(index + 1);
            },
          );
        };

        loadByIndex(0);

        const onResize = () => {
          if (!mountRef.current || !camera || !renderer) return;
          const mount = mountRef.current;
          camera.aspect = mount.clientWidth / mount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener("resize", onResize);
        cleanupFns.push(() => window.removeEventListener("resize", onResize));

        const tick = () => {
          if (cancelled || !renderer || !scene || !camera || !controls) return;
          controls.update();
          renderer.render(scene, camera);
          frameId = requestAnimationFrame(tick);
        };
        tick();
      } catch {
        if (!cancelled) setModelState("error");
      }
    }

    init();

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
      cleanupFns.forEach((fn) => fn());
      if (controls) controls.dispose();
      if (renderer) renderer.dispose();
      if (mount) mount.innerHTML = "";
    };
  }, [modelUrls]);

  return (
    <section style={{ marginBottom: '3rem', border: '1px solid #e5e5e5', background: '#fafaf7' }}>
      <div style={{ padding: '0.9rem 1rem', borderBottom: '1px solid #e5e5e5' }}>
        <p style={{ margin: 0, fontSize: '0.6125rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#88917e' }}>
          3D Flower Model
        </p>
        <p style={{ margin: '0.35rem 0 0', fontSize: '0.8125rem', color: '#5f5f5f' }}>
          {title} · drag to rotate · scroll to zoom
        </p>
      </div>
      <div ref={mountRef} style={{ width: '100%', height: 'min(56vw, 460px)', minHeight: '270px', maxHeight: '460px' }} />
      {modelState !== "ready" && (
        <div style={{ padding: '0.8rem 1rem 1rem', borderTop: '1px solid #efefef' }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#7a7a7a' }}>
            {modelState === "loading"
              ? "Loading GLB model from AWS..."
              : "3D model unavailable for this country right now."}
          </p>
        </div>
      )}
    </section>
  );
}

function ProfileContent() {
  const params = useParams();
  const { locale } = useTranslation();
  const lang = ['en', 'es', 'de'].includes(locale) ? locale : 'en';
  const c = COUNTRIES.find(x => x.slug === params.slug);

  if (!c) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <p style={{ fontSize: '0.875rem', color: '#aaa' }}>Profile not found or not yet published.</p>
        <Link href="/archive" style={{ fontSize: '0.8125rem', color: '#2D6A4F', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <ArrowLeft size={13} /> Return to The Flower Archive
        </Link>
      </div>
    );
  }

  const name = c.name[lang] || c.name.en;
  const flower = c.flower[lang] || c.flower.en;
  const declaration = c.declaration?.[lang] || c.declaration?.en;
  const history = c.history?.[lang] || c.history?.en;
  const cs = conservationStyle[c.conservation] || conservationStyle.good;
  const modelFiles = MODEL_BY_SLUG[c.slug] || [];
  const modelUrls = modelFiles.map((fileName) => createGLBProxyPath(fileName));

  const sd = {
    "@context": "https://schema.org", "@type": "Article",
    "name": `${name} — National Flower: ${flower}`,
    "description": `${flower} (${c.scientific}), the national flower of ${name}. Conservation: ${cs.label}. ${c.san}.`,
    "url": `https://asociacionnahiara.org/archive/${c.slug}`,
    "publisher": { "@type": "Organization", "name": "Asociación Internacional en Defensa de las Flores" },
    "keywords": `national flower ${name}, ${flower}, ${c.scientific}, ${c.san}`,
  };

  return (
    <main style={{ background: '#fff', fontFamily: "'Inter', system-ui, sans-serif", color: '#111', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sd) }} />

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '3.25rem',
      }}>
        <Link href="/archive" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#666', textDecoration: 'none', fontWeight: 500 }}>
          <ArrowLeft size={13} strokeWidth={2} /> The Flower Archive
        </Link>
        <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#aaa', fontFamily: 'monospace' }}>
          {c.san}
        </span>
      </nav>

      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <header style={{ padding: '4rem 0 3rem', borderBottom: '1px solid #111' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '1.25rem' }}>
            {c.continent} · Series {c.series} · Volume {c.volume}
          </p>
          <h1 style={{
            fontFamily: "'Outfit', 'Inter', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1, margin: '0 0 1rem',
          }}>
            {name}
          </h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0 0 0.25rem' }}>{flower}</p>
          <p style={{ fontSize: '1rem', color: '#888', fontStyle: 'italic', margin: 0 }}><em>{c.scientific}</em></p>
        </header>

        {modelUrls.length > 0 && <CountryModelViewer modelUrls={modelUrls} title={`${name} · ${flower}`} />}

        {/* Meta row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid #e5e5e5', marginBottom: '3rem' }}>
          {[
            { label: 'Conservation', value: cs.label, color: cs.color },
            { label: 'Declaration', value: declaration },
            { label: 'SAN Code', value: c.san, mono: true },
          ].map(({ label, value, color, mono }) => (
            <div key={label} style={{ padding: '1.5rem 0', borderRight: '1px solid #e5e5e5', paddingRight: '1.5rem', marginRight: '1.5rem', ':last-child': { border: 'none' } }}>
              <p style={{ fontSize: '0.6125rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', marginBottom: '0.4rem' }}>{label}</p>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: color || '#111', fontFamily: mono ? 'monospace' : 'inherit', lineHeight: 1.4 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Three-language names */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.6125rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#bbb', marginBottom: '1rem' }}>
            Country name — ES / EN / DE
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid #e5e5e5' }}>
            {['es', 'en', 'de'].map((l, i) => (
              <div key={l} style={{ padding: '1.25rem', borderRight: i < 2 ? '1px solid #e5e5e5' : 'none' }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ccc', marginBottom: '0.4rem' }}>{l.toUpperCase()}</p>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.1rem' }}>{c.name[l]}</p>
                <p style={{ fontSize: '0.8125rem', color: '#777' }}>{c.flower[l]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        {history && (
          <section style={{ marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.6125rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#bbb', marginBottom: '1.5rem' }}>
              Flower History
            </p>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: '#222' }}>{history}</p>
            <p style={{ fontSize: '0.75rem', color: '#ccc', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f0f0f0' }}>
              Editorial text · Nur Hosen · Asociación Internacional en Defensa de las Flores
            </p>
          </section>
        )}

        {/* Philatelic */}
        <section style={{ marginBottom: '3rem', padding: '2rem', background: '#fafafa', border: '1px dashed #e0e0e0' }}>
          <p style={{ fontSize: '0.6125rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#bbb', marginBottom: '0.75rem' }}>
            Philatelic Stamp
          </p>
          <p style={{ fontSize: '0.875rem', color: '#aaa', lineHeight: 1.6 }}>
            Image pending rights verification. Only public domain or licensed stamps are published in The Flower Archive.
          </p>
        </section>

        {/* Links */}
        {(c.series || c.volume) && (
          <section style={{ marginBottom: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {c.series && (
              <div style={{ padding: '1rem 1.5rem', border: '1px solid #e5e5e5', fontSize: '0.8125rem' }}>
                <p style={{ fontSize: '0.6125rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#bbb', marginBottom: '0.25rem' }}>Card Game</p>
                <p style={{ fontWeight: 600, color: '#111' }}>Series {c.series}</p>
              </div>
            )}
            {c.volume && (
              <div style={{ padding: '1rem 1.5rem', border: '1px solid #e5e5e5', fontSize: '0.8125rem' }}>
                <p style={{ fontSize: '0.6125rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#bbb', marginBottom: '0.25rem' }}>Book</p>
                <p style={{ fontWeight: 600, color: '#111' }}>Volume {c.volume}</p>
              </div>
            )}
          </section>
        )}

        {/* Back */}
        <div style={{ borderTop: '1px solid #e5e5e5', padding: '2rem 0', marginBottom: '2rem' }}>
          <Link href="/archive" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#2D6A4F', textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={13} strokeWidth={2} /> Return to The Flower Archive
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CountryProfilePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <ProfileContent />
    </Suspense>
  );
}
