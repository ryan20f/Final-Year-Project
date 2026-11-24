import MapView, { Marker, Polyline } from 'react-native-maps';

import type { ShotMapProps } from './shot-map.types';

export default function ShotMap({ start, endpoint, onSelect }: ShotMapProps) {
  return (
    <MapView
      style={{ height: 310 }}
      mapType="satellite"
      initialRegion={{ ...start, latitudeDelta: 0.006, longitudeDelta: 0.006 }}
      onPress={(event) => onSelect(event.nativeEvent.coordinate)}
    >
      <Marker coordinate={start} title="Fixed start" pinColor="green" />
      {endpoint && (
        <>
          <Marker
            coordinate={endpoint}
            title="Endpoint"
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
