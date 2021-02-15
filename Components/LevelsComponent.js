import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Levels = ({ navigation }) => {
  //State
  const [data] = useState([
    { level: 1, title: "Characters" },
    { level: 2, title: "Batman begins" },
  ]);
  const [scores, setScores] = useState([0, 0]);

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
                flex: 5,
                fontSize: 24,
                fontWeight: "700",
                color: "#000",
              }}
            >
              {item.level}. {item.title}
            </Text>
            <View style={{ flex: 2, flexDirection: "column" }}>
              <Text
                style={{
                  flex: 2,
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#090",
                }}
              >
                High Score
              </Text>
              <Text
                style={{
                  flex: 2,
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#090",
                }}
              >
                {scores[item.level - 1] == null ? "0" : scores[item.level - 1]}
                /10
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.level.toString()}
      />
    </View>
  );
};

export default Levels;
