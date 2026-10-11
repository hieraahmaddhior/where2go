// Demo data. These cafes are fictional and the codes are for local testing only.
const MINUTE = 60 * 1000;

// Offsets are metres north/east of the seed origin, so the demo can be planted anywhere.
const DEMO_CAFES = [
  { name: "Second Draft Coffee", area: "Dago", north: 250, east: 240, total: 24, free: 18, age: 2, code: "DRAFT24" },
  { name: "Loka Roasters", area: "Dago", north: -900, east: 800, total: 20, free: 11, age: 1, code: "LOKA20" },
  { name: "Kopi Tala", area: "Cihampelas", north: 1100, east: -1150, total: 30, free: 9, age: 5, code: "TALA30" },
  { name: "Halte Kopi", area: "Dago", north: -420, east: -430, total: 16, free: 5, age: 9, code: "HALTE16" },
  { name: "Sudut Pagi", area: "Braga", north: -1800, east: 1050, total: 22, free: 4, age: 12, code: "SUDUT22" },
  { name: "Fig & Anise", area: "Cihampelas", north: 640, east: -630, total: 28, free: 2, age: 4, code: "FIG28" },
  { name: "Ruang Tengah", area: "Braga", north: -1500, east: -1170, total: 18, free: 0, age: 7, code: "RUANG18" },
  { name: "Northside Brew", area: "Dago", north: 300, east: -270, total: 12, free: 9, age: 45, code: "NORTH12" },
];

export function demoCafes(now: number) {
  const originLat = Number(process.env.SEED_LAT ?? -6.885);
  const originLng = Number(process.env.SEED_LNG ?? 107.613);
  const metresPerDegLat = 111_320;
  const metresPerDegLng = metresPerDegLat * Math.cos((originLat * Math.PI) / 180);

  return DEMO_CAFES.map((c) => ({
    name: c.name,
    area: c.area,
    lat: originLat + c.north / metresPerDegLat,
    lng: originLng + c.east / metresPerDegLng,
    totalSeats: c.total,
    freeSeats: c.free,
    code: c.code,
    updatedAt: now - c.age * MINUTE,
  }));
}
