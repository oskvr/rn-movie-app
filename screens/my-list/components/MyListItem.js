import { useAtom } from "jotai";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { selectedAtom } from "../../../store";

export default function MyListItem({ movie }) {
  const [_, setSelected] = useAtom(selectedAtom);
  return (
    <TouchableOpacity onPress={() => setSelected(movie)}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 100,
          padding: 0,
          margin: 5,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "hsla(220, 50%, 40%, 0.02)",
        }}
      >
        <Image
          source={{ uri: `${process.env.API_IMAGE_URL}${movie.poster_path}` }}
          style={{ width: 100, height: "100%" }}
        />
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={{ color: "black" }}>{movie.title || movie.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
