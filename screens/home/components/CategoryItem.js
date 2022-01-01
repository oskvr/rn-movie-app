import { useAtom } from "jotai";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { selectedAtom } from "../../../store";

export default function CategoryItem({ movie }) {
  const [selected, setSelected] = useAtom(selectedAtom);
  //   const [yourList, _] = useAtom(yourListAtom);

  //   const isInList = yourList.some((el) => el.id === movie.id);
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
          {/* {isInList && (
              <View
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  zIndex: 10,
                  padding: 2,
                  width: "100%",
                  alignItems: "center",
                  backgroundColor: "green",
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>In Your List</Text>
              </View>
            )} */}
          <Image
            style={{ width: "100%", height: 180, borderRadius: 5 }}
            source={{ uri: `${process.env.API_IMAGE_URL}${movie.poster_path}` }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}
