export type Point = { latitude: number; longitude: number };

export type ShotMapProps = {
  start: Point;
  endpoint: Point | null;
  onSelect: (point: Point) => void;
};
