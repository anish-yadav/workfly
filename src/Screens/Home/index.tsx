export { default as Home } from "./Home";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import MyTabbar from "../../components/MyTabbar";
import CreateTask from "../Task/NewTask";
import { useSelector } from "react-redux";
import { AuthType, Routes, State } from "types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Authentication } from "../Authentication";

interface Prop {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
}

const BottomTabbar = createBottomTabNavigator();
const HomeTabbar = ({ navigation, route }: Prop) => {
  const { isLoggedIn } = useSelector<State, AuthType>((state) => ({
    ...state.authReducer,
  }));
  if (false) return <Authentication {...{ navigation, route }} />;
  else
    return (
      <BottomTabbar.Navigator tabBar={(props) => <MyTabbar {...props} />}>
        <BottomTabbar.Screen component={Home} name="Home" />
        <BottomTabbar.Screen component={Home} name="User" />
        <BottomTabbar.Screen
          component={CreateTask}
          name="Add"
          options={{ tabBarLabel: "plus", tabBarVisible: false }}
        />
        <BottomTabbar.Screen
          component={Home}
          name="Notification"
          options={{ tabBarLabel: "bell" }}
        />
        <BottomTabbar.Screen component={Home} name="Settings" />
      </BottomTabbar.Navigator>
    );
};

export default HomeTabbar;
