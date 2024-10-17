import { Image, View, Text } from "react-native";
import { Tabs } from "expo-router";
import React = require("react");

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="gap-2 items-center justify-center flex bg-secondary-100">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 20, height: 20 }}
      />
      <Text
        className={`${
          focused ? "font-bold text-orange-300" : "font-semibold text-gray-200"
        } text-xs `}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#212121",
            borderTopWidth: 1,
            borderTopColor: "#212121",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <TabIcon
                icon={require("../../assets/icons/home.png")}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="tips"
          options={{
            title: "Projects",
            headerShown: false,
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <TabIcon
              icon={require("../../assets/icons/tips.png")}
                color={color}
                name="Tips"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="maps"
          options={{
            title: "Maps",
            headerShown: false,
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <TabIcon
              icon={require("../../assets/icons/map.png")}
                color={color}
                name="Maps"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: "Community",
            headerShown: false,
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <TabIcon
              icon={require("../../assets/icons/comm.png")}
                color={color}
                name="Community"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;