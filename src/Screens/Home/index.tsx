import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabbar from "../../components/MyTabbar";
import CreateTask from "../Task/NewTask";
import { useSelector } from "react-redux";
import { AuthType, Routes, State } from "types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Authentication } from "../Authentication";
import HomeStack from "./HomeStack";
interface Prop {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
}

const BottomTabbar = createBottomTabNavigator();
const HomeTabbar = ({ navigation, route }: Prop) => {
  const { isLoggedIn } = useSelector<State, AuthType>((state) => ({
    ...state.authReducer,
  }));

  const getTabBarVisibility = (route:any) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'TaskDetail') {
    return false;
  }

  return true;
}
  if (false) return <Authentication {...{ navigation, route }} />;
  else
    return (
      <BottomTabbar.Navigator
        initialRouteName="Home"
        tabBar={(props) => <MyTabbar {...props} />}
      >
        <BottomTabbar.Screen
          component={CreateTask}
          name="Add"
          options={{ tabBarLabel: "plus", tabBarVisible: false }}
        />
        <BottomTabbar.Screen component={HomeStack} name="Home" options={({ route }) => (
          {
            tabBarVisible: getTabBarVisibility(route)
          }
        )} />

        <BottomTabbar.Screen component={HomeStack} name="User"  />
      </BottomTabbar.Navigator>
    );
};

export default HomeTabbar;
