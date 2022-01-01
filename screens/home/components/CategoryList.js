import React from "react";
import { FlatList, Text, View } from "react-native";
import CategoryItem from "./CategoryItem";
export default function CategoryList({ title, data }) {
  return (
    <View style={{ paddingTop: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", paddingLeft: 15 }}>
        {title}
      </Text>
      <FlatList
        style={{ marginTop: 5 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({ item }) => <CategoryItem movie={item} />}
      />
    </View>
  );
}
