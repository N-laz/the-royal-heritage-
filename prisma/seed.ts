import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const STANDARD_CANCELLATION =
  "Free cancellation up to 7 days before arrival. Cancellations within 7 days of arrival, or no-shows, are charged one night's stay plus taxes.";
const VILLA_CANCELLATION =
  "Free cancellation up to 14 days before arrival. Cancellations within 14 days of arrival, or no-shows, are charged 50% of the total stay plus taxes.";
const CROWN_CANCELLATION =
  "Free cancellation up to 30 days before arrival. Cancellations within 30 days of arrival, or no-shows, are charged the full stay plus taxes.";

const rooms = [
  {
    slug: "ocean-premier-room",
    name: "Ocean Premier Room",
    category: "Rooms",
    tagline: "Sunlit calm above the Arabian Sea",
    description:
      "Wake to the sound of the Arabian Sea in a sanctuary of hand-carved teak, ivory linen and jharokha-inspired windows that frame the horizon. The Ocean Premier Room pairs the craftsmanship of Rajasthan's palaces with the ease of a Mediterranean summer — a private balcony for sunrise chai, a marble bath with rain shower, and a daybed made for long afternoons with a book.",
    baseRate: 42000,
    size: 560,
    view: "Sea view",
    bed: "King or Twin",
    maxAdults: 2,
    maxGuests: 3,
    inventory: 12,
    breakfastIncluded: false,
    images: ["/img/room-ocean.webp", "/img/bathroom.webp", "/img/aerial.webp"],
    amenities: [
      "Private Balcony",
      "Rain Shower",
      "Marble Bathroom",
      "Nespresso Machine",
      "Smart TV",
      "High-Speed Wi-Fi",
      "Minibar",
      "Pillow Menu",
    ],
    inclusions: [
      "Welcome drink and chilled towel on arrival",
      "Daily turndown with Indian sweets",
      "Access to infinity pool and private beach",
      "Complimentary sunrise yoga",
    ],
    cancellation: STANDARD_CANCELLATION,
    sortOrder: 1,
  },
  {
    slug: "royal-club-sea-view",
    name: "Royal Club Sea View",
    category: "Rooms",
    tagline: "Club privileges with an ocean horizon",
    description:
      "An elevated retreat on the upper floors, the Royal Club Sea View opens onto sweeping sea views and the exclusive Royal Club Lounge. Enjoy breakfast each morning, afternoon high tea, and evening cocktails with canapés, all with a dedicated Club host who knows your preferences before you do.",
    baseRate: 56000,
    size: 640,
    view: "Sea view",
    bed: "King",
    maxAdults: 2,
    maxGuests: 3,
    inventory: 8,
    breakfastIncluded: true,
    images: ["/img/room-club.webp", "/img/dining-rooftop.webp", "/img/bathroom.webp"],
    amenities: [
      "Club Lounge Access",
      "Private Balcony",
      "Bathtub",
      "Rain Shower",
      "Nespresso Machine",
      "Smart TV",
      "High-Speed Wi-Fi",
      "Pillow Menu",
    ],
    inclusions: [
      "Daily breakfast for all guests",
      "Royal Club Lounge high tea and evening cocktails",
      "Express check-in and late check-out until 2 PM (subject to availability)",
      "Pressing of two garments per stay",
    ],
    cancellation: STANDARD_CANCELLATION,
    sortOrder: 2,
  },
  {
    slug: "royal-one-bedroom-suite",
    name: "Royal One Bedroom Suite",
    category: "Suites",
    tagline: "A palace apartment facing the open ocean",
    description:
      "Arched doorways lead from a gracious living salon into a serene bedroom, each framed by panoramic ocean views. Mirror-work ceilings, antique brass and silk upholstery recall the durbar halls of Udaipur, while a deep soaking tub by the window invites unhurried evenings as the sun sinks into the sea.",
    baseRate: 89000,
    size: 1250,
    view: "Panoramic Ocean",
    bed: "King",
    maxAdults: 3,
    maxGuests: 4,
    inventory: 6,
    breakfastIncluded: false,
    images: ["/img/suite-royal.webp", "/img/lobby.webp", "/img/bathroom.webp"],
    amenities: [
      "Separate Living Room",
      "Butler Service",
      "Bathtub",
      "Private Balcony",
      "Walk-in Wardrobe",
      "Bose Sound System",
      "Nespresso Machine",
      "High-Speed Wi-Fi",
    ],
    inclusions: [
      "24-hour butler service",
      "Royal Club Lounge access",
      "Welcome amenity of seasonal fruits and champagne",
      "One complimentary 30-minute foot ritual per guest",
    ],
    cancellation: STANDARD_CANCELLATION,
    sortOrder: 3,
  },
  {
    slug: "grand-heritage-suite",
    name: "Grand Heritage Suite",
    category: "Suites",
    tagline: "Regal proportions, curated heirlooms",
    description:
      "Occupying a corner of the palace wing, the Grand Heritage Suite unfolds over 2,400 square feet of hand-painted frescoes, heirloom furniture and a wraparound terrace above the Arabian Sea. A private dining room seats six, and a dedicated butler orchestrates every detail — from in-suite spa rituals to candlelit dinners on the terrace.",
    baseRate: 135000,
    size: 2400,
    view: "Panoramic Ocean",
    bed: "King + Day Bed",
    maxAdults: 4,
    maxGuests: 5,
    inventory: 3,
    breakfastIncluded: false,
    images: ["/img/suite-grand.webp", "/img/lobby.webp", "/img/aerial.webp"],
    amenities: [
      "Wraparound Terrace",
      "Private Dining Room",
      "Butler Service",
      "Bathtub",
      "Steam Shower",
      "Walk-in Wardrobe",
      "Bose Sound System",
      "High-Speed Wi-Fi",
    ],
    inclusions: [
      "24-hour butler service",
      "Private airport transfer in a luxury sedan",
      "Royal Club Lounge access",
      "One in-suite couples' massage per stay",
    ],
    cancellation: STANDARD_CANCELLATION,
    sortOrder: 4,
  },
  {
    slug: "oceanfront-pool-villa",
    name: "Oceanfront Pool Villa",
    category: "Villas",
    tagline: "Your own pool, steps from the sand",
    description:
      "Set within walled gardens of frangipani and bougainvillea, each Oceanfront Pool Villa opens directly onto the beach. A heated infinity pool, an outdoor rain shower beneath the palms and a shaded cabana create a private world, while the villa's courtyard lanterns glow at dusk in the tradition of a Rajput haveli.",
    baseRate: 210000,
    size: 3100,
    view: "Beachfront",
    bed: "King",
    maxAdults: 3,
    maxGuests: 4,
    inventory: 4,
    breakfastIncluded: false,
    images: ["/img/villa-pool.webp", "/img/couple-villa.webp", "/img/cabana.webp"],
    amenities: [
      "Private Pool",
      "Private Beach Access",
      "Butler Service",
      "Outdoor Rain Shower",
      "Bathtub",
      "Private Cabana",
      "Bose Sound System",
      "High-Speed Wi-Fi",
    ],
    inclusions: [
      "24-hour villa butler",
      "Round-trip private airport transfer",
      "In-villa breakfast served at any hour",
      "Sunset canapés by your pool daily",
    ],
    cancellation: VILLA_CANCELLATION,
    sortOrder: 5,
  },
  {
    slug: "the-crown-villa",
    name: "The Crown Villa",
    category: "Villas",
    tagline: "The jewel of the coast",
    description:
      "The Crown Villa is a palace within the palace — three bedroom pavilions, a durbar-style living hall under a hand-gilded dome, a 25-metre infinity pool and a private stretch of shoreline. A personal chef, butler team and chauffeur attend exclusively to you, and every evening ends with a private performance or a table set on the sand beneath the stars.",
    baseRate: 475000,
    size: 7800,
    view: "Panoramic Ocean",
    bed: "3 King Bedrooms",
    maxAdults: 6,
    maxGuests: 8,
    inventory: 1,
    breakfastIncluded: true,
    images: ["/img/villa-crown.webp", "/img/beach-dinner.webp", "/img/cabana.webp"],
    amenities: [
      "Private Pool",
      "Private Beach Access",
      "Butler Service",
      "Private Chef",
      "Home Cinema",
      "Private Spa Room",
      "Wraparound Terrace",
      "High-Speed Wi-Fi",
    ],
    inclusions: [
      "Daily breakfast and private chef service",
      "Dedicated butler team and chauffeur",
      "Round-trip private airport transfer",
      "One private beach dinner per stay",
      "Daily in-villa spa treatment for two",
    ],
    cancellation: CROWN_CANCELLATION,
    sortOrder: 6,
  },
];

