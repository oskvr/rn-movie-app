import { useAtom } from "jotai";
import React from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { yourListAtom } from "../../store";
import MovieList from "./components/MovieList";

export default function HomeScreen() {
  const [movies, setMovies] = React.useState([]);
  const [shows, setShows] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [yourList, setYourList] = useAtom(yourListAtom);
  function isAddedToYourList(movie) {
    return yourList.some((m) => m.id === movie.id);
  }
  function addToYourList(movie) {
    setYourList([...yourList, movie]);
  }
  function removeFromYourList(movie) {
    setYourList(yourList.filter((item) => item.id !== movie.id));
  }
  React.useEffect(() => {
    getPopularTV().then((data) => setShows(data.results));
    getPopularMovies().then((data) => setMovies(data.results));
    getTrending({ timeWindow: "day" }).then((data) => {
      setTrending(data.results);
    });
  }, []);
  return (
    <>
      <ScrollView>
        <MovieList
          data={trending}
          title={"Trending"}
          setSelected={setSelected}
        />
        <MovieList
          data={movies}
          title={"Popular Movies"}
          setSelected={setSelected}
        />
        <MovieList
          data={shows}
          title={"Popular Shows"}
          setSelected={setSelected}
        />
      </ScrollView>
      {selected && (
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
          <View style={{ position: "absolute", top: 2, right: 2 }}>
            <Button title="X" color="red" onPress={() => setSelected(null)} />
          </View>
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
              style={{ height: "100%", borderRadius: 5, width: 100 }}
              source={{
                uri: `${process.env.API_IMAGE_URL}${selected.poster_path}`,
              }}
            />
            <View style={{ padding: 15, flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
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
                <Text>2002</Text>
                <Text>13+</Text>
                <Text>2h 12m</Text>
              </View>
              <Text>{selected.overview}</Text>
            </View>
          </View>
          <View
            style={{
              minHeight: 20,
            }}
          >
            {isAddedToYourList(selected) ? (
              <Button
                color="red"
                title="Remove from Your List"
                onPress={() => removeFromYourList(selected)}
              ></Button>
            ) : (
              <Button
                title="Add to Your List"
                onPress={() => addToYourList(selected)}
              />
            )}
          </View>
        </View>
      )}
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
