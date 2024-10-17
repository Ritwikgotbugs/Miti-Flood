import { Button, Text, TextInput, View } from "react-native";
import { Stack, useRouter } from "expo-router"; // Import useRouter from expo-router
import CustomButton from "../components/custom/button";
import React = require("react");

const SignUp = () => {
  const router = useRouter(); // Initialize the router

  return (
    <View className="flex-1 justify-center items-center bg-[#1a1a1a] p-6">
      <Text className="text-white text-center text-5xl font-bold mb-6">MitiFlood</Text>
      <Text className="text-white text-center text-3xl mb-8">Sign Up</Text>
      
      <View className="w-full max-w-md">
        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-white text-lg mb-2">Email</Text>
          <TextInput
            className="border border-slate-600 focus:border-blue-600 bg-[#2b2b2b] rounded-xl w-full h-14 p-4 text-white text-[18px]"
            placeholder="Enter your email"
            placeholderTextColor="#888"
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-white text-lg mb-2">Password</Text>
          <TextInput
            className="border border-slate-600 focus:border-blue-600 bg-[#2b2b2b] rounded-xl w-full h-14 p-4 text-white text-[18px]"
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>

        {/* Sign Up Button */}
        <CustomButton
          onPress={() => {
            router.push("/(tabs)/home"); // Use router.push to navigate to the Home screen
          }}
          title={"Sign Up"}
        />
      </View>

      {/* Log In Prompt */}
      <View className="flex flex-row items-center mt-6">
        <Text className="text-white text-lg">Already a user?</Text>
        <Button
          title="Log In"
          color="#f39c12"
          onPress={() => {
            router.push("/login"); // Use router.push to navigate to the login screen
          }}
        />
      </View>
    </View>
  );
};

export default SignUp;
