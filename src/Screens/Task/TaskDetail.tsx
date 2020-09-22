import { Link, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Linking, View } from "react-native";
import { Task, useGetTaskQuery } from "../../generated/graphql";
import { Routes } from "types";
import { Box, Text, theme, Button } from "../../components";
import Feather from "react-native-vector-icons/Feather";
import { format } from "date-fns";
import { RichEditor } from "react-native-pell-rich-editor";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


interface Props {
  navigation: StackNavigationProp<Routes, "TaskDetail">;
  route: RouteProp<Routes, "TaskDetail">;
}
const { width } = Dimensions.get("screen")
const TaskDetail = ({ navigation, route }: Props) => {
  const { id } = route.params;

  const { data, loading, error } = useGetTaskQuery({ variables: { id } });

  const [task, setTask] = useState<Task>();
  const richEditor = useRef<RichEditor>(null)

  useEffect(() => {
    if (data && !loading && !error) {
      setTask(data.task as Task);
    }
  }, [data, loading, error]);
  if (!task) return <Text variant="header">Loading .... </Text>;
  else
    return (
      <Box flex={1} backgroundColor="mainBackground" paddingHorizontal="l">
        <Text variant="header">{task.title}</Text>
        <Box flexDirection="row" marginVertical="l" justifyContent="space-between">
          <Box flexDirection="row" alignItems="center" >
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../../../assets/male.png")}
            />
            <Box
              paddingLeft="m"
              justifyContent="flex-start"
              alignItems="baseline"
            >
              <Text variant="body" color="secondaryText">
                Created By
              </Text>
              <Text variant="header1">{task.creator?.name.split(" ")[0]}</Text>
            </Box>
          </Box>
        <Box flexDirection="row" alignItems="center">
          <Image
            style={{ height: 50, width: 50 }}
            source={require("../../../assets/male.png")}
          />
          <Box
            paddingLeft="m"
            justifyContent="flex-start"
            alignItems="baseline"
          >
            <Text variant="body" color="secondaryText">
              Date created
            </Text>
            <Text variant="header1">{ format(new Date(parseInt(task.createdAt)),"dd MMM")}</Text>
          </Box>
      </Box>
      </Box>
      <Text variant="subheader" color="secondaryText">Description</Text>

      <Box flex={1} >
            <RichEditor
            ref={richEditor}
            onHeightChange={() => console.log("Height changed")}
            initialContentHTML={task.description}
            disabled={true}
            editorStyle={{backgroundColor: theme.colors.mainBackground, color: theme.colors.primaryText}}
            onShouldStartLoadWithRequest={(e) => {
              if(e.url !== "about:blank"){
                Linking.openURL(e.url)
                return false
              }
              return true
            }}
            />
          </Box>
          <Box position="absolute" bottom={20} width={width} paddingHorizontal="l">
            <TouchableWithoutFeedback>
              <Button isLoading={false} variant="check" text={task.handler ? task.handler.name : "Start Working"} onPress={() => console.log('pressed')} />
            </TouchableWithoutFeedback>
          </Box>
      </Box>
    );
};

export default TaskDetail;
