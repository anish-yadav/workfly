import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { backgroundColor, useTheme } from "@shopify/restyle";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import Feather from "react-native-vector-icons/Feather";
import { Theme } from "src/components/theme";
import { useCreateTaskMutation } from "../../generated/graphql";
import { Routes } from "types";
import { Box, ICON_MAP, LinkModal, SaveModal, InsertImageModal } from "../../components";
import { useApolloClient } from "@apollo/client";

interface Prop {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
}

const CreateTask = ({ navigation }: Prop) => {
  const theme = useTheme<Theme>();
  const richText = useRef<RichEditor | null>();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [linkModalVisble, setLinkModalVisible] = useState<boolean>(false);

  const departments = [
    "Tech",
    "Creatives",
    "Board",
    "Outreach",
    "Consulting",
    "Odisha",
    "Lucknow",
    "Agra",
  ];
  const [department, setDepartment] = useState<string>("Tech");
  const [showSaveModal, setSaveModalVisible] = useState<boolean>(false);

  const [showImageModal, setImageModalVisible] = useState<boolean>(false);
  const [
    createTask,
    { loading, data, error, called },
  ] = useCreateTaskMutation();
  const client = useApolloClient();

  const handleChange = (text: string) => {
    setText((t) => text);
  };

  const handleBackButton = () => {
    navigation.navigate("Home");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  const save = () => {
    createTask({ variables: { title: title, description: text ,department } });
  };

  useEffect(() => {
    if (!loading && !error && data) {
      console.log(data.createTask);
      ToastAndroid.showWithGravity(
        "Task created successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      client.resetStore().then(() => {
        console.log("cached clear");
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      });
    }
  }, [called, loading, error, data]);
  return (
    <View style={{ flex: 1 ,backgroundColor: theme.colors.whiteText }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SaveModal
        visible={showSaveModal}
        {...{ department, departments, setDepartment,loading,save }}
        toggleModal={(v) => setSaveModalVisible(v)}
      />
      <LinkModal
        visible={linkModalVisble}
        onComplete={({ title, url }) =>
          richText.current?.insertLink(title, url)
        }
        backgroundColor={theme.colors.mainBackground}
        color={theme.colors.primaryText}
        placeholderColor={theme.colors.secondaryText}
        setVisible={setLinkModalVisible}
      />
      <InsertImageModal
        toggleModal={setImageModalVisible}
        visible={showImageModal}
        onComplete={(url) => {
          richText.current?.insertImage(url)
        }}
      />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="l"
        paddingVertical="m"
        backgroundColor="mainBackground"
      >
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : console.log("cannot go back")
          }
        >
          <Feather name="chevron-left" size={24} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setSaveModalVisible(true)}>
          {loading && !error ? (
            <ActivityIndicator color={theme.colors.primaryText} />
          ) : (
            <Feather name="check" size={24} />
          )}
        </TouchableWithoutFeedback>
      </Box>
      <ScrollView>
      <Box flex={1} paddingHorizontal="l" backgroundColor="mainBackground">
        {/* <Header /> */}
        <TextInput
          placeholder="Title..."
          style={{
            fontSize: theme.textVariants.hero.fontSize,
            color: "#7A8084",
          }}
          onChangeText={(t) => setTitle(t)}
          placeholderTextColor="#7A8084"
        />
        <RichEditor
          onHeightChange={() => console.log("height changed is changed")}
          ref={(r) => (richText.current = r)}
          placeholder={"Your text ..."}
          editorStyle={{ backgroundColor: theme.colors.mainBackground }}
          // @ts-ignore
          onChange={handleChange}
          initialFocus={true}
        />
      </Box>

     
      </ScrollView>
     <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <RichToolbar
          editor={richText.current}
          getEditor={() => richText.current!}
          
          style={{ backgroundColor: theme.colors.mainBackground }}
          onInsertLink={() => {
            console.log("Modal clicked");
            setLinkModalVisible((v) => !v);
          }}
          onPressAddImage={() => {
            setImageModalVisible(true)
          }}
          selectedIconTint={"#2095F2"}
          disabledIconTint={"#000000"}
          actions={["bold", "italic", "unorderedList", "link","image"]} // default defaultActions
          iconMap={ICON_MAP}
        />
      </KeyboardAvoidingView>
    
    </View>
  );
};

export default CreateTask;
