import { TouchableOpacity, View, Image, Text, FlatList } from "react-native";
import React from "react";
import { useAtom } from "jotai";
import { yourListAtom } from "../../../store";
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
  const [yourList, _] = useAtom(yourListAtom);

  const isInList = yourList.some((el) => el.id === movie.id);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          setSelected(movie);
        }}
      >
        <View
          style={{
            position: "relative",
            alignItems: "center",
            width: 120,
            marginHorizontal: 5,
          }}
        >
          {isInList && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                zIndex: 10,
                backgroundColor: "green",
                padding: 5,
              }}
            >
              <Text style={{ color: "white" }}>In Your List</Text>
            </View>
          )}
          <Image
            style={{ width: "100%", height: 180, borderRadius: 5 }}
            source={{ uri: `${process.env.API_IMAGE_URL}${movie.poster_path}` }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}
