import React, { RefObject } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { Text, Box, theme } from "../../components";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { CARDS_HEIGHT } from "./Cards";
import MaskedView from "@react-native-community/masked-view";
import Tabs from "./Tabs";
import { between, useValue } from "react-native-redash";

interface Props {
  active: Animated.Node<number>;
  curr:number;
  onPress: (i: number) => void;
  y: Animated.Node<number>;
  scrollView: RefObject<Animated.ScrollView>;
}

const { width } = Dimensions.get("screen");
const HeaderTabs = ({ active, onPress, y, curr }: Props) => {
  const values = ["Created", "Working", "Closed"];

  // For the header
  const translateY = interpolate(y, {
    inputRange: [0, CARDS_HEIGHT],
    outputRange: [CARDS_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  // For the underline
  const translateX = interpolate(active,{
    inputRange:[0,1,2],
    outputRange:[ 0, width/3, 2*(width/3)],
    extrapolate: Extrapolate.CLAMP
  })

  return (
    <Animated.View
      style={{
        zIndex: 999,
        paddingHorizontal: 10,
        position: "absolute",
        backgroundColor: "white",
        transform: [{ translateY }],
      }}
    >
      <Box flex={1} flexDirection="row">
        {values.map((v, i) => (
          <Box
            key={i}
            width={width / 3}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              variant="header1"
              onPress={() => onPress(i)}
              key={i}
              color={
                curr === i
                  ? "primaryText"
                  : "secondaryText"
              }
            >
              {v}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Line */}
      <Animated.View
        style={[
          styles.line,
          { backgroundColor: theme.colors.cardPrimaryBackground,
          transform:[{ translateX }]
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 4,
    width: width / 3,
    borderRadius: 4,
  },
});
export default HeaderTabs;
