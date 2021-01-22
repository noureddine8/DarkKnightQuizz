import React, { Component } from "react";
import Home from "./HomeComponent";
import { StatusBar } from "react-native";
import Levels from "./LevelsComponent";
import Quiz from "./QuizComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <StatusBar backgroundColor="#000" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: "#fff",
            headerTransparent: true,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Levels" component={Levels} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;
