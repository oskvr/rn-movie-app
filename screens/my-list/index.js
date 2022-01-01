import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAtom } from "jotai";
import { myListAtom } from "../../store";
import MyListItem from "./components/MyListItem";
import DetailDrawer from "../../shared/components/DetailDrawer";

// TODO: Ugly hack, fix this
function TopBarBackground() {
  return (
    <View
      style={{
        position: "relative",
        top: 0,
        width: "100%",
        height: 30,
        backgroundColor: "rgba(0,0,0,0.8)",
        marginBottom: 0,
      }}
    ></View>
  );
}
export default function YourListScreen({ navigation }) {
  const [myList, _] = useAtom(myListAtom);
  if (myList.length === 0) {
    return (
      <>
        <TopBarBackground />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ marginBottom: 50 }}>My List is empty</Text>
          <Button
            title="Explore titles"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <DetailDrawer />
      </>
    );
  }
  return (
    <>
      <TopBarBackground />
      <View>
        <FlatList
          data={myList}
          renderItem={({ item }) => <MyListItem movie={item} />}
        />
      </View>
      <DetailDrawer />
    </>
  );
}
