import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

const Home = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#141412",
      }}
    >
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: "60%", height: "100%" }}
        />
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            textAlign: "center",
            color: "#fff",
          }}
        >
          THE DARK KNIGHT QUIZ
        </Text>
      </View>
      <View style={{ flex: 5, justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
          }}
          onPress={() =>
            navigate("Levels", {
              name: "Noureddine",
              age: 21,
            })
          }
        >
          <Text style={{ fontSize: 32, fontWeight: "700", color: "#000" }}>
            Start Playing
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
