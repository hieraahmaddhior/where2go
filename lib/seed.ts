// Demo data built on real cafes around 99 Coffee Roaster, Gejayan, Yogyakarta.
//
// REAL (Google Maps, read 2026-10-13): name, address, coordinates, and the opening or
// closing times marked "listed" below.
// INVENTED: table layouts, zones, facilities, rules, prices, the hours marked "assumed",
// and every table's free/taken state, which lib/simulator.ts keeps flipping.
// None of the invented fields came from the cafes. The interface says so on every page;
// keep it saying so until a cafe supplies its own data.
import { randomInt } from "node:crypto";

const MINUTE = 60 * 1000;
const hm = (hours: number, minutes = 0) => hours * 60 + minutes;

type DemoCafe = {
  name: string;
  area: string;
  lat: number;
  lng: number;
  address: string;
  opensMin: number;
  closesMin: number;
  priceFrom: number;
  facilities: string[];
  rules: string[];
  // Table sizes per floor or zone, in the order staff number them.
  zones: { name: string; tables: number[] }[];
  // How many tables start occupied, counted from the last one.
  taken: number;
  // Share of tables the simulator tends to keep free (high = usually roomy, low = usually busy).
  bias: number;
  unconfirmed?: boolean;
};

const DEMO_CAFES: DemoCafe[] = [
  {
    name: "99 Coffee Roaster - Gejayan",
    area: "Gejayan",
    lat: -7.7612526,
    lng: 110.3937996,
    address: "Jl. Affandi No.26, Soropadan, Condongcatur, Depok, Sleman",
    opensMin: hm(7), // listed
    closesMin: hm(2), // from a visitor review, not the listing
    priceFrom: 24000,
    facilities: ["Stopkontak di hampir semua meja", "Wi-Fi", "AC", "Area merokok", "Musala", "Parkir motor dan mobil", "Toilet"],
    rules: ["Laptop boleh", "Maksimal 3 jam saat semua meja terisi"],
    zones: [
      { name: "Lantai 1", tables: [2, 2, 4, 4] },
      { name: "Lantai 2", tables: [2, 4, 4, 6] },
      { name: "Teras", tables: [4, 8] },
    ],
    taken: 4,
    bias: 0.5,
  },
  {
    name: "Svarga Flora Coffee & Plants",
    area: "Gejayan",
    lat: -7.7612473,
    lng: 110.3940399,
    address: "Jl. Affandi No.26A, Condongcatur, Depok, Sleman",
    opensMin: hm(8), // listed
    closesMin: hm(1), // listed
    priceFrom: 22000,
    facilities: ["Wi-Fi", "Area terbuka", "Area merokok", "Parkir motor", "Toilet"],
    rules: ["Laptop boleh", "Tidak ada batas waktu di hari kerja"],
    zones: [
      { name: "Dalam", tables: [2, 2, 4] },
      { name: "Taman", tables: [2, 4, 4, 6] },
    ],
    taken: 2,
    bias: 0.6,
  },
  {
    name: "Toko Kopi Sedaya",
    area: "Gejayan",
    lat: -7.7627066,
    lng: 110.3957745,
    address: "Jl. Prayan I No.80 C, Condongcatur, Depok, Sleman",
    opensMin: hm(9), // listed
    closesMin: hm(22), // assumed
    priceFrom: 20000,
    facilities: ["Wi-Fi", "AC", "Parkir motor", "Toilet", "Biji kopi dijual eceran"],
    rules: ["Minimum order 1 minuman per orang"],
    zones: [{ name: "Ruang utama", tables: [2, 2, 2, 4, 4] }],
    taken: 3,
    bias: 0.45,
  },
  {
    name: "Kobessah Kopi",
    area: "Condongcatur",
    lat: -7.7577411,
    lng: 110.3967803,
    address: "Jl. Anggajaya 2 No.300, Condongcatur, Depok, Sleman",
    opensMin: hm(7), // listed
    closesMin: hm(3), // listed
    priceFrom: 15000,
    facilities: ["Stopkontak di meja dinding", "Wi-Fi", "Area merokok", "Musala", "Parkir motor dan mobil", "Toilet"],
    rules: ["Laptop boleh", "Bayar di kasir sebelum duduk"],
    zones: [
      { name: "Dalam", tables: [2, 2, 4, 4] },
      { name: "Luar", tables: [4, 4, 6, 6, 8] },
    ],
    taken: 6,
    bias: 0.4,
  },
  {
    name: "Kopi Aksara",
    area: "Gejayan",
    lat: -7.7659637,
    lng: 110.395036,
    address: "Jl. Jemb. Merah IV No.250, Condongcatur, Depok, Sleman",
    opensMin: hm(15), // listed
    closesMin: hm(0, 30), // listed
    priceFrom: 18000,
    facilities: ["Wi-Fi", "Area merokok", "Parkir motor", "Toilet"],
    rules: ["Tidak ada batas waktu"],
    zones: [
      { name: "Dalam", tables: [2, 2, 4] },
      { name: "Teras", tables: [2, 4, 6] },
    ],
    taken: 3,
    bias: 0.5,
  },
  {
    name: "Kaktus Coffee Place",
    area: "Condongcatur",
    lat: -7.756383,
    lng: 110.3932267,
    address: "Jl. Gondang Raya No.4-5, Condongcatur, Depok, Sleman",
    opensMin: hm(8), // listed
    closesMin: hm(23), // assumed
    priceFrom: 25000,
    facilities: ["Stopkontak di lantai 2", "Wi-Fi", "AC", "Area merokok di taman", "Musala", "Parkir motor dan mobil", "Toilet"],
    rules: ["Maksimal 2 jam di akhir pekan", "Laptop hanya di lantai 2"],
    zones: [
      { name: "Lantai 1", tables: [2, 2, 4, 4] },
      { name: "Lantai 2", tables: [2, 2, 4, 6] },
      { name: "Taman", tables: [4, 6, 8] },
    ],
    taken: 8,
    bias: 0.3,
  },
  {
    name: "Presoul Blend And Brew Jogjakarta",
    area: "Condongcatur",
    lat: -7.7558311,
    lng: 110.3915926,
    address: "Jl. Gondang Raya No.16A, Condongcatur, Depok, Sleman",
    opensMin: hm(7), // listed
    closesMin: hm(22), // assumed
    priceFrom: 23000,
    facilities: ["Wi-Fi", "AC", "Parkir motor", "Toilet"],
    rules: ["Laptop boleh", "Tidak ada area merokok"],
    zones: [{ name: "Ruang utama", tables: [2, 2, 2, 4] }],
    taken: 1,
    bias: 0.6,
  },
  {
    name: "Pinggiran Kopi",
    area: "Condongcatur",
    lat: -7.7584375,
    lng: 110.4003125,
    address: "Ruko Panda Kav I, Condongcatur, Depok, Sleman",
    opensMin: hm(19), // listed
    closesMin: hm(2), // listed
    priceFrom: 12000,
    facilities: ["Wi-Fi", "Area merokok", "Parkir motor"],
    rules: ["Tidak ada batas waktu"],
    zones: [{ name: "Teras", tables: [2, 2, 4, 4] }],
    taken: 2,
    bias: 0.5,
  },
  {
    name: "Locan Coffee",
    area: "Gejayan",
    lat: -7.7677074,
    lng: 110.3975274,
    address: "Jl. Selokan Mataram No.421, Condongcatur, Depok, Sleman",
    opensMin: hm(7), // listed
    closesMin: hm(1), // listed
    priceFrom: 20000,
    facilities: ["Stopkontak di hampir semua meja", "Wi-Fi", "AC", "Area merokok", "Parkir motor", "Toilet"],
    rules: ["Laptop boleh", "Maksimal 3 jam saat ramai"],
    zones: [
      { name: "Lantai 1", tables: [2, 2, 4] },
      { name: "Lantai 2", tables: [2, 4, 4, 6] },
    ],
    taken: 4,
    bias: 0.42,
  },
  {
    name: "DIJOGJA Coffee Roastery & Pasta",
    area: "Kaliurang",
    lat: -7.7618342,
    lng: 110.3853812,
    address: "Jl. Weling Raya, Caturtunggal, Depok, Sleman",
    opensMin: hm(9), // assumed
    closesMin: hm(23), // assumed
    priceFrom: 26000,
    facilities: ["Wi-Fi", "AC", "Parkir motor dan mobil", "Toilet"],
    rules: ["Minimum order 1 menu per orang"],
    zones: [
      { name: "Dalam", tables: [2, 2, 4, 4] },
      { name: "Teras", tables: [4, 6] },
    ],
    taken: 3,
    bias: 0.5,
  },
  {
    // No heartbeat and last confirmed 45 minutes ago: hidden until its staff confirm.
    name: "Kala Liyangan Coffee",
    area: "Condongcatur",
    lat: -7.7573961,
    lng: 110.4012957,
    address: "Jl. Harjosudiro No.4, Condongcatur, Depok, Sleman",
    opensMin: hm(8), // listed
    closesMin: hm(22), // assumed
    priceFrom: 18000,
    facilities: ["Wi-Fi", "Parkir motor", "Toilet"],
    rules: ["Laptop boleh"],
    zones: [{ name: "Ruang utama", tables: [2, 2, 4, 4] }],
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

export function demoCafes(now: number) {
  return DEMO_CAFES.map((c) => {
    const tables = c.zones.flatMap((zone) => zone.tables.map((size) => ({ zone: zone.name, size })));
    return {
      name: c.name,
      area: c.area,
      lat: c.lat,
      lng: c.lng,
      address: c.address,
      // No landmark is shown for real cafes: an invented one could send someone the wrong way.
      landmark: "",
      priceFrom: c.priceFrom,
      facilities: c.facilities,
      rules: c.rules,
      code: randomCode(),
      opensMin: c.opensMin,
      closesMin: c.closesMin,
      confirmedAt: now - (c.unconfirmed ? 45 : 3) * MINUTE,
      heartbeat: !c.unconfirmed,
      bias: c.bias,
      note: c.unconfirmed ? "tersembunyi sampai dikonfirmasi staf" : "",
      tables: tables.map((t, index) => ({ ...t, free: index < tables.length - c.taken })),
    };
  });
}
