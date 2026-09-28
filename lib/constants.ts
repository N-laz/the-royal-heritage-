export const SITE = {
  name: "The Royal Heritage",
  shortName: "Royal Heritage",
  tagline: "A royal coastal resort on the Arabian Sea",
  address: "Heritage Cove, Mandvi Beach Road, Kutch, Gujarat 370465, India",
  phone: "+91 90812 20186",
  whatsapp: "+91 90812 20186",
  email: "kazinomanimtiyaz7656@gmail.com",
  checkInTime: "3:00 PM",
  checkOutTime: "12:00 PM",
  social: {
    instagram: "https://www.instagram.com/_noman_kazi_?stkn=MWZyaTF3MnZpcGpkbA==",
  },
};

export const NAV_LINKS = [
  { href: "/stay", label: "Stay" },
  { href: "/dining", label: "Dining" },
  { href: "/wellness", label: "Wellness" },
  { href: "/experiences", label: "Experiences" },
  { href: "/offers", label: "Offers" },
  { href: "/celebrations", label: "Celebrations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const HERO_SLIDES = [
  {
    image: "/img/hero.webp",
    eyebrow: "Welcome to The Royal Heritage",
    title: "Where royal Rajasthan meets the Arabian Sea",
    subtitle: "A palace resort of carved sandstone, courtyards and endless ocean horizons.",
  },
  {
    image: "/img/aerial.webp",
    eyebrow: "Oceanfront Villas",
    title: "Private pools, private shores",
    subtitle: "Walled garden villas that open directly onto the sand.",
  },
  {
    image: "/img/night.webp",
    eyebrow: "Evenings at the Palace",
    title: "Lantern-lit nights by the sea",
    subtitle: "Dine beneath the stars as the palace glows in gold.",
  },
  {
    image: "/img/villa-pool.webp",
    eyebrow: "The Art of Slow Living",
    title: "Unhurried days, unforgettable stays",
    subtitle: "Spa rituals, sunset cruises and service fit for royalty.",
  },
];

export type Restaurant = {
  slug: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  hours: string;
  dress: string;
  times: string[];
  signature: string[];
};

export const RESTAURANTS: Restaurant[] = [
  {
    slug: "darbar",
    name: "Darbar",
    cuisine: "Royal Rajasthani & Mughlai",
    description:
      "Beneath a hand-painted dome, Darbar revives the recipes of royal kitchens — slow-cooked laal maas, smoked dal and saffron-kissed biryanis served on silver thali, accompanied by live classical music every evening.",
    image: "/img/dining-fine.webp",
    hours: "Dinner · 7:00 PM – 11:30 PM",
    dress: "Elegant",
    times: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],
    signature: ["Jodhpuri laal maas", "Raan-e-Darbar", "Saffron kesar pista kulfi"],
  },
  {
    slug: "azure",
    name: "Azure",
    cuisine: "Mediterranean Rooftop",
    description:
      "On the palace rooftop, Azure pairs the Arabian Sea with the spirit of the Aegean — line-caught seafood, wood-fired flatbreads and mezze, best enjoyed as the sky turns amber at sunset.",
    image: "/img/dining-rooftop.webp",
    hours: "Lunch 12:30 PM – 3:30 PM · Dinner 6:30 PM – 11:00 PM",
    dress: "Smart casual",
    times: ["12:30", "13:30", "14:30", "18:30", "19:30", "20:30", "21:30"],
    signature: ["Grilled Arabian Sea lobster", "Octopus with smoked paprika", "Mezze royale"],
  },
  {
    slug: "the-spice-route",
    name: "The Spice Route",
    cuisine: "Coastal Indian · All Day",
    description:
      "Our all-day restaurant follows the ancient spice trade along India's western coast — Gujarati thalis, Malabar curries, Goan seafood and a legendary breakfast spread with fresh dosas and jalebi.",
    image: "/img/dining-plates.webp",
    hours: "Breakfast 7:00 AM – 11:00 AM · All day until 11:00 PM",
    dress: "Resort casual",
    times: ["07:30", "08:30", "09:30", "12:30", "13:30", "19:00", "20:00", "21:00"],
    signature: ["Kutchi thali", "Malabar prawn curry", "Masala dosa bar"],
  },
  {
    slug: "sunset-cabana",
    name: "Sunset Cabana",
    cuisine: "Beach Grill & Bar",
    description:
      "Toes in the sand, a cold drink in hand. Sunset Cabana grills the day's catch over coconut husk and serves tandoori tiger prawns, fresh coconuts and handcrafted cocktails right on the shore.",
    image: "/img/cabana.webp",
    hours: "11:00 AM – 10:00 PM",
    dress: "Beachwear welcome",
    times: ["12:00", "13:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
    signature: ["Tandoori tiger prawns", "Catch of the day", "Kokum & coconut cooler"],
  },
  {
    slug: "maharaja-lounge",
    name: "The Maharaja's Lounge",
    cuisine: "Bar, High Tea & Cigars",
    description:
      "A clubby salon of leather, brass and hunting-lodge portraits. Afternoon high tea gives way to rare single malts, heritage gin cocktails and a humidor of fine cigars as the evening deepens.",
    image: "/img/lobby.webp",
    hours: "High tea 3:30 PM – 6:00 PM · Bar until 1:00 AM",
    dress: "Smart casual",
    times: ["15:30", "16:30", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    signature: ["Royal high tea", "Heritage gin & tonic", "Rare Indian single malts"],
  },
];

export type Treatment = {
  name: string;
  duration: string;
  price: number;
  description: string;
};

export const SPA_TREATMENTS: Treatment[] = [
  {
    name: "Royal Abhyanga Ritual",
    duration: "90 min",
    price: 14000,
    description: "A four-handed Ayurvedic massage with warm herbal oils, followed by a steam and saffron milk.",
  },
  {
    name: "Heritage Hammam",
    duration: "75 min",
    price: 16500,
    description: "Steam, black soap cleanse, kessa scrub and a rose clay wrap in our marble hammam.",
  },
  {
    name: "Arabian Sea Salt Glow",
    duration: "60 min",
    price: 11000,
    description: "A mineral-rich sea salt and coconut scrub that leaves skin polished and luminous.",
  },
  {
    name: "Couples' Palace Ritual",
    duration: "120 min",
    price: 32000,
    description: "A private suite for two: rose bath, synchronised massage and champagne on the terrace.",
  },
  {
    name: "Shirodhara Calm",
    duration: "60 min",
    price: 12500,
    description: "A continuous stream of warm oil across the forehead to quiet the mind and restore sleep.",
  },
  {
    name: "Gold Radiance Facial",
    duration: "75 min",
    price: 15500,
    description: "24-carat gold, kumkumadi oil and a jade roller massage for a lit-from-within glow.",
  },
];

export const SPA_TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export type Experience = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  price: number | null;
  times: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "sunset-yacht-cruise",
    name: "Sunset Yacht Cruise",
    category: "On the Water",
    description:
      "Sail the Arabian Sea aboard our private 62-foot yacht with champagne, canapés and the chance to spot dolphins as the sun sets over the water.",
    image: "/img/yacht.webp",
    duration: "3 hours",
    price: 65000,
    times: ["16:00", "16:30", "17:00"],
  },
  {
    slug: "beach-dinner-under-stars",
    name: "Beach Dinner Under the Stars",
    category: "Romance",
    description:
      "A five-course dinner for two on a lantern-lit stretch of private beach, with a personal butler, a musician and the sound of the waves.",
    image: "/img/beach-dinner.webp",
    duration: "3 hours",
    price: 28000,
    times: ["19:00", "19:30", "20:00"],
  },
  {
    slug: "desert-dunes-safari",
    name: "Desert & White Rann Safari",
    category: "Adventure",
    description:
      "Journey by vintage jeep to the salt desert of the Rann of Kutch for camel rides, folk music and a royal dinner under a sky full of stars.",
    image: "/img/desert.webp",
    duration: "Full day",
    price: 38000,
    times: ["10:00", "13:00"],
  },
  {
    slug: "sunrise-yoga",
    name: "Sunrise Yoga on the Sand",
    category: "Wellness",
    description:
      "Greet the day with a guided hatha yoga and pranayama session on the beach, followed by fresh coconut water and Ayurvedic tea.",
    image: "/img/yoga.webp",
    duration: "75 min",
    price: null,
    times: ["06:15", "07:00"],
  },
  {
    slug: "heritage-palace-walk",
    name: "Heritage Palace Walk",
    category: "Culture",
    description:
      "Our resident historian guides you through Mandvi's palaces, shipbuilding yards and bandhani artisans' workshops, ending with a chai at a 200-year-old haveli.",
    image: "/img/lobby.webp",
    duration: "3 hours",
    price: 9500,
    times: ["08:00", "16:00"],
  },
  {
    slug: "private-cabana-day",
    name: "Private Cabana Day",
    category: "Leisure",
    description:
      "Claim a shaded beach cabana for the day with a dedicated attendant, chilled rosé, a seafood lunch and sunset massages by the shore.",
    image: "/img/cabana.webp",
    duration: "Full day",
    price: 22000,
    times: ["10:00", "11:00", "12:00"],
  },
];

