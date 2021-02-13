import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Levels = ({ navigation }) => {
  //State
  const [data] = useState([{ level: 1, title: "First level" }]);
  const [scores, setScores] = useState([0]);

  //AsyncStorage getData
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("scores");
      if (jsonValue != null) {
        setScores(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  //useEffect
  useEffect(() => {
    getData();
  }, []);

  const { navigate } = navigation;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#141412",
        paddingTop: 50,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginBottom: 20,
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 20,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={() => navigate("Quiz", { level: item.level })}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#000",
              }}
            >
              {item.level}. {item.title}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#090",
              }}
            >
              High Score{" "}
              {scores[item.level - 1] == null ? "0" : scores[item.level - 1]}/10
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.level.toString()}
      />
    </View>
  );
};

export default Levels;
