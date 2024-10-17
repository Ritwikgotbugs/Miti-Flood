import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import animalShelterImage from '../../assets/icons/sandbags/d1.jpeg'; 
import foodBankImage from '../../assets/icons/sandbags/d2.jpeg'; 
import disasterReliefImage from '../../assets/icons/sandbags/d3.jpg'; 

const donations = [
  {
    id: '1',
    title: 'Help the Local Animal Shelter',
    amount: 50,
    totalDonations: 1000,
    imageUrl: animalShelterImage,
  },
  {
    id: '2',
    title: 'Support Local Food Bank',
    amount: 30,
    totalDonations: 500,
    imageUrl: foodBankImage,
  },
  {
    id: '3',
    title: 'Aid for Disaster Relief',
    amount: 70,
    totalDonations: 2000,
    imageUrl: disasterReliefImage,
  },
];

const CommunityPage: React.FC = () => {
  const renderDonationCard = ({ item }: { item: typeof donations[0] }) => (
    <View className="bg-[#232323] rounded-lg p-4 m-2 shadow-md">
      <Image
        source={item.imageUrl} // Use the local image
        className="w-full h-32 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="text-white text-lg font-bold mb-1">{item.title}</Text>
      <Text className="text-white">Donate Amount: ${item.amount}</Text>
      <Text className="text-white mb-2">Total Donations: ${item.totalDonations}</Text>
      <TouchableOpacity className="bg-[#007BFF] p-2 rounded-md">
        <Text className="text-white text-center">Donate</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-[#111111] p-4">
      <Text className="text-white text-3xl mb-4">Community</Text>
      <FlatList
        data={donations}
        renderItem={renderDonationCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default CommunityPage;
