import MapView, { Marker, Polyline } from 'react-native-maps';

import type { ShotMapProps } from './shot-map.types';

export default function ShotMap({ teeArea, greenArea, start, endpoint, onSelect }: ShotMapProps) {
  const startsAtTee = start.latitude === teeArea.latitude && start.longitude === teeArea.longitude;
  return (
    <MapView
      style={{ height: 310 }}
      mapType="satellite"
      initialRegion={{
        latitude: (teeArea.latitude + greenArea.latitude) / 2,
        longitude: (teeArea.longitude + greenArea.longitude) / 2,
        latitudeDelta: Math.abs(teeArea.latitude - greenArea.latitude) + 0.0012,
        longitudeDelta: Math.abs(teeArea.longitude - greenArea.longitude) + 0.0012,
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
