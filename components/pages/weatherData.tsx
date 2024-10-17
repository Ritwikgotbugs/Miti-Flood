import { View, Text, Image } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import React = require('react');

interface WeatherDataProps {
  title: string;
  dataType: 'rain' | 'humidity' | 'temperature' | 'windSpeed' | 'uv' | 'dir' | 'deg' | 'visibility';
  iconurl: any; // Change this to 'any' since it can be a require() or remote URL
}

interface WeatherApiResponse {
  current: {
    temp_c: number;
    humidity: number;
    precip_mm: number;
    wind_kph: number;
    uv: number;
    wind_dir: string;
    wind_degree: number;
    vis_km: number;
  };
}

export const WeatherDataComponent: React.FC<WeatherDataProps> = ({ title, dataType, iconurl }) => {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherApiResponse>(
          'https://api.weatherapi.com/v1/current.json?key=4efd5206eff842dabe175946231612&q=Kerala&aqi=no'
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const renderData = () => {
    if (!weatherData) return 'Loading...';

    switch (dataType) {
      case 'rain':
        return `${weatherData.current.precip_mm} mm`;
      case 'humidity':
        return `${weatherData.current.humidity}%`;
      case 'temperature':
        return `${weatherData.current.temp_c}°C`;
      case 'windSpeed':
        return `${weatherData.current.wind_kph} km/h`;
      case 'uv':
        return `${weatherData.current.uv}`;
      case 'dir':
        return `${weatherData.current.wind_dir}`;
      case 'deg':
        return `${weatherData.current.wind_degree}°`;
      case 'visibility':
        return `${weatherData.current.vis_km} km`;
      default:
        return 'N/A';
    }
  };

  return (
    <View className="bg-[#232323] rounded-lg p-2 w-40 m-2">
      {/* Placeholder Image */}
      <Image
        source={iconurl} // Use source for images
        style={{ width: '100%', height: 40 }} // Specify width and height for the Image
        resizeMode="contain"
      />
      
      {/* Weather Data Value */}
      <Text className="text-white text-center text-2xl mt-4">{renderData()}</Text>
      
      {/* Weather Data Label */}
      <Text className="text-white text-center mt-2">{title}</Text>
    </View>
  );
};
