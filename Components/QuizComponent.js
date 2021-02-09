//imports
import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateStore, insertScore } from "../redux/index.js";
import { data } from "../shared/data";

const QuizComponent = ({ route, navigation }) => {
  // redux store
  const scores = useSelector((state) => {
    return state.scores;
  });
  // the component state
  const [revealed, setRevealed] = useState(false);
  const [num, setNum] = useState(0);
  const [score, setScore] = useState(0);
  const [touch, setTouch] = useState(false);
  //useRef and useState
  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  //Redux dispatch function
  const dispatch = useDispatch();
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
                      if (scores[level - 1] == null) {
                        dispatch(insertScore(level, scoreRef.current));
                      } else if (scores[level - 1] < scoreRef.current) {
                        dispatch(updateStore(level, scoreRef.current));
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
                    }, 2000);
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