export type Offer = {
  code: string;
  title: string;
  pct: number;
  description: string;
  terms: string;
  image: string;
};

export const OFFERS: Offer[] = [
  {
    code: "ROYAL10",
    title: "The Royal Escape",
    pct: 10,
    description: "Save 10% on any room, suite or villa when you book directly with us.",
    terms: "Valid on all room categories. No minimum stay.",
    image: "/img/room-ocean.webp",
  },
  {
    code: "STAY4",
    title: "Stay Longer",
    pct: 20,
    description: "Slow down and save 20% when you stay four nights or more.",
    terms: "Minimum stay of 4 nights. Valid on all categories.",
    image: "/img/cabana.webp",
  },
  {
    code: "HONEYMOON",
    title: "Royal Honeymoon",
    pct: 15,
    description: "Begin forever in a suite or villa with 15% off. Add our Romance Setup and a beach dinner to make it yours.",
    terms: "Valid on Suites and Villas only.",
    image: "/img/couple-villa.webp",
  },
  {
    code: "HERITAGE25",
    title: "Heritage Villa Retreat",
    pct: 25,
    description: "Our most generous offer: 25% off a private pool villa for three nights or longer.",
    terms: "Valid on Villas only. Minimum stay of 3 nights.",
    image: "/img/villa-crown.webp",
  },
];

