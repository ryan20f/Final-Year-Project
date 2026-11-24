import MapView, { Marker, Polyline } from 'react-native-maps';

import { distanceInMetres } from '@/utils/distance';

import type { ShotMapProps } from './shot-map.types';

export default function ShotMap({ teeArea, fairwayAim, greenArea, start, endpoint, onSelect }: ShotMapProps) {
  const startsAtTee = start.latitude === teeArea.latitude && start.longitude === teeArea.longitude;
  const latitudeScale = Math.cos(teeArea.latitude * Math.PI / 180);
  const east = (fairwayAim.longitude - teeArea.longitude) * latitudeScale;
  const north = fairwayAim.latitude - teeArea.latitude;
  const heading = (Math.atan2(east, north) * 180 / Math.PI + 360) % 360;
  const span = Math.max(distanceInMetres(teeArea, greenArea), distanceInMetres(teeArea, fairwayAim));

  return (
    <MapView
      style={{ height: 310 }}
      mapType="satellite"
      initialCamera={{
        center: {
          latitude: (teeArea.latitude + greenArea.latitude) / 2,
          longitude: (teeArea.longitude + greenArea.longitude) / 2,
        },
        heading,
        pitch: 0,
        altitude: span * 2,
        zoom: Math.log2(156543.03 * latitudeScale * 215 / span),
      }}
      onPress={(event) => onSelect(event.nativeEvent.coordinate)}
    >
      {!startsAtTee && <Marker coordinate={teeArea} title="White tee reference" pinColor="gray" stopPropagation />}
      <Marker coordinate={start} title={startsAtTee ? 'White tee reference' : 'Current start'} pinColor="green" stopPropagation />
      {endpoint && (
        <>
          <Marker
            coordinate={endpoint}
            title="Endpoint"
            stopPropagation
            draggable
            onDrag={(event) => onSelect(event.nativeEvent.coordinate)}
            onDragEnd={(event) => onSelect(event.nativeEvent.coordinate)}
          />
          <Polyline coordinates={[start, endpoint]} strokeColor="#ffffff" strokeWidth={3} />
        </>
      )}
    </MapView>
  );
}
