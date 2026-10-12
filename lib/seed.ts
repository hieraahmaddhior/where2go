// Demo data. These cafes are fictional: names, addresses, prices, facilities, and rules are
// invented to look plausible, and their tables are flipped by lib/simulator.ts.
import { randomInt } from "node:crypto";

const MINUTE = 60 * 1000;
// Open past midnight so the demo still has open cafes during a late-evening session.
const WIDE_HOURS = { opensMin: 7 * 60, closesMin: 2 * 60 };

type DemoCafe = {
  name: string;
  area: string;
  // Metres north/east of the seed origin, so the demo can be planted anywhere.
  north: number;
  east: number;
  address: string;
  landmark: string;
  priceFrom: number;
  facilities: string[];
  rules: string[];
  // Table sizes per floor or zone, in the order staff number them.
  zones: { name: string; tables: number[] }[];
  // How many tables start occupied, counted from the last one.
  taken: number;
  // Share of tables the simulator tends to keep free (high = usually roomy, low = usually busy).
  bias: number;
  closed?: boolean;
  unconfirmed?: boolean;
};

const DEMO_CAFES: DemoCafe[] = [
  {
    name: "Second Draft Coffee",
    area: "Dago",
    north: 250,
    east: 240,
    address: "Jl. Ir. H. Juanda No. 142, Dago",
    landmark: "Ruko dua lantai di samping apotek, pintu kaca hitam",
    priceFrom: 22000,
    facilities: ["Stopkontak di hampir semua meja", "Wi-Fi", "AC di lantai 1", "Area merokok di teras", "Musala", "Parkir motor", "Toilet"],
    rules: ["Laptop boleh, tanpa batas waktu di hari kerja", "Akhir pekan maksimal 2 jam saat ramai"],
    zones: [
      { name: "Lantai 1", tables: [2, 2, 4, 4] },
      { name: "Lantai 2", tables: [2, 2, 4] },
      { name: "Teras", tables: [6] },
    ],
    taken: 2,
    bias: 0.62,
  },
  {
    name: "Loka Roasters",
    area: "Dago",
    north: -900,
    east: 800,
    address: "Jl. Dago Asri II No. 9, Dago",
    landmark: "Rumah tua bercat putih, masuk dari gang sebelah bengkel",
    priceFrom: 28000,
    facilities: ["Wi-Fi", "AC", "Parkir motor dan 3 mobil", "Toilet", "Biji kopi dijual eceran"],
    rules: ["Minimum order 1 minuman per orang", "Meja 8 kursi untuk rombongan 5 orang ke atas"],
    zones: [
      { name: "Ruang utama", tables: [2, 2, 4, 4] },
      { name: "Halaman belakang", tables: [8] },
    ],
    taken: 2,
    bias: 0.55,
  },
  {
    name: "Kopi Tala",
    area: "Cihampelas",
    north: 1100,
    east: -1150,
    address: "Jl. Cihampelas No. 211, Cihampelas",
    landmark: "Seberang minimarket, lantai dasar gedung parkir",
    priceFrom: 18000,
    facilities: ["Stopkontak di meja dinding", "Wi-Fi", "AC", "Area merokok", "Musala", "Parkir motor dan mobil", "Toilet"],
    rules: ["Laptop boleh", "Maksimal 3 jam saat semua meja terisi"],
    zones: [
      { name: "Lantai 1", tables: [2, 2, 2, 4] },
      { name: "Lantai 2", tables: [4, 4, 6, 6] },
    ],
    taken: 5,
    bias: 0.45,
  },
  {
    name: "Halte Kopi",
    area: "Dago",
    north: -420,
    east: -430,
    address: "Jl. Tubagus Ismail No. 27, Dago",
    landmark: "Tepat di sebelah halte angkot, kanopi kuning",
    priceFrom: 15000,
    facilities: ["Wi-Fi", "Area merokok di luar", "Parkir motor", "Toilet"],
    rules: ["Tidak ada batas waktu", "Bayar di kasir sebelum duduk"],
    zones: [
      { name: "Dalam", tables: [2, 2, 2] },
      { name: "Teras", tables: [4, 6] },
    ],
    taken: 3,
    bias: 0.5,
  },
  {
    name: "Sudut Pagi",
    area: "Braga",
    north: -1800,
    east: 1050,
    address: "Jl. Braga No. 58, Braga",
    landmark: "Bangunan sudut di persimpangan, jendela lengkung",
    priceFrom: 25000,
    facilities: ["Wi-Fi", "AC", "Musala di lantai 2", "Parkir motor di seberang", "Toilet"],
    rules: ["Minimum order Rp25.000 per orang", "Maksimal 2 jam di akhir pekan", "Laptop hanya di lantai 2"],
    zones: [
      { name: "Lantai 1", tables: [2, 2, 4] },
      { name: "Lantai 2", tables: [4, 4, 6] },
    ],
    taken: 5,
    bias: 0.38,
  },
  {
    name: "Fig & Anise",
    area: "Cihampelas",
    north: 640,
    east: -630,
    address: "Jl. Sastra No. 14, Cihampelas",
    landmark: "Masuk dari jalan kecil di belakang hotel, ada papan kayu",
    priceFrom: 26000,
    facilities: ["Stopkontak di lantai 1", "Wi-Fi", "AC", "Area merokok di taman", "Parkir motor dan mobil", "Toilet", "Kue dan roti buatan sendiri"],
    rules: ["Reservasi hanya untuk meja 8 kursi", "Maksimal 2 jam saat ramai"],
    zones: [
      { name: "Lantai 1", tables: [2, 2, 2, 2] },
      { name: "Taman", tables: [4, 4, 4, 8] },
    ],
    taken: 7,
    bias: 0.3,
  },
  {
    // Closed whenever the demo is seeded: opens two hours from then.
    name: "Ruang Tengah",
    area: "Braga",
    north: -1500,
    east: -1170,
    address: "Jl. Banceuy No. 33, Braga",
    landmark: "Lantai 2 di atas toko alat tulis, tangga di sisi kiri",
    priceFrom: 20000,
    facilities: ["Wi-Fi", "AC", "Musala", "Toilet"],
    rules: ["Laptop boleh", "Tidak ada area merokok"],
    zones: [{ name: "Ruang utama", tables: [2, 2, 4, 4, 6] }],
    taken: 0,
    bias: 0.5,
    closed: true,
  },
  {
    // No heartbeat and last confirmed 45 minutes ago: hidden until its staff confirm.
    name: "Northside Brew",
    area: "Dago",
    north: 300,
    east: -270,
    address: "Jl. Bukit Dago Utara No. 5, Dago",
    landmark: "Kontainer hijau di halaman parkir kampus",
    priceFrom: 16000,
    facilities: ["Wi-Fi", "Area merokok", "Parkir motor"],
    rules: ["Bawa pulang lebih diutamakan saat ramai"],
    zones: [{ name: "Teras", tables: [2, 2, 4, 4] }],
    taken: 1,
    bias: 0.5,
    unconfirmed: true,
  },
];