export type Celebration = {
  slug: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
};

export const CELEBRATIONS: Celebration[] = [
  {
    slug: "royal-weddings",
    title: "Royal Weddings",
    description:
      "From a baraat arriving on horseback to pheras by the sea, our wedding team orchestrates multi-day celebrations for up to 600 guests with palace grandeur.",
    image: "/img/wedding.webp",
    highlights: ["Oceanfront mandap lawns", "Mehendi & sangeet courtyards", "Bespoke menus by our chefs", "Guest room blocks"],
  },
  {
    slug: "grand-ballroom",
    title: "The Grand Ballroom",
    description:
      "Crystal chandeliers, a gilded ceiling and 9,000 square feet of pillarless space for receptions, galas and milestone parties.",
    image: "/img/ballroom.webp",
    highlights: ["Up to 800 guests", "Private pre-function terrace", "State-of-the-art AV", "Dedicated event butler"],
  },
  {
    slug: "anniversaries-proposals",
    title: "Anniversaries & Proposals",
    description:
      "A ring hidden in a dessert, a table set on the sand, a violinist at sunset — let us plan the moment you'll both remember forever.",
    image: "/img/beach-dinner.webp",
    highlights: ["Private beach setups", "Photographer on request", "Floral & candle styling", "Champagne & cake"],
  },
  {
    slug: "milestone-birthdays",
    title: "Milestone Birthdays",
    description:
      "Celebrate in your villa, on our yacht or across the palace lawns with themed décor, live entertainment and a bespoke cake from our pâtissier.",
    image: "/img/couple-villa.webp",
    highlights: ["Villa & yacht parties", "Live music & DJs", "Kids' celebrations", "Bespoke cakes"],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Every detail felt considered — from the rose petals in the bath to our butler remembering how we take our chai. It is the most romantic place we have ever stayed.",
    name: "Ananya & Rohan Mehta",
    location: "Mumbai",
    stay: "Oceanfront Pool Villa",
  },
  {
    quote:
      "The Crown Villa is simply extraordinary. Our family of eight had a private chef, a private beach and a sunset yacht cruise we will talk about for years.",
    name: "James Whitfield",
    location: "London",
    stay: "The Crown Villa",
  },
  {
    quote:
      "Darbar served the finest laal maas I've had outside Jodhpur, and the Heritage Hammam was pure bliss. We've already booked our return.",
    name: "Priya Raghavan",
    location: "Bengaluru",
    stay: "Grand Heritage Suite",
  },
  {
    quote:
      "It feels like a Rajasthani palace was lifted up and set down by the Mediterranean. Quiet, graceful and staffed by the warmest people.",
    name: "Sofia Marchetti",
    location: "Milan",
    stay: "Royal One Bedroom Suite",
  },
];

