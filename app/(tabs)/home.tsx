import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GraphHistory } from '../../components/pages/graph';
import WeatherCarousel from '../../components/pages/carousel';
import * as Location from 'expo-location';


type CityData = {
  [key: string]: number;
};

type SampleData = {
  [city: string]: CityData;
};

const sampleData: SampleData = {
    Chennai: {
      MonsoonIntensity: 6,
      TopographyDrainage: 4,
      RiverManagement: 7,
      Deforestation: 5,
      Urbanization: 6,
      ClimateChange: 8,
      DamsQuality: 6,
      Siltation: 5,
      AgriculturalPractices: 7,
      Encroachments: 5,
      IneffectiveDisasterPreparedness: 6,
      DrainageSystems: 5,
      CoastalVulnerability: 4,
      Landslides: 3,
      Watersheds: 6,
      DeterioratingInfrastructure: 5,
      PopulationScore: 7,
      WetlandLoss: 6,
      InadequatePlanning: 6,
      PoliticalFactors: 5,
    },
    Coimbatore: {
      MonsoonIntensity: 4,
      TopographyDrainage: 3,
      RiverManagement: 5,
      Deforestation: 4,
      Urbanization: 5,
      ClimateChange: 6,
      DamsQuality: 5,
      Siltation: 4,
      AgriculturalPractices: 6,
      Encroachments: 3,
      IneffectiveDisasterPreparedness: 4,
      DrainageSystems: 4,
      CoastalVulnerability: 2,
      Landslides: 2,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 5,
      WetlandLoss: 4,
      InadequatePlanning: 4,
      PoliticalFactors: 4,
    },
    Madurai: {
      MonsoonIntensity: 5,
      TopographyDrainage: 3,
      RiverManagement: 6,
      Deforestation: 7,
      Urbanization: 5,
      ClimateChange: 7,
      DamsQuality: 6,
      Siltation: 6,
      AgriculturalPractices: 7,
      Encroachments: 4,
      IneffectiveDisasterPreparedness: 5,
      DrainageSystems: 4,
      CoastalVulnerability: 2,
      Landslides: 3,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 6,
      WetlandLoss: 5,
      InadequatePlanning: 5,
      PoliticalFactors: 4,
    },
    Kanyakumari: {
      MonsoonIntensity: 7,
      TopographyDrainage: 5,
      RiverManagement: 6,
      Deforestation: 4,
      Urbanization: 6,
      ClimateChange: 8,
      DamsQuality: 7,
      Siltation: 6,
      AgriculturalPractices: 7,
      Encroachments: 4,
      IneffectiveDisasterPreparedness: 6,
      DrainageSystems: 5,
      CoastalVulnerability: 6,
      Landslides: 3,
      Watersheds: 6,
      DeterioratingInfrastructure: 5,
      PopulationScore: 6,
      WetlandLoss: 5,
      InadequatePlanning: 5,
      PoliticalFactors: 4,
    },
    Tiruchirappalli: {
      MonsoonIntensity: 5,
      TopographyDrainage: 4,
      RiverManagement: 6,
      Deforestation: 5,
      Urbanization: 5,
      ClimateChange: 6,
      DamsQuality: 6,
      Siltation: 5,
      AgriculturalPractices: 7,
      Encroachments: 4,
      IneffectiveDisasterPreparedness: 5,
      DrainageSystems: 4,
      CoastalVulnerability: 2,
      Landslides: 3,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 6,
      WetlandLoss: 5,
      InadequatePlanning: 4,
      PoliticalFactors: 5,
    },
    Vellore: {
      MonsoonIntensity: 5,
      TopographyDrainage: 4,
      RiverManagement: 6,
      Deforestation: 5,
      Urbanization: 5,
      ClimateChange: 6,
      DamsQuality: 5,
      Siltation: 5,
      AgriculturalPractices: 6,
      Encroachments: 4,
      IneffectiveDisasterPreparedness: 5,
      DrainageSystems: 4,
      CoastalVulnerability: 3,
      Landslides: 2,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 6,
      WetlandLoss: 4,
      InadequatePlanning: 5,
      PoliticalFactors: 4,
    },
    Krishnagiri: {
      MonsoonIntensity: 4,
      TopographyDrainage: 3,
      RiverManagement: 5,
      Deforestation: 4,
      Urbanization: 5,
      ClimateChange: 6,
      DamsQuality: 5,
      Siltation: 4,
      AgriculturalPractices: 6,
      Encroachments: 3,
      IneffectiveDisasterPreparedness: 4,
      DrainageSystems: 4,
      CoastalVulnerability: 2,
      Landslides: 2,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 5,
      WetlandLoss: 4,
      InadequatePlanning: 4,
      PoliticalFactors: 4,
    },
    Salem: {
      MonsoonIntensity: 6,
      TopographyDrainage: 5,
      RiverManagement: 7,
      Deforestation: 5,
      Urbanization: 6,
      ClimateChange: 7,
      DamsQuality: 6,
      Siltation: 6,
      AgriculturalPractices: 7,
      Encroachments: 4,
      IneffectiveDisasterPreparedness: 5,
      DrainageSystems: 5,
      CoastalVulnerability: 3,
      Landslides: 4,
      Watersheds: 6,
      DeterioratingInfrastructure: 5,
      PopulationScore: 6,
      WetlandLoss: 5,
      InadequatePlanning: 5,
      PoliticalFactors: 4,
    },
    Erode: {
      MonsoonIntensity: 5,
      TopographyDrainage: 4,
      RiverManagement: 6,
      Deforestation: 6,
      Urbanization: 5,
      ClimateChange: 6,
      DamsQuality: 5,
      Siltation: 6,
      AgriculturalPractices: 7,
      Encroachments: 3,
      IneffectiveDisasterPreparedness: 4,
      DrainageSystems: 4,
      CoastalVulnerability: 2,
      Landslides: 3,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 5,
      WetlandLoss: 4,
      InadequatePlanning: 4,
      PoliticalFactors: 5,
    },
    Dharmapuri: {
      MonsoonIntensity: 4,
      TopographyDrainage: 3,
      RiverManagement: 5,
      Deforestation: 5,
      Urbanization: 4,
      ClimateChange: 6,
      DamsQuality: 5,
      Siltation: 4,
      AgriculturalPractices: 6,
      Encroachments: 3,
      IneffectiveDisasterPreparedness: 4,
      DrainageSystems: 3,
      CoastalVulnerability: 2,
      Landslides: 2,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 5,
      WetlandLoss: 4,
      InadequatePlanning: 4,
      PoliticalFactors: 4,
    },
    Cuddalore: {
      MonsoonIntensity: 6,
      TopographyDrainage: 5,
      RiverManagement: 6,
      Deforestation: 5,
      Urbanization: 6,
      ClimateChange: 7,
      DamsQuality: 6,
      Siltation: 6,
      AgriculturalPractices: 7,
      Encroachments: 4,
      IneffectiveDisasterPreparedness: 5,
      DrainageSystems: 5,
      CoastalVulnerability: 7,
      Landslides: 3,
      Watersheds: 6,
      DeterioratingInfrastructure: 5,
      PopulationScore: 6,
      WetlandLoss: 5,
      InadequatePlanning: 5,
      PoliticalFactors: 4,
    },
    Tirupur: {
      MonsoonIntensity: 5,
      TopographyDrainage: 4,
      RiverManagement: 5,
      Deforestation: 6,
      Urbanization: 5,
      ClimateChange: 6,
      DamsQuality: 5,
      Siltation: 5,
      AgriculturalPractices: 6,
      Encroachments: 3,
      IneffectiveDisasterPreparedness: 4,
      DrainageSystems: 3,
      CoastalVulnerability: 2,
      Landslides: 2,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 5,
      WetlandLoss: 4,
      InadequatePlanning: 4,
      PoliticalFactors: 5,
    },
    Thanjavur: {
      MonsoonIntensity: 6,
      TopographyDrainage: 5,
      RiverManagement: 7,
      Deforestation: 6,
      Urbanization: 6,
      ClimateChange: 7,
      DamsQuality: 6,
      Siltation: 6,
      AgriculturalPractices: 7,
      Encroachments: 5,
      IneffectiveDisasterPreparedness: 6,
      DrainageSystems: 5,
      CoastalVulnerability: 3,
      Landslides: 3,
      Watersheds: 6,
      DeterioratingInfrastructure: 5,
      PopulationScore: 6,
      WetlandLoss: 5,
      InadequatePlanning: 5,
      PoliticalFactors: 4,
    },
    Karur: {
      MonsoonIntensity: 5,
      TopographyDrainage: 4,
      RiverManagement: 5,
      Deforestation: 5,
      Urbanization: 4,
      ClimateChange: 6,
      DamsQuality: 5,
      Siltation: 4,
      AgriculturalPractices: 6,
      Encroachments: 3,
      IneffectiveDisasterPreparedness: 4,
      DrainageSystems: 4,
      CoastalVulnerability: 2,
      Landslides: 2,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 5,
      WetlandLoss: 4,
      InadequatePlanning: 4,
      PoliticalFactors: 4,
    },
    Manapparai: {
      MonsoonIntensity: 4,
      TopographyDrainage: 3,
      RiverManagement: 5,
      Deforestation: 5,
      Urbanization: 4,
      ClimateChange: 6,
      DamsQuality: 5,
      Siltation: 4,
      AgriculturalPractices: 6,
      Encroachments: 3,
      IneffectiveDisasterPreparedness: 4,
      DrainageSystems: 4,
      CoastalVulnerability: 2,
      Landslides: 2,
      Watersheds: 5,
      DeterioratingInfrastructure: 4,
      PopulationScore: 5,
      WetlandLoss: 4,
      InadequatePlanning: 4,
      PoliticalFactors: 4,
    },
    MaraimalaiNagar : {
      MonsoonIntensity: 5,
      TopographyDrainage: 4,
      RiverManagement: 6,
      Deforestation: 5,
      Urbanization: 6,
      ClimateChange: 7,
      DamsQuality: 6,
      Siltation: 5,
      AgriculturalPractices: 7,
      Encroachments: 4,
      IneffectiveDisasterPreparedness: 5,
      DrainageSystems: 5,
      CoastalVulnerability: 3,
      Landslides: 3,
      Watersheds: 6,
      DeterioratingInfrastructure: 5,
      PopulationScore: 6,
      WetlandLoss: 5,
      InadequatePlanning: 5,
      PoliticalFactors: 4,
    },
  };
  
  

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');
  const cityData = sampleData[selectedCity];
  const { width } = Dimensions.get('window');
  const scale = width / 375;  // Assuming 375 is the base width for scaling

  const floodPercentage = (Object.values(cityData).reduce((sum, value) => sum + value, 0) / Object.values(cityData).length)*10.6 + 10;
  const floodIntensity = floodPercentage > 65 ? 'High' : floodPercentage > 50 ? 'Moderate' : 'Low';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            <Text style={{ color: 'white', fontSize: 24 * scale, marginBottom: 16, marginTop: 40 }}>
              Welcome, Ritwik
            </Text>

            {/* Weather Data Carousel */}
            <View style={{ marginTop: 16 }}>
              <WeatherCarousel />
            </View>

            {/* Dropdown for City Selection */}
            <View style={{ marginTop: 32, backgroundColor: '#333333', padding: 16 * scale, borderRadius: 8 }}>
              <Text style={{ color: 'white', fontSize: 18 * scale, marginBottom: 8 }}>Select City</Text>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue) => setSelectedCity(itemValue)}
                style={{ color: 'white' }}
              >
                {Object.keys(sampleData).map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>

            {/* Display City Data in Grid */}
            <View style={{ marginTop: 16, backgroundColor: '#222222', padding: 16 * scale, borderRadius: 8 }}>
              <Text style={{ color: 'white', fontSize: 20 * scale, marginBottom: 8 }}>Flood Risk Factors</Text>
              <FlatList
                data={Object.entries(cityData)}
                keyExtractor={([key]) => key}
                numColumns={2}
                renderItem={({ item: [key, value] }) => (
                  <View style={{ flex: 1, padding: 8 * scale, borderColor: '#444', borderWidth: 1, margin: 2 }}>
                    <Text style={{ color: 'white', fontSize: 16 * scale }}>{key}</Text>
                    <Text
                      style={{
                        color:
                          value < 3
                            ? '#00ff00' // Green for values below 3
                            : value >= 3 && value <= 6
                            ? '#ffff00' // Yellow for values between 3 and 5
                            : '#ff0000', // Red for values above 5
                        fontSize: 18 * scale,
                      }}
                    >
                      {value}
                    </Text>
                  </View>
                )}
              />
            </View>

            {/* Flood Percentage and Intensity */}
            <View style={{ marginTop: 16, backgroundColor: '#222222', padding: 16 * scale, borderRadius: 8 }}>
              <Text style={{ color: 'white', fontSize: 20 * scale, marginBottom: 8 }}>Flood Risk Overview</Text>
              <Text style={{ color: 'white', fontSize: 16 * scale }}>
                Flood Risk Percentage: {(floodPercentage).toFixed(2)}%
              </Text>
              <Text style={{ color: 'white', fontSize: 16 * scale }}>Flood Intensity: {floodIntensity}</Text>
            </View>

            {/* Graph Section */}
            <View style={{ marginTop: 32, marginBottom: 40 }}>
              <GraphHistory />
            </View>
          </>
        }
        contentContainerStyle={{ padding: 16 * scale }}
      />
    </SafeAreaView>
  );
}