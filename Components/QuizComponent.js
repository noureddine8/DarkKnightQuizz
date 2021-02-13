//imports
import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { data } from "../shared/data";

const QuizComponent = ({ route, navigation }) => {
  // the component state
  const [revealed, setRevealed] = useState(false);
  const [num, setNum] = useState(0);
  const [score, setScore] = useState(0);
  const [touch, setTouch] = useState(false);
  const [scores, setScores] = useState([0]);

  const storeData = async (value, position) => {
    try {
      let newScores = scores.map((score) => {
        if (scores.indexOf(score) == position) return value;
        else return score;
      });
      const jsonValue = JSON.stringify(newScores);
      await AsyncStorage.setItem("scores", jsonValue);
    } catch (e) {
      console.log(e.message);
    }
  };

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

  //useRef and useState
  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
    console.log(scores);
  }, [score]);

  useEffect(() => {
    getData();
  }, []);
  const { level } = route.params;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: "#fff", textAlign: "center" }]}>
        Score: {score}
      </Text>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={[styles.text, { color: "#fff", textAlign: "center" }]}>
          {data[num][0]}
        </Text>
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          {data[num].map((resp) => {
            let BG = resp.isTrue ? "#0F0" : "#F00";
            if (typeof resp === "string") return null;
            return (
              <TouchableOpacity
                disabled={touch}
                key={resp.answer}
                style={
                  revealed
                    ? [styles.touchable, { backgroundColor: BG }]
                    : [{ backgroundColor: BG }, styles.touchable]
                }
                onPress={() => {
                  if (num == data.length - 1) {
                    if (resp.isTrue) {
                      setScore((score) => score + 1);
                    }
                    setTouch(true);
                    setRevealed(true);
                    setTimeout(() => {
                      navigation.navigate("Home");
                      if (
                        scores[level - 1] == null ||
                        scores[level - 1] < scoreRef.current
                      ) {
                        storeData(scoreRef.current, level - 1);
                      }
                    }, 2000);
                  } else {
                    if (resp.isTrue) {
                      setScore((score) => score + 1);
                    }
                    setTouch(true);
                    setRevealed(true);
                    setTimeout(() => {
                      setTouch(false);
                      setNum((num) => num + 1);
                      setRevealed(false);
                    }, 20);
                  }
                }}
              >
                <Text style={styles.text}>{resp.answer}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141412", paddingTop: 50 },
  text: { fontSize: 32, fontWeight: "700", color: "#000" },
  touchable: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },
});

export default QuizComponent;
