import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Linking, StyleSheet, View } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RichEditor } from "react-native-pell-rich-editor";
import { Routes } from "types";
import { Box, Button, Text, theme } from "../../components";
import { Task, useGetTaskQuery, useDoTaskMutation } from "../../generated/graphql";


interface Props {
  navigation: StackNavigationProp<Routes, "TaskDetail">;
  route: RouteProp<Routes, "TaskDetail">;
}
const { width } = Dimensions.get("screen")
const TaskDetail = ({ navigation, route }: Props) => {
  const { id } = route.params;

  const { data, loading, error } = useGetTaskQuery({ variables: { id } });
  const [ doTask, { loading: doTaskLoading}] = useDoTaskMutation()

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
      <View style={{flex: 1, backgroundColor: theme.colors.whiteText}}>
      <ScrollView style={[StyleSheet.absoluteFill,{ marginBottom: 80}]}>
      <Box flex={1} backgroundColor="mainBackground" paddingHorizontal="l" >
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
            focusable={false}
            scrollEnabled={false}
            injectedJavaScript={"document.body.style.userSelect = 'none'"}
            
            editorStyle={{backgroundColor: theme.colors.mainBackground, color: theme.colors.primaryText , contentCSSText: "-webkit-touch-callout: none; -webkit-user-select: none;-html-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; "}}
            onShouldStartLoadWithRequest={(e) => {
              if(e.url !== "about:blank"){
                Linking.openURL(e.url)
                return false
              }
              return true
            }}
            />
            
          </Box>
         
      </Box>
       
      </ScrollView>
      <Box position="absolute" bottom={20} width={width} paddingHorizontal="l">
            <TouchableWithoutFeedback>
              <Button isLoading={doTaskLoading} variant="check" text={task.handler ? task.handler.name : "Start Working"}  onPress={() => doTask({ variables: { taskId: id}})} />
            </TouchableWithoutFeedback>
          </Box>
      </View>
    );
};

export default TaskDetail;
