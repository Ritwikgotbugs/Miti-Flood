import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

const CustomButton = ({
  onPress,
  title,
  variant = 'primary',
}: CustomButtonProps) => {

  const variantStyles = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600 border-gray-600",
    danger: "bg-rose-700 border-red-500",
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`w-full rounded-xl min-h-[50px] justify-center items-center mb-10 ${variantStyles[variant]}`}
    >
      <Text className={`font-medium text-xl text-white`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
