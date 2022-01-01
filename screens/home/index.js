import { useAtom } from "jotai";
import React from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { myListAtom } from "../../store";
import CategoryList from "./components/CategoryList";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DetailDrawer from "../../shared/components/DetailDrawer";
export default function HomeScreen() {
  const [movies, setMovies] = React.useState([]);
  const [shows, setShows] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  const [yourList, setYourList] = useAtom(myListAtom);
  const [topBarOpacity, setTopBarOpacity] = React.useState(0);
  const [isSearching, setIsSearching] = React.useState(false);
  const searchInput = React.useRef(null);
  React.useEffect(() => {
    getPopularTV().then((data) => setShows(data.results));
    getPopularMovies().then((data) => setMovies(data.results));
    getTrending({ timeWindow: "day" }).then((data) => {
      setTrending(data.results);
    });
  }, []);

  React.useEffect(() => {
    if (!isSearching) {
      Keyboard.dismiss();
    } else {
      searchInput.current.focus();
    }
  }, [isSearching]);
  function handleScroll(event) {
    const scrollY = event.nativeEvent.contentOffset.y;
    const opacity = scrollY / 500;
    if (opacity > 0.8) return;
    setTopBarOpacity(opacity);
  }
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          zIndex: 10,
          minHeight: 50,
          width: "100%",
          backgroundColor: `rgba(0,0,0,${topBarOpacity})`,
          paddingVertical: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => setIsSearching(!isSearching)}>
            <FontAwesome
              name={isSearching ? "close" : "search"}
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <TextInput
          ref={searchInput}
          placeholder="Search"
          clearButtonMode="always"
          style={{
            display: isSearching ? "flex" : "none",
            width: "80%",
            alignSelf: "center",
            marginTop: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "white",
          }}
        />
      </View>
      <ScrollView onScroll={handleScroll}>
        <View style={{ position: "relative", width: "100%", height: 550 }}>
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent"]}
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
          ></LinearGradient>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: `${process.env.API_IMAGE_URL_ORIGINAL}${trending[5]?.poster_path}`,
            }}
          />
        </View>
        {yourList.length > 0 && (
          <CategoryList data={yourList} title={"My List"} />
        )}
        <CategoryList data={trending} title={"Trending"} />
        <CategoryList data={movies} title={"Popular Movies"} />
        <CategoryList data={shows} title={"Popular Shows"} />
      </ScrollView>
      <DetailDrawer />
    </>
  );
}

async function getPopularTV() {
  const res = await fetch(`${process.env.API_URL}/tv/popular`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await res.json();
}
async function getPopularMovies() {
  const res = await fetch(`${process.env.API_URL}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await res.json();
}

async function getTrending({ mediaType = "all", timeWindow }) {
  const res = await fetch(
    `${process.env.API_URL}/trending/${mediaType}/${timeWindow}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  );
  return await res.json();
}