const extras = [
  {
    code: "airport-transfer",
    name: "Airport Transfer",
    description: "Round-trip private transfer in a chauffeured luxury sedan.",
    price: 8500,
    perGuestPerNight: false,
    sortOrder: 1,
  },
  {
    code: "breakfast",
    name: "Royal Breakfast",
    description: "Breakfast at The Spice Route or in-room, charged per guest per night.",
    price: 4500,
    perGuestPerNight: true,
    sortOrder: 2,
  },
  {
    code: "spa-credit",
    name: "Spa Credit",
    description: "₹15,000 credit to use at The Royal Spa during your stay.",
    price: 15000,
    perGuestPerNight: false,
    sortOrder: 3,
  },
  {
    code: "romance-setup",
    name: "Romance Setup",
    description: "Rose petals, candles, champagne and handmade chocolates on arrival.",
    price: 12000,
    perGuestPerNight: false,
    sortOrder: 4,
  },
  {
    code: "beach-dinner",
    name: "Private Beach Dinner",
    description: "A five-course candlelit dinner for two on the sand with a personal butler.",
    price: 28000,
    perGuestPerNight: false,
    sortOrder: 5,
  },
];

const promos = [
  { code: "ROYAL10", label: "Royal Escape — 10% off", pct: 10, minNights: 1, category: null },
  { code: "STAY4", label: "Stay Longer — 20% off 4+ nights", pct: 20, minNights: 4, category: null },
  { code: "HONEYMOON", label: "Honeymoon — 15% off Suites & Villas", pct: 15, minNights: 1, category: "Suites,Villas" },
  { code: "HERITAGE25", label: "Heritage Villa — 25% off Villas, 3+ nights", pct: 25, minNights: 3, category: "Villas" },
];

