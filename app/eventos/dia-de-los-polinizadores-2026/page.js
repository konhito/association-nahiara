import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { Baskervville } from "next/font/google";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock,
  Copy,
  Globe2,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import deMessages from "../../../messages/de.json";
import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";
import frMessages from "../../../messages/fr.json";
import itMessages from "../../../messages/it.json";
import zhMessages from "../../../messages/zh.json";

const displayFont = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const PAGE_PATH = "/eventos/dia-de-los-polinizadores-2026";
const PAGE_URL = `https://asociacionnahiara.org${PAGE_PATH}`;
const EVENT_POSTER_IMAGE = "/events/eventosdia-de-los-polinizadores-2026.jpeg";
const EVENT_POSTER_URL = `https://asociacionnahiara.org${EVENT_POSTER_IMAGE}`;
const MANIFESTO_PDF_URL = "/events/day-of-all-pollinators-manifesto.pdf";
const EVENT_MAP_URL = "https://maps.google.com/?cid=261711776052733802";
const EVENT_FILM_EMBED_URL =
  "https://www.youtube-nocookie.com/embed/HdpjOvamzgY?rel=0&modestbranding=1";
const SCIENTIX_EVENT_URL =
  "https://www.scientix.eu/news-events/events/event?id=110402";

const eventDetails = {
  date: "21 June 2026",
  time: "11:00 - 14:00 h",
  location: "La Blanca, Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
  exactVenue:
    "La Blanca - Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
  latitude: 27.8532696,
  longitude: -15.4607353,
  audienceEs: "Gratis - No requiere inscripcion",
  audienceEn: "Free - No registration required",
  organizer:
    "Universo Nahiara - Asociacion Internacional en Defensa de las Flores (Proveneya & Nahiara)",
  collaborators: [
    "Asociacion de Vecinos Yniguaden de La Blanca Cercados Bolanos",
    "Concejalia de Participacion Ciudadana del Ayuntamiento de Santa Lucia de Tirajana",
  ],
  contact: "contacto@asociacionnahiara.org",
};

const eventDayPhotos = [
  {
    src: "/events/dia-de-los-polinizadores-2026/photos/event-day-01.jpeg",
    width: 3024,
    height: 4032,
    className: "lg:row-span-2",
  },
  {
    src: "/events/dia-de-los-polinizadores-2026/photos/event-day-02.jpeg",
    width: 1599,
    height: 899,
  },
  {
    src: "/events/dia-de-los-polinizadores-2026/photos/event-day-03.jpeg",
    width: 3024,
    height: 4032,
  },
  {
    src: "/events/dia-de-los-polinizadores-2026/photos/event-day-04.jpeg",
    width: 4032,
    height: 3024,
    className: "lg:col-span-2",
  },
  {
    src: "/events/dia-de-los-polinizadores-2026/photos/event-day-05.jpeg",
    width: 1125,
    height: 2000,
  },
  {
    src: "/events/dia-de-los-polinizadores-2026/photos/event-day-06.jpeg",
    width: 4032,
    height: 3024,
    className: "lg:col-span-2",
  },
];

function getEventDayPhotoCopy(copy, index) {
  const photoCopy = copy.eventDayPhotos[index] || {};
  const caption = photoCopy.caption || "";
  const secondary = photoCopy.secondary && photoCopy.secondary !== caption ? photoCopy.secondary : "";

  return { caption, secondary };
}

function getArtworkText(drawing, locale) {
  return locale === "es" ? drawing.textEs : drawing.textEn;
}

const extraEventPhotos = Array.from({ length: 22 }, (_, index) => ({
  src: `/events/dia-de-los-polinizadores-2026/extra/extra-photo-${String(index + 1).padStart(2, "0")}.jpeg`,
  alt: `Additional event photo ${index + 1} from the Day of All Pollinators 2026 in La Blanca`,
}));

