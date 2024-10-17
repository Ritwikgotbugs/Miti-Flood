import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { GraphHistory } from '../../components/pages/graph';
import React = require('react');
import WeatherCarousel from '../../components/pages/carousel';

export default function Home() {
  return (
    <SafeAreaView className='h-full bg-[#111111]'>
      <ScrollView className="flex-1 bg-[#111111] p-4 h-full">
        <Text className="text-white text-3xl mb-4 mt-10">Welcome, Ritwik</Text>

        {/* Weather Data Carousel */}
        <View className="mt-4">
          <WeatherCarousel />
        </View>

        {/* Graph Section */}
        <View className="mt-8">
          <GraphHistory />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
