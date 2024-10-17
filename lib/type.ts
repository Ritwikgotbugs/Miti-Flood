// types/weather.ts

export interface WeatherData {
    rain: any;
    main: any;
    wind: any;
    location: {
      name: string;
      region: string;
      country: string;
    };
    current: {
      temp_c: number;
      wind_kph: number;
      humidity: number;
      condition: {
        text: string;
        icon: string;
      };
      precip_mm?: number;
    };
  }
  