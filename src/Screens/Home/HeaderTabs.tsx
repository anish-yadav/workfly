import React, { RefObject } from "react";
import {
  Dimensions, StyleSheet, Animated 
} from "react-native";
import  { Extrapolate, interpolate } from "react-native-reanimated";
import { Box, Text, theme } from "../../components";
import { CARDS_HEIGHT } from "./Cards";

interface Props {
  curr:number;
  onPress: (i: number) => void;
  y: Animated.Value
}

const { width } = Dimensions.get("screen");
const HeaderTabs = ({  onPress, y, curr }: Props) => {
  const values = ["Created", "Working", "Closed"];

  // For the header
  const translateY1 = y.interpolate({
    inputRange: [0, CARDS_HEIGHT],
    outputRange: [CARDS_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  // For the underline
  const translateX1 = y.interpolate({
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
        transform: [{ translateY: translateY1 }],
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
          transform:[{ translateX: translateX1 }]
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
