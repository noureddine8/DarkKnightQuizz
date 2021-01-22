import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Levels = ({ navigation, route }) => {
  const { name, age } = route.params;
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
        data={[
          { level: 1, title: "Easy level" },
          { level: 2, title: "Intermediate level" },
          { level: 3, title: "Hard level" },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginBottom: 20,
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 20,
            }}
            onPress={() => navigate("Quiz", { level: item.level })}
          >
            <Text style={{ fontSize: 24, fontWeight: "700", color: "#000" }}>
              {item.level}. {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.level.toString()}
      />
    </View>
  );
};

export default Levels;