// No look-alike characters, so a code read off a screen can be typed back.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(): string {
  return Array.from({ length: 8 }, () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]).join("");
}

function closedHours(now: number) {
  const wibHour = Math.floor(((now / 60000 + 7 * 60) % 1440) / 60);
  const opensMin = ((wibHour + 2) % 24) * 60;
  return { opensMin, closesMin: (opensMin + 8 * 60) % 1440 };
}

export function demoCafes(now: number) {
  const originLat = Number(process.env.SEED_LAT ?? -6.885);
  const originLng = Number(process.env.SEED_LNG ?? 107.613);
  const metresPerDegLat = 111_320;
  const metresPerDegLng = metresPerDegLat * Math.cos((originLat * Math.PI) / 180);

  return DEMO_CAFES.map((c) => {
    const tables = c.zones.flatMap((zone) => zone.tables.map((size) => ({ zone: zone.name, size })));
    return {
      name: c.name,
      area: c.area,
      lat: originLat + c.north / metresPerDegLat,
      lng: originLng + c.east / metresPerDegLng,
      address: c.address,
      landmark: c.landmark,
      priceFrom: c.priceFrom,
      facilities: c.facilities,
      rules: c.rules,
      code: randomCode(),
      ...(c.closed ? closedHours(now) : WIDE_HOURS),
      confirmedAt: now - (c.unconfirmed ? 45 : 3) * MINUTE,
      heartbeat: !c.unconfirmed,
      bias: c.bias,
      note: c.closed ? "tutup saat di-seed" : c.unconfirmed ? "tersembunyi sampai dikonfirmasi staf" : "",
      tables: tables.map((t, index) => ({ ...t, free: index < tables.length - c.taken })),
    };
  });
}
