import React from "react";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import Home from "./Home";
import { TaskDetail } from "../../../Screens/Task";
import { Box, Text, theme } from "../../../components";
import Feather from "react-native-vector-icons/Feather";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface indexProps {}

const Stack = createStackNavigator();

const HomeStack: React.FunctionComponent<indexProps> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ header: Header,animationEnabled: false }}>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{ headerShown: false }}
      />
      <Stack.Screen component={TaskDetail} name="TaskDetail" />
    </Stack.Navigator>
  );
};

const Header = (props: StackHeaderProps) => {
  return (
    <Box
      paddingHorizontal="l"
      paddingVertical="m"
      flexDirection="row"
      alignItems="center"
      backgroundColor="mainBackground"
      justifyContent="space-between"
    >
      <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
        <Feather name="chevron-left" size={24} />
      </TouchableWithoutFeedback>

      <Box flexDirection="row">
        <Box marginHorizontal="m">
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <Feather name="check" size={20} />
          </TouchableWithoutFeedback>
        </Box>
        <Box marginHorizontal="m">
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <Feather name="edit-3" size={20} />
          </TouchableWithoutFeedback>
        </Box>
        <Box marginLeft="s">
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <Feather name="trash-2" size={20} color={theme.colors.danger} />
          </TouchableWithoutFeedback>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeStack;
