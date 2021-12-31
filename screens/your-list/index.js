import { Text, View } from "react-native";
import React from "react";
import { useAtom } from "jotai";
import { yourListAtom } from "../../store";

export default function YourListScreen() {
  const [yourList, _] = useAtom(yourListAtom);
  return (
    <View>
      <Text>Your List ({yourList.length})</Text>
    </View>
  );
}
