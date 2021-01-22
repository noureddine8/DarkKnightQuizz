import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { data } from "../shared/data";
class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
      num: 0,
      score: 0,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { color: "#fff", textAlign: "center" }]}>
          Score: {this.state.score}
        </Text>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.text, { color: "#fff", textAlign: "center" }]}>
            {data[this.state.num][0]}
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
            {data[this.state.num].map((resp) => {
              let BG = resp.isTrue ? "#0F0" : "#F00";
              if (typeof resp === "string") return null;
              return (
                <TouchableOpacity
                  key={resp.answer}
                  style={
                    this.state.revealed
                      ? [styles.touchable, { backgroundColor: BG }]
                      : [{ backgroundColor: BG }, styles.touchable]
                  }
                  onPress={() => {
                    if (this.state.num == data.length - 1) {
                      if (resp.isTrue) {
                        this.setState({ score: this.state.score + 1 });
                      }
                      this.setState({ revealed: !this.state.revealed });
                      setTimeout(() => {
                        this.props.navigation.navigate("Home");
                      }, 2000);
                    } else {
                      if (resp.isTrue) {
                        this.setState({ score: this.state.score + 1 });
                      }
                      this.setState({ revealed: !this.state.revealed });
                      setTimeout(() => {
                        this.setState({ num: this.state.num + 1 });
                        this.setState({ revealed: !this.state.revealed });
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
  }
}
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
