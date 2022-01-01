import { FontAwesome } from "@expo/vector-icons";
import { useAtom } from "jotai";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { myListAtom, selectedAtom } from "../../store";
import { useFocusEffect } from "@react-navigation/native";
export default function DetailDrawer({ closeOnRemove = false }) {
  const [selected, setSelected] = useAtom(selectedAtom);
  const [myList, setMyList] = useAtom(myListAtom);

  // Close the drawer on tab change
  useFocusEffect(
    React.useCallback(() => {
      setSelected(null);
    }, [])
  );
  if (!selected) return null;

  function isInMyList(movie) {
    return myList.some((m) => m.id === movie.id);
  }
  function addToMyList(movie) {
    setMyList([...myList, movie]);
  }
  function removeFromMyList(movie) {
    setMyList(myList.filter((item) => item.id !== movie.id));
    if (closeOnRemove) {
      setSelected(null);
    }
  }
  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        width: "100%",
        padding: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => setSelected(null)}
        style={{
          position: "absolute",
          top: 4,
          right: 8,
          //   backgroundColor: "red",
          height: 30,
          width: 35,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome name="close" size={20} color="black" />
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          minHeight: 150,
          marginBottom: 10,
        }}
      >
        <Image
          style={{ height: 150, borderRadius: 3, width: 100 }}
          source={{
            uri: `${process.env.API_IMAGE_URL}${selected.poster_path}`,
          }}
        />
        <View style={{ paddingHorizontal: 15, flex: 1, marginRight: 15 }}>
          <Text
            style={{
              fontSize: 20,
              marginTop: -5,
              fontWeight: "700",
            }}
          >
            {selected.title || selected.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: 150,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "gray" }}>2002</Text>
            <Text style={{ color: "gray" }}>13+</Text>
            <Text style={{ color: "gray" }}>2h 12m</Text>
          </View>
          <Text>{selected.overview}</Text>
        </View>
      </View>
      <View
        style={{
          minHeight: 20,
        }}
      >
        {isInMyList(selected) ? (
          <TouchableOpacity
            style={{ padding: 5, width: 100, alignItems: "center" }}
            onPress={() => removeFromMyList(selected)}
          >
            <FontAwesome size={15} name="check" />
            <Text style={{ fontSize: 12 }}>My List</Text>
          </TouchableOpacity>
        ) : (
          // <Button
          //   color="red"
          //   title="Remove from Your List"
          //   onPress={() => removeFromYourList(selected)}
          // ></Button>
          // <Button
          //   title="Add to Your List"
          //   onPress={() => addToYourList(selected)}
          // />
          <TouchableOpacity
            style={{ padding: 5, width: 100, alignItems: "center" }}
            onPress={() => addToMyList(selected)}
          >
            <FontAwesome size={15} name="plus" />
            <Text style={{ fontSize: 12 }}>My List</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
