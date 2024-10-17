import React from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { WeatherDataComponent } from '../../components/pages/weatherData';
import Carousel from 'react-native-reanimated-carousel';

const weatherData = [
  { title: 'Precipitation', dataType: 'rain', iconurl: require('../../assets/icons/ppt-icon.png') },
  { title: 'Humidity', dataType: 'humidity', iconurl: require('../../assets/icons/humidity.png') },
  { title: 'Temperature', dataType: 'temperature', iconurl: require('../../assets/icons/temp.png') },
  { title: 'Wind Speed', dataType: 'windSpeed', iconurl: require('../../assets/icons/wind.png') },
  { title: 'UV Index', dataType: 'uv', iconurl: require('../../assets/icons/uv.png') },
  { title: 'Visibility', dataType: 'visibility', iconurl: require('../../assets/icons/visibility.png') },
  { title: 'Wind Direction', dataType: 'dir', iconurl: require('../../assets/icons/dir.png') },
  { title: 'Wind Degree', dataType: 'deg', iconurl: require('../../assets/icons/wind.png') },
];

const { width: windowWidth } = Dimensions.get('window');

export default function WeatherCarousel() {
  // Chunk the weather data into groups of 4 for 2x2 display
  const chunkedData = [];
  for (let i = 0; i < weatherData.length; i += 4) {
    chunkedData.push(weatherData.slice(i, i + 4));
  }

  const renderItem = ({ item }: { item: { title: string; dataType: string; iconurl: any }[] }) => (
    <View style={styles.grid}>
      {item.map((data) => (
        <View key={data.dataType} style={styles.item}>
          <WeatherDataComponent 
            title={data.title} 
            dataType={data.dataType} 
            iconurl={data.iconurl}
          />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView>
      <Carousel
        loop={false} // Disable loop to prevent reverse swiping
        width={windowWidth}
        height={300} 
        autoPlay={false}
        data={chunkedData}
        renderItem={renderItem}
        onSnapToItem={(index: number) => console.log('Current index:', index)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: '100%', // Ensure full height for each carousel item
  },
  item: {
    width: '48%', // Adjust for spacing
    marginBottom: 10, // Space between rows
  },
});
