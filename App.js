import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/home";
import YourListScreen from "./screens/your-list";
import { yourListAtom } from "./store";

const Tab = createBottomTabNavigator();

export default function App() {
  const [yourList] = useAtom(yourListAtom);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Your List"
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
