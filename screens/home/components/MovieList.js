import { TouchableOpacity, View, Image, Text, FlatList } from "react-native";
import React from "react";
export default function MovieList({ title, data, setSelected }) {
  return (
    <View style={{ paddingTop: 30 }}>
      <Text style={{ fontSize: 25, fontWeight: "700", paddingLeft: 15 }}>
        {title}
      </Text>
      <FlatList
        style={{ marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <MovieItem movie={item} setSelected={setSelected} />
        )}
      />
    </View>
  );
}

function MovieItem({ movie, setSelected }) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          setSelected(movie);
          console.log(movie);
        }}
      >
        <View style={{ alignItems: "center", width: 120, marginHorizontal: 5 }}>
          <Image
            style={{ width: "100%", height: 180, borderRadius: 5 }}
            source={{ uri: `${process.env.IMAGE_URL}${movie.poster_path}` }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}
