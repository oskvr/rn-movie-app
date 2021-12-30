import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDAxM2U0NmVjOTNjZmExZDNkMmFkNzU2NDQ0NWQyZCIsInN1YiI6IjYwMDJmZmE5YmU0YjM2MDAzZDUzYTQ4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3FxkY7rTh3-ozlwIm05S8GPZgePqNl67Ntqs3uayPsQ";
const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

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
            source={{ uri: `${IMAGE_URL}${movie.poster_path}` }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

function MovieList({ title, data, setSelected }) {
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

async function getPopularTV() {
  const res = await fetch(`${BASE_URL}/tv/popular`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await res.json();
}
async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await res.json();
}

async function getTrending({ mediaType = "all", timeWindow }) {
  const res = await fetch(`${BASE_URL}/trending/${mediaType}/${timeWindow}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await res.json();
}

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const [movies, setMovies] = React.useState([]);
  const [shows, setShows] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  React.useEffect(() => {
    getPopularTV().then((data) => setShows(data.results));
    getPopularMovies().then((data) => setMovies(data.results));
    getTrending({ timeWindow: "day" }).then((data) =>
      setTrending(data.results)
    );
  }, []);
  const [selected, setSelected] = React.useState(null);
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
            <View>
              <Image
                style={{ height: "100%", borderRadius: 5, width: 100 }}
                source={{ uri: `${IMAGE_URL}${selected.poster_path}` }}
              />
            </View>
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
            <Button
              title="Add to Your List"
              onPress={() => setSelected(null)}
            />
          </View>
        </View>
      )}
    </>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Your List</Text>
    </View>
  );
}
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Your List"
            options={{
              tabBarBadge: 12,
            }}
            component={ProfileScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
  },
});
