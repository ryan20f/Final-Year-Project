type Coordinates = { latitude: number; longitude: number };

// Haversine distance over the Earth's surface; inputs are decimal degrees.
export function distanceInMetres(start: Coordinates, end: Coordinates): number {
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const a = Math.sin(radians(end.latitude - start.latitude) / 2) ** 2
    + Math.cos(radians(start.latitude)) * Math.cos(radians(end.latitude))
    * Math.sin(radians(end.longitude - start.longitude) / 2) ** 2;
  return 6_371_000 * 2 * Math.asin(Math.sqrt(Math.max(0, Math.min(1, a))));
}