const artworkDetails = [
  {
    name: null,
    age: null,
    subject: "abeja (obra viva)",
    textEs:
      "Sobre una abeja de trazo minucioso, una mano pequeñisima ha dejado caer el azul, el rojo y el verde en lazos rapidos y felices, sin reparar en los contornos. Es el encuentro entre el dibujo paciente del adulto y el impulso libre de quien apenas empieza a sostener el color: una obra viva en su estado mas puro.",
    textEn:
      "Over a meticulously drawn bee, a tiny hand has let blue, red and green fall in quick, happy loops, heedless of the outlines. It is the meeting of the adult's patient drawing and the free impulse of someone barely beginning to hold colour: a living artwork in its purest state.",
  },
  {
    name: "Maite",
    subject: "ramo de rosas",
    textEs:
      "El ramo entero se enciende en un arcoiris de rosas: una roja, una verde lima, otras en azul, malva y coral, todas apretadas en un mismo abrazo. El color se aplica con energia, saliendose a ratos del petalo, hasta que el conjunto parece vibrar.",
    textEn:
      "The whole bouquet lights up in a rainbow of roses: one red, one lime green, others in blue, mauve and coral, all pressed into a single embrace. The colour is laid down with energy, spilling past the petals here and there, until the whole seems to vibrate.",
  },
  {
    name: "Bri",
    age: 30,
    subject: "himenoptero con higos",
    textEs:
      "Bri reserva el color para los higos, violetas intensos abiertos en un corazon rojo y granate, y deja a su insecto en los grises y negros del grafito, brillante y meticuloso. El contraste hace que la fruta resplandezca junto a la criatura que la hace posible.",
    textEn:
      "Bri saves the colour for the figs, deep violets opening onto a heart of red and crimson, and leaves the insect in the greys and blacks of graphite, glossy and meticulous. The contrast makes the fruit glow beside the creature that makes it possible.",
  },
  {
    name: "Olivia",
    age: 6,
    subject: "mariposa",
    textEs:
      "Olivia viste su mariposa de un rosa encendido y la perfila con un azul profundo que recorre el borde de cada ala como un marco vibrante. La simetria de los dos colores convierte al insecto en una pequeña vidriera en vuelo.",
    textEn:
      "Olivia dresses her butterfly in a bright pink and outlines it with a deep blue that runs along the edge of each wing like a vivid frame. The symmetry of the two colours turns the insect into a small stained-glass window in flight.",
  },
  {
    name: "Owen",
    age: 2,
    subject: "loto (obra viva)",
    textEs:
      "Sobre un loto de petalos finisimos, Owen extiende un manto de grises suaves y deja que algun azul y algun violeta se asomen entre las flores. Es la mirada de quien apenas empieza a pintar posada sobre un dibujo de gran detalle: el comienzo y la maestria compartiendo una misma flor.",
    textEn:
      "Over a lotus of the finest petals, Owen spreads a mantle of soft greys and lets a little blue and violet peek between the flowers. It is the gaze of someone barely beginning to paint, resting upon a drawing of great detail: the beginning and the mastery sharing a single flower.",
  },
  {
    name: "Leia",
    age: 4,
    subject: "mariposa",
    textEs:
      "Leia roza las alas de su mariposa con un amarillo luminoso, justo en el nacimiento, y deja el resto en el blanco del papel para que la luz respire. Unas pinceladas de rojo y azul en las puntas rematan un vuelo apenas insinuado, lleno de aire.",
    textEn:
      "Leia brushes her butterfly's wings with a luminous yellow, right at their base, and leaves the rest in the white of the paper so the light can breathe. A few touches of red and blue at the tips finish a flight only just suggested, full of air.",
  },
  {
    name: "Mia",
    age: 2,
    subject: "abeja y flor de cerezo (obra viva)",
    textEs:
      "Junto a una rama de flores de cerezo y una abeja de tinta, Mia despliega sus propios trazos: lazos de azul, amarillo y un rojo vivo que cruzan la pagina a toda velocidad. La flor cuidada y el garabato gozoso conviven sin estorbarse, cada uno en su tiempo.",
    textEn:
      "Beside a branch of cherry blossom and an inked bee, Mia unfolds her own marks: loops of blue, yellow and a vivid red that race across the page. The careful flower and the joyful scribble live together without crowding one another, each in its own time.",
  },
  {
    name: "Esperanza",
    age: 7,
    subject: "margarita multicolor",
    textEs:
      "Esperanza hace girar una margarita cuyos petalos pasan del lila al azul, al verde, al naranja y al fucsia alrededor de un corazon que deja en blanco. El tallo verde desciende hasta una mata de hierba tupida, y un aro rojizo abraza la flor entera como un sol propio.",
    textEn:
      "Esperanza spins a daisy whose petals move from lilac to blue, green, orange and fuchsia around a heart left white. The green stem drops to a thick tuft of grass, and a reddish ring embraces the whole flower like a sun of its own.",
  },
  {
    name: "Norma",
    age: 53,
    subject: "lemur con flor",
    textEs:
      "Norma da vida a un lemur de pelaje rosado y gris que sostiene, con cuidado, una pequeña flor roja de corazon dorado. La ternura del gesto, un animal que ofrece una flor, concentra toda la calidez de una paleta suave y luminosa.",
    textEn:
      "Norma brings to life a lemur of pink and grey fur, carefully holding a small red flower with a golden heart. The tenderness of the gesture, an animal offering a flower, gathers all the warmth of a soft, luminous palette.",
  },
  {
    name: "Cloe",
    age: 3,
    subject: "mariposa-mandala",
    textEs:
      "Cada celda de esta mariposa recibe un color distinto: turquesas, verdes, rojos, morados y amarillos, hasta convertir las alas en un mosaico que no descansa. El cuerpo, en rojo terroso, ancla tanta fiesta de color en un centro calido.",
    textEn:
      "Each cell of this butterfly receives a different colour: turquoises, greens, reds, purples and yellows, until the wings become a mosaic that never rests. The body, in earthy red, anchors all that festival of colour in a warm centre.",
  },
  {
    name: null,
    subject: "mariposa botanica",
    textEs:
      "Esta mariposa luce las alas superiores en un coral moteado de pardo y las inferiores en un amarillo calido bordeado de negro, posada sobre un follaje que se enciende en verde vivo. El contraste entre el insecto coloreado y las plantas a medio teñir lo hace destacar como protagonista del jardin.",
    textEn:
      "This butterfly wears its upper wings in fawn-speckled coral and its lower ones in a warm yellow rimmed with black, perched on foliage that glows vivid green. The contrast between the coloured insect and the half-tinted plants makes it stand out as the garden's protagonist.",
  },
  {
    name: "Eyzen",
    age: 7,
    subject: "abeja entre hortalizas",
    textEs:
      "Una gran abeja de cuerpo amarillo y negro y cabeza fucsia ocupa el centro, rodeada de un huerto entero: cebollas moradas, zanahorias, perejil, coloreado a mano alzada. El insecto y las hortalizas comparten pagina como aliados de una misma cosecha.",
    textEn:
      "A large bee with a yellow-and-black body and fuchsia head takes the centre, surrounded by a whole vegetable garden: purple onions, carrots, parsley, coloured freehand. Insect and vegetables share the page as allies of a single harvest.",
  },
  {
    name: null,
    subject: "pajaro (motivo no polinizador)",
    textEs:
      "Un pajaro de plumaje gris y alas teñidas de verde se posa sobre un nido de corazones azules y rosados, entre estrellas y volutas color caramelo. La ternura del motivo se sostiene sobre una paleta dulce de rosas, celestes y dorados.",
    textEn:
      "A bird with grey plumage and green-tinged wings rests on a nest of blue and pink hearts, among stars and caramel-coloured scrolls. The tenderness of the motif rests on a sweet palette of pinks, light blues and golds.",
  },
  {
    name: "Aynara",
    subject: "flor estrellada azul",
    textEs:
      "Aynara abre una flor estrellada de petalos azules afilados en torno a un corazon naranja y amarillo que arde como una pequeña brasa. El tallo verde se tiende en diagonal, sereno, sosteniendo ese estallido frio y calido a la vez.",
    textEn:
      "Aynara opens a star-shaped flower of sharp blue petals around an orange-and-yellow heart that burns like a small ember. The green stem lies diagonally, serene, holding up that burst at once cool and warm.",
  },
  {
    name: "Maya",
    age: 5,
    subject: "colibri",
    textEs:
      "Maya deja el cuerpo de su colibri en el gris del grafito y guarda todo el color para un ala, donde el azul, el rojo, el amarillo y el violeta se ordenan como un arcoiris desplegado. El contraste convierte ese ala encendida en el corazon mismo del vuelo.",
    textEn:
      "Maya leaves her hummingbird's body in graphite grey and saves all the colour for one wing, where blue, red, yellow and violet line up like an unfurled rainbow. The contrast makes that glowing wing the very heart of the flight.",
  },
  {
    name: "Endra",
    age: 6,
    subject: "abejorro entre frutas",
    textEs:
      "Un abejorro de cuerpo amarillo y negro abre unas alas de un azul intenso y se rodea de frutas, fresas, moras, granadas, esparcidas como un festin por toda la pagina. El azul vibrante de las alas roba el protagonismo en medio de tanto color frutal.",
    textEn:
      "A bumblebee with a yellow-and-black body opens wings of intense blue and surrounds itself with fruit, strawberries, blackberries, pomegranates, scattered like a feast across the page. The vivid blue of the wings steals the show amid all that fruity colour.",
  },
  {
    name: "Kailah",
    subject: "abeja-mandala",
    textEs:
      "Sobre un cuerpo negro y tupido, esta abeja se llena de mandalas diminutos, hexagonos, espirales y triangulos, encendidos en amarillo, rosa, turquesa y rojo. Los grandes ojos en lila y rosa le dan una mirada dulce que contrasta con la intensidad del estampado.",
    textEn:
      "On a dense black body, this bee fills with tiny mandalas, hexagons, spirals and triangles, lit in yellow, pink, turquoise and red. The large lilac-and-pink eyes give it a sweet gaze that contrasts with the intensity of the pattern.",
  },
  {
    name: "Olivia",
    age: 5,
    subject: "abejorro-mandala",
    textEs:
      "Olivia viste a su abejorro de un dorado lleno de mandalas y le reserva unas alas de rosa coral surcadas de nervios oscuros. La carita sonriente y los grandes ojos negros convierten al insecto en un personaje entrañable.",
    textEn:
      "Olivia dresses her bumblebee in a gold full of mandalas and gives it wings of coral pink crossed by dark veins. The smiling little face and big black eyes turn the insect into an endearing character.",
  },
  {
    name: "Teray",
    age: 9,
    subject: "abeja sobre flores rojas",
    textEs:
      "Una abeja de pelaje amarillo y negro, de ojos verdes, se acerca a unos capullos rojos que despuntan entre hojas y una fronda lavanda. El amarillo calido del insecto dialoga con el rojo de las flores y el malva del follaje en un encuentro lleno de vida.",
    textEn:
      "A bee with yellow-and-black fur and green eyes approaches red buds rising among leaves and a lavender frond. The warm yellow of the insect converses with the red of the flowers and the mauve of the foliage in a meeting full of life.",
  },
  {
    name: "Iker",
    age: 5,
    subject: "hormiga con flor",
    textEs:
      "Iker tiñe a su hormiga de un rojo terroso, vigoroso, y le corona la cabeza con una flor roja de corazon turquesa. El insecto, dibujado con detalle, se llena de color con la fuerza de quien aprieta el lapiz para no dejar ni un hueco.",
    textEn:
      "Iker colours his ant an earthy, vigorous red and crowns its head with a red flower with a turquoise heart. The insect, drawn in detail, fills with colour with the force of someone pressing hard to leave no gap.",
  },
  {
    name: "Olivia",
    age: 5,
    subject: "mariquita sobre flor",
    textEs:
      "Una mariquita de caparazon rosado y lunares negros descansa sobre una flor amarilla de petalos suaves. El rojo del insecto y el amarillo de la flor se equilibran con calma, en una escena pequeña y luminosa.",
    textEn:
      "A ladybird with a pink shell and black spots rests on a yellow flower of soft petals. The red of the insect and the yellow of the flower balance calmly, in a small, luminous scene.",
  },
  {
    name: "Alexia",
    age: 9,
    subject: "margaritas botanicas",
    textEs:
      "Alexia deja sus margaritas casi en blanco y reserva el color para lo esencial: el corazon dorado y granulado de la flor, las puntas de los petalos rozadas de rojo y unas hojas en verde fresco. La contencion hace que cada toque de color pese.",
    textEn:
      "Alexia leaves her daisies almost white and saves the colour for the essentials: the flower's golden, grainy heart, the petal tips brushed with red, and a few leaves in fresh green. The restraint makes every touch of colour count.",
  },
  {
    name: "Karim",
    age: 3,
    subject: "girasol (obra viva)",
    textEs:
      "Sobre un girasol de petalos detallados, Karim suelta una tormenta feliz de trazos, morados, azules, rojos y negros, que cubren la flor a toda velocidad. El dibujo cuidado y el garabato libre se funden en una sola energia: pura obra viva.",
    textEn:
      "Over a sunflower of detailed petals, Karim unleashes a happy storm of marks, purples, blues, reds and blacks, that cover the flower at full speed. The careful drawing and the free scribble merge into a single energy: a living artwork through and through.",
  },
  {
    name: "Valentina",
    age: 7,
    subject: "murcielago entre platanos",
    textEs:
      "Un murcielago de alas rosadas vuela entre racimos de platanos amarillos y una gran flor fucsia, justo el lazo invisible que une al animal con la planta que poliniza. El rosa de las alas y el amarillo de la fruta encienden la escena con calidez tropical.",
    textEn:
      "A bat with pink wings flies among bunches of yellow bananas and a large fuchsia flower, precisely the invisible bond that links the animal to the plant it pollinates. The pink of the wings and the yellow of the fruit light the scene with tropical warmth.",
  },
  {
    name: "Aynara",
    age: 7,
    subject: "murcielago entre hojas",
    textEs:
      "Un murcielago de grandes alas malvas y violetas planea sobre un marco de hojas verdes, con el pecho claro y el hocico atento. El contraste entre el cuerpo plateado y las alas teñidas de purpura le da una elegancia nocturna.",
    textEn:
      "A bat with large mauve and violet wings glides over a frame of green leaves, its chest pale and its muzzle alert. The contrast between the silvery body and the purple-tinged wings lends it a nocturnal elegance.",
  },
  {
    name: "Kira",
    age: 10,
    subject: "nenufar azul",
    textEs:
      "Kira abre un nenufar de petalos azules y blancos, afilados y luminosos, en torno a un corazon dorado, posado sobre una hoja verde que flota en el agua. Los reflejos azules del estanque envuelven la flor en una calma fresca y serena.",
    textEn:
      "Kira opens a water lily of blue and white petals, sharp and luminous, around a golden heart, resting on a green leaf afloat on the water. The blue reflections of the pond wrap the flower in a fresh, serene calm.",
  },
  {
    name: "Valeria",
    age: 12,
    subject: "ramo con dedicatoria",
    textEs:
      "Valeria reune un ramo donde cada flor elige su color: una roja, una azul de corazon dorado, una rosa, una amarilla, sobre un follaje de verdes vivos y hojas aun en gris. Junto a su firma deja escritas dos palabras, muchas gracias, que convierten el dibujo en un regalo.",
    textEn:
      "Valeria gathers a bouquet where each flower chooses its colour: one red, one blue with a golden heart, one pink, one yellow, over foliage of vivid greens and leaves still in grey. Beside her signature she writes two words, thank you, turning the drawing into a gift.",
  },
  {
    name: "Maykel",
    age: 5,
    subject: "corazones y nubes",
    textEs:
      "Entre nubes dibujadas a contorno, una hilera de corazones, rojo, rosa, turquesa y azul, flota con largas colas onduladas, salpicada de puntos y de trazos verdes. La pagina entera respira un juego libre y alegre de color.",
    textEn:
      "Among outlined clouds, a row of hearts, red, pink, turquoise and blue, floats with long wavy tails, dotted with specks and green strokes. The whole page breathes a free, joyful play of colour.",
  },
  {
    name: "Melanie y Alexandra",
    age: 28,
    subject: "geco con flor",
    textEs:
      "Melanie y Alexandra dan vida a un geco de un verde fresco y matizado, de ojos amarillos, que acerca el hocico a una flor de corazon azul. La cola anillada en negro y verde y el lomo erizado revelan una observacion atenta y un trabajo a cuatro manos.",
    textEn:
      "Melanie and Alexandra bring to life a gecko in fresh, nuanced green, with yellow eyes, nosing towards a flower with a blue heart. The tail ringed in black and green and the spiny back reveal close observation and four-handed work.",
  },
  {
    name: "Elodie",
    age: 8,
    subject: "ramo de rosas",
    textEs:
      "Elodie compone un ramo presidido por una gran rosa de un rosa empolvado, rodeada de flores en azul celeste, amarillo, coral y lavanda. Las hojas, en verdes serenos, enmarcan un conjunto de delicadeza casi botanica.",
    textEn:
      "Elodie composes a bouquet led by a large rose in a powdery pink, surrounded by flowers in sky blue, yellow, coral and lavender. The leaves, in calm greens, frame an arrangement of almost botanical delicacy.",
  },
  {
    name: null,
    subject: "ramo de crisantemos",
    textEs:
      "Una gran flor de petalos lilas y corazon tupido preside un ramo donde el naranja, el verde, el azul y el rojo asoman entre lineas aun sin colorear. El lila intenso del centro tira de la mirada en medio de un jardin a medio despertar.",
    textEn:
      "A large flower with lilac petals and a dense heart presides over a bouquet where orange, green, blue and red peek between still-uncoloured lines. The intense lilac of the centre draws the eye amid a garden half-awakened.",
  },
  {
    name: "Saray",
    age: 30,
    subject: "murcielago y aguacate",
    textEs:
      "Saray deja a su murcielago en grises plateados, finisimos, y guarda el color para un aguacate abierto, verde intenso con el hueso en rojo, que descansa bajo el vuelo. El animal y el fruto se enlazan en la misma escena, polinizador y planta unidos.",
    textEn:
      "Saray leaves her bat in the finest silvery greys and saves the colour for a halved avocado, deep green with a red stone, resting beneath the flight. Animal and fruit are linked in one scene, pollinator and plant united.",
  },
  {
    name: "Yariela",
    age: 7,
    subject: "rosa",
    textEs:
      "Yariela modela una gran rosa en un rosa suave y empolvado, con cada petalo recorrido por vetas finas que le dan volumen. Las hojas, apenas rozadas de verde, dejan que toda la atencion se quede en la flor.",
    textEn:
      "Yariela models a large rose in a soft, powdery pink, each petal traced with fine veins that give it volume. The leaves, barely brushed with green, let all the attention rest on the flower.",
  },
  {
    name: "Vera",
    age: 8,
    subject: "ramo pastel",
    textEs:
      "Vera reune un ramo en tonos pastel: una margarita amarilla, otra rosa, otra turquesa, entre hojas grises, volutas doradas y bayas rojas. La suavidad de la paleta da al conjunto un aire delicado y luminoso.",
    textEn:
      "Vera gathers a bouquet in pastel tones: one yellow daisy, one pink, one turquoise, among grey leaves, golden scrolls and red berries. The softness of the palette gives the whole a delicate, luminous air.",
  },
  {
    name: "Leon",
    age: 6,
    subject: "colibri",
    textEs:
      "Leon viste a su colibri de un verde lima radiante y le despliega un ala en arcoiris, azul, rojo, amarillo, lila, que contrasta con el cuerpo. El pajaro parece detenido en el aire, a medio aleteo, encendido de color.",
    textEn:
      "Leon dresses his hummingbird in a radiant lime green and spreads one wing in a rainbow, blue, red, yellow, lilac, that contrasts with the body. The bird seems suspended in the air, mid-beat, ablaze with colour.",
  },
  {
    name: "Omar",
    age: 9,
    subject: "nenufar rosa",
    textEs:
      "Omar abre un gran nenufar de petalos rosados y luminosos en torno a un corazon dorado, posado sobre hojas verdes que flotan en un agua azul. Arriba, unos lazos de color cruzan el cielo como una firma alegre.",
    textEn:
      "Omar opens a large water lily of luminous pink petals around a golden heart, resting on green leaves afloat on blue water. Above, loops of colour cross the sky like a cheerful signature.",
  },
  {
    name: "Theylor",
    age: 8,
    subject: "hormiga con flor",
    textEs:
      "Theylor tiñe a su hormiga de un rojo calido y vibrante y la corona con una flor amarilla de petalos suaves. El insecto, alzado sobre sus patas, parece saludar desde el centro de la pagina.",
    textEn:
      "Theylor colours his ant a warm, vibrant red and crowns it with a yellow flower of soft petals. The insect, raised on its legs, seems to wave from the centre of the page.",
  },
  {
    name: "Alvaro",
    age: 4,
    subject: "mariposa monarca",
    textEs:
      "Alvaro llena las alas de su mariposa de franjas vivas, rojo, azul, verde lima y rosa, enmarcadas por el negro moteado de blanco propio de la monarca. Sobre un fondo de flores sin colorear, el insecto resplandece como unica explosion de color.",
    textEn:
      "Alvaro fills his butterfly's wings with vivid bands, red, blue, lime green and pink, framed by the white-speckled black of the monarch. Against a background of uncoloured flowers, the insect glows as the single burst of colour.",
  },
  {
    name: "Valeria",
    age: 8,
    subject: "mariquita sobre flor",
    textEs:
      "Valeria pinta una mariquita de caparazon rojo intenso y grandes lunares negros, posada sobre una flor de petalos en lila, amarillo, verde y rojo. El contraste entre el rojo pleno del insecto y los colores de la flor llena la escena de fuerza.",
    textEn:
      "Valeria paints a ladybird with an intense red shell and large black spots, perched on a flower with petals in lilac, yellow, green and red. The contrast between the insect's full red and the flower's colours fills the scene with strength.",
  },
  {
    name: "Carla",
    age: 5,
    subject: "polilla (hawk moth)",
    textEs:
      "Carla compone su polilla como una vidriera: cada celda de las alas recibe un color, rosas, lilas, verdes, azules y rojos, separado por gruesas lineas negras. El cuerpo rosado y las antenas turquesas rematan un mosaico lleno de luz.",
    textEn:
      "Carla composes her moth like a stained-glass window: each cell of the wings receives a colour, pinks, lilacs, greens, blues and reds, separated by thick black lines. The pink body and turquoise antennae finish a mosaic full of light.",
  },
  {
    name: "Dayron",
    age: 13,
    subject: "abeja sobre lavanda",
    textEs:
      "Dayron deja a su abeja en grises y rosas suaves y le ilumina las alas de un azul celeste, posandola sobre una mata de lavanda en flor. Las espigas malvas y azules, el trebol violeta y las margaritas tejen un prado entero alrededor del polinizador.",
    textEn:
      "Dayron leaves his bee in soft greys and pinks and lights its wings sky blue, settling it on a bush of flowering lavender. The mauve and blue spikes, the violet clover and the daisies weave a whole meadow around the pollinator.",
  },
];

