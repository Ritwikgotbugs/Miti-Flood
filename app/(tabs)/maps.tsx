import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Heatmap, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const heatmapPoints = [
  { latitude: 13.0827, longitude: 80.2707, weight: 4.0 }, // Chennai
  { latitude: 11.0168, longitude: 76.9558, weight: 3.5 }, // Coimbatore
  { latitude: 9.9252, longitude: 78.1198, weight: 2.5 }, // Madurai
  { latitude: 8.7139, longitude: 77.7567, weight: 3.0 }, // Kanyakumari
  { latitude: 12.0905, longitude: 78.7047, weight: 2.0 }, // Tiruchirappalli
  { latitude: 12.9165, longitude: 79.1325, weight: 3.2 }, // Vellore
  { latitude: 13.3409, longitude: 77.1135, weight: 2.3 }, // Krishnagiri
  { latitude: 11.6643, longitude: 78.1460, weight: 2.7 }, // Salem
  { latitude: 10.9940, longitude: 76.9616, weight: 3.0 }, // Erode
  { latitude: 12.2979, longitude: 78.6461, weight: 2.5 }, // Dharmapuri
  { latitude: 11.9314, longitude: 79.7856, weight: 3.0 }, // Cuddalore
  { latitude: 11.1085, longitude: 77.3411, weight: 2.0 }, // Tirupur
  { latitude: 11.7466, longitude: 79.7755, weight: 1.5 }, // Puducherry (Union Territory but near Tamil Nadu)
  { latitude: 12.9916, longitude: 80.2337, weight: 2.5 }, // Chengalpattu
  { latitude: 9.5927, longitude: 77.9624, weight: 2.2 }, // Virudhunagar
  { latitude: 12.6950, longitude: 78.6219, weight: 3.0 }, // Tiruvannamalai
  { latitude: 10.3673, longitude: 77.9803, weight: 2.3 }, // Theni
  { latitude: 12.0430, longitude: 78.1602, weight: 2.1 }, // Namakkal
  { latitude: 11.5920, longitude: 78.1261, weight: 3.0 }, // Karur
  { latitude: 12.2813, longitude: 76.7328, weight: 1.0 }, // Nilgiris
  { latitude: 10.3508, longitude: 79.4167, weight: 2.5 }, // Adirampattinam
  { latitude: 8.7167, longitude: 77.4833, weight: 1.5 }, // Ambasamudram
  { latitude: 21.8333, longitude: 78.7500, weight: 1.5 }, // Ambur
  { latitude: 10.4000, longitude: 76.6667, weight: 2.5 }, // Anaimalai Hills
  { latitude: 13.0833, longitude: 79.7167, weight: 3.0 }, // Arakkonam
  { latitude: 10.1667, longitude: 79.0333, weight: 1.5 }, // Arantangi
  { latitude: 12.9333, longitude: 79.4000, weight: 1.8 }, // Arcot
  { latitude: 12.6667, longitude: 79.3167, weight: 3.0 }, // Arni
  { latitude: 9.5167, longitude: 78.1333, weight: 1.5 }, // Aruppukkotai
  { latitude: 11.6000, longitude: 78.6500, weight: 1.5 }, // Attur
  { latitude: 10.2667, longitude: 77.8833, weight: 2.5 }, // Atur
  { latitude: 10.0167, longitude: 77.4000, weight: 1.5 }, // Bodinayakkanur
  { latitude: 10.3000, longitude: 79.8667, weight: 1.5 }, // Calimere, Point
  { latitude: 12.0000, longitude: 80.0000, weight: 3.0 }, // Carnatic
  { latitude: 11.4000, longitude: 79.7333, weight: 2.5 }, // Chidambaram
  { latitude: 12.7000, longitude: 80.0167, weight: 3.0 }, // Chingleput
  { latitude: 11.0000, longitude: 77.0000, weight: 2.5 }, // Coimbatore
  { latitude: 8.0667, longitude: 77.6000, weight: 1.5 }, // Comorin, C.
  { latitude: 12.0000, longitude: 80.5000, weight: 2.0 }, // Coromandel Coast
  { latitude: 11.7167, longitude: 79.8167, weight: 2.5 }, // Cuddalore
  { latitude: 9.9500, longitude: 78.8833, weight: 3.0 }, // Devakottai
  { latitude: 9.1667, longitude: 79.4667, weight: 1.5 }, // Dhanushkodi
  { latitude: 12.0500, longitude: 77.5667, weight: 2.5 }, // Dharapuram
  { latitude: 12.1333, longitude: 78.2167, weight: 2.5 }, // Dharmapuri
  { latitude: 10.3667, longitude: 78.0000, weight: 2.5 }, // Dindigul
  { latitude: 11.4167, longitude: 76.7667, weight: 1.5 }, // Dodabetta. Mt.
  { latitude: 13.2333, longitude: 80.3667, weight: 2.0 }, // Ennore
  { latitude: 12.2333, longitude: 77.7667, weight: 1.5 }, // Erode
  { latitude: 11.7500, longitude: 79.8333, weight: 2.5 }, // Fort St David
  { latitude: 13.0667, longitude: 80.2833, weight: 2.0 }, // Fort St George
  { latitude: 12.9500, longitude: 78.9167, weight: 3.0 }, // Gudiyatam
  { latitude: 12.7333, longitude: 77.8667, weight: 1.5 }, // Hospur
  { latitude: 12.5667, longitude: 78.6167, weight: 1.5 }, // Jalarpet
  { latitude: 12.6667, longitude: 78.6667, weight: 2.5 }, // Javadi hills
  { latitude: 12.8333, longitude: 79.7500, weight: 3.0 }, // Kanchipuram
  { latitude: 10.9667, longitude: 78.1167, weight: 2.5 }, // Karur
  { latitude: 12.2333, longitude: 77.8333, weight: 3.0 }, // Kaveri R.
  { latitude: 8.5667, longitude: 78.1667, weight: 1.5 }, // Kayalpatnam
  { latitude: 9.2333, longitude: 78.8333, weight: 2.5 }, // Kilakarai
  { latitude: 10.2167, longitude: 77.5333, weight: 2.5 }, // Kodaikanal
  { latitude: 12.5333, longitude: 78.2667, weight: 2.5 }, // Krishnagiri
  { latitude: 10.9667, longitude: 79.4167, weight: 2.5 }, // Kumbakonam
  { latitude: 13.0667, longitude: 80.2833, weight: 2.5 }, // Madras (Chennai)
  { latitude: 9.9667, longitude: 78.1667, weight: 3.0 }, // Madurai
  { latitude: 12.5000, longitude: 79.9333, weight: 2.5 }, // Madurantakam
  { latitude: 9.4000, longitude: 77.9667, weight: 3.0 }, // Mukkulathor
  { latitude: 9.7167, longitude: 78.7667, weight: 2.0 }, // Munneru River
  { latitude: 8.9333, longitude: 78.6167, weight: 2.5 }, // Othakalmandapam
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
          opacity={0.8}
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