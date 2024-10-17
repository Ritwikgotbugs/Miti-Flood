import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import React = require('react');

// Define the type for the stack navigation routes
type RootStackParamList = {
  login: undefined;
  // Add more routes as needed
};

// Define the type for the navigation prop for this screen
type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'login'>;

const Index: React.FC = () => {
  const navigation = useNavigation<IndexScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('login'); // Navigate to the login screen
    }, 0); // Trigger immediately on mount

    return () => clearTimeout(timer); // Clean up timer when component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Add any splash screen or loading indicators if needed */}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Example color (use your custom styles)
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
