import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/home";
import YourListScreen from "./screens/my-list";
import { myListAtom } from "./store";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  const [yourList] = useAtom(myListAtom);
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "My List") {
                iconName = focused ? "heart" : "heart";
              }

              // You can return any component that you like here!
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="My List"
            options={{
              tabBarBadge: yourList.length,
              tabBarBadgeStyle: { opacity: yourList.length ? 1 : 0 },
            }}
            component={YourListScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