const eventDrawings = artworkDetails.map((details, index) => ({
  ...details,
  number: index + 1,
  src: `/events/dia-de-los-polinizadores-2026/drawings/drawing-${String(index + 1).padStart(2, "0")}.jpeg`,
  alt: `Artwork ${index + 1} from the Day of All Pollinators 2026 drawing workshop: ${details.subject}`,
}));

const artworkCarouselItems = eventDrawings;

const esCopy = esMessages.pollinatorsEvent2026;
const enCopy = enMessages.pollinatorsEvent2026;
const deCopy = deMessages.pollinatorsEvent2026;
const frCopy = frMessages.pollinatorsEvent2026;
const itCopy = itMessages.pollinatorsEvent2026;
const zhCopy = zhMessages.pollinatorsEvent2026;
const eventMessages = {
  es: esCopy,
  en: enCopy,
  de: deCopy,
  fr: frCopy,
  it: itCopy,
  zh: zhCopy,
};

export const metadata = {
  title: "Dia de los Polinizadores 2026 | Universo Nahiara",
  description:
    "Public trilingual event page for All Pollinators Day 2026 in Gran Canaria: Draw the flower and its pollinator. Permanent Scientix-ready URL with event details in Spanish, English and German.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Dia de Todos los Polinizadores 2026 | Universo Nahiara",
    description:
      "21 June 2026 in Gran Canaria. Trilingual public event page for 'Draw the flower and its pollinator' by Universo Nahiara.",
    images: [
      {
        url: EVENT_POSTER_URL,
        width: 768,
        height: 1344,
        alt: "Dia de Todos los Polinizadores 2026 event poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dia de Todos los Polinizadores 2026 | Universo Nahiara",
    description:
      "21 June 2026 in Gran Canaria. Trilingual public event page for 'Draw the flower and its pollinator'.",
    images: [EVENT_POSTER_URL],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Dia de Todos los Polinizadores - Dibuja la flor y su polinizador / All Pollinators Day - Draw the flower and its pollinator",
  startDate: "2026-06-21T11:00:00+01:00",
  endDate: "2026-06-21T14:00:00+01:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: PAGE_URL,
  image: [EVENT_POSTER_URL],
  description:
    "Trilingual public event page for Universo Nahiara's All Pollinators Day in Gran Canaria, featuring the activity 'Draw the flower and its pollinator'.",
  inLanguage: ["es", "en", "de"],
  location: {
    "@type": "Place",
    name: "La Blanca, Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Lucia de Tirajana",
      addressRegion: "Gran Canaria",
      addressCountry: "ES",
      streetAddress:
        "Marquee / Stand - La Blanca, Sardina del Sur - Santa Lucia de Tirajana, Gran Canaria",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: eventDetails.latitude,
      longitude: eventDetails.longitude,
    },
  },
  organizer: {
    "@type": "Organization",
    name: eventDetails.organizer,
    url: "https://asociacionnahiara.org",
    email: eventDetails.contact,
  },
  isAccessibleForFree: true,
  contributor: eventDetails.collaborators.map((name) => ({
    "@type": "Organization",
    name,
  })),
};

function LanguageColumn({ lang, copy, sharedCopy }) {
  const audience =
    copy.audienceValue ||
    (lang === "es" ? eventDetails.audienceEs : eventDetails.audienceEn);

  return (
    <article
      lang={lang}
      className="relative flex h-full flex-col"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7330]">
        {copy.eyebrow}
      </p>
      <h2
        className={`${displayFont.className} mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-[#11362d]`}
        style={{ textWrap: "balance" }}
      >
        {copy.title}
      </h2>
      <p className="mt-3 text-[1.05rem] italic leading-7 text-[#d66152]">{copy.subtitle}</p>

      <div className="mt-6 space-y-5 text-[1rem] leading-8 text-[#284239]">
        <p>{copy.intro}</p>
        <p>{copy.body}</p>
      </div>

      <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {sharedCopy.detailDateLabel}
          </dt>
          <dd className="mt-2 text-sm font-medium text-[#16352d]">
            {sharedCopy.detailDateValue || eventDetails.date}
          </dd>
          <dd className="text-sm text-[#50655d]">
            {sharedCopy.detailTimeValue || eventDetails.time}
          </dd>
        </div>
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {sharedCopy.detailLocationLabel}
          </dt>
          <dd className="mt-2 text-sm font-medium text-[#16352d]">
            <a
              href={EVENT_MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-[#d6b56d] underline-offset-4 transition hover:text-[#0f5b48]"
            >
              {eventDetails.location}
            </a>
          </dd>
          <dd className="text-sm text-[#50655d]">{eventDetails.exactVenue}</dd>
        </div>
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {copy.audienceLabel}
          </dt>
          <dd className="mt-2 text-sm text-[#284239]">{audience}</dd>
        </div>
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7b74]">
            {copy.infoLabel}
          </dt>
          <dd className="mt-2 text-sm text-[#284239]">{eventDetails.contact}</dd>
          <dd className="text-sm text-[#50655d]">asociacionnahiara.org</dd>
        </div>
      </dl>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#0f5b48]">
            {copy.organizerLabel}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#284239]">{eventDetails.organizer}</p>
        </div>
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#9a7330]">
            {copy.collaboratorLabel}
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-[#284239]">
            {eventDetails.collaborators.map((collaborator) => (
              <li key={collaborator}>{collaborator}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-[#e3dac8] pt-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a26617]">
          {copy.practicalTitle}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#5a4b33]">{copy.practicalBody}</p>
      </div>
    </article>
  );
}

export default async function PollinatorsEventPage() {
  const cookieStore = await cookies();
  const requestedLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = requestedLocale && eventMessages[requestedLocale] ? requestedLocale : "en";
  const pageCopy = eventMessages[locale];
  const sharedCopy = {
    ...enCopy.shared,
    ...pageCopy.shared,
    eventDayPhotos: pageCopy.shared.eventDayPhotos || enCopy.shared.eventDayPhotos,
  };
  const heroMetaItems = [
    {
      icon: Users,
      text: sharedCopy.heroEventType,
    },
    {
      icon: CalendarDays,
      text: sharedCopy.heroDate,
    },
    {
      icon: Clock,
      text: sharedCopy.detailTimeValue || eventDetails.time,
    },
    {
      icon: MapPin,
      text: sharedCopy.factLocationPrimary,
    },
  ];
  const factItems = [
    {
      icon: CalendarDays,
      label: sharedCopy.factDateLabel,
      primary: sharedCopy.heroDate,
      secondary: sharedCopy.factDateSecondary,
      detail: sharedCopy.detailTimeValue || eventDetails.time,
    },
    {
      icon: MapPin,
      label: sharedCopy.factLocationLabel,
      primary: sharedCopy.factLocationPrimary,
      secondary: sharedCopy.factLocationSecondary,
      detail: eventDetails.exactVenue,
      href: EVENT_MAP_URL,
    },
    {
      icon: Users,
      label: sharedCopy.factAudienceLabel,
      primary: sharedCopy.factAudiencePrimary,
      secondary: sharedCopy.factAudienceSecondary,
      detail: sharedCopy.factAudienceDetail,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#102a23]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <section className="relative overflow-hidden bg-[#072c26] text-[#f7f4ec]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,140,70,0.16),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(217,97,82,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(114,148,100,0.16),transparent_28%)]" />
        <div className="absolute right-[-8rem] top-[8rem] h-[28rem] w-[28rem] rounded-full border border-[#d6b56d]/15" />
        <div className="absolute left-[-10rem] top-[18rem] h-[24rem] w-[24rem] rounded-full border border-[#d6b56d]/10" />

        <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-18 pt-6 md:px-6 md:pb-24 md:pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#e8e0cf] transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {sharedCopy.homeLabel}
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={PAGE_URL}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
              >
                <Copy className="h-3.5 w-3.5" />
                {sharedCopy.canonicalLabel}
              </a>
              <Link
                href="/reloj-dia-de-todos-los-polinizadores"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8e0cf] transition hover:bg-white/8 hover:text-white"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                {sharedCopy.countdownLabel}
              </Link>
            </div>
          </div>

          <div className="relative mt-5 grid items-end gap-12 sm:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="relative z-10">
              <div className="hidden max-w-3xl flex-wrap gap-2.5 sm:flex">
                {heroMetaItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <span
                      key={item.text}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d6b56d]/28 bg-[#f7f4ec]/8 px-3.5 py-2 text-[0.78rem] font-semibold text-[#fff3cf] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#efc85f]" />
                      <span className="leading-tight">{item.text}</span>
                    </span>
                  );
                })}
              </div>
              <h1
                className={`${displayFont.className} mt-0 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em] text-[#fbf8f0] sm:mt-6`}
                style={{ textWrap: "balance" }}
              >
                {sharedCopy.heroTitleLine1}
                <br />
                {sharedCopy.heroTitleLine2}
              </h1>
              <p className="mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-[#efc85f]">
                {sharedCopy.heroEnglishTitle}
              </p>
              {sharedCopy.heroSubtitle ? (
                <p
                  className={`${displayFont.className} mt-6 max-w-3xl text-[clamp(1.7rem,3vw,2.9rem)] italic leading-[1.08] tracking-[-0.02em] text-[#f4baa9]`}
                >
                  {sharedCopy.heroSubtitle}
                </p>
              ) : null}
              <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-[#d7ded8]">
                {sharedCopy.heroDescription}
              </p>
              <a
                href={SCIENTIX_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex max-w-2xl items-center gap-2 text-sm font-medium leading-6 text-[#f1d993] underline decoration-[#d6b56d]/60 underline-offset-4 transition hover:text-[#fff3cf]"
              >
                {sharedCopy.scientixListingLink}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
                {factItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <div className="flex items-center gap-2 text-[#efc85f]">
                        <Icon className="h-4 w-4" />
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                          {item.label}
                        </span>
                      </div>
                      <p className="mt-4 text-base font-medium text-white">{item.primary}</p>
                      <p className="mt-1 text-sm text-[#d8d3c7]">{item.secondary}</p>
                      <p className="mt-3 text-sm text-[#b7c1bb]">{item.detail}</p>
                    </>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition hover:border-[#efc85f]/45 hover:bg-white/[0.07]"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative mx-auto min-h-[27rem] w-full max-w-[24rem] sm:max-w-[28rem] lg:min-h-[42rem]">
              <div className="absolute right-[-1rem] top-[-1rem] z-20 rounded-full bg-[#d6b56d]/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#efc85f]">
                {sharedCopy.eventBadge}
              </div>
              <div className="absolute left-[-1rem] top-[5%] h-16 w-16 rounded-full border border-[#d6b56d]/35" />
              <div className="absolute bottom-[8%] left-[-8%] z-0 h-36 w-36 rounded-full bg-[#d66152]/18 blur-2xl md:h-52 md:w-52" />
              <div className="absolute right-[-10%] top-[20%] z-0 h-44 w-44 rounded-full bg-[#8b5cf6]/14 blur-3xl md:h-64 md:w-64" />
              <div className="relative z-10 overflow-hidden rounded-2xl border border-[#e8d3a3]/25 bg-[#08251f] shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)] sm:rounded-[22px]">
                <Image
                  src={EVENT_POSTER_IMAGE}
                  alt="Dia de Todos los Polinizadores 2026 event poster"
                  width={768}
                  height={1344}
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-14 w-full overflow-hidden md:h-20">
          <svg
            viewBox="0 0 1440 120"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,28 C170,88 290,114 450,90 C620,64 706,8 880,20 C1088,34 1192,108 1440,72 L1440,120 L0,120 Z"
              fill="#f5f1e8"
            />
          </svg>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-8 md:px-6 md:pb-12 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
              {sharedCopy.activityLabel}
            </p>
            <h2
              className={`${displayFont.className} mt-4 max-w-2xl text-[clamp(2.7rem,4.8vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {sharedCopy.activityTitleLine1}
              <br />
              {sharedCopy.activityTitleLine2}
            </h2>
            <div className="mt-6 max-w-3xl space-y-5 text-[1.03rem] leading-8 text-[#355148]">
              <p>{sharedCopy.activityBody}</p>
            </div>
          </div>

          <div className="border-t border-[#d6c7a1] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0f5b48]">
              {sharedCopy.globalParticipationLabel}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {sharedCopy.globalParticipationTitle}
            </h2>
            <div className="mt-5 space-y-4 text-[1rem] leading-8 text-[#355148]">
              <p>{sharedCopy.globalParticipationBody}</p>
            </div>
            <Link
              href="/dibuja-la-flor-de-tu-pais"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0f5b48] px-5 py-3 text-sm font-semibold text-[#f7f4ec] shadow-[0_12px_30px_-22px_rgba(7,44,38,0.9)] transition hover:bg-[#0a4235] focus:outline-none focus:ring-2 focus:ring-[#d6b56d] focus:ring-offset-2 focus:ring-offset-[#f5f1e8]"
            >
              {sharedCopy.globalParticipationCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="grid gap-7 border-t border-[#d6c7a1] py-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-center lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">
              {sharedCopy.manifestoLabel}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-[clamp(2rem,4vw,3.6rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {sharedCopy.manifestoTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-5 border-t border-[#d6c7a1] pt-6 sm:flex-row sm:items-center sm:justify-between lg:border-t-0 lg:pt-0">
            <p className="max-w-2xl text-[1rem] leading-8 text-[#355148]">
              {sharedCopy.manifestoBody}
            </p>
            <a
              href={MANIFESTO_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0f5b48] px-5 py-3 text-sm font-semibold text-[#f7f4ec] shadow-[0_12px_30px_-22px_rgba(7,44,38,0.9)] transition hover:bg-[#0a4235] focus:outline-none focus:ring-2 focus:ring-[#d6b56d] focus:ring-offset-2 focus:ring-offset-[#f5f1e8]"
            >
              {sharedCopy.manifestoCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="short-film"
        className="mx-auto max-w-7xl scroll-mt-8 px-4 pb-10 md:px-6 md:pb-12"
      >
        <div className="grid gap-7 border-y border-[#d6c7a1] py-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-center lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7330]">
              {sharedCopy.filmLabel}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-[clamp(2rem,4vw,3.6rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
              style={{ textWrap: "balance" }}
            >
              {sharedCopy.filmTitle}
            </h2>
            <p className="mt-4 max-w-xl text-[1rem] leading-8 text-[#355148]">
              {sharedCopy.filmBody}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#072c26] shadow-[0_16px_44px_-28px_rgba(7,44,38,0.9)]">
            <div className="aspect-video w-full">
              <iframe
                title={sharedCopy.filmTitle}
                src={EVENT_FILM_EMBED_URL}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="pt-8 md:pt-10">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
                {sharedCopy.eventDayLabel}
              </p>
              <h2
                className={`${displayFont.className} mt-4 text-[clamp(2.4rem,4.8vw,4.8rem)] leading-[0.98] tracking-[-0.035em] text-[#13352d]`}
                style={{ textWrap: "balance" }}
              >
                {sharedCopy.eventDayTitle}
              </h2>
            </div>
            <p className="max-w-3xl text-[1.03rem] leading-8 text-[#355148]">
              {sharedCopy.eventDayBody}
            </p>
          </div>

          <div className="mt-8 grid auto-rows-[minmax(20rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventDayPhotos.map((photo, index) => {
              const photoCopy = getEventDayPhotoCopy(sharedCopy, index);

              return (
                <figure
                  key={photo.src}
                  className={`group relative overflow-hidden rounded-2xl bg-[#072c26] ${
                    photo.className || ""
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photoCopy.caption}
                    width={photo.width}
                    height={photo.height}
                    sizes={
                      photo.className?.includes("col-span")
                        ? "(max-width: 1024px) 100vw, 820px"
                        : "(max-width: 768px) 100vw, 420px"
                    }
                    className="h-full min-h-[20rem] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 h-[30%] overflow-y-auto bg-gradient-to-t from-[#061b17]/96 via-[#061b17]/86 to-[#061b17]/18 px-4 pb-4 pt-6 text-[#f8f2df] [scrollbar-color:#d6b56d_transparent] md:max-h-[30%] md:px-5 md:pb-5 md:pt-8">
                    <p className="text-xs font-medium leading-5 md:text-sm md:leading-6">
                      {photoCopy.caption}
                    </p>
                    {photoCopy.secondary ? (
                      <p className="mt-2 border-t border-white/14 pt-2 text-xs leading-5 text-[#d8ded8]">
                        {photoCopy.secondary}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl overflow-hidden px-4 pb-12 md:px-6 md:pb-16">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes pollinator-art-scroll {
                from { transform: translateX(0); }
                to { transform: translateX(calc(-100% + var(--pollinator-art-card-width))); }
              }

              .pollinator-art-track {
                --pollinator-art-card-width: 82vw;
                animation: pollinator-art-scroll 115s linear infinite;
              }

              @media (min-width: 640px) {
                .pollinator-art-track {
                  --pollinator-art-card-width: 70vw;
                }
              }

              @media (min-width: 768px) {
                .pollinator-art-track {
                  --pollinator-art-card-width: 42vw;
                }
              }

              @media (min-width: 1024px) {
                .pollinator-art-track {
                  --pollinator-art-card-width: calc((74rem - 2rem) / 3);
                }
              }

              .pollinator-art-showcase:hover .pollinator-art-track {
                animation-play-state: paused;
              }

              @media (prefers-reduced-motion: reduce) {
                .pollinator-art-track {
                  animation: none;
                  transform: none;
                }
              }
            `,
          }}
        />
        <div className="border-y border-[#d6c7a1] py-7 sm:py-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f5b48] sm:text-sm sm:tracking-[0.22em]">
                {sharedCopy.artworkGalleryLabel}
              </p>
              <h2
                className={`${displayFont.className} mt-3 text-[clamp(2rem,10vw,3.8rem)] leading-[1] tracking-[-0.03em] text-[#13352d] sm:mt-4`}
                style={{ textWrap: "balance" }}
              >
                {sharedCopy.artworkGalleryTitle}
              </h2>
            </div>
            <p className="max-w-3xl text-[0.95rem] leading-7 text-[#355148] sm:text-[1rem] sm:leading-8">
              {sharedCopy.artworkGalleryBody}
            </p>
          </div>

          <div className="pollinator-art-showcase relative mt-6 rounded-xl bg-[#0f3028] px-0 py-4 shadow-[0_0_0_1px_rgba(184,138,50,0.24),0_18px_42px_-34px_rgba(7,44,38,0.9)] sm:mt-8 sm:rounded-2xl sm:py-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-7 rounded-l-xl bg-gradient-to-r from-[#0f3028] via-[#0f3028]/82 to-transparent sm:w-12 sm:rounded-l-2xl md:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-7 rounded-r-xl bg-gradient-to-l from-[#0f3028] via-[#0f3028]/82 to-transparent sm:w-12 sm:rounded-r-2xl md:w-20" />
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b56d]/70 to-transparent sm:inset-x-8" />
            <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6b56d]/45 to-transparent sm:inset-x-8" />
            <div className="overflow-hidden py-1">
              <div className="pollinator-art-track flex w-max gap-4 pr-4">
                {artworkCarouselItems.map((drawing, index) => (
                  <figure
                    key={`${drawing.src}-${index}`}
                    className="flex h-[38rem] w-[82vw] shrink-0 flex-col overflow-hidden rounded-lg border border-[#b88a32] bg-[#12392f] sm:h-[40rem] sm:w-[70vw] md:h-[42rem] md:w-[42vw] lg:h-[44rem] lg:w-[calc((74rem-2rem)/3)]"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-[#c99f4f]/45 bg-[#102f28] px-3 py-3 text-[#f8f2df] sm:gap-4 sm:px-4 md:px-5">
                      <div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d6b56d] sm:text-xs sm:tracking-[0.16em]">
                          {sharedCopy.artworkPlateLabel} {String(drawing.number).padStart(2, "0")}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#d8ded8]">
                          {sharedCopy.artworkDateLocation}
                        </p>
                      </div>
                      <div className="max-w-[9rem] text-right sm:max-w-[11rem]">
                        <p className={`${displayFont.className} text-2xl leading-none tracking-[-0.03em] sm:text-3xl`}>
                          {String(drawing.number).padStart(2, "0")}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#d8ded8]">
                          {drawing.name || sharedCopy.artworkUnknownAuthor}
                          {drawing.age ? `, ${drawing.age}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col">
                      <div className="bg-[#173d33] p-2.5 sm:p-3">
                        <div className="relative rounded-md border border-[#f0d686] bg-[#8d6927] p-1.5 shadow-[inset_0_1px_0_rgba(255,247,196,0.75),inset_0_-1px_0_rgba(70,43,10,0.45)] sm:p-2">
                          <div className="rounded-[4px] border border-[#6d4b16] bg-[#f3e6c1] p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]">
                            <Image
                              src={drawing.src}
                              alt={drawing.alt}
                              width={520}
                              height={700}
                              sizes="(max-width: 640px) 82vw, (max-width: 768px) 70vw, (max-width: 1024px) 42vw, 410px"
                              className="h-[14.5rem] w-full rounded-[2px] object-cover sm:h-[16rem] md:h-[18rem]"
                              loading={index < 6 ? "eager" : "lazy"}
                            />
                          </div>
                        </div>
                      </div>

                      <figcaption className="min-h-0 flex-1 overflow-y-auto bg-white px-3 pb-4 pt-3 sm:px-4 md:px-5">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#8a6420]">
                          {drawing.subject}
                        </p>
                        <p className="mt-2 text-[0.78rem] leading-5 text-[#244038] sm:text-[0.82rem]">
                          {getArtworkText(drawing, locale)}
                        </p>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs leading-5 text-[#5c6f66]">
            <span>{sharedCopy.artworkFooterTitle}</span>
            <span>{sharedCopy.detailDateValue}</span>
            <span>La Blanca - Sardina del Sur</span>
            <span>www.asociacionnahiara.org</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="border-t border-[#d6c7a1] pt-7 sm:pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7330] sm:text-sm sm:tracking-[0.22em]">
                {sharedCopy.archiveLabel}
              </p>
              <h2
                className={`${displayFont.className} mt-3 text-[clamp(2rem,9vw,3.4rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
                style={{ textWrap: "balance" }}
              >
                {sharedCopy.archiveTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-[0.95rem] leading-7 text-[#355148] sm:text-[1rem] sm:leading-8">
              {sharedCopy.archiveBody}
            </p>
          </div>

          <div className="mt-6 overflow-x-auto pb-3 [scrollbar-color:#b88a32_transparent]">
            <div className="flex w-max gap-3 pr-4 sm:gap-4">
              {extraEventPhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  className="w-[64vw] shrink-0 overflow-hidden rounded-lg border border-[#d6c7a1] bg-[#fffaf0] p-2 sm:w-[17rem] md:w-[18rem]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1200}
                    height={1600}
                    sizes="(max-width: 640px) 64vw, 18rem"
                    className="aspect-[4/5] w-full rounded-md object-cover"
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-2 md:px-6 md:pb-16">
        <div className="grid gap-12">
          <LanguageColumn lang={locale} copy={pageCopy} sharedCopy={sharedCopy} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:pb-20">
        <div className="border-t border-[#d6c7a1] pt-8">
          <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a7330]">
                {sharedCopy.organizerHeading}
              </p>
              <h2
                className={`${displayFont.className} mt-4 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.03em] text-[#13352d]`}
              >
                Universo Nahiara
              </h2>
              <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#355148]">
                {pageCopy.organizerBody}
              </p>
            </div>

            <div className="grid justify-items-start gap-6 text-left sm:grid-cols-2">
              <div className="justify-self-start text-left">
                <div className="flex items-center gap-2 whitespace-nowrap text-[#0f5b48]">
                  <Mail className="h-4 w-4" />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                    {sharedCopy.infoHeading}
                  </span>
                </div>
                <p className="mt-3 whitespace-nowrap text-sm leading-7 text-[#355148]">
                  {eventDetails.contact}
                </p>
              </div>
              <div className="justify-self-start text-left">
                <div className="flex items-center gap-2 whitespace-nowrap text-[#0f5b48]">
                  <Globe2 className="h-4 w-4" />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                    {sharedCopy.websiteHeading}
                  </span>
                </div>
                <p className="mt-3 whitespace-nowrap text-sm leading-7 text-[#355148]">
                  asociacionnahiara.org
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
