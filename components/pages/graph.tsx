import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Carousel from 'react-native-reanimated-carousel';

interface GraphData {
  year: string;
  data: number[];
}

const graphData: GraphData[] = [
  {
    year: '2021',
    data: [30, 40, 20, 50, 60, 70],
  },
  {
    year: '2022',
    data: [50, 60, 80, 90, 70, 40],
  },
  {
    year: '2023',
    data: [70, 50, 80, 90, 60, 50],
  },
  {
    year: '2024',
    data: [80, 70, 90, 100, 90, 80],
  },
];

const { width: windowWidth } = Dimensions.get('window');

export const GraphHistory: React.FC = () => {
  const renderItem = ({ item }: GraphData) => (
    <View style={{ alignItems: 'center', padding: 10 }}>
      <Text className="text-white text-xl mb-4">Flood History for {item.year}</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{ data: item.data, strokeWidth: 2 }],
        }}
        width={windowWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#1E2923',
          backgroundGradientFrom: '#08130D',
          backgroundGradientTo: '#1F3B42',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );

  return (
    <Carousel
      loop={false} // Disable looping if you don't want to go back
      width={windowWidth}
      height={250} // Adjust as needed
      autoPlay={false}
      data={graphData}
      renderItem={renderItem}
      onSnapToItem={(index) => console.log('Current index:', index)} // Optional
    />
  );
};