export const GALLERY_IMAGES: { src: string; alt: string; category: "Resort" | "Rooms" | "Dining" | "Wellness" | "Experiences" }[] = [
  { src: "/img/hero.webp", alt: "The Royal Heritage palace facade by the sea", category: "Resort" },
  { src: "/img/aerial.webp", alt: "Aerial view of the resort and coastline", category: "Resort" },
  { src: "/img/night.webp", alt: "The palace illuminated at night", category: "Resort" },
  { src: "/img/lobby.webp", alt: "The grand lobby with arches and chandeliers", category: "Resort" },
  { src: "/img/room-ocean.webp", alt: "Ocean Premier Room", category: "Rooms" },
  { src: "/img/room-club.webp", alt: "Royal Club Sea View room", category: "Rooms" },
  { src: "/img/suite-royal.webp", alt: "Royal One Bedroom Suite", category: "Rooms" },
  { src: "/img/suite-grand.webp", alt: "Grand Heritage Suite", category: "Rooms" },
  { src: "/img/villa-pool.webp", alt: "Oceanfront Pool Villa", category: "Rooms" },
  { src: "/img/villa-crown.webp", alt: "The Crown Villa", category: "Rooms" },
  { src: "/img/bathroom.webp", alt: "Marble bathroom with soaking tub", category: "Rooms" },
  { src: "/img/couple-villa.webp", alt: "Couple relaxing at a private villa", category: "Rooms" },
  { src: "/img/dining-fine.webp", alt: "Darbar fine dining room", category: "Dining" },
  { src: "/img/dining-plates.webp", alt: "Signature plates", category: "Dining" },
  { src: "/img/dining-rooftop.webp", alt: "Azure rooftop restaurant", category: "Dining" },
  { src: "/img/beach-dinner.webp", alt: "Private candlelit beach dinner", category: "Dining" },
  { src: "/img/spa.webp", alt: "The Royal Spa", category: "Wellness" },
  { src: "/img/hammam.webp", alt: "Marble hammam", category: "Wellness" },
  { src: "/img/yoga.webp", alt: "Sunrise yoga on the beach", category: "Wellness" },
  { src: "/img/yacht.webp", alt: "Private yacht on the Arabian Sea", category: "Experiences" },
  { src: "/img/desert.webp", alt: "Desert safari at the Rann of Kutch", category: "Experiences" },
  { src: "/img/cabana.webp", alt: "Beach cabana", category: "Experiences" },
  { src: "/img/wedding.webp", alt: "Oceanfront wedding mandap", category: "Experiences" },
  { src: "/img/ballroom.webp", alt: "The Grand Ballroom", category: "Experiences" },
];

export const COUNTRIES = [
  "India",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Singapore",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Italy",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Kuwait",
  "Bahrain",
  "Japan",
  "South Africa",
  "Netherlands",
  "Switzerland",
  "Spain",
  "Other",
];

export const ARRIVAL_TIMES = [
  "Before 12:00 PM",
  "12:00 PM – 3:00 PM",
  "3:00 PM – 6:00 PM",
  "6:00 PM – 9:00 PM",
  "After 9:00 PM",
  "Not sure yet",
];

export const FILTER_AMENITIES = [
  "Private Pool",
  "Butler Service",
  "Bathtub",
  "Private Balcony",
  "Club Lounge Access",
  "Private Beach Access",
];
