import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Heatmap, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const heatmapPoints = [
  { latitude: 10.8505, longitude: 76.2711, weight: 1 }, // Thrissur
  { latitude: 10.5276, longitude: 76.2144, weight: 1.5 }, // Palakkad
  { latitude: 8.5241, longitude: 76.9366, weight: 1 }, // Thiruvananthapuram
  { latitude: 11.2588, longitude: 75.7804, weight: 1 }, // Kozhikode
  { latitude: 9.9312, longitude: 76.2673, weight: 1.5 }, // Kochi
  { latitude: 8.8932, longitude: 76.6141, weight: 1 }, // Kollam
  { latitude: 10.0159, longitude: 76.3419, weight: 1 }, // Alappuzha
  { latitude: 9.5916, longitude: 76.5222, weight: 1.2 }, // Kottayam
  { latitude: 10.7867, longitude: 76.6548, weight: 1.3 }, // Malappuram
  { latitude: 9.3007, longitude: 76.9042, weight: 1 }, // Pathanamthitta
  { latitude: 9.0437, longitude: 76.4895, weight: 1 }, // Idukki
  { latitude: 12.3051, longitude: 75.2345, weight: 1.5 }, // Kasaragod
  { latitude: 10.7867, longitude: 76.0653, weight: 1 }, // Wayanad
  { latitude: 9.1546, longitude: 76.7314, weight: 1 }, // Punalur
];

export default function App() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // Request location permissions for Android
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ height: '100%', width: '100%' }}
        initialRegion={{
          latitude: 10.8505, // Center of Kerala
          longitude: 76.2711,
          latitudeDelta: 3.5, // Zoom out to cover entire Kerala
          longitudeDelta: 3.5,
        }}
      >
        {/* Add Heatmap to the Map */}
        <Heatmap
          points={heatmapPoints}
          opacity={0.7}
          radius={50}
          gradient={{
            colorMapSize: 256,
            colors: ['#00ff00', '#ff0000', '#0000ff'], // Colors for the heatmap
            startPoints: [0.2, 0.4, 0.6], // Positions for the gradient
          }}
        />
        
        {/* Display User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You are here"
            pinColor="blue" // Change color for user location marker
          />
        )}
      </MapView>
    </View>
  );
}
