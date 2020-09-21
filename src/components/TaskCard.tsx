import { NavigationProp, Route, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatDistanceToNow } from "date-fns";
import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RichEditor } from "react-native-pell-rich-editor";
import { Routes } from "types";
import { Box, Text } from "./theme";

interface TaskCardProp {
  title: string;
  description: string;
  createdAt: string;
  id: number;
  navigation:StackNavigationProp<Routes,"Login">
}

class TaskCard extends Component<TaskCardProp> {
  
  render() {
    const { id, description, createdAt, navigation } = this.props;

    return (
      <Box
        height={150}
        maxHeight={150}
        padding="l"
        marginVertical="m"
        borderRadius={20}
        backgroundColor="greyCard"
      >
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate("TaskDetail",{ id })
        }}>
          <Text variant="header1">{id}</Text>
          <Text variant="body">
            {description
              .substr(0, 100)
              .replace(/<[^>]*>?/gm, " ")
              .replace("&nbsp", " ")}
          </Text>
          <Text variant="body1">
            {formatDistanceToNow(new Date(parseInt(createdAt)))} ago
          </Text>
          
        </TouchableWithoutFeedback>
      </Box>
    );
  }
}
export default TaskCard;
