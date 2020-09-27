import { Picker } from "@react-native-community/picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import * as DocumentPicker from "expo-document-picker";
import * as ImageManipulater from "expo-image-manipulator";
import Feather from "react-native-vector-icons/Feather";
import theme, { Box, Text } from "./theme";
import { addToStorage } from "../../helpers/Firebase";

interface LinkModalProps {
  onComplete: ({ title, url }: { title: string; url: string }) => void;
  color: string;
  placeholderColor: string;
  backgroundColor: string;
  visible: boolean;
  setVisible: (v: boolean) => void;
}

export const LinkModal = ({
  onComplete,
  color,
  placeholderColor,
  backgroundColor,
  visible,
  setVisible,
}: LinkModalProps) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(visible);
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);
  const onDone = () => {
    setVisible(false);
    onComplete({ title, url });
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropColor={color}
      backdropOpacity={0.3}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={[styles.dialog, { backgroundColor }]}>
        <View style={styles.linkTitle}>
          <Text style={{ color }}>Insert Link</Text>
        </View>
        <View style={styles.item}>
          <TextInput
            style={[styles.input, { color }]}
            placeholderTextColor={placeholderColor}
            placeholder={"title"}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.item}>
          <TextInput
            style={[styles.input, { color }]}
            placeholderTextColor={placeholderColor}
            placeholder="http(s)://"
            onChangeText={(text) => setUrl(text)}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.btn} onPress={() => hideModal()}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={onDone}>
            <Text style={styles.text}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

interface SaveModalProps {
  visible: boolean;
  departments: string[];
  department: string;
  setDepartment: (d: string) => void;
  toggleModal: (v: boolean) => void;
  save: () => void;
  loading: boolean;
}

export const SaveModal = ({
  visible,
  departments,
  department,
  setDepartment,
  toggleModal,
  loading,
  save,
}: SaveModalProps) => {
  const [isVisible, setVisible] = useState<boolean>(visible);

  const color = theme.colors.mainForeground;

  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={color}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleModal(false)}
      animationIn="bounceIn"
    >
      <Box
        marginHorizontal="l"
        padding="l"
        borderRadius={10}
        backgroundColor="mainBackground"
      >
        <Box marginTop="m">
          <Text variant="label" marginBottom="m">
            Tags
          </Text>
          <Box>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "rgba(143, 146, 161, 0.2)",
                paddingBottom: theme.spacing.s,
                color: theme.colors.primaryText,
                fontSize: 16,
                fontFamily: "DMSans-Medium",
              }}
              placeholder="Email, CRM, Form"
              placeholderTextColor={theme.colors.primaryText}
            />
          </Box>
        </Box>

        <Box marginTop="m">
          <Text variant="label" marginBottom="m">
            Department/City
          </Text>
          <Box>
            <Picker
              selectedValue={department}
              onValueChange={(v) => setDepartment(v as string)}
            >
              {departments.map((d, index) => (
                <Picker.Item key={index} value={d} label={d} />
              ))}
            </Picker>
          </Box>
        </Box>

        <Box paddingTop="l" flexDirection="row" justifyContent="space-between">
          <Box paddingHorizontal="m" paddingVertical="s">
            <TouchableOpacity onPress={() => toggleModal(false)}>
              <Text variant="body">Cancel</Text>
            </TouchableOpacity>
          </Box>
          <Box
            backgroundColor="cardPrimaryBackground"
            paddingHorizontal="l"
            paddingVertical="s"
            borderRadius={10}
          >
            <TouchableOpacity onPress={() => (!loading ? save() : null)}>
              {!loading ? (
                <Text variant="body" color="whiteText">
                  Save
                </Text>
              ) : (
                <ActivityIndicator color="white" />
              )}
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

interface ImageModalProps {
  visible: boolean;
  toggleModal: (v: boolean) => void;
  onComplete: (url: string) => void;
}

export const InsertImageModal = ({
  visible,
  toggleModal,
  onComplete,
}: ImageModalProps) => {
  const [isVisible, setVisible] = useState<boolean>(visible);
  const [image, setImage] = useState<DocumentPicker.DocumentResult | null>(
    null
  );
  const [uploading, startUploading] = useState<boolean>(false);
  const [blob, setBlob] = useState<Blob>();

  const color = theme.colors.mainForeground;

  const save = async () => {
    if (blob) {
      const { uploadTask } = addToStorage(blob);

      uploadTask.on(
        "state_changed",
        () => startUploading(true),
        //  error
        () => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            startUploading(false);
            toggleModal(false);
            onComplete(downloadURL);
            return;
          });
        }
      );
    }
  };

  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={color}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleModal(false)}
      animationIn="bounceIn"
    >
      <Box
        marginHorizontal="l"
        padding="l"
        borderRadius={10}
        backgroundColor="mainBackground"
      >
        <Box marginTop="m">
          <Text variant="label" marginBottom="m">
            Select image file
          </Text>
          <Box>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const file = await DocumentPicker.getDocumentAsync({
                    multiple: false,
                    type: "image/*",
                  });

                  const {
                    uri,
                    // @ts-ignore
                  } = await ImageManipulater.manipulateAsync(file.uri, [], {
                    compress: 0.5,
                    format:ImageManipulater.SaveFormat.PNG
                  });
                  const fetchRespose = await fetch(uri);
                  const imgBlob = await fetchRespose.blob();
                  setBlob(imgBlob);
                  setImage(file);
                } catch (e) {
                  console.log("Error is ", e);
                }
              }}
            >
              <Box
                flexDirection="row"
                paddingHorizontal="m"
                paddingVertical="m"
                borderRadius={10}
                backgroundColor="greyCard"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text variant="body1">
                  {/* @ts-ignore */}
                  {image ? image.name : "Select file"}
                </Text>
                <Feather name="file" size={18} />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>

        <Box paddingTop="l" flexDirection="row" justifyContent="space-between">
          <Box paddingHorizontal="m" paddingVertical="s">
            <TouchableOpacity onPress={() => toggleModal(false)}>
              <Text variant="body">Cancel</Text>
            </TouchableOpacity>
          </Box>
          <Box
            backgroundColor="cardPrimaryBackground"
            paddingHorizontal="l"
            paddingVertical="s"
            borderRadius={10}
          >
            {uploading ? (
              <ActivityIndicator color="white" />
            ) : (
              <TouchableOpacity onPress={save}>
                <Text variant="body" color="whiteText">
                  Save
                </Text>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 40,
  },
  linkTitle: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#b3b3b3",
  },
  dialog: {
    borderRadius: 8,
    marginHorizontal: 40,
    paddingHorizontal: 10,
  },

  buttonView: {
    flexDirection: "row",
    height: 36,
    paddingVertical: 4,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#286ab2",
  },
});
