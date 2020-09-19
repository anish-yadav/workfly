import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "@shopify/restyle";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import Feather from "react-native-vector-icons/Feather";
import { Theme } from "src/components/theme";
import { useCreateTaskMutation } from "../../generated/graphql";
import { Routes } from "types";
import { Box } from "../../components";

interface Prop {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
}

const { width } = Dimensions.get("screen");

const CreateTask = ({ navigation }: Prop) => {
  const theme = useTheme<Theme>();
  const richText = useRef<RichEditor | null>();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [createTask, { loading, data, error }] = useCreateTaskMutation();

  const handleChange = (text: string) => {
    setText((t) => text);
  };

  const handleBackButton = () => {
   navigation.navigate("Home")
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  const save = async () => {
    await createTask({ variables: { title: title, description: text } });
    console.log(data?.createTask,error)
    if(!error && data?.createTask != undefined){
      ToastAndroid.showWithGravity("Task created successfully",ToastAndroid.SHORT,ToastAndroid.CENTER)
      navigation.goBack();
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        {/* <Header /> */}
        <TextInput
          placeholder="Title"
          style={{
            fontSize: theme.textVariants.header.fontSize,
            marginTop: theme.spacing.l,
          }}
          onChangeText={(t) => setTitle(t)}
        />
        <RichEditor
          onHeightChange={() => console.log("height changed")}
          ref={(r) => (richText.current = r)}
          placeholder={"Enter the description here"}
          editorStyle={{ backgroundColor: theme.colors.mainBackground }}
          onChange={handleChange}
        />
      </Box>

      <TouchableWithoutFeedback onPress={() => save()}>
        <View
          style={[
            styles.save,
            { backgroundColor: theme.colors.cardPrimaryBackground },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Feather name="check" size={34} color="white" />
          )}
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <RichToolbar
          editor={richText.current}
          getEditor={() => richText.current!}
          selectedIconTint={"#2095F2"}
          disabledIconTint={"#8b8b8b"}
          actions={["bold", "italic", "unorderedList", "orderedList", "link"]} // default defaultActions
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  save: {
    width: 60,
    height: 60,
    borderRadius: 30,
    right: -width + 65,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateTask;
