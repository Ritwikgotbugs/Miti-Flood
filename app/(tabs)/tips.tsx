import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Image, Alert, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import tip1Image from '../../assets/icons/sandbags/s1.jpg'; // Update the path to your local image
import tip2Image from '../../assets/icons/sandbags/s2.jpeg'; 
import tip3Image from '../../assets/icons/sandbags/s3.jpg'; 
import tip4Image from '../../assets/icons/sandbags/s4.jpg'; 

// Modal content based on the tip
const getTipContent = (tipNumber: number) => {
  switch (tipNumber) {
    case 1:
      return {
        title: "Tip 1: Plan Routes",
        description: `During floods, having pre-planned emergency routes can be life-saving. Identify the safest routes to high ground or nearby shelters and communicate these routes to your family or community. Make sure to practice these routes with your family so everyone is familiar with them. 
        \nAdditionally, stay informed about road closures and flood-prone areas through local news and alerts.`,
        image: tip1Image, 
      };
    case 2:
      return {
        title: "Tip 2: Elevate Utilities",
        description: `Elevate essential utilities like electrical panels, appliances, and heating systems above the expected flood level. 
        \nConsider installing sump pumps and backflow valves to prevent flooding of basements and sewage systems. 
        \nIt's also advisable to store valuable documents and electronics in waterproof containers or on higher shelves.`,
        image: tip2Image, // Use local image
      };
    case 3:
      return {
        title: "Tip 3: Use Sandbags",
        description: `Use sandbags to create barriers that can help divert water away from your property. 
        \nProperly stacking sandbags is crucial for their effectiveness. 
        \nFill bags halfway and lay them flat, stacking them in a pyramid shape to increase stability. 
        \nAdditionally, ensure that the bags are placed tightly against each other to prevent gaps.`,
        image: tip3Image, // Use local image
      };
    case 4:
      return {
        title: "Tip 4: Secure Valuables",
        description: `Secure your valuables by moving them to higher places or storing them in waterproof containers. 
        \nCreate an inventory of your valuables and consider taking photographs for insurance purposes. 
        \nIt’s also helpful to have a plan for moving these items quickly if a flood warning is issued.`,
        image: tip4Image, // Use local image
      };
    default:
      return { title: '', description: '', image: '' };
  }
};

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState({ title: '', description: '', image: '' });
  const [contacts, setContacts] = useState([
    { name: 'Emergency Services', number: '911' },
    { name: 'Local Red Cross', number: '(123) 456-7890' },
    { name: 'Flood Response Team', number: '(098) 765-4321' },
  ]);
  const [addContactVisible, setAddContactVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number: '' });

  // Function to open the modal with tip details
  const showTipDetails = (tipNumber: number) => {
    const tipContent = getTipContent(tipNumber);
    setCurrentTip(tipContent);
    setModalVisible(true);
  };

  // Function to handle adding a new emergency contact
  const handleAddEmergencyContact = () => {
    if (newContact.name && newContact.number) {
      setContacts([...contacts, newContact]);
      setNewContact({ name: '', number: '' });
      setAddContactVisible(false);
    } else {
      Alert.alert('Please enter both name and number.');
    }
  };

  return (
    <SafeAreaView className="bg-[#111111] flex-1 px-4">
      <ScrollView className="flex-1">
        {/* Title for Tips */}
        <Text className="text-white text-3xl mb-4">Flood Mitigation Tips</Text>

        {/* 2x2 Grid of Tip Containers */}
        <View className="flex-row flex-wrap justify-between">
          {/* Container 1 */}
          <TouchableOpacity className="w-[48%] mb-4" onPress={() => showTipDetails(1)}>
            <Image source={tip1Image} className="bg-gray-500 w-full h-24 rounded-md justify-center items-center" resizeMode="cover" />
            <Text className="text-white text-center text-lg mt-2">Tip 1: Plan Routes</Text>
          </TouchableOpacity>

          {/* Container 2 */}
          <TouchableOpacity className="w-[48%] mb-4" onPress={() => showTipDetails(2)}>
            <Image source={tip2Image} className="bg-gray-500 w-full h-24 rounded-md justify-center items-center" resizeMode="cover" />
            <Text className="text-white text-center text-lg mt-2">Tip 2: Elevate Utilities</Text>
          </TouchableOpacity>

          {/* Container 3 */}
          <TouchableOpacity className="w-[48%] mb-4" onPress={() => showTipDetails(3)}>
            <Image source={tip3Image} className="bg-gray-500 w-full h-24 rounded-md justify-center items-center" resizeMode="cover" />
            <Text className="text-white text-center text-lg mt-2">Tip 3: Use Sandbags</Text>
          </TouchableOpacity>

          {/* Container 4 */}
          <TouchableOpacity className="w-[48%] mb-4" onPress={() => showTipDetails(4)}>
            <Image source={tip4Image} className="bg-gray-500 w-full h-24 rounded-md justify-center items-center" resizeMode="cover" />
            <Text className="text-white text-center text-lg mt-2">Tip 4: Secure Valuables</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts Section */}
        <Text className="text-white text-3xl mt-4 mb-4">Emergency Contacts</Text>
        {contacts.map((contact, index) => (
          <TouchableOpacity key={index} onPress={() => Alert.alert(`Calling ${contact.number}`)}>
            <Text className="text-blue-500 text-xl font-bold mb-2">{contact.name}: {contact.number}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Button to add emergency contact */}
      <View className="absolute bottom-6 right-6 rounded-full">
        <TouchableOpacity
          onPress={() => setAddContactVisible(true)}
          className="bg-red-800 p-4 rounded-full"
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal for Tip Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
          <View className="bg-white rounded-lg p-4 w-11/12 h-3/4">
            <ScrollView>
              <Text className="text-black text-2xl mb-2">{currentTip.title}</Text>
              <Image source={currentTip.image} className="w-full h-48 rounded-md mb-2" resizeMode="cover" />
              <Text className="text-black text-lg">{currentTip.description}</Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-red-600 p-2 rounded-full mt-4"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Adding a New Contact */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addContactVisible}
        onRequestClose={() => setAddContactVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
          <View className="bg-white rounded-lg p-4 w-11/12">
            <Text className="text-black text-2xl mb-4">Add Emergency Contact</Text>
            <TextInput
              placeholder="Contact Name"
              value={newContact.name}
              onChangeText={(text) => setNewContact({ ...newContact, name: text })}
              className="border-b-2 border-gray-300 mb-4 p-2"
            />
            <TextInput
              placeholder="Contact Number"
              value={newContact.number}
              onChangeText={(text) => setNewContact({ ...newContact, number: text })}
              className="border-b-2 border-gray-300 mb-4 p-2"
            />
            <TouchableOpacity
              onPress={handleAddEmergencyContact}
              className="bg-green-600 p-2 rounded-full"
            >
              <Text className="text-white text-center">Add Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAddContactVisible(false)}
              className="bg-red-600 p-2 rounded-full mt-4"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