async function main() {
  console.log("Seeding rooms...");
  for (const room of rooms) {
    await prisma.room.upsert({
      where: { slug: room.slug },
      update: { ...room, active: true },
      create: { ...room, active: true },
    });
  }

  console.log("Seeding extras...");
  for (const extra of extras) {
    await prisma.extra.upsert({
      where: { code: extra.code },
      update: { ...extra, active: true },
      create: { ...extra, active: true },
    });
  }

  console.log("Seeding promo codes...");
  for (const promo of promos) {
    await prisma.promoCode.upsert({
      where: { code: promo.code },
      update: { ...promo, active: true, expiresAt: null },
      create: { ...promo, active: true, expiresAt: null },
    });
  }

  console.log("Seeding admin user...");
  const adminEmail = "kazinomanimtiyaz7656@gmail.com";
  const passwordHash = await bcrypt.hash("Admin@12345", 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: "Noman Kazi", role: "ADMIN", passwordHash },
    create: { email: adminEmail, name: "Noman Kazi", role: "ADMIN", passwordHash },
  });

  console.log("Seeding guest reviews...");
  const seedDomain = "@guests.royalheritage.example";
  await prisma.review.deleteMany({ where: { email: { endsWith: seedDomain } } });
  await prisma.review.createMany({
    data: [
      {
        name: "Ananya & Rohan Mehta",
        email: `ananya${seedDomain}`,
        location: "Mumbai",
        rating: 5,
        title: "The most romantic place we have ever stayed",
        comment: "Every detail felt considered — from the rose petals in the bath to our butler remembering how we take our chai. The private pool at sunset was unforgettable.",
        roomName: "Oceanfront Pool Villa",
        verified: true,
        status: "APPROVED",
      },
      {
        name: "James Whitfield",
        email: `james${seedDomain}`,
        location: "London",
        rating: 5,
        title: "Simply extraordinary for a family of eight",
        comment: "The Crown Villa is simply extraordinary. We had a private chef, a private beach and a sunset yacht cruise we will talk about for years.",
        roomName: "The Crown Villa",
        verified: true,
        status: "APPROVED",
      },
      {
        name: "Priya Raghavan",
        email: `priya${seedDomain}`,
        location: "Bengaluru",
        rating: 5,
        title: "Laal maas and the Heritage Hammam — pure bliss",
        comment: "Darbar served the finest laal maas I've had outside Jodhpur, and the Heritage Hammam was pure bliss. We've already booked our return.",
        roomName: "Grand Heritage Suite",
        verified: true,
        status: "APPROVED",
      },
      {
        name: "Sofia Marchetti",
        email: `sofia${seedDomain}`,
        location: "Milan",
        rating: 4,
        title: "A Rajasthani palace by the sea",
        comment: "It feels like a Rajasthani palace was lifted up and set down by the sea. Quiet, graceful and staffed by the warmest people. Breakfast could open a little earlier.",
        roomName: "Royal One Bedroom Suite",
        verified: false,
        status: "APPROVED",
      },
    ],
  });

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / Admin@12345`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
