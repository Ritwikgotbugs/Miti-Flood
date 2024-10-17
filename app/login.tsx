import { Button, Text, TextInput, View } from "react-native";
import { Stack, router } from "expo-router"; // Import useRouter from expo-router
import CustomButton from "../components/custom/button";
import React = require("react");

const LogIn = () => {

  return (
    <View className="h-full justify-center items-center bg-[#1a1a1a] p-6">
      <Text className="text-white text-center text-5xl font-bold mb-6">MitiFlood</Text>
      <Text className="text-white text-center text-3xl mb-8">Log In</Text>
      <View className="w-full max-w-md">
        <View className="mb-4">
          <Text className="text-white text-lg mb-2">Email</Text>
          <TextInput
            className="border border-slate-600 focus:border-blue-600 bg-[#2b2b2b] rounded-xl w-full h-14 p-4 text-white text-[18px]"
            placeholder="Enter your email"
            placeholderTextColor="#888"
          />
        </View>
        <View className="mb-6">
          <Text className="text-white text-lg mb-2">Password</Text>
          <TextInput
            className="border border-slate-600 focus:border-blue-600 bg-[#2b2b2b] rounded-xl w-full h-14 p-4 text-white text-[18px]"
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>
        <CustomButton
          onPress={() => {
            router.push("./(tabs)/home"); // Use router.push to navigate to the Home screen
          }}
          title={"Log In"}
        />
      </View>
      <View className="flex flex-row items-center mt-6">
        <Text className="text-white text-lg">New User?</Text>
        <Button
          title="Sign up"
          color="#f39c12"
          onPress={() => {
            router.push("/signup"); // Use router.push to navigate to the signup screen
          }}
        />
      </View>
    </View>
  );
};

export default LogIn;
