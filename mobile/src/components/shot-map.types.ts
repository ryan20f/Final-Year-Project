export type Point = { latitude: number; longitude: number };

export type ShotMapProps = {
  teeArea: Point;
  greenArea: Point;
  start: Point;
  endpoint: Point | null;
  onSelect: (point: Point) => void;
};
